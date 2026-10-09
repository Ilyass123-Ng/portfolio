/**
 * Portfolio Anime.js Interactive Engine (v4)
 * Author: Ilyas Ennajy (<IE />)
 * Features:
 *  - Auto-cycling Project Slideshow (~1.2s interval) with Anime.js transitions
 *  - Interactive Progress Story Segments (Direct Click/Hover to ANY photo)
 *  - Prev / Next Quick Nav Controls & Counter Badges
 *  - 3D Interactive Tilt & Spring Physics on Project Cards
 *  - Spring Micro-Interactions on Tech Badges & Buttons
 *  - Cinematic Fullscreen Lightbox Modal with Thumbnails Navigation
 *  - Keyboard Accessibility & Touch Navigation
 */

(function () {
  "use strict";

  // Helper safe animate function for Anime.js v4 & v3 compatibility
  function runAnime(target, params) {
    if (window.anime && typeof window.anime.animate === "function") {
      return window.anime.animate(target, params);
    } else if (typeof window.anime === "function") {
      return window.anime(Object.assign({ targets: target }, params));
    }
    return null;
  }

  // Gallery Data for Ilyas's Real Projects (All Screenshots with Landing Page as #1)
  const PROJECTS_DATA = {
    "soul-smile": {
      title: "Soul Smile — Dental Clinic & Healthcare ERP",
      category: "Full-Stack ERP • Glassmorphic UI • Medical Billing & AMO",
      github: "https://github.com/Ilyass123-Ng",
      screens: [
        {
          src: "assets/images/projects/soul-smile/shot-1.webp",
          caption: "Hero Landing Page — Infrastructure Clinique 3D Hologram & Prise de Rendez-vous",
        },
        {
          src: "assets/images/projects/soul-smile/shot-2.webp",
          caption: "Interface Dentiste (Dr. Ayoub) — Agenda Clinique & Consultations",
        },
        {
          src: "assets/images/projects/soul-smile/shot-3.webp",
          caption: "Interface Secrétariat — Gestion des Fiches Patients & Échéanciers",
        },
        {
          src: "assets/images/projects/soul-smile/shot-4.webp",
          caption: "Admin Control Center — Gestion Multi-Cliniques, Praticiens & Activités",
        },
        {
          src: "assets/images/projects/soul-smile/shot-5.webp",
          caption: "Espace Patient B2C — Dossier Médical, Historique & Prochains RDV",
        },
      ],
    },
    "booking-hotels": {
      title: "Booking Hotels Maroc (LuxeStay) — Reservation Platform",
      category: "Full-Stack Hospitality • MySQL • Multi-City Destinations",
      github: "https://github.com/Ilyass123-Ng/Booking-Hotels",
      screens: [
        {
          src: "assets/images/projects/booking-hotels/shot-1.webp",
          caption: "Hero Landing Page — LuxeStay Maroc, Découvrez nos hôtels d'exception",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-2.webp",
          caption: "Sélection Exclusive — Pourquoi choisir LuxeStay & Engagements",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-3.webp",
          caption: "Catalogue des Hôtels — Tarification en MAD (Agadir, Marrakech, Essaouira)",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-4.webp",
          caption: "Sélection d'Établissements — Palais Berbère, Casa Perleta, Fairmont Tanger",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-5.webp",
          caption: "Architecture & Patrimoine — Riads traditionnels et hôtels de luxe",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-6.webp",
          caption: "Recherche & Filtres Avancés — Par ville, dates de séjour et budget",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-7.webp",
          caption: "Fiche Détail Établissement — Présentation, services et localisation",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-8.webp",
          caption: "Choix des Chambres & Suites — Vue sur mer, suites exécutives et tarifs",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-9.webp",
          caption: "Tunnel de Réservation — Vérification des disponibilités en temps réel",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-10.webp",
          caption: "Confirmation & Facturation — Récapitulatif clair en Dirhams (MAD)",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-11.webp",
          caption: "Espace Voyageur — Gestion des séjours et historique des réservations",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-12.webp",
          caption: "Avis Clients Certifiés & Conciergerie 24/7",
        },
      ],
    },
    novabank: {
      title: "NovaBank — FinTech Banking Dashboard",
      category: "Next.js 16 • Redux Toolkit • TypeScript • Bank Al-Maghrib Flow",
      github: "https://github.com/Ilyass123-Ng/tp-compt-bank-redux",
      screens: [
        {
          src: "assets/images/projects/novabank/shot-1.webp",
          caption: "Tableau de Bord Trésorerie — Solde en temps réel & Garantie Bank Al-Maghrib",
        },
        {
          src: "assets/images/projects/novabank/shot-2.webp",
          caption: "Carte Visa Infinite & Historique — Salaires, Marjane Market & RIB Normalisé",
        },
        {
          src: "assets/images/projects/novabank/shot-3.webp",
          caption: "Opérations de Financement — Dépôts, virements express et audit comptable",
        },
        {
          src: "assets/images/projects/novabank/shot-4.webp",
          caption: "Simulateur de Flux — Injection de scénarios de trésorerie (1 Clic)",
        },
        {
          src: "assets/images/projects/novabank/shot-5.webp",
          caption: "Analyse Budgétaire — Règle 50/30/20 & Épargne automatisée",
        },
        {
          src: "assets/images/projects/novabank/shot-6.webp",
          caption: "Sécurité Cryptographique — Verrouillage carte et code PIN dynamique",
        },
      ],
    },
    "commerce-core": {
      title: "CommerceCore — Modular E-Commerce Engine",
      category: "TypeScript • Multi-Step Checkout • Order Fulfillment • COD",
      github: "https://github.com/Ilyass123-Ng",
      screens: [
        {
          src: "assets/images/projects/commerce-core/shot-1.webp",
          caption: "Tableau de Bord E-Commerce — Ventes & Revenus par Ville en MAD (Tanger, Casa, Rabat)",
        },
        {
          src: "assets/images/projects/commerce-core/shot-2.webp",
          caption: "Checkout Multi-Étapes — Choix du mode de livraison Express & Panier en MAD",
        },
        {
          src: "assets/images/projects/commerce-core/shot-3.webp",
          caption: "Détail de Commande — Livraison à Tanger (Maroc), Récapitulatif & Suivi",
        },
        {
          src: "assets/images/projects/commerce-core/shot-4.webp",
          caption: "Validation de Commande — Calcul automatique des frais de port et TVA",
        },
        {
          src: "assets/images/projects/commerce-core/shot-5.webp",
          caption: "Gestion des Adresses Clients & Informations de facturation",
        },
        {
          src: "assets/images/projects/commerce-core/shot-6.webp",
          caption: "Mode de Paiement — Paiement à la livraison (Cash on Delivery)",
        },
        {
          src: "assets/images/projects/commerce-core/shot-7.webp",
          caption: "Fiche Produit Détaillée — Galerie photos, options et commande directe",
        },
        {
          src: "assets/images/projects/commerce-core/shot-8.webp",
          caption: "Gestion des Commandes — Récapitulatif PDF imprimable",
        },
      ],
    },
  };

  // State registry for card slideshows
  const cardStates = {};

  document.addEventListener("DOMContentLoaded", function () {
    initCardSlideshows();
    initGalleryModal();
    initProjectCardPhysics();
    initBadgeSprings();
    initButtonMagnetics();
  });

  // =========================================================================
  // 1. Interactive Auto-Cycling Card Slideshows (~1.2s Interval)
  // =========================================================================
  function initCardSlideshows() {
    const projectCards = document.querySelectorAll(".portfolio-three-item");

    projectCards.forEach((card) => {
      const thumb = card.querySelector(".portfolio-thumb");
      if (!thumb) return;

      // Extract project key from link or data attribute
      const link = thumb.querySelector("a[data-open-gallery]");
      if (!link) return;
      const projKey = link.getAttribute("data-open-gallery");
      const data = PROJECTS_DATA[projKey];
      if (!data || !data.screens || !data.screens.length) return;

      // Initialize state
      cardStates[projKey] = {
        currentIndex: 0,
        isPaused: false,
        intervalId: null,
        screens: data.screens,
      };

      // Wrap thumb content into slideshow container
      thumb.classList.add("project-slideshow-widget");

      // Inject Slideshow UI:
      //  - Top: Segmented Story Progress Bars (Click/Hover to ANY photo)
      //  - Controls: Prev & Next buttons
      //  - Bottom: Current photo caption & counter pill
      const segmentsHTML = data.screens
        .map(
          (_, i) =>
            `<button type="button" class="slideshow-segment ${i === 0 ? "active" : ""}" data-seg-idx="${i}" title="Photo ${i + 1} / ${data.screens.length}"></button>`
        )
        .join("");

      const controlsHTML = `
        <div class="slideshow-top-bar">
          <div class="slideshow-segments-wrap">${segmentsHTML}</div>
          <span class="slideshow-counter-badge" id="counter-${projKey}">
            <span class="counter-dot"></span> 1/${data.screens.length}
          </span>
        </div>
        <button type="button" class="slideshow-nav-btn prev-btn" data-proj="${projKey}" data-dir="-1" aria-label="Photo précédente">
          <i class="ph ph-caret-left"></i>
        </button>
        <button type="button" class="slideshow-nav-btn next-btn" data-proj="${projKey}" data-dir="1" aria-label="Photo suivante">
          <i class="ph ph-caret-right"></i>
        </button>
        <div class="slideshow-bottom-bar">
          <span class="slideshow-caption-text" id="caption-${projKey}">
            ${data.screens[0].caption}
          </span>
          <span class="slideshow-hint"><i class="ph ph-hand-tap"></i> Cliquez pour explorer</span>
        </div>
      `;

      thumb.insertAdjacentHTML("beforeend", controlsHTML);

      // Event: Segment hover / click to jump to ANY photo
      const segments = thumb.querySelectorAll(".slideshow-segment");
      segments.forEach((seg) => {
        seg.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const targetIdx = parseInt(seg.getAttribute("data-seg-idx"), 10);
          switchCardSlide(projKey, targetIdx);
        });
        seg.addEventListener("mouseenter", () => {
          const targetIdx = parseInt(seg.getAttribute("data-seg-idx"), 10);
          switchCardSlide(projKey, targetIdx);
        });
      });

      // Event: Prev / Next Buttons
      thumb.querySelector(".slideshow-nav-btn.prev-btn").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        stepCardSlide(projKey, -1);
      });
      thumb.querySelector(".slideshow-nav-btn.next-btn").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        stepCardSlide(projKey, 1);
      });

      // Pause on mouse enter, resume on mouse leave
      thumb.addEventListener("mouseenter", () => {
        cardStates[projKey].isPaused = true;
      });
      thumb.addEventListener("mouseleave", () => {
        cardStates[projKey].isPaused = false;
      });

      // Start Auto-Cycling (~1.3s interval)
      startAutoCycle(projKey);
    });
  }

  function startAutoCycle(projKey) {
    const state = cardStates[projKey];
    if (!state) return;

    if (state.intervalId) clearInterval(state.intervalId);

    // 1000ms (1s) auto-cycling as requested
    state.intervalId = setInterval(() => {
      if (!state.isPaused) {
        stepCardSlide(projKey, 1);
      }
    }, 1000);
  }

  function stepCardSlide(projKey, delta) {
    const state = cardStates[projKey];
    if (!state) return;
    const nextIdx = (state.currentIndex + delta + state.screens.length) % state.screens.length;
    switchCardSlide(projKey, nextIdx);
  }

  function switchCardSlide(projKey, targetIdx) {
    const state = cardStates[projKey];
    if (!state || targetIdx === state.currentIndex) return;

    state.currentIndex = targetIdx;
    const targetScreen = state.screens[targetIdx];

    const thumb = document.querySelector(`.portfolio-three-item a[data-open-gallery="${projKey}"]`)?.closest(".portfolio-thumb");
    if (!thumb) return;

    const img = thumb.querySelector("img");
    const counter = thumb.querySelector(`#counter-${projKey}`);
    const caption = thumb.querySelector(`#caption-${projKey}`);
    const segments = thumb.querySelectorAll(".slideshow-segment");

    // Anime.js smooth transition
    runAnime(img, {
      opacity: [1, 0.4],
      scale: [1, 0.98],
      duration: 160,
      ease: "outQuad",
    });

    setTimeout(() => {
      img.src = targetScreen.src;

      runAnime(img, {
        opacity: [0.4, 1],
        scale: [0.98, 1],
        duration: 280,
        ease: "outQuad",
      });

      if (counter) {
        counter.innerHTML = `<span class="counter-dot"></span> ${targetIdx + 1}/${state.screens.length}`;
      }
      if (caption) {
        caption.textContent = targetScreen.caption;
      }

      // Update segment highlights
      segments.forEach((seg, i) => {
        if (i === targetIdx) {
          seg.classList.add("active");
          runAnime(seg, {
            scaleY: [1, 1.4, 1],
            duration: 300,
            ease: "outBack",
          });
        } else {
          seg.classList.remove("active");
        }
      });
    }, 160);
  }

  // =========================================================================
  // 2. Interactive 3D Card Physics & Micro-Interactions
  // =========================================================================
  function initProjectCardPhysics() {
    const thumbs = document.querySelectorAll(".portfolio-three-item .portfolio-thumb");
    thumbs.forEach((thumb) => {
      thumb.style.transformStyle = "preserve-3d";
      thumb.style.perspective = "1200px";

      thumb.addEventListener("mousemove", (e) => {
        const rect = thumb.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        runAnime(thumb, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 300,
          ease: "outQuad",
        });
      });

      thumb.addEventListener("mouseleave", () => {
        runAnime(thumb, {
          rotateX: 0,
          rotateY: 0,
          duration: 500,
          ease: "outElastic(1, .6)",
        });
      });
    });
  }

  function initBadgeSprings() {
    const badges = document.querySelectorAll(".portfolio-three-list li span");
    badges.forEach((badge) => {
      badge.style.display = "inline-block";
      badge.addEventListener("mouseenter", () => {
        runAnime(badge, {
          scale: 1.08,
          translateY: -2,
          duration: 350,
          ease: "outBack",
        });
      });
      badge.addEventListener("mouseleave", () => {
        runAnime(badge, {
          scale: 1,
          translateY: 0,
          duration: 300,
          ease: "outQuad",
        });
      });
    });
  }

  function initButtonMagnetics() {
    const btns = document.querySelectorAll(
      ".portfolio-three-button .portfolio-three-btn, .portfolio-gallery-btn"
    );
    btns.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        runAnime(btn, {
          translateX: x * 0.3,
          translateY: y * 0.3,
          duration: 250,
          ease: "outQuad",
        });
      });
      btn.addEventListener("mouseleave", () => {
        runAnime(btn, {
          translateX: 0,
          translateY: 0,
          duration: 450,
          ease: "outElastic(1, .5)",
        });
      });
    });
  }

  // =========================================================================
  // 3. Cinematic Fullscreen Lightbox Modal
  // =========================================================================
  let currentProjectKey = null;
  let currentScreenIdx = 0;

  function initGalleryModal() {
    if (!document.getElementById("anime-gallery-modal")) {
      const modalHTML = `
      <div id="anime-gallery-modal" class="anime-modal" style="display:none;" aria-hidden="true">
        <div class="anime-modal-backdrop"></div>
        <div class="anime-modal-dialog">
          <div class="anime-modal-content">
            <!-- Modal Header -->
            <div class="anime-modal-header">
              <div class="anime-modal-info">
                <span class="anime-modal-tag" id="anime-modal-category">FINTECH</span>
                <h3 class="anime-modal-title" id="anime-modal-title">Project Title</h3>
              </div>
              <div class="anime-modal-actions">
                <a id="anime-modal-github" href="#" target="_blank" rel="noopener noreferrer" class="anime-modal-btn-gh" title="Voir sur GitHub">
                  <i class="ph ph-github-logo"></i>
                  <span>GitHub</span>
                </a>
                <button type="button" class="anime-modal-close" id="anime-modal-close-btn" aria-label="Fermer">
                  <i class="ph ph-x"></i>
                </button>
              </div>
            </div>

            <!-- Modal Stage -->
            <div class="anime-modal-stage">
              <button class="anime-modal-nav anime-modal-prev" id="anime-modal-prev-btn" aria-label="Précédent">
                <i class="ph ph-caret-left"></i>
              </button>
              <div class="anime-modal-image-wrap">
                <img id="anime-modal-img" src="" alt="Capture d'écran du projet" />
                <div class="anime-modal-caption" id="anime-modal-caption"></div>
              </div>
              <button class="anime-modal-nav anime-modal-next" id="anime-modal-next-btn" aria-label="Suivant">
                <i class="ph ph-caret-right"></i>
              </button>
            </div>

            <!-- Modal Thumbnails -->
            <div class="anime-modal-thumbs-bar" id="anime-modal-thumbs"></div>
          </div>
        </div>
      </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHTML);
    }

    const modal = document.getElementById("anime-gallery-modal");
    const backdrop = modal.querySelector(".anime-modal-backdrop");
    const closeBtn = document.getElementById("anime-modal-close-btn");
    const prevBtn = document.getElementById("anime-modal-prev-btn");
    const nextBtn = document.getElementById("anime-modal-next-btn");

    backdrop.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);

    prevBtn.addEventListener("click", () => navigateScreen(-1));
    nextBtn.addEventListener("click", () => navigateScreen(1));

    document.addEventListener("keydown", (e) => {
      if (modal.style.display !== "none") {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowLeft") navigateScreen(-1);
        if (e.key === "ArrowRight") navigateScreen(1);
      }
    });

    // Attach click triggers to all project items & gallery buttons
    document.querySelectorAll("[data-open-gallery]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        // If clicking on a nav button inside slideshow, do not open modal
        if (e.target.closest(".slideshow-nav-btn") || e.target.closest(".slideshow-segment")) {
          return;
        }
        e.preventDefault();
        const projKey = trigger.getAttribute("data-open-gallery");
        const startingIdx = cardStates[projKey] ? cardStates[projKey].currentIndex : 0;
        openModal(projKey, startingIdx);
      });
    });
  }

  function openModal(projKey, initialIdx) {
    const data = PROJECTS_DATA[projKey];
    if (!data || !data.screens || !data.screens.length) return;

    currentProjectKey = projKey;
    currentScreenIdx = initialIdx || 0;

    const modal = document.getElementById("anime-gallery-modal");
    const dialog = modal.querySelector(".anime-modal-dialog");
    const backdrop = modal.querySelector(".anime-modal-backdrop");

    document.getElementById("anime-modal-title").textContent = data.title;
    document.getElementById("anime-modal-category").textContent = data.category;
    document.getElementById("anime-modal-github").href = data.github;

    // Render Thumbnails
    const thumbsBar = document.getElementById("anime-modal-thumbs");
    thumbsBar.innerHTML = "";
    data.screens.forEach((scr, idx) => {
      const thumbBtn = document.createElement("button");
      thumbBtn.className = `anime-modal-thumb-btn ${idx === currentScreenIdx ? "active" : ""}`;
      thumbBtn.innerHTML = `<img src="${scr.src}" alt="Thumb ${idx + 1}" />`;
      thumbBtn.addEventListener("click", () => {
        currentScreenIdx = idx;
        updateModalScreen(true);
      });
      thumbsBar.appendChild(thumbBtn);
    });

    updateModalScreen(false);

    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Anime.js Entrance Animation
    runAnime(backdrop, {
      opacity: [0, 1],
      duration: 350,
      ease: "outQuad",
    });

    runAnime(dialog, {
      scale: [0.85, 1],
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 500,
      ease: "outBack",
    });

    if (window.anime && window.anime.stagger) {
      runAnime(".anime-modal-thumb-btn", {
        opacity: [0, 1],
        translateY: [15, 0],
        delay: window.anime.stagger(30, { start: 180 }),
        duration: 350,
        ease: "outQuad",
      });
    }
  }

  function closeModal() {
    const modal = document.getElementById("anime-gallery-modal");
    if (!modal || modal.style.display === "none") return;

    const dialog = modal.querySelector(".anime-modal-dialog");
    const backdrop = modal.querySelector(".anime-modal-backdrop");

    runAnime(backdrop, {
      opacity: [1, 0],
      duration: 250,
      ease: "outQuad",
    });

    runAnime(dialog, {
      scale: [1, 0.9],
      opacity: [1, 0],
      translateY: [0, 20],
      duration: 250,
      ease: "outQuad",
    });

    setTimeout(() => {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }, 250);
  }

  function navigateScreen(delta) {
    if (!currentProjectKey) return;
    const screens = PROJECTS_DATA[currentProjectKey].screens;
    currentScreenIdx = (currentScreenIdx + delta + screens.length) % screens.length;
    updateModalScreen(true);
  }

  function updateModalScreen(animateTransition) {
    const data = PROJECTS_DATA[currentProjectKey];
    if (!data) return;
    const scr = data.screens[currentScreenIdx];

    const img = document.getElementById("anime-modal-img");
    const caption = document.getElementById("anime-modal-caption");

    if (animateTransition) {
      runAnime(img, {
        opacity: [1, 0.3],
        scale: [1, 0.98],
        duration: 150,
        ease: "outQuad",
      });

      setTimeout(() => {
        img.src = scr.src;
        caption.innerHTML = `<span class="screen-count">${currentScreenIdx + 1} / ${data.screens.length}</span> — ${scr.caption}`;

        runAnime(img, {
          opacity: [0.3, 1],
          scale: [0.98, 1],
          duration: 300,
          ease: "outQuad",
        });
      }, 150);
    } else {
      img.src = scr.src;
      caption.innerHTML = `<span class="screen-count">${currentScreenIdx + 1} / ${data.screens.length}</span> — ${scr.caption}`;
    }

    // Update active thumb
    const thumbs = document.querySelectorAll(".anime-modal-thumb-btn");
    thumbs.forEach((t, i) => {
      if (i === currentScreenIdx) {
        t.classList.add("active");
        t.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      } else {
        t.classList.remove("active");
      }
    });
  }

  // =========================================================================
  // 6. Contact Form & Direct Email Helpers (Editorial Human Craft)
  // =========================================================================
  window.selectEditorialPill = function (serviceName, btnElement) {
    const pills = document.querySelectorAll(".editorial-pill");
    pills.forEach((p) => p.classList.remove("active"));
    if (btnElement) {
      btnElement.classList.add("active");
      runAnime(btnElement, {
        scale: [0.94, 1.06, 1],
        duration: 260,
        ease: "outBack",
      });
    }

    const subjectInput = document.getElementById("contact-subject-input");
    if (subjectInput) {
      subjectInput.value = serviceName;
    }
  };

  window.selectProjectIntent = window.selectEditorialPill;

  window.copyContactEmail = function () {
    const email = "ilyas.ennajy123@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          showCopySuccess();
        })
        .catch(() => {
          fallbackCopyText(email);
        });
    } else {
      fallbackCopyText(email);
    }
  };

  function showCopySuccess() {
    const textEl = document.getElementById("copy-email-text");
    const iconEl = document.getElementById("copy-email-icon");
    const btn = document.getElementById("copy-email-btn");
    if (textEl) textEl.textContent = "Email Copié !";
    if (iconEl) iconEl.className = "ph-bold ph-check text-main-two-600";
    if (btn) {
      btn.style.borderColor = "#d4ff00";
      btn.style.color = "#d4ff00";
      runAnime(btn, { scale: [1, 1.08, 1], duration: 300, ease: "outBack" });
    }
    setTimeout(() => {
      if (textEl) textEl.textContent = "Copier l'Email";
      if (iconEl) iconEl.className = "ph-bold ph-copy";
      if (btn) {
        btn.style.borderColor = "";
        btn.style.color = "";
      }
    }, 2500);
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showCopySuccess();
    } catch (e) {
      prompt("Copiez l'email manuellement :", text);
    }
    document.body.removeChild(textarea);
  }

  window.handleContactSubmit = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const nameInput = document.getElementById("contact-name-input");
    const emailInput = document.getElementById("contact-email-input");
    const subjectInput = document.getElementById("contact-subject-input");
    const messageInput = document.getElementById("contact-message-input");
    const feedbackBox = document.getElementById("contact-feedback-message");
    const submitBtn = document.getElementById("contact-submit-btn");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject =
      (subjectInput && subjectInput.value.trim()) ||
      "Opportunité de Projet / Collaboration";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      alert("Veuillez renseigner votre nom, email et message.");
      return false;
    }

    const emailSubject = `${subject} — ${name}`;
    const emailBody = `Bonjour Ilyas,\n\nNom / Entreprise : ${name}\nEmail : ${email}\n\nMessage :\n${message}\n\n---\nEnvoyé depuis le portfolio Ilyas.dev`;

    const mailtoUrl = `mailto:ilyas.ennajy123@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ilyas.ennajy123@gmail.com&su=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    // Try triggering default mail client
    window.location.href = mailtoUrl;

    // Show interactive feedback badge
    if (feedbackBox) {
      feedbackBox.classList.remove("d-none");
      feedbackBox.innerHTML = `
        <div class="d-flex align-items-start tw-gap-3">
          <div class="tw-text-2xl text-main-two-600 mt-1"><i class="ph-bold ph-check-circle"></i></div>
          <div class="w-100">
            <h5 class="text-white tw-text-base fw-bold mb-1 font-heading">Client de messagerie ouvert !</h5>
            <p class="text-neutral-300 tw-text-sm mb-3">Votre logiciel de messagerie a été pré-rempli. Vous pouvez aussi envoyer votre message en 1 clic via ces raccourcis :</p>
            <div class="d-flex tw-gap-2 flex-wrap">
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="unifex-btn-gmail tw-py-2 tw-px-3 tw-text-xs">
                <i class="ph-bold ph-google-logo"></i> Ouvrir sur Gmail Web
              </a>
              <button type="button" class="unifex-btn-copy tw-py-2 tw-px-3 tw-text-xs" onclick="window.copyContactEmail()">
                <i class="ph-bold ph-copy"></i> Copier l'adresse
              </button>
            </div>
          </div>
        </div>
      `;
      runAnime(feedbackBox, {
        opacity: [0, 1],
        translateY: [15, 0],
        duration: 400,
        ease: "outBack",
      });
    }

    if (submitBtn) {
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Message Prêt & Client Ouvert !</span> <i class="ph-bold ph-check text-main-two-600"></i>`;
      runAnime(submitBtn, { scale: [1, 1.03, 1], duration: 300, ease: "outBack" });
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
      }, 4000);
    }

    return false;
  };

  // Card Tilt Micro-interactions for Unifex Cards
  function initUnifexTilt() {
    const cards = document.querySelectorAll(".unifex-terminal-card, .unifex-inquiry-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / (rect.height / 2)) * 3;
        const rotateY = (x / (rect.width / 2)) * 3;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUnifexTilt);
  } else {
    initUnifexTilt();
  }

  // Expose API globally

  // Interactive 3D Brand Logo Physics
  function initBrand3DTilt() {
    const brandLinks = document.querySelectorAll('.brand-3d-link');
    brandLinks.forEach(link => {
      const emblem = link.querySelector('.brand-3d-emblem-wrap');
      if (!emblem) return;

      link.addEventListener('mousemove', (e) => {
        const rect = emblem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (-y / (rect.height / 2)) * 14;
        const rotY = (x / (rect.width / 2)) * 14;
        emblem.style.transform = `perspective(600px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(1.08)`;
      });

      link.addEventListener('mouseleave', () => {
        emblem.style.transform = '';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBrand3DTilt);
  } else {
    initBrand3DTilt();
  }

  // =========================================================================
  // Aceternity UI Dynamic Mouse Spotlight for Contact Card & Inputs
  // =========================================================================
  function initAceternitySpotlight() {
    const card = document.querySelector('.contact-studio-card');
    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--card-mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--card-mouse-y', `${e.clientY - rect.top}px`);
      });
    }

    const fields = document.querySelectorAll('.contact-studio-field');
    fields.forEach(field => {
      field.addEventListener('mousemove', (e) => {
        const rect = field.getBoundingClientRect();
        field.style.setProperty('--input-mouse-x', `${e.clientX - rect.left}px`);
        field.style.setProperty('--input-mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  // =========================================================================
  // Interactive Canvas Particle Constellation (From 3D Portfolio Particles)
  // =========================================================================
  function initContactParticles() {
    const canvas = document.getElementById('contact-particles-canvas');
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const count = 45;
    const particles = [];
    const mouse = { x: -1000, y: -1000 };

    const section = document.getElementById('contact');
    if (section) {
      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      section.addEventListener('mouseleave', () => {
        mouse.x = -1000;
        mouse.y = -1000;
      });
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        isCyan: Math.random() > 0.45,
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = p.baseAlpha;
        let size = p.radius;

        if (dist < 160) {
          const factor = 1 - dist / 160;
          p.x += (dx / dist) * factor * 0.5;
          p.y += (dy / dist) * factor * 0.5;
          alpha = Math.min(0.9, p.baseAlpha + factor * 0.55);
          size = p.radius * (1 + factor * 0.6);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.isCyan
          ? `rgba(0, 210, 255, ${alpha})`
          : `rgba(212, 255, 0, ${alpha})`;
        if (dist < 160) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.isCyan ? '#00d2ff' : '#d4ff00';
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAceternitySpotlight();
      initContactParticles();
    });
  } else {
    initAceternitySpotlight();
    initContactParticles();
  }

  window.IlyasPortfolio = {
    openGallery: openModal,
    closeGallery: closeModal,
    switchCardSlide: switchCardSlide,
    selectProjectIntent: window.selectProjectIntent,
  };
})();
