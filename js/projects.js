// =============================================
// PROJEKTE-SEITE — Filter & Rendering
// =============================================
(function() {
    "use strict";

    var grid = document.getElementById("projectsGrid");
    var pills = document.getElementById("categoryPills");
    var empty = document.getElementById("projectsEmpty");
    var activeCategory = "all";

    // Nur auf der Projekte-Seite ausführen
    if (!grid || !pills) return;

    // ---- "Alle" Pill zuerst erzeugen ----
    var alleBtn = document.createElement("button");
    alleBtn.className = "discipline-pill active";
    alleBtn.setAttribute("data-category", "all");
    alleBtn.innerHTML = 'Alle <span class="pill-count">' + projects.length + '</span>';
    pills.appendChild(alleBtn);

    // ---- Kategorie-Pills erzeugen ----
    for (var i = 0; i < CATEGORIES.length; i++) {
        var cat = CATEGORIES[i];
        var cnt = 0;
        for (var j = 0; j < projects.length; j++) {
            if (projects[j].category === cat) cnt++;
        }
        if (cnt === 0) continue;
        var btn = document.createElement("button");
        btn.className = "discipline-pill";
        btn.setAttribute("data-category", cat);
        btn.innerHTML = cat + ' <span class="pill-count">' + cnt + '</span>';
        pills.appendChild(btn);
    }

    // ---- URL-Parameter ?filter= auslesen ----
    var urlParams = new URLSearchParams(window.location.search);
    var filterParam = urlParams.get("filter");
    if (filterParam) {
        for (var f = 0; f < CATEGORIES.length; f++) {
            if (CATEGORIES[f] === filterParam) {
                activeCategory = filterParam;
                break;
            }
        }
        // Alle Pills deaktivieren, passende aktivieren
        var allPillBtns = pills.querySelectorAll(".discipline-pill");
        for (var p = 0; p < allPillBtns.length; p++) {
            allPillBtns[p].classList.remove("active");
            if (allPillBtns[p].getAttribute("data-category") === activeCategory) {
                allPillBtns[p].classList.add("active");
            }
        }
    }

    // ---- Click-Handler für Pills ----
    pills.addEventListener("click", function(e) {
        var target = e.target.closest(".discipline-pill");
        if (!target) return;

        var allBtns = pills.querySelectorAll(".discipline-pill");
        for (var k = 0; k < allBtns.length; k++) {
            allBtns[k].classList.remove("active");
        }
        target.classList.add("active");
        activeCategory = target.getAttribute("data-category");

        var newUrl = window.location.pathname;
        if (activeCategory !== "all") {
            newUrl += "?filter=" + encodeURIComponent(activeCategory);
        }
        window.history.replaceState(null, "", newUrl);

        renderProjects();
    });

    // ---- Projekte rendern ----
    function renderProjects() {
        grid.innerHTML = "";
        var filtered = [];

        if (activeCategory === "all") {
            filtered = projects;
        } else {
            for (var m = 0; m < projects.length; m++) {
                if (projects[m].category === activeCategory) {
                    filtered.push(projects[m]);
                }
            }
        }

        if (filtered.length === 0) {
            if (empty) empty.style.display = "block";
            return;
        }
        if (empty) empty.style.display = "none";

        for (var n = 0; n < filtered.length; n++) {
            var card = createProjectCard(filtered[n], n);
            if (n % 5 === 0) {
                card.classList.add("sno-card-large");
            }
            grid.appendChild(card);
        }
    }

    // Initiales Rendern
    renderProjects();

})();
