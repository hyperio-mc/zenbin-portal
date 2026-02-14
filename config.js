// ZenBin Portal
// JWT signing secret - must match zenbin service
const ZENBIN_JWT_SECRET = process.env.ZENBIN_JWT_SECRET || 'change-me-in-production'

// Plan definitions
const PLANS = {
  free: {
    name: 'Free',
    priceId: null,
    monthlyRequests: 10,
    monthlyPrice: 0
  },
  hobby: {
    name: 'Hobby',
    priceId: 'price_hobby_001', // Replace with real Stripe price ID
    monthlyRequests: 1000,
    monthlyPrice: 5
  },
  pro: {
    name: 'Pro',
    priceId: 'price_pro_001', // Replace with real Stripe price ID
    monthlyRequests: 10000,
    monthlyPrice: 15
  },
  business: {
    name: 'Business',
    priceId: 'price_business_001', // Replace with real Stripe price ID
    monthlyRequests: 100000,
    monthlyPrice: 49
  }
}

module.exports = {
  ZENBIN_JWT_SECRET,
  PLANS
}
