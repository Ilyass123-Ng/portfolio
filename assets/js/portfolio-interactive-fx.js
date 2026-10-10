/**
 * ============================================================================
 * Portfolio Interactive FX Engine
 * Features:
 * 1. 3D Card Tilt & Holographic Glare (Perspective Physics)
 * 2. Hero Interactive Cyber-Particle Grid (Canvas Animation)
 * 3. Web Audio Micro-Interactions (Futuristic Clicks & Tones)
 * 4. Smooth Inertia Navigation & Scroll
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Web Audio API - Futuristic Sound Synthesizer (Zero External MP3s)
     ========================================================================== */
  class SoundFX {
    constructor() {
      this.ctx = null;
      this.enabled = localStorage.getItem('portfolio_sound_enabled') === 'true'; // Default muted until enabled or toggled
      this.initButton();
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playClick() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    }

    playHover() {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.05);

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    }

    playToggle(state) {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      const startFreq = state ? 440 : 660;
      const endFreq = state ? 880 : 330;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    }

    initButton() {
      const btn = document.getElementById('ui-sound-toggle-btn');
      if (!btn) return;

      const updateUI = () => {
        btn.setAttribute('data-active', this.enabled ? 'true' : 'false');
        btn.setAttribute('aria-pressed', this.enabled ? 'true' : 'false');
        btn.classList.toggle('sound-active', this.enabled);
        const icon = btn.querySelector('#ui-sound-icon') || btn.querySelector('i');
        if (icon) {
          icon.className = this.enabled ? 'ph-bold ph-speaker-high' : 'ph-bold ph-speaker-slash';
        }
      };

      updateUI();

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.enabled = !this.enabled;
        localStorage.setItem('portfolio_sound_enabled', this.enabled.toString());
        updateUI();
        this.playToggle(this.enabled);
      });

      // Bind hover and clicks to interactive elements
      document.addEventListener('mouseover', (e) => {
        const target = e.target.closest('a, button, .bento-card, .brand-item, .portfolio-three-item');
        if (target && target !== btn) {
          this.playHover();
        }
      });

      document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button, .portfolio-gallery-btn, .slideshow-segment');
        if (target && target !== btn) {
          this.playClick();
        }
      });
    }
  }

  /* ==========================================================================
     2. 3D Interactive Card Tilt with Holographic Glare
     ========================================================================== */
  function init3DTiltCards() {
    const cards = document.querySelectorAll(
      '.portfolio-three-item, .bento-card, .about-portrait-card, .brand-item, .banner-three-left, .banner-three-counter-item'
    );

    cards.forEach((card) => {
      // Add glare layer if not present
      let glare = card.querySelector('.holographic-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'holographic-glare';
        card.style.position = card.style.position || 'relative';
        card.appendChild(glare);
      }

      let bounds = null;

      card.addEventListener('mouseenter', () => {
        bounds = card.getBoundingClientRect();
      });

      card.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        const xPct = (mouseX / bounds.width) - 0.5;
        const yPct = (mouseY / bounds.height) - 0.5;

        const rotateX = -yPct * 12; // deg
        const rotateY = xPct * 12;  // deg

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

        // Glare shine reflection
        if (glare) {
          const glareX = (mouseX / bounds.width) * 100;
          const glareY = (mouseY / bounds.height) * 100;
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(242, 196, 106, 0.25) 0%, rgba(174, 172, 120, 0.1) 35%, transparent 70%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        if (glare) {
          glare.style.opacity = '0';
          glare.style.transition = 'opacity 0.5s ease';
        }
        setTimeout(() => {
          card.style.transition = '';
          if (glare) glare.style.transition = '';
        }, 500);
      });
    });
  }

  /* ==========================================================================
     3. Hero Interactive Cyber-Particle Grid (Canvas)
     ========================================================================== */
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);

    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2.5;
            this.y -= (dy / dist) * force * 2.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242, 196, 106, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(174, 172, 120, ${0.28 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================================================================
     4. Smooth Inertia Anchor Scrolling
     ========================================================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#!')) return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  /* ==========================================================================
     DOM Ready Bootstrapper
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    new SoundFX();
    init3DTiltCards();
    initHeroParticles();
    initSmoothScroll();
  });
})();
