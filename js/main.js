(function() {
  "use strict";

  // ============================================
  // Header scroll effect
  // ============================================
  var header = document.getElementById("header") || document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ============================================
  // Mobile menu toggle — Hamburger
  // ============================================
  var menuToggle = document.getElementById("menuToggle") || document.querySelector(".site-header .menu-toggle");
  var nav = document.getElementById("nav") || document.querySelector(".site-header .main-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function() {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("open");
      document.body.classList.toggle("menu-open");
    });

    // Menü schließen bei Link-Klick
    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function() {
        menuToggle.classList.remove("active");
        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    }
  }

  // ============================================
  // Aktive Disziplin automatisch markieren
  // (Desktop-Switcher + Mobile-Disc-Links)
  // ============================================
  var currentPath = window.location.pathname;
  var allDiscLinks = document.querySelectorAll(".discipline-switcher a, .mobile-disc-links a");
  for (var d = 0; d < allDiscLinks.length; d++) {
    var link = allDiscLinks[d];
    var linkPath = link.getAttribute("href");
    // Exakter Match oder startsWith für Unterseiten
    if (linkPath && linkPath !== "/" && currentPath.indexOf(linkPath) === 0) {
      link.classList.add("disc-active");
    }
  }

  // Aktive Hauptnav markieren (Studio / Kontakt)
  var mainNavLinks = document.querySelectorAll(".main-nav > a");
  for (var m = 0; m < mainNavLinks.length; m++) {
    var ml = mainNavLinks[m];
    var mlPath = ml.getAttribute("href");
    if (mlPath && currentPath === mlPath) {
      ml.classList.add("active");
    }
  }

  // ============================================
  // Homepage featured projects
  // ============================================
  var homeGrid = document.getElementById("homeProjectsGrid");
  if (homeGrid && typeof projects !== "undefined" && typeof createProjectCard === "function") {
    var previewProjects = projects.slice(0, 3);
    for (var j = 0; j < previewProjects.length; j++) {
      var card = createProjectCard(previewProjects[j], j);
      if (j === 0) card.classList.add("sno-card-large");
      homeGrid.appendChild(card);
    }
  }

  // ============================================
  // Contact form (mailto)
  // ============================================
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      var formData = new FormData(contactForm);
      var name = formData.get("name");
      var email = formData.get("email");
      var phone = formData.get("phone") || "";
      var subject = formData.get("subject") || "Anfrage über Website";
      var message = formData.get("message");

      var mailBody = "Name: " + name + "\nE-Mail: " + email + "\n";
      if (phone) mailBody += "Telefon: " + phone + "\n";
      mailBody += "\n" + message;

      window.location.href = "mailto:info@auswien.at?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(mailBody);
    });
  }

  // ============================================
  // Leistungen toggle buttons
  // ============================================
  var toggleButtons = document.querySelectorAll(".leistung-toggle");
  for (var t = 0; t < toggleButtons.length; t++) {
    toggleButtons[t].addEventListener("click", function() {
      var detail = this.parentElement.querySelector(".leistung-detail");
      if (detail) {
        detail.classList.toggle("open");
        this.textContent = detail.classList.contains("open") ? "− Weniger anzeigen" : "+ Mehr erfahren";
      }
    });
  }

  // ============================================
  // Spotlight cards (mouse glow effect)
  // ============================================
  var spotCards = document.querySelectorAll(".spot-card");
  for (var s = 0; s < spotCards.length; s++) {
    (function(card) {
      card.addEventListener("mousemove", function(e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    })(spotCards[s]);
  }

  // ============================================
  // Escape-Taste schließt Mobile-Menü
  // ============================================
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && nav && nav.classList.contains("open")) {
      nav.classList.remove("open");
      if (menuToggle) menuToggle.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

})();

// =============================================
// GLOBAL: createProjectCard (Snøhetta-Style)
// =============================================
function createProjectCard(project, index) {
  var delay = (index || 0) * 0.08;
  var card = document.createElement("a");
  card.href = "/projekt.html?id=" + project.id;
  card.className = "sno-project-card";
  card.style.animationDelay = delay + "s";

  var thumbnail = (typeof getProjectThumbnail === "function") ? getProjectThumbnail(project) : (project.image || "");
  var statusClass = (typeof getStatusClass === "function") ? getStatusClass(project.status) : "status-default";

  card.innerHTML =
    '<div class="sno-card-img">' +
      '<img src="' + thumbnail + '" alt="' + project.title + '" loading="lazy">' +
    '</div>' +
    '<div class="sno-card-info">' +
      '<div class="sno-card-meta">' +
        '<span class="sno-card-discipline">' + project.category + '</span>' +
        '<span class="sno-card-year">' + project.year + '</span>' +
        '<span class="project-status-badge ' + statusClass + '">' + project.status + '</span>' +
      '</div>' +
      '<h3>' + project.title + '</h3>' +
      '<span class="sno-card-subtitle">' + project.location + '</span>' +
    '</div>';

  return card;
}
