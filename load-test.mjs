/**
 * Nelisa Quiz — Concurrent Load Test
 * Simulates NUM_USERS users going through the full quiz simultaneously.
 *
 * Usage:
 *   node load-test.mjs          # runs test + deletes test data afterwards
 *   node load-test.mjs --keep   # runs test but leaves test data in Supabase
 *   node load-test.mjs --users 5  # override number of concurrent users
 */

const SUPABASE_URL = 'https://tvmbwvrdiumjqnmxtquu.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bWJ3dnJkaXVtanFubXh0cXV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NjgxNDQsImV4cCI6MjA4NzQ0NDE0NH0.xdCT-EFx6MOXYf-WJYa_F68V5QtAqD_XTRDW6VmA35Q';

const NUM_QUESTIONS = 25;
const TEST_EMAIL_DOMAIN = '@loadtest.internal';

// ── helpers ──────────────────────────────────────────────────────────────────

const BASE_HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

async function supabasePost(path, body, preferMinimal = false) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: 'POST',
    headers: preferMinimal
      ? { ...BASE_HEADERS, Prefer: 'return=minimal' }
      : BASE_HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
  return preferMinimal ? null : res.json();
}

async function supabasePatch(path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: 'PATCH',
    headers: { ...BASE_HEADERS, Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
}

async function supabaseDelete(path) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method: 'DELETE',
    headers: { ...BASE_HEADERS, Prefer: 'return=minimal' },
  });
  if (!res.ok) throw new Error(`DELETE ${path} → ${res.status}: ${await res.text()}`);
}

// ── single user simulation ────────────────────────────────────────────────────

// ── cleanup ───────────────────────────────────────────────────────────────────

async function cleanup() {
  try {
    // cascade delete: quiz_answers rows are removed automatically
    await supabaseDelete(
      `quiz_sessions?user_email=like.*${encodeURIComponent(TEST_EMAIL_DOMAIN)}*`,
    );
    console.log('✓ Test sessions deleted from Supabase (answers cascade-deleted)');
  } catch (err) {
    console.log(`✗ Cleanup failed: ${err.message}`);
    console.log(
      `  → Delete manually in Supabase dashboard: filter user_email LIKE '%${TEST_EMAIL_DOMAIN}%'`,
    );
  }
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const keepData = args.includes('--keep');
  const usersArg = args.indexOf('--users');
  const numUsers = usersArg !== -1 ? parseInt(args[usersArg + 1], 10) : 20;

  console.log('\n🚀  NELISA QUIZ — Concurrent Load Test');
  console.log(`    ${numUsers} users × ${NUM_QUESTIONS} questions, all starting simultaneously`);
  console.log(`    Supabase: ${SUPABASE_URL}\n`);

  const t0 = Date.now();
  const results = await Promise.all(
    Array.from({ length: numUsers }, (_, i) => simulateUser(i + 1, numUsers)),
  );
  const wallTime = ((Date.now() - t0) / 1000).toFixed(2);

  const ok = results.filter((r) => r.success);
  const fail = results.filter((r) => !r.success);
  const times = ok.map((r) => r.elapsed);
  const avg = times.length
    ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2)
    : '—';
  const min = times.length ? Math.min(...times).toFixed(2) : '—';
  const max = times.length ? Math.max(...times).toFixed(2) : '—';

  console.log('\n' + '─'.repeat(46));
  console.log('📊  RESULTS');
  console.log('─'.repeat(46));
  console.log(`✅  Passed    : ${ok.length} / ${numUsers} users`);
  console.log(`❌  Failed    : ${fail.length} / ${numUsers} users`);
  console.log(`⏱   Wall time : ${wallTime}s  (all ${numUsers} users ran in parallel)`);
  if (times.length) {
    console.log(`⚡  Per-user  : avg ${avg}s | fastest ${min}s | slowest ${max}s`);
  }
  if (fail.length) {
    console.log('\n❌  Failure details:');
    fail.forEach((r) => console.log(`    User ${r.userId}: ${r.error}`));
  }

  // Verify data landed correctly — query admin endpoint
  console.log('\n🔍  Verifying data in Supabase…');
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/quiz_sessions?user_email=like.*${encodeURIComponent(TEST_EMAIL_DOMAIN)}*&select=id,total_questions,total_correct,completed_at`,
      { headers: BASE_HEADERS },
    );
    const rows = await res.json();
    const complete = rows.filter((r) => r.completed_at !== null).length;
    console.log(`    Sessions in DB : ${rows.length} (expected ${ok.length})`);
    console.log(`    Marked complete: ${complete} (expected ${ok.length})`);
    if (rows.length === ok.length && complete === ok.length) {
      console.log('    ✓ All data consistent');
    } else {
      console.log('    ⚠  Mismatch — check Supabase dashboard for orphaned rows');
    }
  } catch (err) {
    console.log(`    ✗ Verification query failed: ${err.message}`);
  }

  if (keepData) {
    console.log(
      `\n⚠️   --keep flag set. Test rows remain in Supabase (email: *${TEST_EMAIL_DOMAIN}).`,
    );
  } else {
    console.log('');
    await cleanup();
  }

  const verdict = fail.length === 0 ? '🎉  All users passed!' : `⚠️   ${fail.length} failure(s) — see details above`;
  console.log('\n' + verdict + '\n');
  process.exit(fail.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});

async function simulateUser(userId, numUsers) {
  const t0 = Date.now();
  const pad = String(userId).padStart(String(numUsers).length, '0');
  const log = (msg) => console.log(`  [User ${pad}] ${msg}`);

  try {
    // 1. Start session — same as startSession() in quizStorage.ts
    const [session] = await supabasePost('quiz_sessions', {
      user_name: `Load Test User ${userId}`,
      user_email: `testuser${userId}${TEST_EMAIL_DOMAIN}`,
    });
    const sessionId = session.id;
    log(`✓ Session started  (${sessionId.slice(0, 8)}…)`);

    // 2. Bulk-insert all 25 answers at once (tests DB under concurrency)
    const answers = Array.from({ length: NUM_QUESTIONS }, (_, i) => {
      const isCorrect = Math.random() > 0.3; // 70% pass rate — realistic
      return {
        session_id: sessionId,
        question_number: i + 1,
        question_text: `Testovací otázka ${i + 1}`,
        selected_answer: isCorrect ? 'Správná odpověď' : 'Nesprávná odpověď',
        correct_answer: 'Správná odpověď',
        is_correct: isCorrect,
        skipped: false,
      };
    });
    await supabasePost('quiz_answers', answers, true);
    const correct = answers.filter((a) => a.is_correct).length;
    log(`✓ ${NUM_QUESTIONS} answers saved   (${correct}/${NUM_QUESTIONS} correct)`);

    // 3. Complete session — same as completeSession() in quizStorage.ts
    await supabasePatch(`quiz_sessions?id=eq.${sessionId}`, {
      completed_at: new Date().toISOString(),
      total_questions: NUM_QUESTIONS,
      total_correct: correct,
      total_skipped: 0,
    });

    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    log(`✓ Completed in ${elapsed}s`);
    return { userId, success: true, sessionId, elapsed: parseFloat(elapsed), correct };
  } catch (err) {
    const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
    log(`✗ FAILED after ${elapsed}s — ${err.message}`);
    return { userId, success: false, error: err.message, elapsed: parseFloat(elapsed) };
  }
}

