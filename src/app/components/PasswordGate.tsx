import { useState, useEffect, FormEvent, ReactNode } from 'react';

const STORAGE_KEY = 'nelisa-sk-auth';

interface PasswordGateProps {
  children: ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(STORAGE_KEY) === 'ok';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem(STORAGE_KEY, 'ok');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        const data = await res.json().catch(() => ({ error: 'Nesprávne heslo' }));
        setError(data.error || 'Nesprávne heslo');
      }
    } catch {
      setError('Chyba pripojenia. Skúste to znovu.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: 'white',
          borderRadius: '24px',
          padding: '48px 40px',
          boxShadow: '0 10px 40px rgba(174, 84, 255, 0.15), 0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #AE54FF 0%, #9333EA 100%)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '28px',
              fontWeight: 700,
            }}
          >
            N
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#1F2937', margin: '0 0 8px' }}>
            Nelisa Certifikácia
          </h1>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
            Pre prístup zadajte heslo
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Heslo"
            autoFocus
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 16px',
              fontSize: '16px',
              border: error ? '2px solid #EF4444' : '2px solid #E5E7EB',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box',
              marginBottom: '12px',
            }}
            onFocus={(e) => {
              if (!error) e.currentTarget.style.borderColor = '#AE54FF';
            }}
            onBlur={(e) => {
              if (!error) e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          />

          {error && (
            <p style={{ fontSize: '13px', color: '#EF4444', margin: '0 0 12px' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
              background: loading || !password ? '#D1D5DB' : 'linear-gradient(135deg, #AE54FF 0%, #9333EA 100%)',
              border: 'none',
              borderRadius: '12px',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Overuje sa...' : 'Vstúpiť'}
          </button>
        </form>
      </div>
    </div>
  );
}
