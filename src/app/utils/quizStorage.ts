// ---------------------------------------------------------------------------
// Quiz Session Storage  –  Supabase-backed (PostgreSQL, central, multi-user)
// ---------------------------------------------------------------------------

import { supabase } from './supabaseClient';

export interface QuizAnswer {
  questionNumber: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  skipped: boolean;
  answeredAt: string;   // ISO timestamp
  attemptNumber: number; // 1 = first attempt, 2+ = retry attempts
}

export interface QuizSession {
  id: string;           // UUID from Supabase
  userName: string;
  userEmail: string;
  startedAt: string;
  completedAt?: string;
  totalQuestions: number;
  totalCorrect: number;
  totalSkipped: number;
  answers: QuizAnswer[];
}

// ── row-level types returned by Supabase ────────────────────────────────────

interface SessionRow {
  id: string;
  user_name: string;
  user_email: string;
  started_at: string;
  completed_at: string | null;
  total_questions: number;
  total_correct: number;
  total_skipped: number;
  quiz_answers: AnswerRow[];
}

interface AnswerRow {
  question_number: number;
  question_text: string;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  skipped: boolean;
  answered_at: string;
  attempt_number: number;
}

// ── mappers ─────────────────────────────────────────────────────────────────

function mapSession(row: SessionRow): QuizSession {
  return {
    id: row.id,
    userName: row.user_name,
    userEmail: row.user_email,
    startedAt: row.started_at,
    completedAt: row.completed_at ?? undefined,
    totalQuestions: row.total_questions,
    totalCorrect: row.total_correct,
    totalSkipped: row.total_skipped,
    answers: (row.quiz_answers ?? []).map(a => ({
      questionNumber: a.question_number,
      questionText: a.question_text,
      selectedAnswer: a.selected_answer,
      correctAnswer: a.correct_answer,
      isCorrect: a.is_correct,
      skipped: a.skipped,
      answeredAt: a.answered_at,
      attemptNumber: a.attempt_number ?? 1,
    })),
  };
}

// ── retry helper ─────────────────────────────────────────────────────────────

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 800): Promise<T> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries - 1) throw err;
      await new Promise(r => setTimeout(r, delayMs * (attempt + 1)));
    }
  }
  throw new Error('unreachable');
}

// ── public API ───────────────────────────────────────────────────────────────

/** Start a new session and return its UUID. Retries up to 3× on failure. */
export async function startSession(userName: string, userEmail: string): Promise<string> {
  return withRetry(async () => {
    const { data, error } = await supabase
      .from('quiz_sessions')
      .insert({ user_name: userName, user_email: userEmail })
      .select('id')
      .single();
    if (error) throw new Error(error.message);
    return data.id as string;
  });
}

/** Append one answer to an in-progress session. Fire-and-forget safe. */
export async function recordAnswer(
  sessionId: string,
  answer: Omit<QuizAnswer, 'answeredAt'>,
): Promise<void> {
  const { error } = await supabase.from('quiz_answers').insert({
    session_id: sessionId,
    question_number: answer.questionNumber,
    question_text: answer.questionText,
    selected_answer: answer.selectedAnswer,
    correct_answer: answer.correctAnswer,
    is_correct: answer.isCorrect,
    skipped: answer.skipped,
    attempt_number: answer.attemptNumber ?? 1,
  });
  if (error) console.error('[recordAnswer]', error.message);
}

/** Mark session as complete and write final stats. */
export async function completeSession(
  sessionId: string,
  totalQuestions: number,
  totalCorrect: number,
  totalSkipped: number,
): Promise<void> {
  const { error } = await supabase
    .from('quiz_sessions')
    .update({
      completed_at: new Date().toISOString(),
      total_questions: totalQuestions,
      total_correct: totalCorrect,
      total_skipped: totalSkipped,
    })
    .eq('id', sessionId);
  if (error) console.error('[completeSession]', error.message);
}

/** Read all sessions with their answers (for admin dashboard). */
export async function getAllSessions(): Promise<QuizSession[]> {
  const { data, error } = await supabase
    .from('quiz_sessions')
    .select('*, quiz_answers(*)')
    .order('started_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as SessionRow[]).map(mapSession);
}

/** Delete all sessions — admin utility. */
export async function clearAllSessions(): Promise<void> {
  const { error } = await supabase.from('quiz_sessions').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) throw new Error(error.message);
}

