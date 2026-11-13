const fs = require('fs');
const path = require('path');

// Colors
const P_BLUE = '#2457A6';
const W_YELLOW = '#FFC857';
const CORAL = '#FF8066';
const SOFT_CREAM = '#FFFDF7';
const DARK_NAVY = '#263247';
const WHITE = '#FFFFFF';
const LIGHT_BLUE = '#EBF2FA';
const MINT = '#5CD85A';
const SKY = '#4D96FF';
const PURPLE = '#7E57C2';

// 1. Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60" fill="none">
  <rect width="60" height="60" rx="16" fill="${P_BLUE}"/>
  <!-- Sun halo -->
  <circle cx="30" cy="20" r="10" fill="${W_YELLOW}" opacity="0.9"/>
  <!-- Sun rays -->
  <path d="M30 6v3M30 31v3M16 20h3M41 20h3M20 10l2 2M38 28l2 2M20 30l2-2M38 12l2-2" stroke="${W_YELLOW}" stroke-width="2" stroke-linecap="round"/>
  <!-- Open Book Base -->
  <path d="M12 44c5-3 12-3 18 1 6-4 13-4 18-1v-14c-5-3-12-3-18 1-6-4-13-4-18-1v14z" fill="${WHITE}"/>
  <path d="M30 31v14" stroke="${CORAL}" stroke-width="2" stroke-linecap="round"/>
  <!-- Plant sprout growing from book -->
  <path d="M30 30c-4-6-1-10 0-11 1 1 4 5 0 11z" fill="${MINT}"/>
  <path d="M30 25c3-3 6-1 6 1s-3 3-6-1z" fill="${MINT}"/>
</svg>`;

const faviconSvg = logoSvg;

// Helper to make themed card SVG
function createIllustrationSvg({ title, subtitle, iconType, bgGradient = [LIGHT_BLUE, '#FFFFFF'], badgeText = 'DEMO ASSET' }) {
  const icons = {
    classroom: `
      <!-- Teacher board -->
      <rect x="220" y="70" width="200" height="120" rx="10" fill="${DARK_NAVY}" stroke="${W_YELLOW}" stroke-width="4"/>
      <line x1="240" y1="100" x2="330" y2="100" stroke="${WHITE}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <line x1="240" y1="120" x2="380" y2="120" stroke="${W_YELLOW}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <line x1="240" y1="140" x2="310" y2="140" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <circle cx="370" cy="150" r="14" fill="${SKY}" opacity="0.9"/>
      <!-- Desk and children silhouettes / cheerful shapes -->
      <rect x="140" y="220" width="120" height="70" rx="8" fill="${P_BLUE}"/>
      <circle cx="200" cy="180" r="24" fill="${W_YELLOW}"/>
      <rect x="380" y="220" width="120" height="70" rx="8" fill="${CORAL}"/>
      <circle cx="440" cy="180" r="24" fill="${W_YELLOW}"/>
      <!-- Books on desk -->
      <rect x="160" y="210" width="35" height="10" rx="2" fill="${W_YELLOW}"/>
      <rect x="165" y="202" width="25" height="8" rx="2" fill="${CORAL}"/>
      <rect x="400" y="210" width="30" height="10" rx="2" fill="${MINT}"/>
    `,
    library: `
      <!-- Bookshelves -->
      <rect x="120" y="60" width="400" height="220" rx="14" fill="#E2E8F0" stroke="${P_BLUE}" stroke-width="3"/>
      <!-- Shelf 1 -->
      <line x1="120" y1="130" x2="520" y2="130" stroke="${P_BLUE}" stroke-width="4"/>
      <rect x="140" y="75" width="20" height="55" rx="3" fill="${CORAL}"/>
      <rect x="165" y="70" width="24" height="60" rx="3" fill="${P_BLUE}"/>
      <rect x="194" y="80" width="18" height="50" rx="3" fill="${W_YELLOW}"/>
      <rect x="217" y="72" width="25" height="58" rx="3" fill="${SKY}"/>
      <rect x="247" y="76" width="22" height="54" rx="3" fill="${MINT}"/>
      <!-- Shelf 2 -->
      <line x1="120" y1="200" x2="520" y2="200" stroke="${P_BLUE}" stroke-width="4"/>
      <rect x="150" y="145" width="22" height="55" rx="3" fill="${W_YELLOW}"/>
      <rect x="177" y="140" width="26" height="60" rx="3" fill="${CORAL}"/>
      <rect x="208" y="150" width="20" height="50" rx="3" fill="${P_BLUE}"/>
      <rect x="233" y="142" width="24" height="58" rx="3" fill="${MINT}"/>
      <!-- Reading globe & beanbag -->
      <circle cx="430" cy="160" r="26" fill="${SKY}"/>
      <circle cx="430" cy="160" r="24" fill="none" stroke="${WHITE}" stroke-width="3"/>
      <path d="M430 186v14M420 200h20" stroke="${DARK_NAVY}" stroke-width="4"/>
      <path d="M300 240c0-20 40-20 40 0v20h-40z" fill="${CORAL}" opacity="0.9"/>
    `,
    computer: `
      <!-- Desktop monitors -->
      <rect x="160" y="90" width="140" height="95" rx="8" fill="${DARK_NAVY}" stroke="${SKY}" stroke-width="3"/>
      <rect x="170" y="100" width="120" height="75" rx="4" fill="${LIGHT_BLUE}"/>
      <!-- Code lines on screen -->
      <line x1="180" y1="115" x2="230" y2="115" stroke="${P_BLUE}" stroke-width="4" stroke-linecap="round"/>
      <line x1="180" y1="130" x2="260" y2="130" stroke="${CORAL}" stroke-width="4" stroke-linecap="round"/>
      <line x1="180" y1="145" x2="210" y2="145" stroke="${MINT}" stroke-width="4" stroke-linecap="round"/>
      <line x1="180" y1="160" x2="245" y2="160" stroke="${W_YELLOW}" stroke-width="4" stroke-linecap="round"/>
      <!-- Stand -->
      <path d="M220 185v25M200 210h60" stroke="${DARK_NAVY}" stroke-width="6" stroke-linecap="round"/>
      <!-- Second screen -->
      <rect x="340" y="90" width="140" height="95" rx="8" fill="${DARK_NAVY}" stroke="${W_YELLOW}" stroke-width="3"/>
      <rect x="350" y="100" width="120" height="75" rx="4" fill="${LIGHT_BLUE}"/>
      <path d="M375 145l20-25 20 15 25-20" fill="none" stroke="${P_BLUE}" stroke-width="4" stroke-linecap="round"/>
      <path d="M400 185v25M380 210h60" stroke="${DARK_NAVY}" stroke-width="6" stroke-linecap="round"/>
      <!-- Table surface -->
      <rect x="100" y="230" width="440" height="14" rx="7" fill="${P_BLUE}"/>
    `,
    science: `
      <!-- Flask and beaker -->
      <path d="M230 110h20v25l25 45c5 8 0 16-10 16h-50c-10 0-15-8-10-16l25-45z" fill="${LIGHT_BLUE}" stroke="${P_BLUE}" stroke-width="4"/>
      <path d="M205 180h70c2 4-2 16-10 16h-50c-8 0-12-12-10-16z" fill="${SKY}" opacity="0.7"/>
      <circle cx="235" cy="165" r="4" fill="${WHITE}"/>
      <circle cx="245" cy="150" r="5" fill="${WHITE}"/>
      <circle cx="242" cy="175" r="3" fill="${WHITE}"/>
      <!-- Test tubes rack -->
      <rect x="330" y="140" width="110" height="15" rx="4" fill="${DARK_NAVY}"/>
      <rect x="345" y="95" width="16" height="65" rx="8" fill="${W_YELLOW}" stroke="${P_BLUE}" stroke-width="3"/>
      <rect x="375" y="85" width="16" height="75" rx="8" fill="${CORAL}" stroke="${P_BLUE}" stroke-width="3"/>
      <rect x="405" y="100" width="16" height="60" rx="8" fill="${MINT}" stroke="${P_BLUE}" stroke-width="3"/>
      <!-- Atom orbit -->
      <ellipse cx="490" cy="90" rx="28" ry="12" fill="none" stroke="${CORAL}" stroke-width="2" transform="rotate(30 490 90)"/>
      <ellipse cx="490" cy="90" rx="28" ry="12" fill="none" stroke="${P_BLUE}" stroke-width="2" transform="rotate(-30 490 90)"/>
      <circle cx="490" cy="90" r="6" fill="${W_YELLOW}"/>
    `,
    indoor: `
      <!-- Soft play building blocks & slide -->
      <rect x="140" y="160" width="60" height="60" rx="8" fill="${CORAL}"/>
      <rect x="210" y="160" width="60" height="60" rx="8" fill="${W_YELLOW}"/>
      <polygon points="170,100 130,160 210,160" fill="${SKY}"/>
      <circle cx="340" cy="180" r="35" fill="${MINT}"/>
      <circle cx="340" cy="180" r="20" fill="${WHITE}"/>
      <!-- Small climbing frame -->
      <path d="M410 230l40-90 40 90" stroke="${P_BLUE}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="425" y1="195" x2="475" y2="195" stroke="${W_YELLOW}" stroke-width="6"/>
      <line x1="435" y1="165" x2="465" y2="165" stroke="${CORAL}" stroke-width="6"/>
    `,
    playground: `
      <!-- Swings & Slide -->
      <!-- Swing Frame -->
      <path d="M150 230l40-140 40 140M270 230l40-140 40 140" stroke="${P_BLUE}" stroke-width="6" stroke-linecap="round"/>
      <line x1="170" y1="90" x2="330" y2="90" stroke="${P_BLUE}" stroke-width="8" stroke-linecap="round"/>
      <!-- Swing ropes -->
      <line x1="210" y1="95" x2="210" y2="175" stroke="${DARK_NAVY}" stroke-width="3"/>
      <line x1="240" y1="95" x2="240" y2="175" stroke="${DARK_NAVY}" stroke-width="3"/>
      <rect x="200" y="175" width="50" height="10" rx="3" fill="${CORAL}"/>
      <!-- Slide -->
      <path d="M370 230v-110h40l80 110" stroke="${CORAL}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="470" cy="70" r="25" fill="${W_YELLOW}" opacity="0.8"/>
    `,
    transport: `
      <!-- School Bus -->
      <rect x="140" y="100" width="360" height="110" rx="20" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="4"/>
      <!-- Bus roof curvature -->
      <rect x="140" y="85" width="340" height="25" rx="12" fill="${W_YELLOW}"/>
      <!-- Stripe -->
      <rect x="140" y="165" width="360" height="18" fill="${P_BLUE}"/>
      <text x="320" y="179" fill="${WHITE}" font-size="12" font-family="Arial, sans-serif" font-weight="bold" text-anchor="middle">SCHOOL BUS DEMO</text>
      <!-- Windows -->
      <rect x="170" y="115" width="50" height="40" rx="6" fill="${SKY}" opacity="0.8" stroke="${DARK_NAVY}" stroke-width="2"/>
      <rect x="235" y="115" width="50" height="40" rx="6" fill="${SKY}" opacity="0.8" stroke="${DARK_NAVY}" stroke-width="2"/>
      <rect x="300" y="115" width="50" height="40" rx="6" fill="${SKY}" opacity="0.8" stroke="${DARK_NAVY}" stroke-width="2"/>
      <rect x="365" y="115" width="50" height="40" rx="6" fill="${SKY}" opacity="0.8" stroke="${DARK_NAVY}" stroke-width="2"/>
      <rect x="430" y="115" width="55" height="50" rx="6" fill="${SKY}" opacity="0.9" stroke="${DARK_NAVY}" stroke-width="2"/>
      <!-- Wheels -->
      <circle cx="210" cy="215" r="26" fill="${DARK_NAVY}"/>
      <circle cx="210" cy="215" r="10" fill="#CBD5E1"/>
      <circle cx="430" cy="215" r="26" fill="${DARK_NAVY}"/>
      <circle cx="430" cy="215" r="10" fill="#CBD5E1"/>
      <!-- Headlight -->
      <rect x="495" y="160" width="10" height="18" rx="4" fill="${CORAL}"/>
    `,
    hygiene: `
      <!-- Clinic / Clean Environment -->
      <rect x="200" y="70" width="240" height="160" rx="16" fill="${WHITE}" stroke="${MINT}" stroke-width="4"/>
      <!-- Red/Mint Cross -->
      <rect x="305" y="105" width="30" height="85" rx="6" fill="${MINT}"/>
      <rect x="277" y="132" width="85" height="30" rx="6" fill="${MINT}"/>
      <!-- Shield -->
      <path d="M160 110c0 40 40 70 40 70s40-30 40-70v-30l-40-15-40 15v30z" fill="${P_BLUE}" opacity="0.9"/>
      <path d="M185 125l10 10 20-20" fill="none" stroke="${W_YELLOW}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Sparkles -->
      <circle cx="470" cy="90" r="12" fill="${W_YELLOW}"/>
      <circle cx="450" cy="130" r="6" fill="${CORAL}"/>
      <circle cx="485" cy="140" r="8" fill="${SKY}"/>
    `,
    art: `
      <!-- Palette & Brushes -->
      <path d="M220 180c-40-10-70-40-60-80 10-35 55-45 95-25 35 18 65 55 45 90-10 18-30 25-45 15-10-8-15-2-20 0-6 3-10 0-15 0z" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <!-- Paint dots -->
      <circle cx="195" cy="130" r="12" fill="${CORAL}"/>
      <circle cx="230" cy="105" r="12" fill="${P_BLUE}"/>
      <circle cx="265" cy="120" r="12" fill="${MINT}"/>
      <circle cx="270" cy="155" r="12" fill="${SKY}"/>
      <!-- Paint brush -->
      <line x1="330" y1="210" x2="430" y2="80" stroke="${DARK_NAVY}" stroke-width="8" stroke-linecap="round"/>
      <path d="M425 85l15-20c5-5 12 2 8 8l-15 20z" fill="${CORAL}"/>
      <!-- Canvas easel -->
      <polygon points="360,90 420,90 400,160 380,160" fill="${LIGHT_BLUE}" stroke="${P_BLUE}" stroke-width="3"/>
    `,
    music: `
      <!-- Music notes and instruments -->
      <circle cx="220" cy="190" r="22" fill="${P_BLUE}"/>
      <line x1="240" y1="190" x2="240" y2="100" stroke="${P_BLUE}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="340" cy="170" r="22" fill="${CORAL}"/>
      <line x1="360" y1="170" x2="360" y2="80" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/>
      <line x1="240" y1="100" x2="360" y2="80" stroke="${DARK_NAVY}" stroke-width="8"/>
      <!-- Drum -->
      <ellipse cx="440" cy="150" rx="40" ry="18" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <path d="M400 150v50c0 10 20 18 40 18s40-8 40-18v-50" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <!-- Drum sticks -->
      <line x1="390" y1="120" x2="420" y2="145" stroke="${P_BLUE}" stroke-width="4" stroke-linecap="round"/>
      <line x1="490" y1="120" x2="460" y2="145" stroke="${P_BLUE}" stroke-width="4" stroke-linecap="round"/>
    `,
    sports: `
      <!-- Football, basketball, running track -->
      <circle cx="220" cy="150" r="50" fill="${WHITE}" stroke="${DARK_NAVY}" stroke-width="4"/>
      <polygon points="220,130 235,145 229,165 211,165 205,145" fill="${DARK_NAVY}"/>
      <!-- Basketball -->
      <circle cx="340" cy="140" r="42" fill="${CORAL}" stroke="${DARK_NAVY}" stroke-width="4"/>
      <path d="M298 140h84M340 98v84" stroke="${DARK_NAVY}" stroke-width="3"/>
      <!-- Winner Trophy -->
      <path d="M420 110h50v40c0 15-12 25-25 25s-25-10-25-25v-40z" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <path d="M410 120c-10 0-10 15 0 20v-5c-5 0-5-10 0-15z" fill="${W_YELLOW}"/>
      <path d="M480 120c10 0 10 15 0 20v-5c5 0 5-10 0-15z" fill="${W_YELLOW}"/>
      <rect x="435" y="175" width="20" height="20" fill="${P_BLUE}"/>
      <rect x="420" y="195" width="50" height="15" rx="3" fill="${DARK_NAVY}"/>
    `,
    storytelling: `
      <!-- Open fairytale book with castle, stars -->
      <path d="M180 200c35-15 80-15 120 10 40-25 85-25 120-10v-90c-35-15-80-15-120 10-40-25-85-25-120-10v90z" fill="${WHITE}" stroke="${P_BLUE}" stroke-width="4"/>
      <!-- Glowing magical rays -->
      <path d="M300 120v-40M275 130l-25-30M325 130l25-30" stroke="${W_YELLOW}" stroke-width="4" stroke-linecap="round"/>
      <polygon points="300,55 304,67 317,67 306,75 310,87 300,79 290,87 294,75 283,67 296,67" fill="${W_YELLOW}"/>
      <polygon points="250,75 253,83 262,83 255,89 257,97 250,92 243,97 245,89 238,83 247,83" fill="${CORAL}"/>
      <polygon points="350,75 353,83 362,83 355,89 357,97 350,92 343,97 345,89 338,83 347,83" fill="${SKY}"/>
    `,
    cultural: `
      <!-- Festive Diyas, garlands, celebration -->
      <path d="M220 170c0 20 25 35 50 35s50-15 50-35h-100z" fill="${CORAL}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <!-- Flame -->
      <path d="M270 170c-10-15 0-35 0-35s10 20 0 35z" fill="${W_YELLOW}"/>
      <path d="M270 165c-4-8 0-18 0-18s4 10 0 18z" fill="#FF5722"/>
      <!-- Bunting flags -->
      <path d="M120 70q120 30 200 0t200 0" fill="none" stroke="${DARK_NAVY}" stroke-width="2"/>
      <polygon points="150,75 170,78 160,105" fill="${CORAL}"/>
      <polygon points="190,82 210,84 200,110" fill="${W_YELLOW}"/>
      <polygon points="230,85 250,86 240,112" fill="${SKY}"/>
      <polygon points="270,85 290,85 280,112" fill="${MINT}"/>
      <polygon points="310,84 330,82 320,110" fill="${P_BLUE}"/>
      <polygon points="350,79 370,77 360,105" fill="${CORAL}"/>
      <polygon points="390,75 410,72 400,100" fill="${W_YELLOW}"/>
      <!-- Festive rangoli petals -->
      <circle cx="430" cy="170" r="30" fill="${WHITE}" stroke="${P_BLUE}" stroke-width="3"/>
      <circle cx="430" cy="170" r="14" fill="${CORAL}"/>
    `,
    preprimary: `
      <!-- Toddler blocks, teddy bear silhouette, rainbow -->
      <path d="M160 210a120 120 0 0 1 200 0" fill="none" stroke="${CORAL}" stroke-width="14"/>
      <path d="M175 210a105 105 0 0 1 170 0" fill="none" stroke="${W_YELLOW}" stroke-width="14"/>
      <path d="M190 210a90 90 0 0 1 140 0" fill="none" stroke="${SKY}" stroke-width="14"/>
      <!-- Wooden blocks ABC -->
      <rect x="360" y="150" width="55" height="55" rx="8" fill="${P_BLUE}"/>
      <text x="387" y="188" fill="${WHITE}" font-size="28" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">A</text>
      <rect x="425" y="150" width="55" height="55" rx="8" fill="${CORAL}"/>
      <text x="452" y="188" fill="${WHITE}" font-size="28" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">B</text>
      <rect x="390" y="88" width="55" height="55" rx="8" fill="${W_YELLOW}"/>
      <text x="417" y="126" fill="${DARK_NAVY}" font-size="28" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">C</text>
    `,
    kindergarten: `
      <!-- Abacus, magnifying glass, joyful shapes -->
      <rect x="150" y="90" width="160" height="110" rx="10" fill="#E2E8F0" stroke="${P_BLUE}" stroke-width="4"/>
      <line x1="160" y1="115" x2="300" y2="115" stroke="${DARK_NAVY}" stroke-width="3"/>
      <line x1="160" y1="145" x2="300" y2="145" stroke="${DARK_NAVY}" stroke-width="3"/>
      <line x1="160" y1="175" x2="300" y2="175" stroke="${DARK_NAVY}" stroke-width="3"/>
      <!-- Beads -->
      <circle cx="180" cy="115" r="8" fill="${CORAL}"/>
      <circle cx="200" cy="115" r="8" fill="${CORAL}"/>
      <circle cx="270" cy="115" r="8" fill="${W_YELLOW}"/>
      <circle cx="190" cy="145" r="8" fill="${SKY}"/>
      <circle cx="250" cy="145" r="8" fill="${MINT}"/>
      <circle cx="270" cy="145" r="8" fill="${MINT}"/>
      <circle cx="220" cy="175" r="8" fill="${W_YELLOW}"/>
      <circle cx="240" cy="175" r="8" fill="${CORAL}"/>
      <!-- Paper Boat -->
      <polygon points="350,180 470,180 430,210 390,210" fill="${P_BLUE}"/>
      <polygon points="410,120 410,180 455,180" fill="${CORAL}"/>
      <polygon points="410,135 410,180 375,180" fill="${W_YELLOW}"/>
    `,
    primary: `
      <!-- Open notebook, fountain pen, graduation cap, geometry -->
      <rect x="160" y="80" width="180" height="130" rx="8" fill="${WHITE}" stroke="${P_BLUE}" stroke-width="4"/>
      <line x1="250" y1="80" x2="250" y2="210" stroke="#CBD5E1" stroke-width="2"/>
      <line x1="175" y1="105" x2="235" y2="105" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <line x1="175" y1="125" x2="235" y2="125" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <line x1="175" y1="145" x2="220" y2="145" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <line x1="265" y1="105" x2="325" y2="105" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <line x1="265" y1="125" x2="325" y2="125" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <line x1="265" y1="145" x2="310" y2="145" stroke="${DARK_NAVY}" stroke-width="2" stroke-linecap="round"/>
      <!-- Graduation cap / Scholar symbol -->
      <polygon points="410,105 450,85 490,105 450,125" fill="${DARK_NAVY}"/>
      <rect x="435" y="125" width="30" height="16" rx="4" fill="${DARK_NAVY}"/>
      <path d="M490 105v35" stroke="${W_YELLOW}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="490" cy="142" r="4" fill="${W_YELLOW}"/>
      <!-- Compass / Ruler -->
      <polygon points="360,190 400,190 420,210 380,210" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="2"/>
    `,
    steam: `
      <!-- STEAM / Gears, Rocket, Lightbulb -->
      <!-- Gear -->
      <circle cx="210" cy="140" r="30" fill="${P_BLUE}"/>
      <circle cx="210" cy="140" r="14" fill="${WHITE}"/>
      <!-- Rocket -->
      <path d="M330 90c15 15 25 45 25 70h-50c0-25 10-55 25-70z" fill="${CORAL}"/>
      <polygon points="305,140 285,165 305,160" fill="${W_YELLOW}"/>
      <polygon points="355,140 375,165 355,160" fill="${W_YELLOW}"/>
      <circle cx="330" cy="125" r="10" fill="${WHITE}"/>
      <polygon points="320,160 330,185 340,160" fill="${W_YELLOW}"/>
      <!-- Lightbulb -->
      <circle cx="430" cy="120" r="24" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="3"/>
      <rect x="422" y="142" width="16" height="12" rx="2" fill="${DARK_NAVY}"/>
      <line x1="430" y1="85" x2="430" y2="75" stroke="${W_YELLOW}" stroke-width="4" stroke-linecap="round"/>
      <line x1="400" y1="95" x2="390" y2="85" stroke="${W_YELLOW}" stroke-width="4" stroke-linecap="round"/>
      <line x1="460" y1="95" x2="470" y2="85" stroke="${W_YELLOW}" stroke-width="4" stroke-linecap="round"/>
    `
  };

  const selectedIcon = icons[iconType] || icons.classroom;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad_${iconType}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgGradient[0]}"/>
      <stop offset="100%" stop-color="${bgGradient[1]}"/>
    </linearGradient>
    <pattern id="grid_${iconType}" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="1.5" fill="#2457A6" opacity="0.08"/>
    </pattern>
  </defs>
  <!-- Background -->
  <rect width="640" height="360" rx="16" fill="url(#bgGrad_${iconType})"/>
  <rect width="640" height="360" rx="16" fill="url(#grid_${iconType})"/>

  <!-- Decorative geometric accents -->
  <circle cx="80" cy="60" r="40" fill="${W_YELLOW}" opacity="0.3"/>
  <circle cx="580" cy="300" r="50" fill="${CORAL}" opacity="0.2"/>
  <circle cx="560" cy="60" r="30" fill="${SKY}" opacity="0.25"/>

  <!-- Main Illustration Group -->
  <g transform="translate(0, 15)">
    ${selectedIcon}
  </g>

  <!-- Title & Subtitle Banner at bottom -->
  <rect x="24" y="275" width="592" height="65" rx="12" fill="${DARK_NAVY}" opacity="0.94"/>
  <text x="44" y="305" fill="${WHITE}" font-size="19" font-family="'Nunito', sans-serif" font-weight="800" letter-spacing="0.5">${title}</text>
  <text x="44" y="325" fill="${W_YELLOW}" font-size="13" font-family="'Poppins', sans-serif" font-weight="500">${subtitle}</text>

  <!-- Demo Badge -->
  <g transform="translate(500, 287)">
    <rect width="100" height="24" rx="12" fill="${CORAL}"/>
    <text x="50" y="16" fill="${WHITE}" font-size="10" font-family="'Poppins', sans-serif" font-weight="700" text-anchor="middle" letter-spacing="0.8">${badgeText}</text>
  </g>
</svg>`;
}

// 2. Hero Big Illustration
const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 520" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="heroSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E8F1FC"/>
      <stop offset="100%" stop-color="#FFFDF7"/>
    </linearGradient>
    <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE885"/>
      <stop offset="100%" stop-color="${W_YELLOW}"/>
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#263247" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="760" height="520" rx="32" fill="url(#heroSky)"/>

  <!-- Sun -->
  <circle cx="640" cy="100" r="55" fill="url(#sunGlow)"/>
  <circle cx="640" cy="100" r="75" fill="none" stroke="${W_YELLOW}" stroke-width="2" stroke-dasharray="8 8" opacity="0.6"/>

  <!-- Gentle Clouds -->
  <path d="M120 100c0-15 15-25 30-20 8-15 30-15 40 0 15-5 30 5 30 20z" fill="${WHITE}" opacity="0.9"/>
  <path d="M440 80c0-12 12-20 25-16 6-12 24-12 32 0 12-4 24 4 24 16z" fill="${WHITE}" opacity="0.85"/>

  <!-- School Campus / Modern Building Backdrop -->
  <rect x="220" y="160" width="320" height="240" rx="20" fill="${WHITE}" filter="url(#softShadow)"/>
  <!-- School Roof / Triangular Arch -->
  <polygon points="200,165 380,85 560,165" fill="${P_BLUE}"/>
  <!-- School Clock -->
  <circle cx="380" cy="130" r="20" fill="${W_YELLOW}"/>
  <line x1="380" y1="130" x2="380" y2="118" stroke="${DARK_NAVY}" stroke-width="3" stroke-linecap="round"/>
  <line x1="380" y1="130" x2="390" y2="130" stroke="${DARK_NAVY}" stroke-width="3" stroke-linecap="round"/>

  <!-- School Windows Grid -->
  <rect x="250" y="195" width="55" height="50" rx="8" fill="#EBF2FA" stroke="${P_BLUE}" stroke-width="2"/>
  <rect x="325" y="195" width="55" height="50" rx="8" fill="#EBF2FA" stroke="${P_BLUE}" stroke-width="2"/>
  <rect x="400" y="195" width="55" height="50" rx="8" fill="#EBF2FA" stroke="${P_BLUE}" stroke-width="2"/>
  <rect x="475" y="195" width="45" height="50" rx="8" fill="#EBF2FA" stroke="${P_BLUE}" stroke-width="2"/>

  <!-- Entrance Door -->
  <path d="M350 400v-90c0-16 14-30 30-30s30 14 30 30v90z" fill="${CORAL}"/>
  <circle cx="395" cy="340" r="4" fill="${WHITE}"/>

  <!-- Lush Green Lawn Hills -->
  <path d="M-20 440c160-50 320-20 480-40 120-15 220 10 320 40v100h-800z" fill="#78C850"/>
  <path d="M-20 470c180-30 360-10 540-30 140-15 200 10 260 30v70h-800z" fill="#58B038"/>

  <!-- Friendly Trees -->
  <!-- Left Tree -->
  <rect x="110" y="340" width="16" height="80" rx="4" fill="#8D5B4C"/>
  <circle cx="118" cy="300" r="50" fill="#489F38"/>
  <circle cx="95" cy="280" r="35" fill="#5BB845"/>
  <circle cx="140" cy="285" r="35" fill="#69C952"/>

  <!-- Right Tree -->
  <rect x="630" y="350" width="16" height="70" rx="4" fill="#8D5B4C"/>
  <circle cx="638" cy="315" r="45" fill="#489F38"/>
  <circle cx="660" cy="300" r="32" fill="#5BB845"/>
  <circle cx="615" cy="305" r="32" fill="#69C952"/>

  <!-- Joyful Children Elements (Modern Stylized Vectors) -->
  <!-- Child 1 with Backpack (Left) -->
  <circle cx="190" cy="360" r="18" fill="#FFDBB5"/>
  <path d="M172 355c0-12 18-20 36-12" stroke="${DARK_NAVY}" stroke-width="6" stroke-linecap="round"/>
  <rect x="175" y="380" width="30" height="45" rx="10" fill="${CORAL}"/>
  <rect x="165" y="385" width="12" height="25" rx="5" fill="${P_BLUE}"/>
  <path d="M180 425v25M200 425v25" stroke="${DARK_NAVY}" stroke-width="6" stroke-linecap="round"/>

  <!-- Child 2 with Book (Center-Right) -->
  <circle cx="560" cy="370" r="18" fill="#FFD1A4"/>
  <path d="M542 368c0-12 18-20 36-12" stroke="#4A2E18" stroke-width="6" stroke-linecap="round"/>
  <rect x="545" y="390" width="30" height="42" rx="10" fill="${P_BLUE}"/>
  <!-- Open Book held in hands -->
  <polygon points="545,410 575,410 585,425 535,425" fill="${W_YELLOW}"/>
  <path d="M552 432v20M568 432v20" stroke="${DARK_NAVY}" stroke-width="6" stroke-linecap="round"/>

  <!-- Flying Paper Airplane with Trailing Dash Line -->
  <path d="M80 230q180-80 340-20t260-80" fill="none" stroke="${P_BLUE}" stroke-width="2.5" stroke-dasharray="6 6"/>
  <g transform="translate(680, 130) rotate(-15)">
    <polygon points="0,0 28,10 0,20 6,10" fill="${CORAL}"/>
    <polygon points="0,10 28,10 6,10" fill="#E65100"/>
  </g>

  <!-- Colorful Floating Educational Icons -->
  <!-- Pencil -->
  <g transform="translate(80, 150) rotate(-25)">
    <rect x="0" y="0" width="40" height="12" rx="3" fill="${W_YELLOW}"/>
    <polygon points="40,0 52,6 40,12" fill="#E09F3E"/>
    <polygon points="48,4 52,6 48,8" fill="${DARK_NAVY}"/>
  </g>
  <!-- ABC Block -->
  <g transform="translate(620, 200) rotate(15)">
    <rect width="36" height="36" rx="8" fill="${W_YELLOW}" stroke="${DARK_NAVY}" stroke-width="2"/>
    <text x="18" y="26" fill="${DARK_NAVY}" font-size="20" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">A</text>
  </g>
</svg>`;

// 3. About School Illustration
const aboutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 480" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4F8FD"/>
      <stop offset="100%" stop-color="#FFFDF7"/>
    </linearGradient>
  </defs>
  <rect width="680" height="480" rx="28" fill="url(#aboutGrad)"/>

  <!-- Circular background badge -->
  <circle cx="340" cy="220" r="180" fill="${LIGHT_BLUE}" opacity="0.6"/>
  <circle cx="340" cy="220" r="140" fill="${WHITE}"/>

  <!-- Central "Tree of Knowledge and Joy" -->
  <path d="M330 380v-100c-25-30-60-40-90-20 10-40 45-55 80-45-5-30 20-65 60-60 35 5 50 35 40 65 35-5 65 15 65 50-30-10-60 5-75 30v80z" fill="#4CAF50"/>
  <rect x="330" y="280" width="20" height="100" rx="6" fill="#8D6E63"/>

  <!-- Apples / Knowledge fruits -->
  <circle cx="280" cy="210" r="12" fill="${CORAL}"/>
  <circle cx="330" cy="180" r="14" fill="${W_YELLOW}"/>
  <circle cx="390" cy="195" r="12" fill="${CORAL}"/>
  <circle cx="420" cy="245" r="10" fill="${W_YELLOW}"/>
  <circle cx="260" cy="260" r="11" fill="${SKY}"/>

  <!-- Open Books at Base of Tree -->
  <g transform="translate(260, 360)">
    <path d="M0 25c25-15 55-15 80 5 25-20 55-20 80-5v-25c-25-15-55-15-80 5-25-20-55-20-80-5v25z" fill="${P_BLUE}"/>
    <path d="M5 23c23-14 50-14 75 4 23-18 50-18 75-4v-22c-25-14-52-14-75 4-23-18-50-18-75-4v22z" fill="${WHITE}"/>
  </g>

  <!-- Surrounding Badges / Highlights -->
  <!-- Top Left: Safety -->
  <g transform="translate(60, 60)">
    <rect width="160" height="56" rx="28" fill="${WHITE}" stroke="${LIGHT_BLUE}" stroke-width="2"/>
    <circle cx="30" cy="28" r="18" fill="${MINT}"/>
    <path d="M25 28l4 4 8-8" stroke="${WHITE}" stroke-width="3" stroke-linecap="round"/>
    <text x="60" y="26" fill="${DARK_NAVY}" font-size="12" font-family="'Nunito', sans-serif" font-weight="800">100% Safe Campus</text>
    <text x="60" y="42" fill="#64748B" font-size="10" font-family="'Poppins', sans-serif">Secure &amp; Guarded</text>
  </g>

  <!-- Top Right: Play-Based -->
  <g transform="translate(460, 70)">
    <rect width="160" height="56" rx="28" fill="${WHITE}" stroke="${LIGHT_BLUE}" stroke-width="2"/>
    <circle cx="30" cy="28" r="18" fill="${W_YELLOW}"/>
    <text x="30" y="34" fill="${DARK_NAVY}" font-size="16" text-anchor="middle">★</text>
    <text x="60" y="26" fill="${DARK_NAVY}" font-size="12" font-family="'Nunito', sans-serif" font-weight="800">Joyful Learning</text>
    <text x="60" y="42" fill="#64748B" font-size="10" font-family="'Poppins', sans-serif">Play &amp; Discover</text>
  </g>

  <!-- Bottom Left: Experienced Educators -->
  <g transform="translate(50, 370)">
    <rect width="180" height="56" rx="28" fill="${WHITE}" stroke="${LIGHT_BLUE}" stroke-width="2"/>
    <circle cx="30" cy="28" r="18" fill="${P_BLUE}"/>
    <text x="30" y="34" fill="${WHITE}" font-size="14" text-anchor="middle">🎓</text>
    <text x="60" y="26" fill="${DARK_NAVY}" font-size="12" font-family="'Nunito', sans-serif" font-weight="800">Certified Teachers</text>
    <text x="60" y="42" fill="#64748B" font-size="10" font-family="'Poppins', sans-serif">1:15 Teacher Ratio</text>
  </g>

  <!-- Bottom Right: Holistic Growth -->
  <g transform="translate(460, 370)">
    <rect width="170" height="56" rx="28" fill="${WHITE}" stroke="${LIGHT_BLUE}" stroke-width="2"/>
    <circle cx="30" cy="28" r="18" fill="${CORAL}"/>
    <text x="30" y="34" fill="${WHITE}" font-size="14" text-anchor="middle">♥</text>
    <text x="60" y="26" fill="${DARK_NAVY}" font-size="12" font-family="'Nunito', sans-serif" font-weight="800">Holistic Care</text>
    <text x="60" y="42" fill="#64748B" font-size="10" font-family="'Poppins', sans-serif">Mind, Body &amp; Soul</text>
  </g>
</svg>`;

// 4. Decorative Map Illustration
const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 380" width="100%" height="100%" fill="none">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8F4F8"/>
      <stop offset="100%" stop-color="#EDF7F0"/>
    </linearGradient>
  </defs>
  <rect width="600" height="380" rx="20" fill="url(#mapBg)"/>

  <!-- Grid road networks -->
  <!-- Park green areas -->
  <rect x="40" y="40" width="180" height="120" rx="14" fill="#CDEEC6" opacity="0.8"/>
  <rect x="380" y="220" width="180" height="120" rx="14" fill="#CDEEC6" opacity="0.8"/>
  
  <!-- Roads -->
  <!-- Main Avenue -->
  <path d="M0 200h600" stroke="${WHITE}" stroke-width="40"/>
  <path d="M0 200h600" stroke="#F1F5F9" stroke-width="32"/>
  <line x1="0" y1="200" x2="600" y2="200" stroke="${W_YELLOW}" stroke-width="3" stroke-dasharray="14 14"/>

  <!-- Cross street -->
  <path d="M300 0v380" stroke="${WHITE}" stroke-width="36"/>
  <path d="M300 0v380" stroke="#F1F5F9" stroke-width="28"/>
  <line x1="300" y1="0" x2="300" y2="380" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="10 10"/>

  <!-- Diagonal road -->
  <path d="M60 380L540 40" stroke="${WHITE}" stroke-width="22" opacity="0.7"/>

  <!-- Trees dotted around -->
  <circle cx="80" cy="80" r="14" fill="#78C850"/>
  <circle cx="120" cy="65" r="10" fill="#60B03C"/>
  <circle cx="170" cy="110" r="16" fill="#78C850"/>
  <circle cx="420" cy="260" r="16" fill="#78C850"/>
  <circle cx="480" cy="290" r="18" fill="#60B03C"/>

  <!-- School Campus Lot in Center -->
  <rect x="230" y="110" width="140" height="70" rx="12" fill="${P_BLUE}" stroke="${WHITE}" stroke-width="4"/>
  <text x="300" y="140" fill="${WHITE}" font-size="12" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">PRIMARY SCHOOL</text>
  <text x="300" y="156" fill="${W_YELLOW}" font-size="9" font-family="'Poppins', sans-serif" font-weight="600" text-anchor="middle">DEMO CAMPUS</text>

  <!-- Big Red Location Pin -->
  <g transform="translate(300, 100)">
    <path d="M0 0c-15-20-15-35 0-45 15-10 30 5 15 45z" fill="${CORAL}" filter="drop-shadow(0 6px 6px rgba(0,0,0,0.2))"/>
    <circle cx="7" cy="-28" r="6" fill="${WHITE}"/>
  </g>

  <!-- Street Names Labels -->
  <rect x="15" y="180" width="130" height="22" rx="4" fill="${DARK_NAVY}" opacity="0.85"/>
  <text x="80" y="195" fill="${WHITE}" font-size="10" font-family="'Poppins', sans-serif" font-weight="600" text-anchor="middle">Learning Avenue</text>

  <rect x="235" y="15" width="130" height="22" rx="4" fill="${DARK_NAVY}" opacity="0.85"/>
  <text x="300" y="30" fill="${WHITE}" font-size="10" font-family="'Poppins', sans-serif" font-weight="600" text-anchor="middle">Demo Nagar Main Rd</text>

  <!-- Compass Rose -->
  <g transform="translate(540, 60)">
    <circle cx="0" cy="0" r="22" fill="${WHITE}" stroke="#CBD5E1" stroke-width="2"/>
    <polygon points="0,-16 5,0 0,2 -5,0" fill="${CORAL}"/>
    <polygon points="0,16 5,0 0,-2 -5,0" fill="#94A3B8"/>
    <text x="0" y="-18" fill="${DARK_NAVY}" font-size="9" font-family="'Nunito', sans-serif" font-weight="900" text-anchor="middle">N</text>
  </g>

  <!-- Demo Map disclaimer -->
  <rect x="15" y="340" width="280" height="26" rx="6" fill="${WHITE}" opacity="0.95" stroke="#CBD5E1" stroke-width="1"/>
  <text x="25" y="357" fill="${DARK_NAVY}" font-size="10" font-family="'Poppins', sans-serif" font-weight="500">📍 Fictional Location Illustration (Demo)</text>
</svg>`;

// Write core assets
fs.writeFileSync(path.join(__dirname, 'assets/logo/school-logo.svg'), logoSvg);
fs.writeFileSync(path.join(__dirname, 'assets/logo/favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(__dirname, 'assets/images/hero-joyful-learning.svg'), heroSvg);
fs.writeFileSync(path.join(__dirname, 'assets/images/about-school-campus.svg'), aboutSvg);
fs.writeFileSync(path.join(__dirname, 'assets/images/campus-map-illustration.svg'), mapSvg);

// Generate Programs
const programs = [
  { file: 'academics-pre-primary.svg', title: 'Pre-Primary Program', subtitle: 'Ages 2.5 – 3.5 Years • Playgroup & Nursery', icon: 'preprimary', colors: ['#FFF0EB', '#FFFFFF'] },
  { file: 'academics-kindergarten.svg', title: 'Kindergarten (LKG & UKG)', subtitle: 'Ages 3.5 – 5.5 Years • Foundational Literacy', icon: 'kindergarten', colors: ['#FFF8E7', '#FFFFFF'] },
  { file: 'academics-primary.svg', title: 'Primary Education (Grades 1–5)', subtitle: 'Ages 6 – 11 Years • Core Academic Excellence', icon: 'primary', colors: ['#EBF4FF', '#FFFFFF'] },
  { file: 'academics-activity-steam.svg', title: 'Activity & STEAM Learning', subtitle: 'All Grades • Hands-On Robotics & Discovery', icon: 'steam', colors: ['#EDFDF4', '#FFFFFF'] }
];

programs.forEach(p => {
  const svg = createIllustrationSvg({ title: p.title, subtitle: p.subtitle, iconType: p.icon, bgGradient: p.colors, badgeText: 'ACADEMIC DEMO' });
  fs.writeFileSync(path.join(__dirname, 'assets/images', p.file), svg);
});

// Generate Facilities
const facilities = [
  { file: 'facility-smart-class.svg', title: 'Smart Classrooms', subtitle: 'Interactive Digital Touchboards & Ergonomic Seating', icon: 'classroom' },
  { file: 'facility-library.svg', title: 'Library & Reading Zone', subtitle: 'Curated Age-Appropriate Children Literature', icon: 'library' },
  { file: 'facility-computer-lab.svg', title: 'Computer Learning Lab', subtitle: 'Child-Safe Coding & Digital Literacy Station', icon: 'computer' },
  { file: 'facility-science-discovery.svg', title: 'Science Discovery Area', subtitle: 'Hands-on Wonder & Experimental Learning', icon: 'science' },
  { file: 'facility-indoor-play.svg', title: 'Indoor Activity Space', subtitle: 'Soft Mats, Building Blocks & Creative Corner', icon: 'indoor' },
  { file: 'facility-playground.svg', title: 'Outdoor Playground', subtitle: 'Safe Turf, Swings, Slides & Running Track', icon: 'playground' },
  { file: 'facility-school-bus.svg', title: 'Safe Transportation', subtitle: 'GPS Tracked Buses with Attendants & First Aid', icon: 'transport' },
  { file: 'facility-hygiene-clinic.svg', title: 'Clean & Hygienic Campus', subtitle: 'Sanitized Spaces, Medical Room & Pure Water', icon: 'hygiene' }
];

facilities.forEach(f => {
  const svg = createIllustrationSvg({ title: f.title, subtitle: f.subtitle, iconType: f.icon, badgeText: 'FACILITY DEMO' });
  fs.writeFileSync(path.join(__dirname, 'assets/images', f.file), svg);
});

// Generate Activities
const activities = [
  { file: 'activity-art-craft.svg', title: 'Art & Craft', subtitle: 'Expressing Imagination Through Colors & Textures', icon: 'art' },
  { file: 'activity-music-dance.svg', title: 'Music & Dance', subtitle: 'Rhythm, Movement, Melodies & Expression', icon: 'music' },
  { file: 'activity-sports-games.svg', title: 'Sports & Games', subtitle: 'Athletics, Teamwork, Agility & Good Sportsmanship', icon: 'sports' },
  { file: 'activity-storytelling.svg', title: 'Storytelling & Drama', subtitle: 'Voice Modulation, Puppetry & Language Growth', icon: 'storytelling' },
  { file: 'activity-science-lab.svg', title: 'Junior Science Lab', subtitle: 'Curiosity Sparked With Exciting Safe Experiments', icon: 'science' },
  { file: 'activity-cultural-events.svg', title: 'Cultural Celebrations', subtitle: 'Festivals, Heritage & Community Spirit', icon: 'cultural' }
];

activities.forEach(a => {
  const svg = createIllustrationSvg({ title: a.title, subtitle: a.subtitle, iconType: a.icon, badgeText: 'ACTIVITY DEMO' });
  fs.writeFileSync(path.join(__dirname, 'assets/images', a.file), svg);
});

// Generate Gallery Items
const gallery = [
  { file: 'gallery-smart-learning.svg', title: 'Interactive Learning Hour', subtitle: 'Classrooms • Collaborative Smartboard Session', icon: 'classroom' },
  { file: 'gallery-art-workshop.svg', title: 'Clay & Painting Workshop', subtitle: 'Activities • Creative Hands at Work', icon: 'art' },
  { file: 'gallery-annual-sports.svg', title: 'Annual Junior Sports Meet', subtitle: 'Sports • Relay Races & Track Cheers', icon: 'sports' },
  { file: 'gallery-diwali-celebration.svg', title: 'Heritage Festival Day', subtitle: 'Events • Traditional Attire & Folk Dances', icon: 'cultural' },
  { file: 'gallery-library-reading.svg', title: 'Little Readers Club', subtitle: 'Classrooms • Quiet Imagination Corner', icon: 'library' },
  { file: 'gallery-music-recital.svg', title: 'Spring Rhythm Recital', subtitle: 'Activities • Percussion & Vocal Harmonies', icon: 'music' },
  { file: 'gallery-football-coaching.svg', title: 'Mini Football League', subtitle: 'Sports • Energy, Team Spirit & Goals', icon: 'sports' },
  { file: 'gallery-science-fair.svg', title: 'Young Explorers Science Fair', subtitle: 'Events • Models, Volcanoes & Solar Systems', icon: 'science' }
];

gallery.forEach(g => {
  const svg = createIllustrationSvg({ title: g.title, subtitle: g.subtitle, iconType: g.icon, badgeText: 'GALLERY DEMO' });
  fs.writeFileSync(path.join(__dirname, 'assets/images', g.file), svg);
});

console.log('All image and SVG assets generated successfully!');

