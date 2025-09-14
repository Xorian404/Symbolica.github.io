// Complete script.js with an expanded symbol dataset (English UI, static modal symbol, short hyphen separator)

// Expanded symbol dataset — add/remove as you like
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

  // Flags & Others
  {ch: "🏳️", name: "White Flag", cat: "Flags"},
  {ch: "🏴", name: "Black Flag", cat: "Flags"},
  {ch: "🏁", name: "Chequered Flag", cat: "Flags"},

  // Extra decorative
  {ch: "✧", name: "Star Outline", cat: "Decorative"},
  {ch: "✽", name: "Floral Asterisk", cat: "Decorative"},
  {ch: "❂", name: "Sunburst", cat: "Decorative"},

  // Fallback generic
  {ch: "?", name: "Unknown", cat: "Misc"}
];

// Elements
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
  const s = new Set(list.map(i=>i.cat));
  return Array.from(s).sort();
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

// SVG helpers (icons use currentColor so CSS controls visibility)
function copyIconSVG(){ // two overlapping rounded rects
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

// Card rendering (preview centered, small copy icon)
function renderCard(item){
  const card = document.createElement('div');
  card.className = 'card';
  const ch = document.createElement('div'); ch.className='char'; ch.textContent = item.ch;
  const nm = document.createElement('div'); nm.className='name'; nm.textContent = item.name;
  const actions = document.createElement('div'); actions.className='actions';

  // Preview button centered
  const previewBtn = document.createElement('button');
  previewBtn.className = 'btn preview';
  previewBtn.textContent = 'Preview';
  previewBtn.setAttribute('aria-label', `Preview ${item.name}`);
  previewBtn.addEventListener('click', ()=> openModal(item));

  // Small copy icon button next to preview
  const copyBtn = document.createElement('button');
  copyBtn.className = 'btn copy-icon';
  copyBtn.setAttribute('aria-label', `Copy ${item.name}`);
  copyBtn.innerHTML = copyIconSVG();
  // prevent click bubbling to card/preview, copy only
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

// Filtering logic
function filterAndRender(){
  const q = search.value.trim().toLowerCase();
  currentList = SYMBOLS.filter(s=>{
    const matchesCat = activeCategory ? s.cat === activeCategory : true;
    const matchesQuery = q === '' || s.name.toLowerCase().includes(q) || s.ch.includes(q);
    return matchesCat && matchesQuery;
  });
  renderGrid(currentList);
}

// Copy from small icon button with visual feedback (icon -> check)
async function copyIconSymbol(text, btn){
  try{
    await navigator.clipboard.writeText(text);
    const old = btn.innerHTML;
    btn.innerHTML = checkIconSVG();
    btn.classList.add('copied-temp');
    setTimeout(()=> {
      btn.innerHTML = old;
      btn.classList.remove('copied-temp');
    }, 900);
  }catch(e){
    alert('Copy failed — try manual copying.');
  }
}

/* Modal preview & download */

// open modal and set modal icons
function openModal(item){
  modalCurrent = item;
  modalChar.textContent = item.ch;
  // use short hyphen between name and category as requested
  modalName.textContent = item.name + ' - ' + item.cat;
  modalTitle.textContent = item.name;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');

  // reset scroll of inner wrapper if present
  const scrollWrap = modal.querySelector('.scroll-wrap');
  if(scrollWrap) scrollWrap.scrollTop = 0;

  // initialize modal icon contents
  if(modalCopyIcon){
    modalCopyIcon.innerHTML = copyIconSVG();
    modalCopyIcon.classList.remove('success');
  }
  if(modalDownloadIcon){
    modalDownloadIcon.innerHTML = downloadIconSVG();
  }

  // focus close for easy keyboard interaction
  modalClose.focus();
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  modalCurrent = null;
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{ if(e.target === modal || e.target.classList.contains('modal-overlay')) closeModal(); });

// modal copy icon action (toggles to check and color)
async function modalCopyAction(){
  if(!modalCurrent) return;
  try{
    await navigator.clipboard.writeText(modalCurrent.ch);
    // swap icon to check & apply success class
    modalCopyIcon.innerHTML = checkIconSVG();
    modalCopyIcon.classList.add('success');
    setTimeout(()=> {
      modalCopyIcon.innerHTML = copyIconSVG();
      modalCopyIcon.classList.remove('success');
    }, 1100);
  }catch(e){
    alert('Copy failed — try manual copying.');
  }
}

// modal download action (download PNG)
function modalDownloadAction(){
  if(!modalCurrent) return;
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext('2d');
  // background
  ctx.fillStyle = '#071229';
  ctx.fillRect(0,0,size,size);
  // text
  ctx.fillStyle = '#ffffff';
  ctx.font = `${size * 0.6}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(modalCurrent.ch, size/2, size/2);
  // download
  const link = document.createElement('a');
  link.download = `${modalCurrent.name.replace(/\s+/g,'_')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

// wire modal icon buttons if present
if(modalCopyIcon){
  modalCopyIcon.addEventListener('click', modalCopyAction);
}
if(modalDownloadIcon){
  modalDownloadIcon.addEventListener('click', modalDownloadAction);
}

// Search interactions
search.addEventListener('input', debounce(filterAndRender, 180));
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') closeModal();
});

// Simple debounce
function debounce(fn, ms){
  let t;
  return (...args)=>{ clearTimeout(t); t = setTimeout(()=> fn(...args), ms); }
}

// Init
renderCategories();
filterAndRender();
