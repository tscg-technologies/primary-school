# Primary School Website — Demonstration Project

> **A premium, modern, playful, and welcoming Indian primary school website developed from scratch using clean HTML5, CSS3, and Vanilla JavaScript.**

---

## 🌟 Overview

**Primary School Website** is a showcase demonstration project engineered to represent institutional excellence, safety, and modern pedagogical values. Designed specifically to resonate with young parents and inspire young learners, it combines editorial-grade layouts with playful educational illustrations and rich frontend interactions.

### ⚠️ Strict Demo & Copyright Compliance
- **Website Title:** `Primary School Website`
- **Fictional Entity:** Contains zero references to real schools, institutions, trademarks, or copyrighted emblems.
- **Fictional Contact Details:**
  - **Address:** Plot No. 00, Learning Avenue, Demo Nagar, Hyderabad, Telangana – 500000.
  - **Phone:** `+91 99999 00000` (Illustrative demo number)
  - **Email:** `hello@primaryschool-demo.example`
  - **Working Hours:** Monday – Saturday: 9:00 AM – 4:00 PM
- **Hero Visual:** Integrated high-resolution AI-generated hero banner (`hero-school-banner.jpg`) alongside original vector motifs and interactive floating highlight cards.
- **Section Imagery:** Authentic AI-generated educational visuals for About School (`about-school.jpg`), Academics (`academics-learning.jpg`), Facilities Library (`school-library.jpg`), Activities Sports (`school-activities.jpg`), and Creative Learning Gallery (`creative-learning.jpg`).
- **Map:** Custom vector campus illustration instead of proprietary Google Maps tiles.
- **Testimonials:** Fictional illustrative reviews explicitly marked as demo content.

---

## 🎨 Design System & Palette

| Token Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Blue** | `#2457A6` | Primary branding, header badges, primary buttons, structural accents |
| **Warm Yellow** | `#FFC857` | Sunshine highlights, floating cards, attention badges, rating stars |
| **Coral** | `#FF8066` | Energetic accents, CTAs, playfulness, highlight tags |
| **Soft Cream** | `#FFFDF7` | Warm, approachable background tints and canvas surfaces |
| **Dark Navy** | `#263247` | Editorial typography, footers, high-contrast dark accents |
| **Pure White** | `#FFFFFF` | Card surfaces, modals, crisp contrast separators |

### Typography
- **Headings:** [`Nunito`](https://fonts.google.com/specimen/Nunito) (Weights: 700, 800, 900) — Rounded, warm, friendly yet academic.
- **Body & Captions:** [`Poppins`](https://fonts.google.com/specimen/Poppins) (Weights: 400, 500, 600) — Clean geometric clarity and legibility.

---

## 🏗️ Website Architecture & Implemented Sections

1. **Top Bar:** Quick contact strip with demo notice badge, fictional address, phone, email, and campus visiting hours.
2. **Sticky Header & Navigation:**
   - Custom SVG school logo and brand typography.
   - Smooth-scrolling navigation links with ScrollSpy active state.
   - Prominent "Admission Enquiry" CTA button.
   - Mobile hamburger toggle and slide-in drawer with backdrop blur.
3. **Hero Section:**
   - Headline: *"Little Steps Today, Brighter Futures Tomorrow."*
   - Subtitle, dual CTAs ("Explore Our School" and "Enquire for Admission").
   - Large hero vector artwork with three animated floating highlight cards:
     - *Learning Through Play*
     - *Caring Environment*
     - *Growing Together*
4. **About Our School:**
   - Heading: *"Where Every Child's Journey Begins."*
   - Two-column layout with 10+ years experience badge.
   - Interactive tabbed switcher for **Philosophy**, **Our Mission**, and **Our Vision**.
   - Demo statistic counter strip (500+ Happy Learners, 25+ Dedicated Educators, 15+ Learning Activities, 10+ Years).
5. **Academics & Learning Programs:**
   - 4 comprehensive cards: **Pre-Primary**, **Kindergarten (LKG & UKG)**, **Primary Education (Grades 1–5)**, and **Activity-Based & STEAM Learning**.
   - Interactive **"Explore Curriculum"** modal providing schedule, student-teacher ratios, and syllabus modules with one-click enrollment linking.
6. **Why Choose Our School:**
   - 6 polished feature cards with micro-animations:
     - Experienced Educators
     - Child-Friendly Learning
     - Safe Learning Environment
     - Creative Development
     - Individual Attention
     - Holistic Education
7. **Facilities & Infrastructure:**
   - 8 rich facility cards with descriptive placeholder filenames:
     - Smart Classrooms
     - Library & Reading Zone
     - Computer Learning Lab
     - Science Discovery Area
     - Indoor Activity Space
     - Outdoor Playground
     - Safe Transportation
     - Clean & Hygienic Environment
8. **Activities & Student Life:**
   - 6 engaging co-curricular showcase cards:
     - Art & Craft
     - Music & Dance
     - Sports & Games
     - Storytelling & Drama
     - Science Experiments
     - Cultural Celebrations
9. **School Gallery:**
   - Interactive category filter tabs (**All**, **Classrooms**, **Activities**, **Sports**, **Events**).
   - Full-featured **Lightbox modal** with:
     - Previous & Next navigation controls.
     - Keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
     - Image category pill, caption, and image index counter.
10. **Testimonials:**
    - Fictional parent reviews with 5-star ratings and stylized avatar initials.
    - Responsive carousel slider with previous/next arrows, dot indicators, and pause-on-hover autoplay.
11. **Admission Enquiry Section:**
    - High-conversion layout with 3-step admission journey.
    - Accessible form with real-time and submission validation:
      - Valid Indian mobile number validation (`^[6-9]\d{9}$`).
      - RFC-compliant email address checking.
      - Required fields & program selector.
    - Realistic submission loading state and confirmation modal highlighting demonstration mode.
12. **Contact Section:**
    - Four detail cards (Address, Phone, Email, Visiting Hours).
    - Decorative vector campus location map illustration.
    - WhatsApp quick chat demo dialog.
13. **Footer:**
    - Comprehensive 4-column footer with branding, academic navigation, demo contact info, and social placeholders.
    - Copyright notice: `© 2026 Primary School Website. Demonstration Project. All rights reserved.`
14. **Floating Back-to-Top Button:**
    - Automatically reveals after scrolling 400px down.

---

## 📁 Project Structure

```
c:\TSCG_Demos\Primary_School\
│
├── index.html                           # Complete homepage markup
│
├── css/
│   └── style.css                        # Full responsive stylesheet & animations
│
├── js/
│   └── script.js                        # Complete Vanilla JS interactive logic
│
├── assets/
│   ├── logo/
│   │   ├── school-logo.svg              # Primary brand logo
│   │   └── favicon.svg                  # Browser tab favicon
│   ├── images/
│   │   ├── hero-joyful-learning.svg     # Hero showcase visual
│   │   ├── about-school-campus.svg      # About section campus artwork
│   │   ├── campus-map-illustration.svg  # Fictional decorative map
│   │   ├── academics-*.svg              # 4 program illustrations
│   │   ├── facility-*.svg               # 8 facility illustrations
│   │   ├── activity-*.svg               # 6 activity illustrations
│   │   └── gallery-*.svg                # 8 gallery illustrations
│   └── icons/
│
├── generate-assets.js                   # Node asset generator script
└── README.md                            # Documentation and guidelines
```

---

## 🚀 How to Run & Preview

This project uses standard web technologies with **zero build step or npm installation required**.

### Option 1: Direct Browser Launch
Double-click `index.html` in your file explorer or open it via any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (e.g. Node / VS Code Live Server)
```bash
# Using Node's built-in npx
npx serve .
# Or using Python (if available)
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 📱 Responsive Verification Matrix

The website has been styled and verified across modern viewport breakpoints:
- **1920px & 1440px:** Wide desktop displays with generous whitespace and 4-column grids.
- **1024px & 768px:** Tablet landscape and portrait modes with adapted 2-column grids and touch navigation.
- **430px, 390px, 360px:** High-density mobile screens with touch-friendly drawer, full-width inputs, and zero horizontal overflow.

---

## 📄 License & Attribution
Demonstration project developed for UI/UX portfolio presentation. All names, statistics, testimonials, and geographic references are completely fictional.

