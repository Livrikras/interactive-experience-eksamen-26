"use strict";

// Gem brugerens valgte sprog (dansk eller engelsk) fra forrige besøg
let currentLanguage = localStorage.getItem("language") || "dk";

// Udvalgte kunstnerportrætter med billeder, beskrivelser og videoer på dansk og engelsk
const artScreen = [
  {
    id: 1,
    image: "img/frits-albert-florentinus-strand.png",
    name: "Frits A. F. Strand",
    year: "1853-1936",
    medium: "Olie på lærred",
    mediumEN: "Oil on canvas",
    size: "56x49 cm",
    description:
      "Frits A. F. Strands Motiver fremstår spontane og livlige, og kunstneren placerer ofte sig selv i centrum af sine billeder. Portrættet viser et enkelt og højtideligt udtryk, hvor fortællingen er vigtigere end den teknisk korrekte gengivelse.",
    descriptionEN:
      "Frits A. F. Strand's motifs appear spontaneous and lively, and the artist often places himself at the center of his paintings. The portrait shows a simple and solemn expression, where the narrative is more important than the technically correct representation.",
    accent: "#625449",
    accentSoft: "#5E4427",
    glow: "rgba(169,123,58,0.25)",
    videoDK: "video/frits-dansk.mp4",
    videoEN: "video/frits-engelsk.mp4",
  },
  {
    id: 2,
    image: "img/jette-hansen.png",
    name: "Jette Hansen",
    year: "1946-",
    medium: "Oliekridt",
    mediumEN: "Oil pastels",
    description:
      "Portrættet er kendetegnet ved et flydende og grænseløst univers, hvor figurer og genstande ofte bliver brat afskåret af billedrammen. Historierne synes at fortsætte uden for værket, og figurerne forholder sig ikke til traditionelle retninger som lodret og vandret.",
    descriptionEN:
      "The portrait is characterized by a flowing and boundless universe, where figures and objects are often sharply cut off by the picture frame. The stories seem to continue beyond the artwork, and the figures do not relate to traditional directions such as vertical and horizontal.",
    accent: "#793635",
    accentSoft: "#4A2E22",
    glow: "rgba(124,75,52,0.25)",
    videoDK: "video/jette-dansk.mp4",
    videoEN: "video/jette-engelsk.mp4",
  },
  {
    id: 3,
    image: "img/marie-heiberg.png",
    name: "Marie Heiberg",
    year: "1942-2008",
    medium: "Olie på lærred",
    mediumEN: "Oil on canvas",
    description:
      "Marie Heribergs værker er både dramatiske og følsomme og præget af en sart melankoli, som understreges af kunstnerens blå farveunivers. Portrættet rummer klovneagtige figurer, der bevæger sig mellem tristhed og håb. ",
    descriptionEN:
      "Marie Heriberg's works are both dramatic and sensitive, characterized by a delicate melancholy, which is emphasized by the artist's blue color universe. The portrait contains clown-like figures that move between sadness and hope.",
    accent: "#81494f",
    accentSoft: "#2D4847",
    glow: "rgba(83, 163, 76, 0.25)",
    videoDK: "video/marie-dansk.mp4",
    videoEN: "video/marie-engelsk.mp4",
  },
  {
    id: 4,
    image: "img/ole-norge.png",
    name: "Ole Norge",
    year: "1951-2012",
    medium: "Oliekridt",
    mediumEN: "Oil pastels",
    description:
      "Ole Norges værker er farverige, men rummer samtidig en stor skrøbelighed. Motiverne opløses ofte i farvefelter, linjer og former. Portrættet viser en ung mand med gyldent hår og mørke, skræmte øjne, der ser direkte på beskueren.",
    descriptionEN:
      "Ole Norge's works are colorful, yet fragile. The motifs often dissolve into fields of color, lines, and shapes. The portrait depicts a young man with golden hair and dark, frightened eyes looking directly at the viewer.",
      accent: "#4e5e32",
      accentSoft: "#1E2C40",
    glow: "rgba(73,107,151,0.25)",
    videoDK: "video/ole-dansk.mp4",
    videoEN: "video/ole-engelsk.mp4",
  },
  {
    id: 5,
    image: "img/patrick-larsen.png",
    name: "Patrick Larsen",
    year: "1951-1986",
    medium: "Oliekridt",
    mediumEN: "Oil pastels",
    description:
      "Patrick Larsens lag på lag-maleteknik giver billederne en stærk følelsesmæssig intensitet, og den gennemgående gule farve balancerer mellem smerte og ulykke. Portrættet skildrer samfundets bagside med temaer som magtesløshed og nederlag. ",
    descriptionEN:
      "Patrick Larsen's layer upon layer painting technique gives the images a strong emotional intensity, and the predominant yellow color balances between pain and misfortune. The portrait depicts the dark side of society with themes such as powerlessness and defeat.",
    accent: "#395c7c",
    accentSoft: "#213845",
    glow: "rgba(76,122,165,0.25)",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },
];

// Yderligere kunstnere vist i galleriet (uden fuld beskrivelse)
const extraArtworks = [
  {
    id: 6,
    image: "img/anette-jensen.png",
    name: "Anette Jensen",
    year: "1980-",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },

  {
    id: 7,
    image: "img/bent-toersleff.png",
    name: "BENT TØRSLEFF",
    year: "1981-2001",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },
  {
    id: 8,
    image: "img/henning-egbjerg-simonsen.png",
    name: "HENNING EGEBJERG SIMONSEN",
    year: "1936-1989",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },
  {
    id: 9,
    image: "img/jan-nedergaard.png",
    name: "JAN NEDERGÅRD",
    year: "1951-1986",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },
  {
    id: 10,
    image: "img/conny-maxwell-noegaard.png",
    name: "CONNY MAXWELL NØRGAARD",
    year: "Ukendt",
    videoDK: "video/patrick-dansk.mp4",
    videoEN: "video/patrick-engelsk.mp4",
  },
];

// Vælg og gem DOM-elementer til karussel og navigationskontrol
const gallery = document.querySelector(".gallery");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const dotsContainer = document.querySelector(".carousel-dots");
const dots = [];

// læser værdi ved localstorage i karrusel
let currentIndex = Number(localStorage.getItem("carouselIndex"));
if (!Number.isFinite(currentIndex)) {
  currentIndex = 0;
}

let projectionWindow = window.open(
  "projection.html",
  "_blank",
  "width=1000, height=700",
);

// Åbn eller genåbn projektionsvinduet hvis det er lukket
function openProjectionWindow() {
  if (!projectionWindow || projectionWindow.closed) {
    projectionWindow = window.open(
      "projection.html",
      "_blank",
      "width=1000, height=700",
    );
  }

  return projectionWindow;
}

// Vis knappen til at stoppe videoafspilningen
function showStopProjectionButton() {
  const stopButtons = document.querySelectorAll(".stop-projection-btn");
  stopButtons.forEach((button) => button.classList.remove("is-hidden"));
}

// Skjul stopknappen når videoen er stoppet
function hideStopProjectionButton() {
  const stopButtons = document.querySelectorAll(".stop-projection-btn");
  stopButtons.forEach((button) => button.classList.add("is-hidden"));
}

// Koden tjekker om projectionWindow findes og er åbent.
// Hvis ja: sendes en besked { action: "stop" } til det andet browser-vindue via postMessage().
gallery.addEventListener("click", (e) => {
  if (e.target.closest(".stop-projection-btn")) {
    if (projectionWindow && !projectionWindow.closed) {
      projectionWindow.postMessage({ action: "stop" }, "*");
    }

    hideStopProjectionButton();
  }
});

artScreen.forEach((item) => {
  const wrapper = document.createElement("div");

  wrapper.className = "card-wrapper";

  wrapper.innerHTML = `
  <div class="card">
    <div class="image-side">
      <img src="${item.image}" alt="${item.name}" class="painting">
    </div>

    <div class="info-side">
      <button class="stop-projection-btn is-hidden" type="button">X</button>
      <span class="card-year">${item.year}</span>
      <h2 class="artist-name">${item.name}</h2>
      <div class="meta">
        <span>${item.medium}</span>
      </div>
      <p class="description">${item.description}</p>
      <button class="story-btn">
      <span class="play-icon">▶</span> 
      Oplev historien </button>
    </div>
  </div>
  `;
  wrapper.style.setProperty("--accent", item.accent || "#1f3b5c");
  wrapper.style.setProperty("--accent-soft", item.accentSoft || "#16222e");
  wrapper.style.setProperty("--glow", item.glow || "rgba(73,107,151,0.25)");

  // Åbn og afspil video når kunstnerportrættet klikkes
  wrapper.addEventListener("click", () => {
    const selectedVideo =
      currentLanguage === "en" ? item.videoEN : item.videoDK;

    localStorage.setItem("selectedPortrait", selectedVideo);

    const win = openProjectionWindow();

    if (win && !win.closed) {
      win.postMessage(
        {
          video: selectedVideo,
        },
        "*",
      );

      showStopProjectionButton();
    }
  });
  // tilføjer wrapper til næste i rækken
  gallery.appendChild(wrapper);
});

// finder alle elementer med klassen card-wrapper galleriet
const cards = gallery.querySelectorAll(".card-wrapper");
// tæller hvor mange kort der er
const cardCount = cards.length;

// Opret navigationspunkter (dots) for at navigere til hvert kunstnerportræt
function createDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < cardCount; i += 1) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot";
    dot.setAttribute("aria-label", `Gå til værk ${i + 1}`);
    // Skift til kort nr. i når dot klikkes
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateCards();
    });
    dots.push(dot);
    dotsContainer.appendChild(dot);
  }
}

// Opdater visuelle tilstand af navigationspunkterne (aktiv/inaktiv)
function updateDots() {
  dots.forEach((dot, index) => {
    // Markér det nuværende navigationspunkt som aktivt
    const active = index === currentIndex;
    dot.classList.toggle("active", active);
    dot.setAttribute("aria-current", active ? "true" : "false");
  });
}

// funktion som sikrer at kort ikke får negativ værdi og går i rotation
function updateCards() {
  // Loop gennem alle kort og tilføj passende CSS-klasser baseret på position
  cards.forEach((card, index) => {
    card.className = "card-wrapper";

    const diff = (index - currentIndex + cardCount) % cardCount;
    const artwork = artScreen[index];

    // tilføjer klasser til kort baseret på lokation
    if (diff === 0) {
      card.classList.add("active"); // aktivt kort
    } else if (diff === 1) {
      card.classList.add("next"); // foran
    } else if (diff === cardCount - 1) {
      card.classList.add("prev"); // bagved
    } else if (diff === 2) {
      card.classList.add("next-right"); // 2 til højre
    } else if (diff === cardCount - 2) {
      card.classList.add("prev-left"); // 2 til ventre
    } else {
      card.classList.add("hidden"); // andre kort er skjulte
    }
  });
  // gemmer kort i local storage så de stadig er der ved genindlæsning
  localStorage.setItem("carouselIndex", currentIndex);

  updateDots();
}

// Gå til forrige kunstnerportræt i karusellet - tilføjet klik eventlisterne på karrusel, så den navigerer til + og - 1 i differencen
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cardCount) % cardCount;
  updateCards();
});

// Gå til næste kunstnerportræt i karusellet
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cardCount;
  updateCards();
});

createDots();
updateCards();

// Håndter touch-swipe gestures på mobil enhed for at navigere karusellet
let fingerStart = 0;

// Registrer startposition når finger rammer skærmen
gallery.addEventListener("touchstart", (event) => {
  fingerStart = event.touches[0].clientX;
});

// Beregn swipe-retning og navigér karusellet hvis swipe er stor nok (>50px)
gallery.addEventListener("touchend", (event) => {
  let fingerEnd = event.changedTouches[0].clientX;
  let swipe = fingerStart - fingerEnd;

  // swipe minimum 50 pixels udgør swipe til venstre
  if (swipe > 50) {
    currentIndex = (currentIndex + 1) % cardCount;
    updateCards();
  }
  // swipe minimum 50 pixels udgør swipe til højre
  if (swipe < -50) {
    currentIndex = (currentIndex - 1 + cardCount) % cardCount;
    updateCards();
  }
});

// Vælg DOM-elementer til galleriet og kunstnersamling
const showGalleryBtn = document.querySelector(".show-gallery-btn");
const allArtworks = document.querySelector(".all-artworks");
const backButton = document.querySelector(".back-button");
const artGrid = document.querySelector(".art-grid");

// Opret gitterkort for alle kunstnerportrætter i fuld gallerioversigt
[...artScreen, ...extraArtworks].forEach((item) => {
  const card = document.createElement("div");
  card.classList.add("grid-card");

  card.innerHTML = `
  
    <img src="${item.image}" alt="${item.name}">

    <div class="card-info">

      <span>${item.name}</span>

      <span>${item.year}</span>

    </div>
  
  `;

  if (item.videoDK && item.videoEN) {
    // Afspil video i projektion når gitterkortet klikkes
    card.addEventListener("click", () => {
      const selectedVideo =
        currentLanguage === "en" ? item.videoEN : item.videoDK;

      localStorage.setItem("selectedPortrait", selectedVideo);

      if (projectionWindow && !projectionWindow.closed) {
        projectionWindow.postMessage(
          {
            video: selectedVideo,
          },
          "*",
        );
      }
    });
  }

  artGrid.appendChild(card);
});

// Vis fuld gallerioversigt når knap klikkes
showGalleryBtn.addEventListener("click", () => {
  allArtworks.classList.add("active");
});

// Luk gallerioversigt og gå tilbage til karusellet
backButton.addEventListener("click", () => {
  allArtworks.classList.remove("active");
});

// Sprogvalg - flag for at skifte mellem dansk og engelsk
const englishFlag = document.querySelector("#englishFlag");
const danishFlag = document.querySelector("#danishFlag");

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("language", language);

  if (language === "en") {
    englishFlag.classList.add("selected");
    danishFlag.classList.remove("selected");

    document.querySelector(".index-titel").textContent =
      "Explore the collection";

    document.querySelector(".show-gallery-btn").textContent =
      "Show all paintings";

    document.querySelector(".back-button").textContent = "← Back";

    document.querySelector(".gallery-title").textContent = "the anonymous collection";
    document.querySelector(".section-title").textContent = "Featured paintings";
    document.querySelectorAll(".story-btn").forEach((btn) => {
      btn.innerHTML = `
    <span class="play-icon">▶</span>
    Experience the story`;
    });
    cards.forEach((card, index) => {
      const artwork = artScreen[index];

      card.querySelector(".meta span").textContent = artwork.mediumEN;

      card.querySelector(".description").textContent = artwork.descriptionEN;
    });
  }

  // Skift til dansk
  if (language === "dk") {
    danishFlag.classList.add("selected");
    englishFlag.classList.remove("selected");

    document.querySelector(".index-titel").textContent = "Udforsk samlingen";

    document.querySelector(".show-gallery-btn").textContent = "Vis alle værker";

    document.querySelector(".back-button").textContent = "← Tilbage";

    document.querySelector(".gallery-title").textContent = " De anonymes samling";

    document.querySelector(".section-title").textContent = "Udvalgte værker";

    document.querySelectorAll(".story-btn").forEach((btn) => {
      btn.innerHTML = `
    <span class="play-icon">▶</span>
    Oplev historien
  `;
    });
    cards.forEach((card, index) => {
      const artwork = artScreen[index];

      card.querySelector(".meta span").textContent = artwork.medium;

      card.querySelector(".description").textContent = artwork.description;
    });
  }
}

// Håndter klik på sprogflag for at skifte sprog
englishFlag.addEventListener("click", () => {
  setLanguage("en");
});

danishFlag.addEventListener("click", () => {
  setLanguage("dk");
});

