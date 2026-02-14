// JWT utilities for ZenBin Portal

const jwt = require('jsonwebtoken')
const { ZENBIN_JWT_SECRET } = require('./config')

// Generate JWT for a user (called after signup/payment)
function generateApiToken(user) {
  const payload = {
    sub: user.id,
    email: user.email,
    plan: user.plan,
    monthlyRequests: user.monthlyRequests,
    apiKeyId: user.apiKeyId
  }

  // Token expires in 24 hours
  return jwt.sign(payload, ZENBIN_JWT_SECRET, { expiresIn: '24h' })
}

// Generate a shorter API key for direct zenbin calls (format: zb_live_xxxxx)
function generateApiKey() {
  const crypto = require('crypto')
  const key = crypto.randomBytes(16).toString('hex')
  return `zb_live_${key}`
}

// Verify JWT (for testing)
function verifyApiToken(token) {
  try {
    return jwt.verify(token, ZENBIN_JWT_SECRET)
  } catch (err) {
    return null
  }
}

module.exports = {
  generateApiToken,
  generateApiKey,
  verifyApiToken
}
