/**
 * Portfolio Anime.js Interactive Engine (v4)
 * Author: Ilyas Ennajy (<IE />)
 * Features:
 *  - 3D Interactive Tilt & Spring Physics on Project Cards
 *  - Spring Micro-Interactions on Tech Badges & Buttons
 *  - Cinematic Project Gallery / Lightbox Modal with Anime.js Transitions
 *  - Keyboard Navigation & Touch Swipe
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

  // Gallery Data for Ilyas's Real Projects
  const PROJECTS_GALLERY = {
    "soul-smile": {
      title: "Soul Smile — Dental Clinic & Healthcare ERP",
      category: "Full-Stack ERP • Glassmorphic UI • Medical Billing & AMO",
      github: "https://github.com/Ilyass123-Ng",
      screens: [
        {
          src: "assets/images/projects/soul-smile/shot-4.webp",
          caption: "Hero Landing Page — Infrastructure Clinique 3D & Prise de Rendez-vous",
        },
        {
          src: "assets/images/projects/soul-smile/shot-3.webp",
          caption: "Admin Control Center — Gestion Multi-Cliniques, Praticiens & Activités",
        },
        {
          src: "assets/images/projects/soul-smile/shot-1.webp",
          caption: "Interface Dentiste (Dr. Ayoub) — Agenda Clinique & Consultations",
        },
        {
          src: "assets/images/projects/soul-smile/shot-2.webp",
          caption: "Interface Secrétariat — Gestion des Fiches Patients & Échéanciers",
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
          src: "assets/images/projects/booking-hotels/cover.webp",
          caption: "Catalogue des Hôtels — Tarification en MAD (Agadir, Marrakech, Essaouira)",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-1.webp",
          caption: "Hero Banner LuxeStay — Expérience Hôtelière Premium au Maroc",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-3.webp",
          caption: "Sélection d'Établissements — Palais Berbère, Casa Perleta, Fairmont Tanger",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-4.webp",
          caption: "Détails & Équipements — Tarifs par nuitée et galeries de chambres",
        },
        {
          src: "assets/images/projects/booking-hotels/shot-5.webp",
          caption: "Processus de Réservation — Vérification des disponibilités en temps réel",
        },
      ],
    },
    novabank: {
      title: "NovaBank — FinTech Banking Dashboard",
      category: "Next.js 16 • Redux Toolkit • TypeScript • Bank Al-Maghrib Flow",
      github: "https://github.com/Ilyass123-Ng/tp-compt-bank-redux",
      screens: [
        {
          src: "assets/images/projects/novabank/cover.webp",
          caption: "Tableau de Bord Trésorerie — Solde en temps réel & Mutations Redux",
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
      ],
    },
    "commerce-core": {
      title: "CommerceCore — Modular E-Commerce Engine",
      category: "TypeScript • Multi-Step Checkout • Order Fulfillment • COD",
      github: "https://github.com/Ilyass123-Ng",
      screens: [
        {
          src: "assets/images/projects/commerce-core/cover.webp",
          caption: "Checkout Multi-Étapes — Choix du mode de livraison & Panier en MAD",
        },
        {
          src: "assets/images/projects/commerce-core/shot-5.webp",
          caption: "Détail de Commande — Livraison à Tanger (Maroc), Récapitulatif & Suivi",
        },
        {
          src: "assets/images/projects/commerce-core/shot-1.webp",
          caption: "Panier & Validation — Calcul automatique des frais de port et taxes",
        },
        {
          src: "assets/images/projects/commerce-core/shot-2.webp",
          caption: "Tunnel d'Achat — Gestion des adresses clients et paiement à la livraison",
        },
      ],
    },
  };

  document.addEventListener("DOMContentLoaded", function () {
    initGalleryModal();
    initProjectCardPhysics();
    initBadgeSprings();
    initButtonMagnetics();
  });

  // 1. Interactive 3D Tilt on Project Thumbs
  function initProjectCardPhysics() {
    const thumbs = document.querySelectorAll(".portfolio-three-item .portfolio-thumb");
    thumbs.forEach((thumb) => {
      thumb.style.transformStyle = "preserve-3d";
      thumb.style.perspective = "1000px";

      thumb.addEventListener("mousemove", (e) => {
        const rect = thumb.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;

        runAnime(thumb, {
          rotateX: rotateX,
          rotateY: rotateY,
          scale: 1.02,
          duration: 350,
          ease: "outQuad",
        });
      });

      thumb.addEventListener("mouseleave", () => {
        runAnime(thumb, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 600,
          ease: "outElastic(1, .6)",
        });
      });
    });
  }

  // 2. Spring Physics on Badges
  function initBadgeSprings() {
    const badges = document.querySelectorAll(".portfolio-three-list li span");
    badges.forEach((badge) => {
      badge.style.display = "inline-block";
      badge.style.transition = "border-color 0.2s ease, background 0.2s ease";

      badge.addEventListener("mouseenter", () => {
        runAnime(badge, {
          scale: 1.08,
          translateY: -2,
          duration: 400,
          ease: "outBack",
        });
      });

      badge.addEventListener("mouseleave", () => {
        runAnime(badge, {
          scale: 1,
          translateY: 0,
          duration: 350,
          ease: "outQuad",
        });
      });
    });
  }

  // 3. Magnetic Button Hover
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
          duration: 500,
          ease: "outElastic(1, .5)",
        });
      });
    });
  }

  // 4. Modal / Gallery Logic
  let currentProjectKey = null;
  let currentScreenIdx = 0;

  function initGalleryModal() {
    // Inject modal into body if not already present
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
        e.preventDefault();
        const projKey = trigger.getAttribute("data-open-gallery");
        openModal(projKey);
      });
    });
  }

  function openModal(projKey) {
    const data = PROJECTS_GALLERY[projKey];
    if (!data || !data.screens || !data.screens.length) return;

    currentProjectKey = projKey;
    currentScreenIdx = 0;

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
      thumbBtn.className = `anime-modal-thumb-btn ${idx === 0 ? "active" : ""}`;
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
        delay: window.anime.stagger(40, { start: 200 }),
        duration: 400,
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

    const closeAnim = runAnime(dialog, {
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
    const screens = PROJECTS_GALLERY[currentProjectKey].screens;
    currentScreenIdx = (currentScreenIdx + delta + screens.length) % screens.length;
    updateModalScreen(true);
  }

  function updateModalScreen(animateTransition) {
    const data = PROJECTS_GALLERY[currentProjectKey];
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

  // Expose API globally if needed
  window.IlyasPortfolio = {
    openGallery: openModal,
    closeGallery: closeModal,
  };
})();
