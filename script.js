/* ============================
   RAZANE SIGUERDIDJANE — PORTFOLIO JS
   ============================ */

(function () {
  'use strict';

  // ── MATRIX RAIN CANVAS ──────────────────────────────────────────────────
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  const chars = '01アイウエオカキクケコABCDEF0123456789';
  let drops = [];

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const cols = Math.floor(canvas.width / 13);
    drops = new Array(cols).fill(1);
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(8,9,9,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '11px IBM Plex Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.35 + 0.05;
      ctx.fillStyle = Math.random() > 0.97 ? '#fff' : '#c8f135';
      ctx.fillText(char, i * 13, drops[i] * 13);
      if (drops[i] * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    ctx.globalAlpha = 1;
  }

  resizeCanvas();
  let matrixInterval = setInterval(drawMatrix, 65);
  window.addEventListener('resize', resizeCanvas);


  // ── CUSTOM CURSOR ───────────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursorDot');
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + 'px';
    dot.style.top = ty + 'px';
  });

  (function animateCursor() {
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-item, .badge-img, .area-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });


  // ── NAV SCROLL ──────────────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── MOBILE NAV ──────────────────────────────────────────────────────────
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });


  // ── SCROLL REVEAL ───────────────────────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  // Stagger children within groups
  document.querySelectorAll('.skills-grid .skill-card, .projects-list .project-item, .area-list .area-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 70) + 'ms';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));


  // ── ACTIVE NAV LINKS ────────────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          const active = a.getAttribute('href') === `#${id}`;
          a.style.color = active ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));


  // ── WAVEFORM ANIMATION ──────────────────────────────────────────────────
  function randomizeWaveform() {
    document.querySelectorAll('.waveform span').forEach(bar => {
      bar.style.setProperty('--h', Math.floor(Math.random() * 80 + 10) + '%');
    });
  }
  setInterval(randomizeWaveform, 900);


  // ── HERO NAME GLITCH ────────────────────────────────────────────────────
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    setInterval(() => {
      if (Math.random() > 0.93) {
        const dx = (Math.random() - 0.5) * 5;
        const dy = (Math.random() - 0.5) * 2;
        heroName.style.textShadow = `${dx}px ${dy}px 0 var(--accent), ${-dx}px ${-dy}px 0 var(--accent-2)`;
        setTimeout(() => { heroName.style.textShadow = ''; }, 70);
      }
    }, 2200);
  }


  // ── URL BAR TYPING EFFECT ───────────────────────────────────────────────
  const urlText = document.querySelector('.url-text');
  if (urlText) {
    const urls = [
      'https://suspicious-site.xyz/phish...',
      'http://bank-login.fake-domain.com',
      'https://verify-account.xyz/click...',
      'http://update-payment.info/urgent',
    ];
    let urlIdx = 0;
    setInterval(() => {
      urlIdx = (urlIdx + 1) % urls.length;
      urlText.textContent = urls[urlIdx];
    }, 2600);
  }


  // ── PROJECT ART HOVER TILT ──────────────────────────────────────────────
  document.querySelectorAll('.project-art').forEach(art => {
    art.addEventListener('mousemove', (e) => {
      const rect = art.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      art.style.transform = `perspective(500px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
    });
    art.addEventListener('mouseleave', () => { art.style.transform = ''; });
  });


  // ── SMOOTH SCROLL ───────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });


  // ── PAUSE MATRIX WHEN TAB HIDDEN ────────────────────────────────────────
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(matrixInterval);
    } else {
      matrixInterval = setInterval(drawMatrix, 65);
    }
  });

})();