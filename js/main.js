(function() {
  "use strict";

  // ---- Header scroll effect ----
  var header = document.getElementById("header");
  if (header) {
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ---- Mobile menu toggle ----
  var menuToggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function() {
      menuToggle.classList.toggle("active");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });

    var navLinks = nav.querySelectorAll("a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function() {
        menuToggle.classList.remove("active");
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    }
  }

  // ---- Homepage featured projects ----
  var homeGrid = document.getElementById("homeProjectsGrid");
  if (homeGrid && typeof projects !== "undefined" && typeof createProjectCard === "function") {
    var previewProjects = projects.slice(0, 3);
    for (var j = 0; j < previewProjects.length; j++) {
      var card = createProjectCard(previewProjects[j], j);
      if (j === 0) card.classList.add("sno-card-large");
      homeGrid.appendChild(card);
    }
  }

  // ---- Contact form ----
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

  // ---- Leistungen toggle buttons ----
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

})();

// =============================================
// GLOBAL: createProjectCard  (Snøhetta-Style)
// =============================================
function createProjectCard(project, index) {
  var delay = (index || 0) * 0.08;
  var card = document.createElement("a");
  card.href = "projekt.html?id=" + project.id;
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
