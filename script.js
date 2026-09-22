/**
 * LUXURY SANGEET & COCKTAIL INVITATION SCRIPT
 * Ambient Particles, Audio Synthesizer, Calendar (.ics / Google), Map Navigation, RSVP & Confetti
 */

/* ==========================================================================
   [EDITABLE CONFIGURATION] EVENT DETAILS, GOOGLE CALENDAR & MAPS
   Edit the values below to easily update the event details everywhere!
   ========================================================================== */

/* ==========================================================================
   [EDITABLE CONFIGURATION] SUPABASE & GOOGLE SHEETS SYNC
   Paste your Supabase credentials and/or Google Sheets Webhook URL below!
   ========================================================================== */
const SUPABASE_CONFIG = {
  // 1. Your Supabase Project URL (e.g. "https://xyzcompany.supabase.co")
  url: "",
  // 2. Your Supabase Anon Public API Key (starts with "eyJ...")
  anonKey: "",
  // 3. The Supabase table name
  tableName: "rsvps"
};

const GOOGLE_SHEETS_CONFIG = {
  // Google Apps Script Web App URL (starts with "https://script.google.com/macros/s/.../exec")
  webhookUrl: "https://script.google.com/macros/s/AKfycbxRF51hY_p4I2CnwZRz0U-SH2vrAxxGDUpUGgNlZIaqjDKJdPAnmihVOQYH7-yvw7PkGg/exec"
};

const EVENT_CONFIG = {
  // [EDIT: Event Name & Description]
  eventName: "Sangeet & Cocktails - Nikhil & Sreeja",
  eventDescription: "Celebrate the Sangeet & Cocktails night with Nikhil & Sreeja! An evening of music, dance, and celebration.",
  
  // [EDIT: Date & Time in YYYYMMDDTHHMMSS format]
  // Example: 20261121T190000 = November 21, 2026 at 7:00 PM (19:00)
  startDateTime: "20261121T190000",
  endDateTime: "20261122T010000",
  
  // [EDIT: Venue Name, Address & Google Maps Direction Link]
  venueName: "Frisco Hall Event Center",
  venueAddress: "Frisco Hall Event Center, 5353 Independence Pkwy, Frisco, TX 75035",
  googleMapsUrl: "https://maps.app.goo.gl/Cj8Fz5GFFRMupB5B7"
};

/**
 * Opens Google Calendar with prefilled event details
 */
function addToGoogleCalendar() {
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.eventName)}&dates=${EVENT_CONFIG.startDateTime}/${EVENT_CONFIG.endDateTime}&details=${encodeURIComponent(EVENT_CONFIG.eventDescription)}&location=${encodeURIComponent(EVENT_CONFIG.venueAddress)}`;
  window.open(gcalUrl, '_blank');
}

/**
 * Opens Google Maps directions to the venue
 */
function initCalendarAndMapButtons() {
  const gcalBtn = document.getElementById('addGCalBtn');
  const mapBtn = document.getElementById('openMapBtn');
  
  if (gcalBtn) {
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.eventName)}&dates=${EVENT_CONFIG.startDateTime}/${EVENT_CONFIG.endDateTime}&details=${encodeURIComponent(EVENT_CONFIG.eventDescription)}&location=${encodeURIComponent(EVENT_CONFIG.venueAddress)}`;
    gcalBtn.href = gcalUrl;
  }
  
  if (mapBtn) {
    mapBtn.href = EVENT_CONFIG.googleMapsUrl;
  }
}

function openLocationMap() {
  window.open(EVENT_CONFIG.googleMapsUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollReveal();
  initAudio();
  initKeyboardNav();
  initPills();
  initEventsCarousel();
  checkSavedRsvp();
  initCalendarAndMapButtons();
});

/* ==========================================================================
   0. CELEBRATION SCROLL & AUDIO TRIGGER
   ========================================================================== */
function scrollToCelebrate(e) {
  if (e) e.preventDefault();
  const target = document.getElementById('celebrate');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
  if (!isAudioPlaying) {
    toggleAudio();
  }
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 75,
      spread: 110,
      origin: { y: 0.55, x: 0.5 },
      colors: ['#38b6ff', '#9b51e0', '#d4af37', '#ffffff', '#7928ca'],
      ticks: 240,
      scalar: 1.15
    });
  }
}

/* ==========================================================================
   1. KEYBOARD & SNAP NAVIGATION
   ========================================================================== */
function initKeyboardNav() {
  const sections = document.querySelectorAll('.section');

  window.addEventListener('keydown', (e) => {
    // Don't intercept when user is typing in form inputs
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      scrollToRelativeSection(1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToRelativeSection(-1);
    }
  });

  function scrollToRelativeSection(delta) {
    const sectionArr = Array.from(sections);
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    
    let currentIdx = 0;
    sectionArr.forEach((sec, idx) => {
      const top = sec.offsetTop;
      if (scrollPos >= top - windowH * 0.3) {
        currentIdx = idx;
      }
    });

    const targetIdx = Math.max(0, Math.min(sectionArr.length - 1, currentIdx + delta));
    sectionArr[targetIdx].scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   2. AMBIENT CELESTIAL PARTICLES (SKY BLUE, PURPLE & GOLD DUST)
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleColors = [
    { rgb: '212, 175, 55', glow: 'rgba(255, 235, 150, 0.8)' },   // Warm Gold
    { rgb: '56, 182, 255', glow: 'rgba(56, 182, 255, 0.9)' },    // Sky Blue
    { rgb: '155, 81, 224', glow: 'rgba(195, 125, 255, 0.85)' },  // Purple Glow
    { rgb: '255, 255, 255', glow: 'rgba(255, 255, 255, 0.9)' }   // Diamond Starlight
  ];

  const particleCount = 60;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.2 + 0.6;
      this.speedY = -(Math.random() * 0.45 + 0.12);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.65 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulseDirection = 1;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;

      this.alpha += this.pulseSpeed * this.pulseDirection;
      if (this.alpha > 0.85) this.pulseDirection = -1;
      if (this.alpha < 0.15) this.pulseDirection = 1;

      if (this.y < -10) this.y = height + 10;
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.rgb}, ${this.alpha})`;
      ctx.shadowBlur = 9;
      ctx.shadowColor = this.color.glow;
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. SCROLL REVEAL OBSERVER
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. CALENDAR & VENUE ACTIONS
   ========================================================================== */
function addToGoogleCalendar() {
  const title = encodeURIComponent("Sangeet & Cocktail | Nikhil & Sreeja Reddy");
  const details = encodeURIComponent("Join us for an enchanting evening filled with Music, Dance, Cocktails as we celebrate this beautiful beginning together!");
  const location = encodeURIComponent("The Grand Palace Lawns, Hyderabad");
  const dates = "20261122T133000Z/20261122T193000Z";
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  window.open(url, '_blank');
}

function downloadIcsFile() {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sangeet Cocktail Celebration//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'SUMMARY:Sangeet & Cocktail | Nikhil & Sreeja Reddy',
    'DESCRIPTION:Join us for an enchanting evening filled with Music\\, Dance\\, Cocktails as we celebrate this beautiful beginning together!',
    'LOCATION:The Grand Palace Lawns\\, Hyderabad',
    'DTSTART:20261122T133000Z',
    'DTEND:20261122T193000Z',
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Nikhil_Sreeja_Sangeet_Cocktails.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function initCalendarAndMapButtons() {
  const gcalBtn = document.getElementById('addGCalBtn');
  const mapBtn = document.getElementById('openMapBtn');
  
  if (gcalBtn) {
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_CONFIG.eventName)}&dates=${EVENT_CONFIG.startDateTime}/${EVENT_CONFIG.endDateTime}&details=${encodeURIComponent(EVENT_CONFIG.eventDescription)}&location=${encodeURIComponent(EVENT_CONFIG.venueAddress)}`;
    gcalBtn.href = gcalUrl;
  }
  
  if (mapBtn) {
    mapBtn.href = EVENT_CONFIG.googleMapsUrl;
  }
}

function openLocationMap() {
  const query = encodeURIComponent("The Grand Palace Lawns, Hyderabad");
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
}

/* ==========================================================================
   5. INTERACTIVE RSVP FORM & CELEBRATION CONFETTI
   ========================================================================== */
function initPills() {
  const dietOptions = document.querySelectorAll('.diet-option');
  dietOptions.forEach(option => {
    option.addEventListener('click', () => {
      dietOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });
}

function handleAttendanceChange(isAttending) {
  const acceptPill = document.getElementById('acceptPill');
  const declinePill = document.getElementById('declinePill');
  const countGroup = document.getElementById('guestCountGroup');
  const mealGroup = document.getElementById('mealGroup');

  if (isAttending) {
    acceptPill.classList.add('active');
    declinePill.classList.remove('active');
    if (countGroup) countGroup.style.display = 'flex';
    if (mealGroup) mealGroup.style.display = 'flex';
  } else {
    declinePill.classList.add('active');
    acceptPill.classList.remove('active');
    if (countGroup) countGroup.style.display = 'none';
    if (mealGroup) mealGroup.style.display = 'none';
  }
}

function adjustCount(delta) {
  const input = document.getElementById('guestCount');
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, Math.min(10, val + delta));
  input.value = val;
}

async function handleRsvpSubmit(event) {
  event.preventDefault();
  const form = document.getElementById('rsvpForm');
  const submitBtn = document.getElementById('submitRsvpBtn');
  const formData = new FormData(form);

  const firstName = (formData.get('firstName') || '').trim();
  const lastName = (formData.get('lastName') || '').trim();
  const fullName = `${firstName} ${lastName}`.trim() || 'Valued Guest';

  const rsvpData = {
    first_name: firstName,
    last_name: lastName,
    full_name: fullName,
    email: (formData.get('guestEmail') || '').trim(),
    attendance: formData.get('attendance') || 'Attending',
    guests: parseInt(formData.get('guestCount')) || 1,
    diet: formData.get('diet') || 'Veg',
    wishes: (formData.get('wishes') || '').trim(),
    submitted_at: new Date().toISOString()
  };

  // Immediate LocalStorage backup so data is never lost
  localStorage.setItem('sangeet_rsvp', JSON.stringify(rsvpData));

  // Visual loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="btn-text">Submitting RSVP...</span> <span class="btn-icon">⏳</span>';
  }

  // 1. Submit to Supabase Database (if configured)
  if (SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey) {
    try {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.tableName}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          first_name: rsvpData.first_name,
          last_name: rsvpData.last_name,
          full_name: rsvpData.full_name,
          email: rsvpData.email,
          attendance: rsvpData.attendance,
          guests: rsvpData.guests,
          diet: rsvpData.diet,
          wishes: rsvpData.wishes,
          created_at: rsvpData.submitted_at
        })
      });
      console.log('✅ RSVP successfully synced to Supabase database!');
    } catch (err) {
      console.warn('⚠️ Supabase sync error:', err);
    }
  }

  // 2. Submit to Google Sheets (if configured via Apps Script Webhook)
  if (GOOGLE_SHEETS_CONFIG.webhookUrl) {
    try {
      await fetch(GOOGLE_SHEETS_CONFIG.webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(rsvpData)
      });
      console.log('✅ RSVP successfully synced to Google Sheets!');
    } catch (err) {
      console.warn('⚠️ Google Sheets sync error:', err);
    }
  }

  // Reset button state
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span class="btn-text">Confirm RSVP</span> <span class="btn-icon">✨</span>';
  }

  triggerConfetti();
  displayRsvpSuccess({
    name: fullName,
    email: rsvpData.email,
    attendance: rsvpData.attendance,
    guests: rsvpData.guests,
    diet: rsvpData.diet,
    wishes: rsvpData.wishes
  });
}

function displayRsvpSuccess(data) {
  const form = document.getElementById('rsvpForm');
  const successBox = document.getElementById('rsvpSuccessBox');
  const summaryCard = document.getElementById('rsvpSummaryCard');
  const msgEl = document.getElementById('successMessage');

  if (!form || !successBox) return;

  form.style.display = 'none';
  successBox.style.display = 'block';

  if (data.attendance === 'Attending') {
    msgEl.innerHTML = `Dearest <strong>${data.name}</strong>, we are thrilled you'll be joining us! See you on the dance floor!`;
    summaryCard.innerHTML = `
      <div><strong>Guests:</strong> ${data.guests} person(s)</div>
      <div><strong>Email:</strong> ${data.email}</div>
      <div><strong>Meal Preference:</strong> ${data.diet === 'Veg' ? '🌱 Vegetarian' : '🍗 Non-Veg'}</div>
      ${data.wishes ? `<div><strong>Your Blessings:</strong> <em>"${data.wishes}"</em></div>` : ''}
    `;
  } else {
    msgEl.innerHTML = `Dear <strong>${data.name}</strong>, we will truly miss you at the celebration, but your warm blessings mean the world to us!`;
    summaryCard.innerHTML = `
      <div><strong>Status:</strong> Regretfully Declining</div>
      <div><strong>Email:</strong> ${data.email}</div>
      ${data.wishes ? `<div><strong>Your Blessings:</strong> <em>"${data.wishes}"</em></div>` : ''}
    `;
  }
}

function editRsvp() {
  const form = document.getElementById('rsvpForm');
  const successBox = document.getElementById('rsvpSuccessBox');
  if (form && successBox) {
    form.style.display = 'flex';
    successBox.style.display = 'none';
  }
}

function checkSavedRsvp() {
  const saved = localStorage.getItem('sangeet_rsvp');
  if (saved) {
    try {
      const data = JSON.parse(saved);
      displayRsvpSuccess(data);
    } catch (e) {
      console.warn('Could not parse saved RSVP', e);
    }
  }
}

function triggerConfetti() {
  if (typeof confetti === 'function') {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#d4af37', '#f7df8b', '#ffffff', '#e8ca92', '#b38528'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
}

/* ==========================================================================
   6. AMBIENT CELEBRATION AUDIO
   Built-in Ambient Indian Chimes / Sitar Harmonics synthesizer
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let ambientInterval = null;

function initAudio() {
  const btn = document.getElementById('musicBtn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    toggleAudio();
  });
}

function toggleAudio() {
  const btn = document.getElementById('musicBtn');
  const label = document.getElementById('audioLabel');

  if (!isAudioPlaying) {
    startAmbientMelody();
    isAudioPlaying = true;
    btn.classList.add('playing');
    label.textContent = 'Pause Music';
  } else {
    stopAmbientMelody();
    isAudioPlaying = false;
    btn.classList.remove('playing');
    label.textContent = 'Play Music';
  }
}

function startAmbientMelody() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const notes = [277.18, 311.13, 349.23, 415.30, 466.16, 554.37, 622.25, 698.46];
    let noteIdx = 0;

    function playPluck(freq, duration = 2.4, gainLevel = 0.08) {
      if (!audioCtx || audioCtx.state !== 'running') return;
      const now = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(gainLevel, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    }

    playPluck(notes[0], 3.5, 0.06);
    playPluck(notes[3], 3.5, 0.05);
    playPluck(notes[5], 3.5, 0.04);

    ambientInterval = setInterval(() => {
      const melodyPattern = [0, 3, 2, 4, 5, 4, 2, 3, 1, 0];
      const n = notes[melodyPattern[noteIdx % melodyPattern.length]];
      playPluck(n, 2.8, 0.07);
      if (noteIdx % 3 === 0) {
        playPluck(notes[0] / 2, 3.5, 0.05);
      }
      noteIdx++;
    }, 750);

  } catch (err) {
    console.log('Web Audio could not start automatically', err);
  }
}

function stopAmbientMelody() {
  if (ambientInterval) {
    clearInterval(ambientInterval);
    ambientInterval = null;
  }
  if (audioCtx && audioCtx.state === 'running') {
    audioCtx.suspend();
  }
}

/* ==========================================================================
   7. EVENING HIGHLIGHTS AUTO CAROUSEL (2-SECOND AUTO ROTATION)
   Matches Reference Layout & Timing
   ========================================================================== */
let currentEventIndex = 0;
let carouselTimer = null;
const eventSlideDuration = 2000; // 2 seconds per slide

function initEventsCarousel() {
  const container = document.getElementById('eventsCarousel');
  if (!container) return;

  // Start 2-second auto rotation
  startCarouselTimer();

  // Pause on hover or touch, resume when mouse leaves
  container.addEventListener('mouseenter', stopCarouselTimer);
  container.addEventListener('mouseleave', startCarouselTimer);
  container.addEventListener('touchstart', stopCarouselTimer, { passive: true });
  container.addEventListener('touchend', startCarouselTimer, { passive: true });
}

function startCarouselTimer() {
  stopCarouselTimer();
  carouselTimer = setInterval(() => {
    nextEventSlide();
  }, eventSlideDuration);
}

function stopCarouselTimer() {
  if (carouselTimer) {
    clearInterval(carouselTimer);
    carouselTimer = null;
  }
}

function goToEventSlide(index) {
  const slides = document.querySelectorAll('.event-card-slide');
  const indicators = document.querySelectorAll('.indicator-dash');
  if (!slides.length) return;

  const total = slides.length;
  currentEventIndex = (index + total) % total;

  slides.forEach((slide, idx) => {
    if (idx === currentEventIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  indicators.forEach((ind, idx) => {
    if (idx === currentEventIndex) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });

  // Restart timer after user interaction
  startCarouselTimer();
}

function nextEventSlide() {
  goToEventSlide(currentEventIndex + 1);
}

function prevEventSlide() {
  goToEventSlide(currentEventIndex - 1);
}

