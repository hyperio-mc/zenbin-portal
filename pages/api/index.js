// API Routes for ZenBin Portal

const users = new Map() // In-memory for now - replace with DB
const apiKeys = new Map() // apiKey -> userId

export default async function handler(req, res) {
  const { method, url } = req

  // POST /api/auth/token - Exchange API key for JWT
  if (method === 'POST' && url === '/api/auth/token') {
    const { apiKey } = req.body
    
    if (!apiKey) {
      return res.status(400).json({ error: 'API key required' })
    }

    const userId = apiKeys.get(apiKey)
    if (!userId) {
      return res.status(401).json({ error: 'Invalid API key' })
    }

    // Find user
    let user = null
    for (const u of users.values()) {
      if (u.id === userId) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    const { generateApiToken } = require('../../lib/jwt')
    const token = generateApiToken(user)

    return res.json({
      access_token: token,
      token_type: 'Bearer',
      expires_in: 86400 // 24 hours
    })
  }

  // POST /api/signup - Create account and generate API key
  if (method === 'POST' && url === '/api/signup') {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' })
    }

    if (users.has(email)) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    const bcrypt = require('bcryptjs')
    const { generateApiKey } = require('../../lib/jwt')
    const { PLANS } = require('../../config')

    const hashedPassword = await bcrypt.hash(password, 10)
    const apiKey = generateApiKey()
    
    const user = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      plan: 'free',
      monthlyRequests: PLANS.free.monthlyRequests,
      createdAt: new Date().toISOString()
    }

    users.set(email, user)
    apiKeys.set(apiKey, user.id)

    return res.status(201).json({
      user: { id: user.id, email: user.email, plan: user.plan },
      apiKey // Static API key - user keeps this
    })
  }

  // POST /api/auth/login - Login with email/password
  if (method === 'POST' && url === '/api/auth/login') {
    const { email, password } = req.body
    
    const user = users.get(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const bcrypt = require('bcryptjs')
    const valid = await bcrypt.compare(password, user.password)
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const { generateApiToken } = require('../../lib/jwt')
    const token = generateApiToken(user)

    return res.json({ 
      user: { id: user.id, email: user.email, plan: user.plan }, 
      apiKey: Array.from(apiKeys.entries())
        .filter(([key, uid]) => uid === user.id)
        .map(([key]) => key)[0] || null,
      access_token: token,
      token_type: 'Bearer',
      expires_in: 86400
    })
  }

  res.status(404).json({ error: 'Not found' })
}
