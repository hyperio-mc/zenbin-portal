// ZenBin Portal - API Keys Page

export default function ApiKeys() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#fafafa', 
      color: '#1a1a1a',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem'
    }}>
      <header style={{ marginBottom: '2rem' }}>
        <a href="/" style={{ color: '#0066cc', textDecoration: 'none' }}>← Back</a>
      </header>

      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>API Keys</h1>

      <div style={{ 
        background: '#ffffff', 
        borderRadius: '12px', 
        padding: '2rem',
        maxWidth: '600px',
        border: '1px solid #e0e0e0'
      }}>
        <p style={{ color: '#666666', marginBottom: '1.5rem' }}>
          Your API key is used by your agents to authenticate with ZenBin.
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#444444' }}>
            API Key
          </label>
          <code style={{ 
            display: 'block',
            background: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            border: '1px solid #e0e0e0'
          }}>
            zb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </code>
        </div>

        <p style={{ color: '#888888', fontSize: '0.875rem', marginTop: '1rem' }}>
          Keep this key secret! It gives full access to your account.
        </p>
      </div>

      <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '1rem' }}>
        How to use
      </h2>

      <pre style={{ 
        background: '#1e1e1e', 
        color: '#d4d4d4',
        padding: '1.5rem', 
        borderRadius: '8px',
        maxWidth: '600px',
        overflow: 'auto',
        border: '1px solid #e0e0e0'
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