// =============================================
// PROJEKT-DATEN  —  İKİ Architektur Wien
// =============================================

var CATEGORIES = [
    "Kultur & Museen",
    "Wohnen",
    "Öffentlich",
    "Gewerbe",
    "Spezial",
    "Freiraum",
    "Wettbewerbe"
];

var DISCIPLINES = [
    "architektur",
    "museen",
    "produkt",
    "grafik",
    "motion",
    "lab"
];

var projects = [
    {
        id: "wohnhaus-margareten",
        title: "Wohnhaus Margareten",
        category: "Wohnen",
        discipline: "architektur",
        year: 2024,
        status: "Realisiert",
        location: "Wien, Margareten",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        description: "Sanierung und Aufstockung eines Gründerzeithauses im 5. Bezirk. Das Projekt verbindet behutsame Bestandssanierung mit einer zeitgenössischen Dachgeschoßerweiterung in Holzleichtbauweise.",
        leistungen: ["Entwurf", "Einreichplanung", "Ausführungsplanung", "Örtliche Bauaufsicht"],
        details: {
            ort: "Wien, 5. Bezirk",
            groesse: "420 m² (Bestand) + 180 m² (Aufstockung)",
            auftraggeber: "Privat",
            projektleitung: "Dipl.-Ing. Y. Özdemir",
            team: "İKİ Architektur",
            statik: "Werkraum Ingenieure",
            bauphysik: "IBO Wien"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", caption: "Straßenansicht", size: "full" },
            { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", caption: "Innenraum", size: "half" },
            { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", caption: "Dachterrasse", size: "half" }
        ]
    },
    {
        id: "office-tower-donaucity",
        title: "Office Tower Donaucity",
        category: "Gewerbe",
        discipline: "architektur",
        year: 2023,
        status: "Abgeschlossen",
        location: "Wien, Donaustadt",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        description: "Innenarchitektur und Leitsystem für ein Bürogebäude in der Donaucity. Barrierefreie Gestaltung aller öffentlichen Bereiche nach ÖNORM B 1600.",
        leistungen: ["Innenarchitektur", "Leitsystem", "Barrierefreiheit"],
        details: {
            ort: "Wien, 22. Bezirk",
            groesse: "3.200 m²",
            auftraggeber: "DC Tower Management GmbH",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", caption: "Außenansicht", size: "full" },
            { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", caption: "Lobby", size: "half" },
            { url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80", caption: "Büroetage", size: "half" }
        ]
    },
    {
        id: "vtc-klimavorhang-pilot",
        title: "VTC Klimavorhang — Pilotprojekt",
        category: "Kultur & Museen",
        discipline: "lab",
        year: 2024,
        status: "In Entwicklung",
        location: "Wien",
        image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=80",
        description: "Pilotinstallation des VTC-Systems (Vertical Textile Climate) in einem denkmalgeschützten Museum. Der nicht-invasive Klimavorhang reguliert Temperatur und Luftfeuchtigkeit ohne bauliche Eingriffe — Patent angemeldet.",
        leistungen: ["Forschung", "Prototyping", "Klimatechnik", "Denkmalschutz"],
        details: {
            ort: "Wien, 1. Bezirk",
            groesse: "Pilotraum ca. 85 m²",
            auftraggeber: "Vertraulich",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80", caption: "Ausstellungsraum", size: "full" }
        ]
    },
    {
        id: "barrierefreier-museumszugang",
        title: "Barrierefreier Museumszugang",
        category: "Kultur & Museen",
        discipline: "museen",
        year: 2024,
        status: "Planung",
        location: "Wien",
        image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=800&q=80",
        description: "Konzept für die vollständige barrierefreie Erschließung eines bestehenden Museums — von der Anreise bis zur Ausstellungsebene. Universal Design mit taktilen Leitsystemen, Audiodeskription und multisensorischen Stationen.",
        leistungen: ["Barrierefreiheit", "Beratung", "Entwurf", "ÖNORM B 1600"],
        details: {
            ort: "Wien",
            groesse: "ca. 2.400 m² Ausstellungsfläche",
            auftraggeber: "Vertraulich",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?w=1200&q=80", caption: "Eingangsbereich", size: "full" }
        ]
    },
    {
        id: "stadtplatz-floridsdorf",
        title: "Stadtplatz Floridsdorf",
        category: "Freiraum",
        discipline: "architektur",
        year: 2025,
        status: "Wettbewerb",
        location: "Wien, Floridsdorf",
        image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
        description: "Wettbewerbsbeitrag für die Neugestaltung eines öffentlichen Platzes im 21. Bezirk. Klimaresilientes Konzept mit Entsiegelung, Baumhain, Wasserelementen und flexiblen Nutzungszonen.",
        leistungen: ["Freiraumgestaltung", "Wettbewerb", "Klimaanpassung"],
        details: {
            ort: "Wien, 21. Bezirk",
            groesse: "ca. 4.800 m²",
            auftraggeber: "Stadt Wien, MA 19",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80", caption: "Platzansicht", size: "full" }
        ]
    },
    {
        id: "passivhaus-aspern",
        title: "Passivhaus Aspern Seestadt",
        category: "Wohnen",
        discipline: "architektur",
        year: 2025,
        status: "Planung",
        location: "Wien, Donaustadt",
        image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
        description: "Mehrgeschoßiger Wohnbau in Passivhausstandard mit zirkulärer Materialstrategie. Holz-Beton-Hybridbauweise, Dachgewächshaus und Gemeinschaftsflächen.",
        leistungen: ["Entwurf", "Passivhaus-Planung", "Kreislaufwirtschaft", "Einreichung"],
        details: {
            ort: "Wien, 22. Bezirk – Seestadt Aspern",
            groesse: "ca. 2.800 m² BGF",
            auftraggeber: "Baugruppe Aspern",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80", caption: "Ansicht", size: "full" }
        ]
    },
    {
        id: "galerie-wettbewerb",
        title: "Galerie der Zukunft",
        category: "Wettbewerbe",
        discipline: "architektur",
        year: 2024,
        status: "Eingereicht",
        location: "Wien",
        image: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=800&q=80",
        description: "Geladener Wettbewerb für eine temporäre Galerie im öffentlichen Raum. Experimentelles Konzept aus recycelten Textilien und modularen Tragstrukturen.",
        leistungen: ["Wettbewerb", "Entwurf", "Materialforschung"],
        details: {
            ort: "Wien, 7. Bezirk",
            groesse: "ca. 120 m²",
            auftraggeber: "Geladener Wettbewerb"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?w=1200&q=80", caption: "Entwurfsperspektive", size: "full" }
        ]
    },
    {
        id: "schulerweiterung-favoriten",
        title: "Schulerweiterung Favoriten",
        category: "Öffentlich",
        discipline: "architektur",
        year: 2024,
        status: "Realisiert",
        location: "Wien, Favoriten",
        image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
        description: "Erweiterung einer Volksschule um vier Klassenräume, eine Bibliothek und einen multifunktionalen Bewegungsraum. Schwerpunkt auf natürliche Belichtung, Akustik und barrierefreie Gestaltung.",
        leistungen: ["Entwurf", "Einreichplanung", "Örtliche Bauaufsicht", "Barrierefreiheit"],
        details: {
            ort: "Wien, 10. Bezirk",
            groesse: "ca. 650 m² Zubau",
            auftraggeber: "MA 56 – Wiener Schulen",
            projektleitung: "Dipl.-Ing. Y. Özdemir"
        },
        images: [
            { url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80", caption: "Pausenhof", size: "full" }
        ]
    }
];

// =============================================
// HELPER FUNCTIONS
// =============================================

function getProjectThumbnail(project) {
    if (project.image) return project.image;
    if (project.images && project.images.length > 0) return project.images[0].url;
    return "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80";
}

function getProjectById(id) {
    for (var i = 0; i < projects.length; i++) {
        if (projects[i].id === id) return projects[i];
    }
    return null;
}

function getStatusClass(status) {
    if (status === "Realisiert" || status === "Abgeschlossen") return "status-done";
    if (status === "In Entwicklung" || status === "Planung") return "status-progress";
    if (status === "Wettbewerb" || status === "Eingereicht") return "status-competition";
    return "status-default";
}

function getProjectsByDiscipline(disc) {
    return projects.filter(function(p) { return p.discipline === disc; });
}
