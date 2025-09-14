
// script.js — volledige versie met flag-generator en robuuste clipboard fallback

// Helper to build a flag emoji from an ISO 3166-1 alpha-2 country code
function countryFlagEmoji(code){
  if(!code || code.length !== 2) return '';
  const A = 0x1F1E6;
  const chars = [...code.toUpperCase()].map(c => A + c.charCodeAt(0) - 65);
  return String.fromCodePoint(...chars);
}

// Core symbol dataset (your existing symbols)
const SYMBOLS = [
  // Hearts
  {ch: "❤", name: "Heart", cat: "Hearts"},
  {ch: "💖", name: "Sparkling Heart", cat: "Hearts"},
  {ch: "💘", name: "Heart with Arrow", cat: "Hearts"},
  {ch: "❥", name: "Decorative Heart", cat: "Hearts"},
  {ch: "💕", name: "Two Hearts", cat: "Hearts"},

  // Marks
  {ch: "✔", name: "Check", cat: "Marks"},
  {ch: "✖", name: "Cross", cat: "Marks"},
  {ch: "✳", name: "Eight Spoked Asterisk", cat: "Marks"},
  {ch: "✴", name: "Eight Pointed Star", cat: "Marks"},
  {ch: "✱", name: "Star Asterisk", cat: "Marks"},

  // Stars
  {ch: "★", name: "Star", cat: "Stars"},
  {ch: "☆", name: "Outlined Star", cat: "Stars"},
  {ch: "✦", name: "Small Star", cat: "Stars"},
  {ch: "✶", name: "Spark Star", cat: "Stars"},
  {ch: "🌟", name: "Glowing Star", cat: "Stars"},

  // Arrows
  {ch: "➤", name: "Arrow Right", cat: "Arrows"},
  {ch: "➜", name: "Arrow Thick", cat: "Arrows"},
  {ch: "⇨", name: "Double Arrow", cat: "Arrows"},
  {ch: "←", name: "Left Arrow", cat: "Arrows"},
  {ch: "⇄", name: "Swap Arrows", cat: "Arrows"},

  // Nature
  {ch: "☀", name: "Sun", cat: "Nature"},
  {ch: "☂", name: "Umbrella", cat: "Nature"},
  {ch: "☘", name: "Shamrock", cat: "Nature"},
  {ch: "🕊", name: "Dove", cat: "Nature"},
  {ch: "🌿", name: "Leaf", cat: "Nature"},
  {ch: "🌸", name: "Blossom", cat: "Nature"},
  {ch: "🌙", name: "Crescent Moon", cat: "Nature"},
  {ch: "🌊", name: "Wave", cat: "Nature"},

  // Faces
  {ch: "☺", name: "Smiley", cat: "Faces"},
  {ch: "☹", name: "Frowny", cat: "Faces"},
  {ch: "😊", name: "Happy Face", cat: "Faces"},
  {ch: "😎", name: "Sunglasses", cat: "Faces"},
  {ch: "🤔", name: "Thinking", cat: "Faces"},

  // Misc
  {ch: "⚑", name: "Flag", cat: "Misc"},
  {ch: "✿", name: "Flower", cat: "Misc"},
  {ch: "♫", name: "Music Note", cat: "Misc"},
  {ch: "☮", name: "Peace", cat: "Misc"},
  {ch: "🔒", name: "Lock", cat: "Misc"},

  // Currency
  {ch: "₪", name: "Shekel", cat: "Currency"},
  {ch: "€", name: "Euro", cat: "Currency"},
  {ch: "¥", name: "Yen", cat: "Currency"},
  {ch: "$", name: "Dollar", cat: "Currency"},
  {ch: "£", name: "Pound", cat: "Currency"},

  // Symbols
  {ch: "☯", name: "Yin Yang", cat: "Symbols"},
  {ch: "♻", name: "Recycle", cat: "Symbols"},
  {ch: "⚡", name: "Lightning", cat: "Symbols"},
  {ch: "∞", name: "Infinity", cat: "Symbols"},
  {ch: "※", name: "Reference Mark", cat: "Symbols"},

  // Zodiac
  {ch: "♈", name: "Aries", cat: "Zodiac"},
  {ch: "♉", name: "Taurus", cat: "Zodiac"},
  {ch: "♊", name: "Gemini", cat: "Zodiac"},
  {ch: "♋", name: "Cancer", cat: "Zodiac"},
  {ch: "♌", name: "Leo", cat: "Zodiac"},

  // Tech
  {ch: "⇪", name: "Caps Lock", cat: "Tech"},
  {ch: "⌘", name: "Command", cat: "Tech"},
  {ch: "⌥", name: "Option", cat: "Tech"},
  {ch: "⚙", name: "Gear", cat: "Tech"},
  {ch: "⌫", name: "Backspace", cat: "Tech"},

  // Weather
  {ch: "☁", name: "Cloud", cat: "Weather"},
  {ch: "❄", name: "Snowflake", cat: "Weather"},
  {ch: "🌩", name: "Thunder Cloud", cat: "Weather"},
  {ch: "🌤", name: "Sun Behind Cloud", cat: "Weather"},

  // Shapes
  {ch: "■", name: "Black Square", cat: "Shapes"},
  {ch: "□", name: "White Square", cat: "Shapes"},
  {ch: "▲", name: "Black Triangle", cat: "Shapes"},
  {ch: "●", name: "Black Circle", cat: "Shapes"},

  // Math & Logic
  {ch: "±", name: "Plus-Minus", cat: "Math"},
  {ch: "≈", name: "Approximately", cat: "Math"},
  {ch: "÷", name: "Division", cat: "Math"},
  {ch: "×", name: "Multiplication", cat: "Math"},
  {ch: "∑", name: "Summation", cat: "Math"},

  // Food
  {ch: "🍕", name: "Pizza", cat: "Food"},
  {ch: "🍎", name: "Apple", cat: "Food"},
  {ch: "☕", name: "Coffee", cat: "Food"},
  {ch: "🍰", name: "Cake", cat: "Food"},

  // Animals
  {ch: "🐶", name: "Dog", cat: "Animals"},
  {ch: "🐱", name: "Cat", cat: "Animals"},
  {ch: "🦊", name: "Fox", cat: "Animals"},
  {ch: "🦁", name: "Lion", cat: "Animals"},

  // Transport
  {ch: "✈", name: "Plane", cat: "Transport"},
  {ch: "🚗", name: "Car", cat: "Transport"},
  {ch: "⚓", name: "Anchor", cat: "Transport"},

  // Music & Sound
  {ch: "♪", name: "Eighth Note", cat: "Music"},
  {ch: "♫", name: "Beamed Note", cat: "Music"},
  {ch: "🎵", name: "Musical Note", cat: "Music"},

  // UI / Misc icons
  {ch: "🔍", name: "Search", cat: "UI"},
  {ch: "🔔", name: "Bell", cat: "UI"},
  {ch: "📎", name: "Paperclip", cat: "UI"},
  {ch: "📁", name: "Folder", cat: "UI"},

  // Placeholder flags (will be replaced by generated flags)
  {ch: "🏳️", name: "White Flag", cat: "Flags"},
  {ch: "🏴", name: "Black Flag", cat: "Flags"},
  {ch: "🏁", name: "Chequered Flag", cat: "Flags"},

  // Extra decorative
  {ch: "✧", name: "Star Outline", cat: "Decorative"},
  {ch: "✽", name: "Floral Asterisk", cat: "Decorative"},
  {ch: "❂", name: "Sunburst", cat: "Decorative"},

  // Fallback generic
  {ch: "?", name: "Unknown", cat: "Misc"},
  {ch: "‎ ", name: "Invisible Character", cat: "Misc"}
];

// Compact country list (ISO alpha-2 + display name) — many countries included
const COUNTRY_DATA = [
  {code:"AF", name:"Afghanistan"},
  {code:"AL", name:"Albania"},
  {code:"DZ", name:"Algeria"},
  {code:"AS", name:"American Samoa"},
  {code:"AD", name:"Andorra"},
  {code:"AO", name:"Angola"},
  {code:"AI", name:"Anguilla"},
  {code:"AQ", name:"Antarctica"},
  {code:"AG", name:"Antigua & Barbuda"},
  {code:"AR", name:"Argentina"},
  {code:"AM", name:"Armenia"},
  {code:"AW", name:"Aruba"},
  {code:"AU", name:"Australia"},
  {code:"AT", name:"Austria"},
  {code:"AZ", name:"Azerbaijan"},
  {code:"BS", name:"Bahamas"},
  {code:"BH", name:"Bahrain"},
  {code:"BD", name:"Bangladesh"},
  {code:"BB", name:"Barbados"},
  {code:"BY", name:"Belarus"},
  {code:"BE", name:"Belgium"},
  {code:"BZ", name:"Belize"},
  {code:"BJ", name:"Benin"},
  {code:"BM", name:"Bermuda"},
  {code:"BT", name:"Bhutan"},
  {code:"BO", name:"Bolivia"},
  {code:"BA", name:"Bosnia & Herzegovina"},
  {code:"BW", name:"Botswana"},
  {code:"BR", name:"Brazil"},
  {code:"IO", name:"British Indian Ocean Territory"},
  {code:"VG", name:"British Virgin Islands"},
  {code:"BN", name:"Brunei"},
  {code:"BG", name:"Bulgaria"},
  {code:"BF", name:"Burkina Faso"},
  {code:"BI", name:"Burundi"},
  {code:"KH", name:"Cambodia"},
  {code:"CM", name:"Cameroon"},
  {code:"CA", name:"Canada"},
  {code:"CV", name:"Cape Verde"},
  {code:"KY", name:"Cayman Islands"},
  {code:"CF", name:"Central African Republic"},
  {code:"TD", name:"Chad"},
  {code:"CL", name:"Chile"},
  {code:"CN", name:"China"},
  {code:"HK", name:"Hong Kong SAR"},
  {code:"MO", name:"Macau SAR"},
  {code:"CX", name:"Christmas Island"},
  {code:"CC", name:"Cocos (Keeling) Islands"},
  {code:"CO", name:"Colombia"},
  {code:"KM", name:"Comoros"},
  {code:"CG", name:"Congo - Brazzaville"},
  {code:"CD", name:"Congo - Kinshasa"},
  {code:"CK", name:"Cook Islands"},
  {code:"CR", name:"Costa Rica"},
  {code:"CI", name:"Côte d’Ivoire"},
  {code:"HR", name:"Croatia"},
  {code:"CU", name:"Cuba"},
  {code:"CW", name:"Curaçao"},
  {code:"CY", name:"Cyprus"},
  {code:"CZ", name:"Czechia"},
  {code:"DK", name:"Denmark"},
  {code:"DJ", name:"Djibouti"},
  {code:"DM", name:"Dominica"},
  {code:"DO", name:"Dominican Republic"},
  {code:"EC", name:"Ecuador"},
  {code:"EG", name:"Egypt"},
  {code:"SV", name:"El Salvador"},
  {code:"GQ", name:"Equatorial Guinea"},
  {code:"ER", name:"Eritrea"},
  {code:"EE", name:"Estonia"},
  {code:"SZ", name:"Eswatini"},
  {code:"ET", name:"Ethiopia"},
  {code:"FK", name:"Falkland Islands"},
  {code:"FO", name:"Faroe Islands"},
  {code:"FJ", name:"Fiji"},
  {code:"FI", name:"Finland"},
  {code:"FR", name:"France"},
  {code:"GF", name:"French Guiana"},
  {code:"PF", name:"French Polynesia"},
  {code:"TF", name:"French Southern Territories"},
  {code:"GA", name:"Gabon"},
  {code:"GM", name:"Gambia"},
  {code:"GE", name:"Georgia"},
  {code:"DE", name:"Germany"},
  {code:"GH", name:"Ghana"},
  {code:"GI", name:"Gibraltar"},
  {code:"GR", name:"Greece"},
  {code:"GL", name:"Greenland"},
  {code:"GD", name:"Grenada"},
  {code:"GP", name:"Guadeloupe"},
  {code:"GU", name:"Guam"},
  {code:"GT", name:"Guatemala"},
  {code:"GG", name:"Guernsey"},
  {code:"GN", name:"Guinea"},
  {code:"GW", name:"Guinea-Bissau"},
  {code:"GY", name:"Guyana"},
  {code:"HT", name:"Haiti"},
  {code:"HN", name:"Honduras"},
  {code:"HU", name:"Hungary"},
  {code:"IS", name:"Iceland"},
  {code:"IN", name:"India"},
  {code:"ID", name:"Indonesia"},
  {code:"IR", name:"Iran"},
  {code:"IQ", name:"Iraq"},
  {code:"IE", name:"Ireland"},
  {code:"IM", name:"Isle of Man"},
  {code:"IL", name:"Israel"},
  {code:"IT", name:"Italy"},
  {code:"JM", name:"Jamaica"},
  {code:"JP", name:"Japan"},
  {code:"JE", name:"Jersey"},
  {code:"JO", name:"Jordan"},
  {code:"KZ", name:"Kazakhstan"},
  {code:"KE", name:"Kenya"},
  {code:"KI", name:"Kiribati"},
  {code:"KP", name:"North Korea"},
  {code:"KR", name:"South Korea"},
  {code:"KW", name:"Kuwait"},
  {code:"KG", name:"Kyrgyzstan"},
  {code:"LA", name:"Laos"},
  {code:"LV", name:"Latvia"},
  {code:"LB", name:"Lebanon"},
  {code:"LS", name:"Lesotho"},
  {code:"LR", name:"Liberia"},
  {code:"LY", name:"Libya"},
  {code:"LI", name:"Liechtenstein"},
  {code:"LT", name:"Lithuania"},
  {code:"LU", name:"Luxembourg"},
  {code:"MG", name:"Madagascar"},
  {code:"MW", name:"Malawi"},
  {code:"MY", name:"Malaysia"},
  {code:"MV", name:"Maldives"},
  {code:"ML", name:"Mali"},
  {code:"MT", name:"Malta"},
  {code:"MH", name:"Marshall Islands"},
  {code:"MQ", name:"Martinique"},
  {code:"MR", name:"Mauritania"},
  {code:"MU", name:"Mauritius"},
  {code:"YT", name:"Mayotte"},
  {code:"MX", name:"Mexico"},
  {code:"FM", name:"Micronesia"},
  {code:"MD", name:"Moldova"},
  {code:"MC", name:"Monaco"},
  {code:"MN", name:"Mongolia"},
  {code:"ME", name:"Montenegro"},
  {code:"MS", name:"Montserrat"},
  {code:"MA", name:"Morocco"},
  {code:"MZ", name:"Mozambique"},
  {code:"MM", name:"Myanmar"},
  {code:"NA", name:"Namibia"},
  {code:"NR", name:"Nauru"},
  {code:"NP", name:"Nepal"},
  {code:"NL", name:"Netherlands"},
  {code:"NC", name:"New Caledonia"},
  {code:"NZ", name:"New Zealand"},
  {code:"NI", name:"Nicaragua"},
  {code:"NE", name:"Niger"},
  {code:"NG", name:"Nigeria"},
  {code:"NU", name:"Niue"},
  {code:"NF", name:"Norfolk Island"},
  {code:"MK", name:"North Macedonia"},
  {code:"MP", name:"Northern Mariana Islands"},
  {code:"NO", name:"Norway"},
  {code:"OM", name:"Oman"},
  {code:"PK", name:"Pakistan"},
  {code:"PW", name:"Palau"},
  {code:"PS", name:"Palestine"},
  {code:"PA", name:"Panama"},
  {code:"PG", name:"Papua New Guinea"},
  {code:"PY", name:"Paraguay"},
  {code:"PE", name:"Peru"},
  {code:"PH", name:"Philippines"},
  {code:"PN", name:"Pitcairn Islands"},
  {code:"PL", name:"Poland"},
  {code:"PT", name:"Portugal"},
  {code:"PR", name:"Puerto Rico"},
  {code:"QA", name:"Qatar"},
  {code:"RE", name:"Réunion"},
  {code:"RO", name:"Romania"},
  {code:"RU", name:"Russia"},
  {code:"RW", name:"Rwanda"},
  {code:"BL", name:"Saint Barthélemy"},
  {code:"SH", name:"Saint Helena"},
  {code:"KN", name:"Saint Kitts & Nevis"},
  {code:"LC", name:"Saint Lucia"},
  {code:"MF", name:"Saint Martin (French)"},
  {code:"PM", name:"Saint Pierre & Miquelon"},
  {code:"VC", name:"Saint Vincent & the Grenadines"},
  {code:"WS", name:"Samoa"},
  {code:"SM", name:"San Marino"},
  {code:"ST", name:"São Tomé & Príncipe"},
  {code:"SA", name:"Saudi Arabia"},
  {code:"SN", name:"Senegal"},
  {code:"RS", name:"Serbia"},
  {code:"SC", name:"Seychelles"},
  {code:"SL", name:"Sierra Leone"},
  {code:"SG", name:"Singapore"},
  {code:"SX", name:"Sint Maarten"},
  {code:"SK", name:"Slovakia"},
  {code:"SI", name:"Slovenia"},
  {code:"SB", name:"Solomon Islands"},
  {code:"SO", name:"Somalia"},
  {code:"ZA", name:"South Africa"},
  {code:"SS", name:"South Sudan"},
  {code:"ES", name:"Spain"},
  {code:"LK", name:"Sri Lanka"},
  {code:"SD", name:"Sudan"},
  {code:"SR", name:"Suriname"},
  {code:"SJ", name:"Svalbard & Jan Mayen"},
  {code:"SE", name:"Sweden"},
  {code:"CH", name:"Switzerland"},
  {code:"SY", name:"Syria"},
  {code:"TW", name:"Taiwan"},
  {code:"TJ", name:"Tajikistan"},
  {code:"TZ", name:"Tanzania"},
  {code:"TH", name:"Thailand"},
  {code:"TL", name:"Timor-Leste"},
  {code:"TG", name:"Togo"},
  {code:"TK", name:"Tokelau"},
  {code:"TO", name:"Tonga"},
  {code:"TT", name:"Trinidad & Tobago"},
  {code:"TN", name:"Tunisia"},
  {code:"TR", name:"Turkey"},
  {code:"TM", name:"Turkmenistan"},
  {code:"TC", name:"Turks & Caicos Islands"},
  {code:"TV", name:"Tuvalu"},
  {code:"UG", name:"Uganda"},
  {code:"UA", name:"Ukraine"},
  {code:"AE", name:"United Arab Emirates"},
  {code:"GB", name:"United Kingdom"},
  {code:"US", name:"United States"},
  {code:"UM", name:"U.S. Minor Outlying Islands"},
  {code:"UY", name:"Uruguay"},
  {code:"UZ", name:"Uzbekistan"},
  {code:"VU", name:"Vanuatu"},
  {code:"VA", name:"Vatican City"},
  {code:"VE", name:"Venezuela"},
  {code:"VN", name:"Vietnam"},
  {code:"VI", name:"U.S. Virgin Islands"},
  {code:"WF", name:"Wallis & Futuna"},
  {code:"EH", name:"Western Sahara"},
  {code:"YE", name:"Yemen"},
  {code:"ZM", name:"Zambia"},
  {code:"ZW", name:"Zimbabwe"}
];

// Generate flag symbols and append to SYMBOLS (replace placeholders)
(function appendFlags(){
  const flags = COUNTRY_DATA.map(c => ({ ch: countryFlagEmoji(c.code), name: c.name, cat: "Flags" }));
  // remove placeholder flags
  for(let i = SYMBOLS.length - 1; i >= 0; i--){
    if(SYMBOLS[i].cat === 'Flags' && /White Flag|Black Flag|Chequered Flag/.test(SYMBOLS[i].name)){
      SYMBOLS.splice(i,1);
    }
  }
  flags.forEach(f => SYMBOLS.push(f));
})();

// DOM elements
const grid = document.getElementById('grid');
const search = document.getElementById('search');
const categoriesEl = document.getElementById('categories');
const countsEl = document.getElementById('counts');

const modal = document.getElementById('modal');
const modalChar = document.getElementById('modal-char');
const modalName = document.getElementById('modal-name');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');
const modalCopyIcon = document.getElementById('modal-copy-icon');
const modalDownloadIcon = document.getElementById('modal-download-icon');

let activeCategory = null;
let currentList = SYMBOLS.slice();
let modalCurrent = null;

// Helpers
function uniqueCategories(list){
  return Array.from(new Set(list.map(i=>i.cat))).sort();
}

function renderCategories(){
  const cats = uniqueCategories(SYMBOLS);
  categoriesEl.innerHTML = '';
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All';
  allBtn.classList.add('active');
  allBtn.addEventListener('click', ()=>{ activeCategory=null; updateActiveCategory(); filterAndRender(); });
  categoriesEl.appendChild(allBtn);

  cats.forEach(cat=>{
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.addEventListener('click', ()=>{ activeCategory = cat; updateActiveCategory(); filterAndRender(); });
    categoriesEl.appendChild(btn);
  });
}

function updateActiveCategory(){
  Array.from(categoriesEl.children).forEach(btn=>{
    btn.classList.toggle('active', btn.textContent === (activeCategory || 'All'));
  });
}

// SVG icon helpers
function copyIconSVG(){
  return `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <rect x="9" y="4" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"></rect>
    <rect x="4" y="8" width="11" height="14" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"></rect>
  </svg>`;
}
function checkIconSVG(){
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
function downloadIconSVG(){
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M12 3v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M8 11l4 4 4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 21H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// Toast feedback (simple)
function showToast(message, success = true, timeout = 1400){
  let existing = document.querySelector('.symbol-toast');
  if(existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'symbol-toast' + (success ? ' toast-success' : '');
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(()=> t.classList.add('visible'), 10);
  setTimeout(()=> { t.classList.remove('visible'); setTimeout(()=> t.remove(), 260); }, timeout);
}

// Robust clipboard write (modern API + fallback)
async function writeTextToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    try{
      await navigator.clipboard.writeText(text);
      return true;
    }catch(err){
      // fallthrough to legacy fallback
    }
  }
  try{
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.setAttribute('aria-hidden', 'true');
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  }catch(e){
    return false;
  }
}

// Card rendering
function renderCard(item){
  const card = document.createElement('div');
  card.className = 'card';
  const ch = document.createElement('div');
  ch.className = 'char';
  ch.textContent = item.ch;
  // If it's a flag, add a flag-specific class so CSS can force color emoji font
  if(item.cat === 'Flags') ch.classList.add('flag');

  const nm = document.createElement('div'); nm.className='name'; nm.textContent = item.name;
  const actions = document.createElement('div'); actions.className='actions';

  const previewBtn = document.createElement('button');
  previewBtn.className = 'btn preview';
  previewBtn.textContent = 'Preview';
  previewBtn.setAttribute('aria-label', `Preview ${item.name}`);
  previewBtn.addEventListener('click', ()=> openModal(item));

  const copyBtn = document.createElement('button');
  copyBtn.className = 'btn copy-icon';
  copyBtn.setAttribute('aria-label', `Copy ${item.name}`);
  copyBtn.innerHTML = copyIconSVG();
  copyBtn.addEventListener('click', (e)=> { e.stopPropagation(); copyIconSymbol(item.ch, copyBtn); });

  actions.appendChild(previewBtn);
  actions.appendChild(copyBtn);

  card.appendChild(ch); card.appendChild(nm); card.appendChild(actions);
  return card;
}

function renderGrid(list){
  grid.innerHTML = '';
  if(list.length === 0){
    grid.innerHTML = `<p style="color:var(--muted)">No results found.</p>`;
    countsEl.textContent = '0 symbols';
    return;
  }
  const frag = document.createDocumentFragment();
  list.forEach(item => frag.appendChild(renderCard(item)));
  grid.appendChild(frag);
  countsEl.textContent = `${list.length} ${list.length === 1 ? 'symbol' : 'symbols'}`;
}

// Filtering
function filterAndRender(){
  const q = search.value.trim().toLowerCase();
  currentList = SYMBOLS.filter(s=>{
    const matchesCat = activeCategory ? s.cat === activeCategory : true;
    const matchesQuery = q === '' || s.name.toLowerCase().includes(q) || s.ch.includes(q);
    return matchesCat && matchesQuery;
  });
  renderGrid(currentList);
}

// Copy icon action
async function copyIconSymbol(text, btn){
  const ok = await writeTextToClipboard(text);
  if(ok){
    const old = btn.innerHTML;
    btn.innerHTML = checkIconSVG();
    btn.classList.add('copied-temp');
    showToast('Copied to clipboard', true);
    setTimeout(()=> {
      btn.innerHTML = old;
      btn.classList.remove('copied-temp');
    }, 900);
  }else{
    showToast('Copy failed — try manual copying', false);
  }
}

/* Modal preview & download */
function openModal(item){
  modalCurrent = item;
  modalChar.textContent = item.ch;
  // ensure modal character also has flag class if appropriate
  if(modalChar && item.cat === 'Flags') modalChar.classList.add('flag'); else if(modalChar) modalChar.classList.remove('flag');

  modalName.textContent = item.name + ' - ' + item.cat;
  modalTitle.textContent = item.name;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');

  const scrollWrap = modal.querySelector('.scroll-wrap');
  if(scrollWrap) scrollWrap.scrollTop = 0;

  if(modalCopyIcon){
    modalCopyIcon.innerHTML = copyIconSVG();
    modalCopyIcon.classList.remove('success');
  }
  if(modalDownloadIcon){
    modalDownloadIcon.innerHTML = downloadIconSVG();
  }
  modalClose.focus();
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  modalCurrent = null;
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal || e.target.classList.contains('modal-overlay')) closeModal(); });

async function modalCopyAction(){
  if(!modalCurrent) return;
  const ok = await writeTextToClipboard(modalCurrent.ch);
  if(ok){
    modalCopyIcon.innerHTML = checkIconSVG();
    modalCopyIcon.classList.add('success');
    showToast('Copied to clipboard', true);
    setTimeout(()=> {
      modalCopyIcon.innerHTML = copyIconSVG();
      modalCopyIcon.classList.remove('success');
    }, 1100);
  }else{
    showToast('Copy failed — try manual copying', false);
  }
}

function modalDownloadAction(){
  if(!modalCurrent) return;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#071229';
  ctx.fillRect(0,0,size,size);
  ctx.fillStyle = '#ffffff';
  ctx.font = `${size * 0.6}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(modalCurrent.ch, size/2, size/2);
  const link = document.createElement('a');
  link.download = `${modalCurrent.name.replace(/\s+/g,'_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

if(modalCopyIcon) modalCopyIcon.addEventListener('click', modalCopyAction);
if(modalDownloadIcon) modalDownloadIcon.addEventListener('click', modalDownloadAction);

// Search interactions & keyboard
search.addEventListener('input', debounce(filterAndRender, 180));
document.addEventListener('keydown', (e)=> { if(e.key === 'Escape') closeModal(); });

// debounce
function debounce(fn, ms){
  let t;
  return (...args)=>{ clearTimeout(t); t = setTimeout(()=> fn(...args), ms); }
}

// Init
renderCategories();
filterAndRender();

