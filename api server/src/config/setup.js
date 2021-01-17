module.exports = {
  sqlInit: { 
    sqlIp: '169.254.231.234',
    sqlPort: 1568,
    sqlDatabase: 'Sustainability',
    sqlUser: 'sa',
    sqlPassword: 'mariana03'
  },

  appServer : { protocol : 'http',
                host: '127.0.0.1',
                port: '8081'
              },

  webServer : { protocol : 'http',
                host: '127.0.0.1',
                port: '4201'
              },

  commonRoutes: {
    resetPassword: '/home/reset-password'
  },

  resetMinutes: 5,

  google: {
    clientId: '121488956864-dit8mb6sv38ccsf9umim4iegc9eg10vd.apps.googleusercontent.com',
    clientSecret: 'WE80dydV_cflXlL06HoEOceC',
    callbackURL: '/auth/google/callback',
    provider: 'google'
  },

  facebook: {
    clientId: '635551387152370',
    clientSecret: '3c6a2a591f184e6332bfc66f8dad4ef9',
    callbackURL: '/auth/facebook/callback',
    provider: 'facebook'
  },

  token: {
    secret: 'sustainability'
  },

  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    service: 'gmail',
    user: 'sustainabilitynoreply@gmail.com',
    password: 'noreply999'
  },
}



 
