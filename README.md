# ZenBin Portal

Stripe-backed API key management for ZenBin.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

```
ZENBIN_JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## How It Works (Machine-to-Machine)

1. User signs up → gets a static API key (`zb_live_xxxxx`)
2. **Agent** exchanges API key for JWT via `/api/auth/token`
3. Agent uses JWT to call ZenBin API
4. When JWT expires, agent refreshes using the same API key

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Agent   │ ──────► │  Portal  │ ◄────── │   User   │
│          │ POST    │ /auth/   │ signup  │          │
│          │ apiKey  │ token    │         │          │
└──────────┘         └────┬─────┘         └──────────┘
                          │ JWT
                          ▼
                   ┌──────────┐
                   │  ZenBin  │
                   │  API     │
                   └──────────┘
```

## API

### POST /api/auth/token

Exchange API key for JWT:

```bash
curl -X POST https://zenbin.org/api/auth/token \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "zb_live_xxxxxxxxxxxxxxxx"}'
```

Response:
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### POST /api/signup

Create account and get API key:

```bash
curl -X POST https://zenbin.org/api/signup \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "password": "secret"}'
```

### POST /api/auth/login

Login with email/password:

```bash
curl -X POST https://zenbin.org/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "you@example.com", "password": "secret"}'
```

## API Key Format

```
zb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Plans

| Plan | Requests/mo | Price |
|------|------------|-------|
| Free | 10 | $0 |
| Hobby | 1,000 | $5 |
| Pro | 10,000 | $15 |
| Business | 100,000 | $49 |

## Deployment

Deploy to Vercel:
```bash
vercel --prod
```
