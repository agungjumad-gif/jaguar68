// settings.js
module.exports = {
  // ========== BOT TOKENS ==========
  BOT_TOKEN: 'BOT TOKEN DATABASE',
  BOT_TOKEN_OTP: 'BOT TOKEN OTP',

  // ========== OWNER CONFIG ==========
  OWNER_IDS: ['ID TELE LU'],
  OWNER_ID: 12345, //ID TELE LU
  OWNER_LINK: 'https://t.me/ikyloww',

  // ========== API & INTERVAL ==========
  API_URL: 'https://numberpanel.tech/api/otp?count=800000', 
  INTERVAL: 1000, // Dipercepat ke 1 detik biar auto detect OTP kilat

  // ========== FORCE JOIN ==========
  CHANNEL_1: 'allnumberiky', //username ch
  CHANNEL_2: 'infometode', //username ch

  // ========== CHANNELS & LINKS ==========
  LOG_CHANNEL_ID: '-1004470763810', //id ch
  SUPPORT_CHANNEL: 'allnumberiky', // username ch
  OTP_GROUP_URL: 'https://t.me/gabrielotp', //grup otp
  BOT_USERNAME: 'ikynumber1bot', //bot username lu
  FILES_DIR: './files',

  // ========== BROADCAST CONFIG ==========
  BROADCAST_DELAY: 50,
  BROADCAST_BATCH: 50,

  // ========== OTP CONFIG ==========
  OTP_DELETE_TIMEOUT: 5 * 60 * 1000,
  MAX_RETRY: 3,
  TIMEOUT: 30000
    }
