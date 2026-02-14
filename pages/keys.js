// ZenBin Portal - API Keys Page

export default function ApiKeys() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', 
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <a href="/" style={{ color: '#4ecdc4', textDecoration: 'none' }}>← Back</a>
      </header>

      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>API Keys</h1>

      <div style={{ 
        background: '#1a1a2e', 
        borderRadius: '12px', 
        padding: '2rem',
        maxWidth: '600px'
      }}>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
          Your API key is used by your agents to authenticate with ZenBin.
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888' }}>
            API Key
          </label>
          <code style={{ 
            display: 'block',
            background: '#0a0a0a', 
            padding: '1rem', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}>
            zb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </code>
        </div>

        <p style={{ color: '#555', fontSize: '0.875rem', marginTop: '1rem' }}>
          Keep this key secret! It gives full access to your account.
        </p>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
        How to use
      </h2>

      <pre style={{ 
        background: '#1a1a2e', 
        padding: '1.5rem', 
        borderRadius: '8px',
        maxWidth: '600px',
        overflow: 'auto'
      }}>
{`# 1. Get a JWT using your API key
curl -X POST https://zenbin.org/api/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "zb_live_xxxxx"}'

# Response:
# {"access_token": "eyJ...", "token_type": "Bearer", "expires_in": 86400}

# 2. Use the JWT to create a page
curl -X POST https://zenbin.org/v1/pages/my-page \\
  -H "Authorization: Bearer eyJ..." \\
  -H "Content-Type: application/json" \\
  -d '{"html": "<h1>Hello!</h1>"}' `}
      </pre>
    </div>
  )
}
