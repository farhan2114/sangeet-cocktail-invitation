# Sangeet & Cocktail Invitation Website 🥂✨

A luxury interactive wedding invitation website created to replicate the Figma prototype design for **Nikhil Reddy & Sneha Reddy's Sangeet & Cocktail Celebration**.

---

## 📁 Project Directory Structure

```text
sangeet-cocktail-invitation/
├── index.html                  # Main invitation web page
├── style.css                   # Luxury styling, gold foil, animations & mobile-first layout
├── script.js                   # Particles, live countdown, Web Audio synthesizer, RSVP & confetti
├── README.md                   # This instruction guide
└── assets/
    └── images/
        ├── bride_photo.jpg     # 📸 REPLACE WITH REAL BRIDE PHOTO
        ├── groom_photo.jpg     # 📸 REPLACE WITH REAL GROOM PHOTO
        ├── couple_transparent.png # Illustrated cartoon couple (hero section)
        ├── couple_original.jpg # Original couple graphic with black background
        ├── disco_ball.png      # Gold mirror disco ball graphic
        ├── venue.jpg           # Fairy-lit lawn & chandelier reception venue
        ├── dancers_gold.png    # Dancing silhouettes at bottom
        └── prototype_reference.png # Original Figma design reference
```

---

## 📸 How to Add the Bride & Groom Photos

When you receive the photos of the bride and groom:

1. **Bride's Photo**:
   - Save the bride's portrait photo as **`bride_photo.jpg`**
   - Place/overwrite it inside the folder: `assets/images/bride_photo.jpg`

2. **Groom's Photo**:
   - Save the groom's portrait photo as **`groom_photo.jpg`**
   - Place/overwrite it inside the folder: `assets/images/groom_photo.jpg`

3. **Recommended Aspect Ratio**:
   - Vertical portrait (approx. 4:5 or 3:4 ratio).
   - Once replaced, refresh `index.html` in your browser and the photos will automatically appear in the gold-trimmed showcase frames with smooth hover zoom and shine animations!

---

## 🎨 How to Customize Texts, Names, or Dates

Open `index.html` in any text editor (VS Code, Notepad, etc.):

- **Couple Names**: Line ~60 (Change `Nikhil Reddy` & `Sneha Reddy`)
- **Degrees / Subtitles**: Lines ~100-120 (Change `M.S (USA)`)
- **Event Date**: Line ~140 (Change `22 November Sunday`)
- **Venue Name**: Line ~155 (Change `The Grand Palace Lawns, Hyderabad`)
- **RSVP Deadline**: Line ~195 (Change `November 10, 2026`)

---

## 🚀 How to View / Run the Website

### Option 1: Direct in Browser
Double-click `index.html` to open it in Chrome, Edge, Safari, or any browser.

### Option 2: Live Local Server
If you have Python installed, open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser or phone!

---

## ✨ Features Included

- **Exact Figma Replication**: Pixel-accurate layout, font styles, gold accents, and section order.
- **Ambient Floating Gold Dust**: Canvas-based golden particle sparkles.
- **Interactive RSVP Form**:
  - Name & WhatsApp/Phone
  - Joyfully Accept / Regretfully Decline toggle
  - Guest counter (+ / -)
  - Dietary preferences (Veg, Non-Veg, Jain)
  - Song request for the DJ
  - Warm wishes message
  - Celebratory gold confetti explosion on submission!
  - Local storage persistence (remembers response).
- **Background Music Player**: Built-in harmonic chimes synthesizer with animated equalizer button.
- **Live Countdown Timer**: Real-time ticker counting down to November 22nd.
- **Calendar & Maps Actions**: One-click Google Calendar invite generator & Google Maps venue locator.
- **Mobile Responsive**: Matches mobile prototype dimensions while rendering a centered luxury presentation on desktop.
