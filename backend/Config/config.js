module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_key_secure',
    JWT_EXPIRES_IN: '1d',
    PASSWORD_RESET_EXPIRES: 3600000, // 1 hour
    RATE_LIMIT: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    }
  };