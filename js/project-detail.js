(function() {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var projectId = params.get("id");

  if (!projectId) {
    window.location.href = "projekte.html";
    return;
  }

  var project = getProjectById(projectId);
  if (!project) {
    window.location.href = "projekte.html";
    return;
  }

  document.title = project.title + " — İKİ Architektur Wien";

  var titleEl = document.getElementById("projectTitle");
  if (titleEl) titleEl.textContent = project.title;

  var metaEl = document.getElementById("projectMeta");
  if (metaEl) {
    metaEl.innerHTML =
      '<span class="status">' + project.status + '</span>' +
      '<span>' + project.location + '</span>' +
      '<span>' + project.year + '</span>' +
      '<span>' + project.category + '</span>';
  }

  var mainImageEl = document.getElementById("projectMainImage");
  if (mainImageEl) {
    var thumbnail = getProjectThumbnail(project);
    mainImageEl.innerHTML = '<img src="' + thumbnail.replace("w=800", "w=1400") + '" alt="' + project.title + '">';
  }

  var descEl = document.getElementById("projectDescription");
  if (descEl && project.description) {
    descEl.innerHTML = '<h2>Projektbeschreibung</h2><p>' + project.description + '</p>';
  } else if (descEl) {
    descEl.style.display = "none";
  }

  var servicesEl = document.getElementById("projectServices");
  if (servicesEl && project.leistungen && project.leistungen.length > 0) {
    var tagsHtml = "";
    for (var i = 0; i < project.leistungen.length; i++) {
      tagsHtml += '<span class="service-tag">' + project.leistungen[i] + '</span>';
    }
    servicesEl.innerHTML = '<h3>Leistungen</h3><div class="services-list">' + tagsHtml + '</div>';
  } else if (servicesEl) {
    servicesEl.style.display = "none";
  }

  var infoEl = document.getElementById("projectInfoGrid");
  if (infoEl && project.details) {
    var labels = {
      ort: "Ort", groesse: "Größe", auftraggeber: "Auftraggeber",
      projektleitung: "Projektleitung", team: "Team", statik: "Statik",
      bauphysik: "Bauphysik", bauzeit: "Bauzeit"
    };
    var infoHtml = '<h3>Projektdaten</h3><div class="info-grid">';
    for (var key in project.details) {
      if (project.details.hasOwnProperty(key)) {
        var label = labels[key] || key;
        infoHtml += '<div class="info-item"><span class="info-label">' + label +
          '</span><span class="info-value">' + project.details[key] + '</span></div>';
      }
    }
    infoHtml += '</div>';
    infoEl.innerHTML = infoHtml;
  } else if (infoEl) {
    infoEl.style.display = "none";
  }

  var galleryEl = document.getElementById("projectGallery");
  if (galleryEl && project.images && project.images.length > 0) {
    var galleryHtml = '<h3>Galerie</h3><div class="gallery-grid">';
    for (var g = 0; g < project.images.length; g++) {
      var img = project.images[g];
      var sizeClass = "gallery-third";
      if (img.size === "full") sizeClass = "gallery-full";
      else if (img.size === "half") sizeClass = "gallery-half";

      galleryHtml += '<div class="gallery-item ' + sizeClass + '">' +
        '<img src="' + img.url + '" alt="' + (img.caption || project.title) + '" loading="lazy">' +
        (img.caption ? '<div class="gallery-caption">' + img.caption + '</div>' : '') +
        '</div>';
    }
    galleryHtml += '</div>';
    galleryEl.innerHTML = galleryHtml;
  } else if (galleryEl) {
    galleryEl.style.display = "none";
  }
})();
