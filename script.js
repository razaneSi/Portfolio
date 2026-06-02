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
    ctx.fillStyle = 'rgba(40, 44, 32, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '11px IBM Plex Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.globalAlpha = Math.random() * 0.35 + 0.05;
      ctx.fillStyle = Math.random() > 0.97 ? '#fff' : '#D2FF00';
      ctx.fillText(char, i * 13, drops[i] * 13);
      if (drops[i] * 13 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    ctx.globalAlpha = 1;
  }

  resizeCanvas();
  let matrixInterval = setInterval(drawMatrix, 65);
  window.addEventListener('resize', resizeCanvas);


  // ── BACKGROUND BLOBS INTERACTIVE MOTION (Lando Norris style) ────────────
  const bgBlobs = document.querySelectorAll('.blob');
  let bgX = 0, bgY = 0, targetBgX = 0, targetBgY = 0;

  document.addEventListener('mousemove', (e) => {
    targetBgX = (e.clientX / window.innerWidth) - 0.5;
    targetBgY = (e.clientY / window.innerHeight) - 0.5;
  });

  (function updateBgBlobs() {
    bgX += (targetBgX - bgX) * 0.05; // smooth lag/lerp
    bgY += (targetBgY - bgY) * 0.05;
    
    bgBlobs.forEach((blob, idx) => {
      const depth = (idx + 1) * 60; // parallax depth
      blob.style.transform = `translate3d(${bgX * depth}px, ${bgY * depth}px, 0)`;
    });
    requestAnimationFrame(updateBgBlobs);
  })();


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

  document.querySelectorAll('a, button, .skill-card, .lang-card, .project-item, .project-art, .badge-img, .area-item').forEach(el => {
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
  document.querySelectorAll('.skills-grid .skill-card, .languages-grid .lang-card, .projects-list .project-item, .area-list .area-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 60) + 'ms';
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


  // ── PROJECT CLICK INTERACTIONS ──────────────────────────────────────────
  // Cryptox Decrypt
  const artCrypto = document.querySelector('.art-crypto');
  if (artCrypto) {
    const hexSpan = artCrypto.querySelectorAll('.hex-grid span');
    const charsHex = '0123456789ABCDEF';
    const originalTexts = Array.from(hexSpan).map(s => s.textContent);
    let isDecrypting = false;
    
    artCrypto.addEventListener('click', () => {
      if (isDecrypting) return;
      isDecrypting = true;
      artCrypto.classList.add('decrypted');
      
      let count = 0;
      const interval = setInterval(() => {
        hexSpan.forEach(span => {
          span.textContent = charsHex[Math.floor(Math.random() * charsHex.length)] + 
                             charsHex[Math.floor(Math.random() * charsHex.length)] + 
                             charsHex[Math.floor(Math.random() * charsHex.length)];
        });
        count++;
        if (count > 10) {
          clearInterval(interval);
          hexSpan.forEach((span, idx) => {
            span.textContent = originalTexts[idx];
          });
          artCrypto.classList.remove('decrypted');
          isDecrypting = false;
        }
      }, 70);
    });
  }

  // VoxKey Recording wave spike
  const artVoice = document.querySelector('.art-voice');
  if (artVoice) {
    let isSpiking = false;
    artVoice.addEventListener('click', () => {
      if (isSpiking) return;
      isSpiking = true;
      artVoice.classList.add('spike');
      setTimeout(() => {
        artVoice.classList.remove('spike');
        isSpiking = false;
      }, 1500);
    });
  }

  // VerifLink Scanner Diagnostic
  const artPhishing = document.querySelector('.art-phishing');
  if (artPhishing) {
    const scanResult = artPhishing.querySelector('.scan-result');
    const confidence = artPhishing.querySelector('.confidence');
    let isScanning = false;
    
    artPhishing.addEventListener('click', () => {
      if (isScanning) return;
      isScanning = true;
      artPhishing.classList.add('scanning');
      scanResult.textContent = 'SCANNING...';
      confidence.textContent = 'HEURISTICS RUNNING';
      
      setTimeout(() => {
        scanResult.textContent = 'MALICIOUS (99.8%)';
        confidence.textContent = 'IP/URL BLACKLIST MATCH';
        
        setTimeout(() => {
          artPhishing.classList.remove('scanning');
          scanResult.textContent = 'PHISHING DETECTED';
          confidence.textContent = 'Confidence: 97.3%';
          isScanning = false;
        }, 1500);
      }, 1500);
    });
  }

  // Frog Compiler Compile trigger
  const artCompiler = document.querySelector('.art-compiler');
  if (artCompiler) {
    let isCompiling = false;
    artCompiler.addEventListener('click', () => {
      if (isCompiling) return;
      isCompiling = true;
      artCompiler.classList.add('compiling');
      setTimeout(() => {
        artCompiler.classList.remove('compiling');
        isCompiling = false;
      }, 1600);
    });
  }


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


  // ── CRYPTOX THEME — CryptoX Project Item Theme Switch ───────────────────
  const cryptoxItem = document.querySelector('.project-item[data-num="01"]');
  if (cryptoxItem) {
    const cryptoxObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cryptoxItem.classList.add('cryptox-theme');
        } else {
          cryptoxItem.classList.remove('cryptox-theme');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -5% 0px'
    });

    cryptoxObserver.observe(cryptoxItem);
  }

})();