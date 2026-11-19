const fetch = require('node-fetch');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const AdmZip = require('adm-zip');
const FormData = require('form-data');
require('dotenv').config();

const config = require('./settings.js');

// ========== EMOJI CONSTANTS ==========
const P = {
  brand: '', success: '', error: '', warn: '', info: '', bullet: '',
  arrow: '', star: '', fire: '', rocket: '', crown: '', bolt: '',
  spark: '', gear: '', back: '', home: '', refresh: '', close: '',
  key: '', user: '', users: '', group: '', file: '', phone: '',
  signal: '', search: '', chat: '', question: '', broadcast: '',
  tools: '', database: '', chart: '', gift: '', link: '', bell: '', shield: ''
};

// ========== PROMO FEATURE ==========
const BACKUP_DIR = path.join(__dirname, 'backup');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

const PROMO_FILE = path.join(__dirname, 'promo.json');

let promoData = (() => {
  try {
    if (fs.existsSync(PROMO_FILE)) return JSON.parse(fs.readFileSync(PROMO_FILE, 'utf8'));
    return { pesan: null, chatId: null, messageId: null, jeda: 3600, auto: false };
  } catch (e) {
    return { pesan: null, chatId: null, messageId: null, jeda: 3600, auto: false };
  }
})();

function savePromo() { fs.writeFileSync(PROMO_FILE, JSON.stringify(promoData, null, 2)); }

function isPromoOwner(msg) {
  if (!msg || !msg.from) return false;
  const id = String(msg.from.id);
  const ownerIds = (config.OWNER_IDS || []).map(String);
  return ownerIds.includes(id) || String(config.OWNER_ID) === id;
}

async function kirimPromosiKeGrup(grupId) {
  if (promoData.chatId && promoData.messageId) {
    await bot.forwardMessage(grupId, promoData.chatId, promoData.messageId);
  } else if (promoData.pesan) {
    await bot.sendMessage(grupId, promoData.pesan);
  } else {
    throw new Error('No promotion message set yet.');
  }
}

// ========== AUTO PROMO ==========
let autoPromoTimer = null;

function startAutoPromosi() {
  if (autoPromoTimer) clearInterval(autoPromoTimer);
  const jedaMs = promoData.jeda * 1000;
  autoPromoTimer = setInterval(async () => {
    const grupList = loadJSON(GROUPS_FILE, []);
    if (grupList.length === 0) return;
    if (!promoData.chatId && !promoData.pesan) return;
    console.log(`[AUTO-PROMO] Sending to ${grupList.length} groups...`);
    for (const gid of grupList) {
      try {
        await kirimPromosiKeGrup(gid);
        await new Promise(r => setTimeout(r, 1500));
      } catch (e) {
        console.log(`[AUTO-PROMO] Failed ${gid}: ${e.message}`);
      }
    }
  }, jedaMs);
  console.log(`[AUTO-PROMO] Active every ${promoData.jeda} seconds`);
}

function stopAutoPromosi() {
  if (autoPromoTimer) { clearInterval(autoPromoTimer); autoPromoTimer = null; console.log('[AUTO-PROMO] Stopped'); }
}

if (promoData.auto) startAutoPromosi();

// ========== BOLD UNICODE HELPER ==========
function boldText(str) {
  const map = {
    'A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠',
    'N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭',
    'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺',
    'n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇',
    '0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰','5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵'
  };
  return String(str).split('').map(ch => map[ch] || ch).join('');
}

// ========== CLEAN MESSAGE BODY ==========
function cleanMsgBody(text) {
  return String(text).replace(/  +/g, ' ').replace(/^ +/gm, '').replace(/ +$/gm, '');
}

// ========== STYLE BUTTON ==========
function styleButton(text) {
  const clean = String(text)
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier_Base}\uFE0F\u200D\u20E3]/gu, '')
    .replace(/\s+/g, ' ').trim();
  return boldText(clean);
}

function sensorPhone(phone) {
  let clean = phone.replace(/\D/g, '');
  if (clean.length <= 8) return '+' + clean;
  let prefix = clean.slice(0, 5);
  let suffix = clean.slice(-4);
  return '+' + prefix + 'IKYDEV' + suffix;
}

function normalizeButtonText(t) {
  if (!t) return '';
  return String(t)
    .replace(/[\p{Extended_Pictographic}\p{Emoji_Modifier_Base}]/gu, '')
    .replace(/[\uFE0F\u200D\u20E3]/g, '')
    .replace(/\s+/g, ' ').trim().toUpperCase();
}

// ========== ALL COUNTRIES (WITH FLAGS) ==========
const ALL_COUNTRIES = {
  'AF': { name: 'Afghanistan', code: '93', flag: '🇦🇫' }, 'AL': { name: 'Albania', code: '355', flag: '🇦🇱' },
  'DZ': { name: 'Algeria', code: '213', flag: '🇩🇿' }, 'AS': { name: 'American Samoa', code: '1684', flag: '🇦🇸' },
  'AD': { name: 'Andorra', code: '376', flag: '🇦🇩' }, 'AO': { name: 'Angola', code: '244', flag: '🇦🇴' },
  'AI': { name: 'Anguilla', code: '1264', flag: '🇦🇮' }, 'AG': { name: 'Antigua and Barbuda', code: '1268', flag: '🇦🇬' },
  'AR': { name: 'Argentina', code: '54', flag: '🇦🇷' }, 'AM': { name: 'Armenia', code: '374', flag: '🇦🇲' },
  'AW': { name: 'Aruba', code: '297', flag: '🇦🇼' }, 'AU': { name: 'Australia', code: '61', flag: '🇦🇺' },
  'AT': { name: 'Austria', code: '43', flag: '🇦🇹' }, 'AZ': { name: 'Azerbaijan', code: '994', flag: '🇦🇿' },
  'BS': { name: 'Bahamas', code: '1242', flag: '🇧🇸' }, 'BH': { name: 'Bahrain', code: '973', flag: '🇧🇭' },
  'BD': { name: 'Bangladesh', code: '880', flag: '🇧🇩' }, 'BB': { name: 'Barbados', code: '1246', flag: '🇧🇧' },
  'BY': { name: 'Belarus', code: '375', flag: '🇧🇾' }, 'BE': { name: 'Belgium', code: '32', flag: '🇧🇪' },
  'BZ': { name: 'Belize', code: '501', flag: '🇧🇿' }, 'BJ': { name: 'Benin', code: '229', flag: '🇧🇯' },
  'BM': { name: 'Bermuda', code: '1441', flag: '🇧🇲' }, 'BT': { name: 'Bhutan', code: '975', flag: '🇧🇹' },
  'BO': { name: 'Bolivia', code: '591', flag: '🇧🇴' }, 'BA': { name: 'Bosnia and Herzegovina', code: '387', flag: '🇧🇦' },
  'BW': { name: 'Botswana', code: '267', flag: '🇧🇼' }, 'BR': { name: 'Brazil', code: '55', flag: '🇧🇷' },
  'IO': { name: 'British Indian Ocean Territory', code: '246', flag: '🇮🇴' }, 'BN': { name: 'Brunei', code: '673', flag: '🇧🇳' },
  'BG': { name: 'Bulgaria', code: '359', flag: '🇧🇬' }, 'BF': { name: 'Burkina Faso', code: '226', flag: '🇧🇫' },
  'BI': { name: 'Burundi', code: '257', flag: '🇧🇮' }, 'KH': { name: 'Cambodia', code: '855', flag: '🇰🇭' },
  'CM': { name: 'Cameroon', code: '237', flag: '🇨🇲' }, 'CA': { name: 'Canada', code: '1', flag: '🇨🇦' },
  'CV': { name: 'Cape Verde', code: '238', flag: '🇨🇻' }, 'KY': { name: 'Cayman Islands', code: '1345', flag: '🇰🇾' },
  'CF': { name: 'Central African Republic', code: '236', flag: '🇨🇫' }, 'TD': { name: 'Chad', code: '235', flag: '🇹🇩' },
  'CL': { name: 'Chile', code: '56', flag: '🇨🇱' }, 'CN': { name: 'China', code: '86', flag: '🇨🇳' },
  'CO': { name: 'Colombia', code: '57', flag: '🇨🇴' }, 'KM': { name: 'Comoros', code: '269', flag: '🇰🇲' },
  'CG': { name: 'Congo', code: '242', flag: '🇨🇬' }, 'CD': { name: 'Congo, Democratic Republic', code: '243', flag: '🇨🇩' },
  'CK': { name: 'Cook Islands', code: '682', flag: '🇨🇰' }, 'CR': { name: 'Costa Rica', code: '506', flag: '🇨🇷' },
  'CI': { name: 'Ivory Coast', code: '225', flag: '🇨🇮' }, 'HR': { name: 'Croatia', code: '385', flag: '🇭🇷' },
  'CU': { name: 'Cuba', code: '53', flag: '🇨🇺' }, 'CY': { name: 'Cyprus', code: '357', flag: '🇨🇾' },
  'CZ': { name: 'Czech Republic', code: '420', flag: '🇨🇿' }, 'DK': { name: 'Denmark', code: '45', flag: '🇩🇰' },
  'DJ': { name: 'Djibouti', code: '253', flag: '🇩🇯' }, 'DM': { name: 'Dominica', code: '1767', flag: '🇩🇲' },
  'DO': { name: 'Dominican Republic', code: '1', flag: '🇩🇴' }, 'EC': { name: 'Ecuador', code: '593', flag: '🇪🇨' },
  'EG': { name: 'Egypt', code: '20', flag: '🇪🇬' }, 'SV': { name: 'El Salvador', code: '503', flag: '🇸🇻' },
  'GQ': { name: 'Equatorial Guinea', code: '240', flag: '🇬🇶' }, 'ER': { name: 'Eritrea', code: '291', flag: '🇪🇷' },
  'EE': { name: 'Estonia', code: '372', flag: '🇪🇪' }, 'ET': { name: 'Ethiopia', code: '251', flag: '🇪🇹' },
  'FK': { name: 'Falkland Islands', code: '500', flag: '🇫🇰' }, 'FO': { name: 'Faroe Islands', code: '298', flag: '🇫🇴' },
  'FJ': { name: 'Fiji', code: '679', flag: '🇫🇯' }, 'FI': { name: 'Finland', code: '358', flag: '🇫🇮' },
  'FR': { name: 'France', code: '33', flag: '🇫🇷' }, 'GF': { name: 'French Guiana', code: '594', flag: '🇬🇫' },
  'PF': { name: 'French Polynesia', code: '689', flag: '🇵🇫' }, 'GA': { name: 'Gabon', code: '241', flag: '🇬🇦' },
  'GM': { name: 'Gambia', code: '220', flag: '🇬🇲' }, 'GE': { name: 'Georgia', code: '995', flag: '🇬🇪' },
  'DE': { name: 'Germany', code: '49', flag: '🇩🇪' }, 'GH': { name: 'Ghana', code: '233', flag: '🇬🇭' },
  'GI': { name: 'Gibraltar', code: '350', flag: '🇬🇮' }, 'GR': { name: 'Greece', code: '30', flag: '🇬🇷' },
  'GL': { name: 'Greenland', code: '299', flag: '🇬🇱' }, 'GD': { name: 'Grenada', code: '1473', flag: '🇬🇩' },
  'GP': { name: 'Guadeloupe', code: '590', flag: '🇬🇵' }, 'GU': { name: 'Guam', code: '1671', flag: '🇬🇺' },
  'GT': { name: 'Guatemala', code: '502', flag: '🇬🇹' }, 'GN': { name: 'Guinea', code: '224', flag: '🇬🇳' },
  'GW': { name: 'Guinea-Bissau', code: '245', flag: '🇬🇼' }, 'GY': { name: 'Guyana', code: '592', flag: '🇬🇾' },
  'HT': { name: 'Haiti', code: '509', flag: '🇭🇹' }, 'HN': { name: 'Honduras', code: '504', flag: '🇭🇳' },
  'HK': { name: 'Hong Kong', code: '852', flag: '🇭🇰' }, 'HU': { name: 'Hungary', code: '36', flag: '🇭🇺' },
  'IS': { name: 'Iceland', code: '354', flag: '🇮🇸' }, 'IN': { name: 'India', code: '91', flag: '🇮🇳' },
  'ID': { name: 'Indonesia', code: '62', flag: '🇮🇩' }, 'IR': { name: 'Iran', code: '98', flag: '🇮🇷' },
  'IQ': { name: 'Iraq', code: '964', flag: '🇮🇶' }, 'IE': { name: 'Ireland', code: '353', flag: '🇮🇪' },
  'IL': { name: 'Israel', code: '972', flag: '🇮🇱' }, 'IT': { name: 'Italy', code: '39', flag: '🇮🇹' },
  'JM': { name: 'Jamaica', code: '1876', flag: '🇯🇲' }, 'JP': { name: 'Japan', code: '81', flag: '🇯🇵' },
  'JO': { name: 'Jordan', code: '962', flag: '🇯🇴' }, 'KZ': { name: 'Kazakhstan', code: '7', flag: '🇰🇿' },
  'KE': { name: 'Kenya', code: '254', flag: '🇰🇪' }, 'KI': { name: 'Kiribati', code: '686', flag: '🇰🇮' },
  'KP': { name: 'North Korea', code: '850', flag: '🇰🇵' }, 'KR': { name: 'South Korea', code: '82', flag: '🇰🇷' },
  'KW': { name: 'Kuwait', code: '965', flag: '🇰🇼' }, 'KG': { name: 'Kyrgyzstan', code: '996', flag: '🇰🇬' },
  'LA': { name: 'Laos', code: '856', flag: '🇱🇦' }, 'LV': { name: 'Latvia', code: '371', flag: '🇱🇻' },
  'LB': { name: 'Lebanon', code: '961', flag: '🇱🇧' }, 'LS': { name: 'Lesotho', code: '266', flag: '🇱🇸' },
  'LR': { name: 'Liberia', code: '231', flag: '🇱🇷' }, 'LY': { name: 'Libya', code: '218', flag: '🇱🇾' },
  'LI': { name: 'Liechtenstein', code: '423', flag: '🇱🇮' }, 'LT': { name: 'Lithuania', code: '370', flag: '🇱🇹' },
  'LU': { name: 'Luxembourg', code: '352', flag: '🇱🇺' }, 'MO': { name: 'Macau', code: '853', flag: '🇲🇴' },
  'MK': { name: 'North Macedonia', code: '389', flag: '🇲🇰' }, 'MG': { name: 'Madagascar', code: '261', flag: '🇲🇬' },
  'MW': { name: 'Malawi', code: '265', flag: '🇲🇼' }, 'MY': { name: 'Malaysia', code: '60', flag: '🇲🇾' },
  'MV': { name: 'Maldives', code: '960', flag: '🇲🇻' }, 'ML': { name: 'Mali', code: '223', flag: '🇲🇱' },
  'MT': { name: 'Malta', code: '356', flag: '🇲🇹' }, 'MH': { name: 'Marshall Islands', code: '692', flag: '🇲🇭' },
  'MQ': { name: 'Martinique', code: '596', flag: '🇲🇶' }, 'MR': { name: 'Mauritania', code: '222', flag: '🇲🇷' },
  'MU': { name: 'Mauritius', code: '230', flag: '🇲🇺' }, 'YT': { name: 'Mayotte', code: '262', flag: '🇾🇹' },
  'MX': { name: 'Mexico', code: '52', flag: '🇲🇽' }, 'FM': { name: 'Micronesia', code: '691', flag: '🇫🇲' },
  'MD': { name: 'Moldova', code: '373', flag: '🇲🇩' }, 'MC': { name: 'Monaco', code: '377', flag: '🇲🇨' },
  'MN': { name: 'Mongolia', code: '976', flag: '🇲🇳' }, 'ME': { name: 'Montenegro', code: '382', flag: '🇲🇪' },
  'MS': { name: 'Montserrat', code: '1664', flag: '🇲🇸' }, 'MA': { name: 'Morocco', code: '212', flag: '🇲🇦' },
  'MZ': { name: 'Mozambique', code: '258', flag: '🇲🇿' }, 'MM': { name: 'Myanmar', code: '95', flag: '🇲🇲' },
  'NA': { name: 'Namibia', code: '264', flag: '🇳🇦' }, 'NR': { name: 'Nauru', code: '674', flag: '🇳🇷' },
  'NP': { name: 'Nepal', code: '977', flag: '🇳🇵' }, 'NL': { name: 'Netherlands', code: '31', flag: '🇳🇱' },
  'NC': { name: 'New Caledonia', code: '687', flag: '🇳🇨' }, 'NZ': { name: 'New Zealand', code: '64', flag: '🇳🇿' },
  'NI': { name: 'Nicaragua', code: '505', flag: '🇳🇮' }, 'NE': { name: 'Niger', code: '227', flag: '🇳🇪' },
  'NG': { name: 'Nigeria', code: '234', flag: '🇳🇬' }, 'NU': { name: 'Niue', code: '683', flag: '🇳🇺' },
  'NF': { name: 'Norfolk Island', code: '672', flag: '🇳🇫' }, 'MP': { name: 'Northern Mariana Islands', code: '1670', flag: '🇲🇵' },
  'NO': { name: 'Norway', code: '47', flag: '🇳🇴' }, 'OM': { name: 'Oman', code: '968', flag: '🇴🇲' },
  'PK': { name: 'Pakistan', code: '92', flag: '🇵🇰' }, 'PW': { name: 'Palau', code: '680', flag: '🇵🇼' },
  'PS': { name: 'Palestine', code: '970', flag: '🇵🇸' }, 'PA': { name: 'Panama', code: '507', flag: '🇵🇦' },
  'PG': { name: 'Papua New Guinea', code: '675', flag: '🇵🇬' }, 'PY': { name: 'Paraguay', code: '595', flag: '🇵🇾' },
  'PE': { name: 'Peru', code: '51', flag: '🇵🇪' }, 'PH': { name: 'Philippines', code: '63', flag: '🇵🇭' },
  'PL': { name: 'Poland', code: '48', flag: '🇵🇱' }, 'PT': { name: 'Portugal', code: '351', flag: '🇵🇹' },
  'PR': { name: 'Puerto Rico', code: '1', flag: '🇵🇷' }, 'QA': { name: 'Qatar', code: '974', flag: '🇶🇦' },
  'RE': { name: 'Reunion', code: '262', flag: '🇷🇪' }, 'RO': { name: 'Romania', code: '40', flag: '🇷🇴' },
  'RU': { name: 'Russia', code: '7', flag: '🇷🇺' }, 'RW': { name: 'Rwanda', code: '250', flag: '🇷🇼' },
  'WS': { name: 'Samoa', code: '685', flag: '🇼🇸' }, 'SM': { name: 'San Marino', code: '378', flag: '🇸🇲' },
  'ST': { name: 'Sao Tome and Principe', code: '239', flag: '🇸🇹' }, 'SA': { name: 'Saudi Arabia', code: '966', flag: '🇸🇦' },
  'SN': { name: 'Senegal', code: '221', flag: '🇸🇳' }, 'RS': { name: 'Serbia', code: '381', flag: '🇷🇸' },
  'SC': { name: 'Seychelles', code: '248', flag: '🇸🇨' }, 'SL': { name: 'Sierra Leone', code: '232', flag: '🇸🇱' },
  'SG': { name: 'Singapore', code: '65', flag: '🇸🇬' }, 'SK': { name: 'Slovakia', code: '421', flag: '🇸🇰' },
  'SI': { name: 'Slovenia', code: '386', flag: '🇸🇮' }, 'SB': { name: 'Solomon Islands', code: '677', flag: '🇸🇧' },
  'SO': { name: 'Somalia', code: '252', flag: '🇸🇴' }, 'ZA': { name: 'South Africa', code: '27', flag: '🇿🇦' },
  'ES': { name: 'Spain', code: '34', flag: '🇪🇸' }, 'LK': { name: 'Sri Lanka', code: '94', flag: '🇱🇰' },
  'SD': { name: 'Sudan', code: '249', flag: '🇸🇩' }, 'SR': { name: 'Suriname', code: '597', flag: '🇸🇷' },
  'SZ': { name: 'Eswatini', code: '268', flag: '🇸🇿' }, 'SE': { name: 'Sweden', code: '46', flag: '🇸🇪' },
  'CH': { name: 'Switzerland', code: '41', flag: '🇨🇭' }, 'SY': { name: 'Syria', code: '963', flag: '🇸🇾' },
  'TW': { name: 'Taiwan', code: '886', flag: '🇹🇼' }, 'TJ': { name: 'Tajikistan', code: '992', flag: '🇹🇯' },
  'TZ': { name: 'Tanzania', code: '255', flag: '🇹🇿' }, 'TH': { name: 'Thailand', code: '66', flag: '🇹🇭' },
  'TL': { name: 'Timor-Leste', code: '670', flag: '🇹🇱' }, 'TG': { name: 'Togo', code: '228', flag: '🇹🇬' },
  'TO': { name: 'Tonga', code: '676', flag: '🇹🇴' }, 'TT': { name: 'Trinidad and Tobago', code: '1868', flag: '🇹🇹' },
  'TN': { name: 'Tunisia', code: '216', flag: '🇹🇳' }, 'TR': { name: 'Turkey', code: '90', flag: '🇹🇷' },
  'TM': { name: 'Turkmenistan', code: '993', flag: '🇹🇲' }, 'TC': { name: 'Turks and Caicos Islands', code: '1649', flag: '🇹🇨' },
  'TV': { name: 'Tuvalu', code: '688', flag: '🇹🇻' }, 'UG': { name: 'Uganda', code: '256', flag: '🇺🇬' },
  'UA': { name: 'Ukraine', code: '380', flag: '🇺🇦' }, 'AE': { name: 'United Arab Emirates', code: '971', flag: '🇦🇪' },
  'GB': { name: 'United Kingdom', code: '44', flag: '🇬🇧' }, 'US': { name: 'United States', code: '1', flag: '🇺🇸' },
  'UY': { name: 'Uruguay', code: '598', flag: '🇺🇾' }, 'UZ': { name: 'Uzbekistan', code: '998', flag: '🇺🇿' },
  'VU': { name: 'Vanuatu', code: '678', flag: '🇻🇺' }, 'VA': { name: 'Vatican City', code: '39', flag: '🇻🇦' },
  'VE': { name: 'Venezuela', code: '58', flag: '🇻🇪' }, 'VN': { name: 'Vietnam', code: '84', flag: '🇻🇳' },
  'WF': { name: 'Wallis and Futuna', code: '681', flag: '🇼🇫' }, 'YE': { name: 'Yemen', code: '967', flag: '🇾🇪' },
  'ZM': { name: 'Zambia', code: '260', flag: '🇿🇲' }, 'ZW': { name: 'Zimbabwe', code: '263', flag: '🇿🇼' }
};

// ========== DATABASE PATHS ==========
const USERS_FILE = path.join(__dirname, 'users.json');
const GROUPS_FILE = path.join(__dirname, 'grup.json');
const FILES_DIR = config.FILES_DIR || './files';
const SETTINGS_FILE = path.join(__dirname, 'settings.js');
const LOCK_FILE = path.join(__dirname, 'locked_numbers.json');

if (!fs.existsSync(FILES_DIR)) fs.mkdirSync(FILES_DIR, { recursive: true });

function loadJSON(file, def) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
    return def;
  } catch (e) { return def; }
}
function saveJSON(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }

let users = loadJSON(USERS_FILE, {});
let groups = loadJSON(GROUPS_FILE, []);
let userLocks = loadJSON(LOCK_FILE, {});

let otpData = {};
const privateUsers = new Set();

function isOwner(id) {
  const ownerIds = (config.OWNER_IDS || []).map(String);
  if (ownerIds.includes(String(id))) return true;
  if (String(config.OWNER_ID) === String(id)) return true;
  return false;
}

function saveLocks() { saveJSON(LOCK_FILE, userLocks); }

function getCountryByPhone(phone) {
  let cleanPhone = phone.replace(/\D/g, '');
  let sortedCodes = Object.keys(ALL_COUNTRIES).sort((a, b) => ALL_COUNTRIES[b].code.length - ALL_COUNTRIES[a].code.length);
  for (let c of sortedCodes) {
    let code = ALL_COUNTRIES[c].code;
    if (cleanPhone.startsWith(code)) {
      if (code === '7') return { code: 'RU', name: 'Russia', codeNum: '7', flag: '🇷🇺' };
      return { code: c, name: ALL_COUNTRIES[c].name, codeNum: code, flag: ALL_COUNTRIES[c].flag || '🏳️' };
    }
  }
  return { code: 'ID', name: 'Indonesia', codeNum: '62', flag: '🇮🇩' };
}

function getCountryFiles() {
  try {
    if (!fs.existsSync(FILES_DIR)) return [];
    return fs.readdirSync(FILES_DIR).filter(f => f.endsWith('.txt')).map(f => path.basename(f, '.txt'));
  } catch (e) { return []; }
}

function findCountryFilePath(nameInput) {
  try {
    if (!fs.existsSync(FILES_DIR)) return null;
    let files = fs.readdirSync(FILES_DIR).filter(f => f.endsWith('.txt'));
    let target = nameInput.trim().toLowerCase();
    let found = files.find(f => path.basename(f, '.txt').toLowerCase() === target);
    if (found) return path.join(FILES_DIR, found);
    return path.join(FILES_DIR, nameInput.trim() + '.txt');
  } catch (e) {
    return path.join(FILES_DIR, nameInput.trim() + '.txt');
  }
}

function getNumbers(country) {
  let file = findCountryFilePath(country);
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').map(n => n.trim()).filter(n => n);
}

function getLockedByOthers(currentUserId) {
  let set = new Set();
  for (let uid in userLocks) {
    if (String(uid) === String(currentUserId)) continue;
    let nums = userLocks[uid].numbers || [];
    nums.forEach(n => set.add(n.replace(/\D/g, '')));
  }
  return set;
}

function getAvaila
