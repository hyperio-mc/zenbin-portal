// ZenBin Portal - Signup Page

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      // Store API key in localStorage for demo
      localStorage.setItem('zenbin_apiKey', data.apiKey)
      localStorage.setItem('zenbin_user', JSON.stringify(data.user))
      
      // Redirect to keys page
      router.push('/keys')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa', 
      color: '#1a1a1a',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <a href="/" style={{ color: '#0066cc', textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
          ← Back to home
        </a>

        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
          Get your API key
        </h1>
        <p style={{ color: '#666666', marginBottom: '2rem' }}>
          Start publishing HTML for your agents in seconds.
        </p>

        {error && (
          <div style={{ 
            background: '#fef2f2', 
            border: '1px solid #ef4444',
            color: '#dc2626',
            padding: '1rem', 
            borderRadius: '8px',
            marginBottom: '1rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444444', fontSize: '0.875rem' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '1rem',
                background: '#ffffff',
                border: '1px solid #cccccc',
                borderRadius: '8px',
                color: '#1a1a1a',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444444', fontSize: '0.875rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              style={{
                width: '100%',
                padding: '1rem',
                background: '#ffffff',
                border: '1px solid #cccccc',
                borderRadius: '8px',
                color: '#1a1a1a',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              background: loading ? '#cccccc' : '#0066cc',
              border: 'none',
              borderRadius: '8px',
              color: loading ? '#666666' : '#ffffff',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ color: '#888888', fontSize: '0.875rem', marginTop: '1.5rem', textAlign: 'center' }}>
          Already have an account? <a href="/login" style={{ color: '#0066cc' }}>Login</a>
        </p>
      </div>
    </div>
  )
}