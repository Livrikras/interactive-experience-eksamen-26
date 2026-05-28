"use strict";

let currentLanguage = localStorage.getItem("language") || "dk";

const artscreen = [
  {
    id: 1,
    image: "img/frits-albert-florentinus-strand.png",
    name: "Frits A. F. Strand",
    year: "1853-1936",
    videoDK: "video/frits-dansk.test.mp4",
    videoEN: "video/frits-engelsk.test.mp4",
  },
  {
    id: 2,
    image: "img/jette-hansen.png",
    name: "Jette Hansen",
    year: "1946-",
    videoDK: "video/jette-dansk.test.mp4",
    videoEN: "video/jette-engelsk.test.mp4",
  },
  {
    id: 3,
    image: "img/marie-heiberg.png",
    name: "Marie Heiberg",
    year: "1942-2008",
    videoDK: "video/marie-dansk.test.mp4",
    videoEN: "video/marie-engelsk.test.mp4",
  },
  {
    id: 4,
    image: "img/ole-norge.png",
    name: "Ole Norge",
    year: "1951-2012",
    videoDK: "video/ole-dansk.test.mp4",
    videoEN: "video/ole-engelsk.test.mp4",
  },
  {
    id: 5,
    image: "img/patrick-larsen.png",
    name: "Patrick Larsen",
    year: "1951-1986",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },
];

const extraArtworks = [
  {
    id: 6,
    image: "img/anette-jensen.png",
    name: "Anette Jensen",
    year: "1980-",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },

  {
    id: 7,
    image: "img/bent-toersleff.png",
    name: "BENT TØRSLEFF",
    year: "1981-2001",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },
  {
    id: 8,
    image: "img/henning-egbjerg-simonsen.png",
    name: "HENNING EGEBJERG SIMONSEN",
    year: "1936-1989",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },
  {
    id: 9,
    image: "img/jan-nedergaard.png",
    name: "JAN NEDERGÅRD",
    year: "1951-1986",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },
  {
    id: 10,
    image: "img/conny-maxwell-noegaard.png",
    name: "CONNY MAXWELL NØRGAARD",
    year: "Ukendt",
    videoDK: "video/patrick-dansk.test.mp4",
    videoEN: "video/patrick-engelsk.test.mp4",
  },
];

const gallery = document.querySelector(".gallery");

const prevButton = document.querySelector(".carousel-button.prev");

const nextButton = document.querySelector(".carousel-button.next");

const stopProjectionButton = document.querySelector(".stop-projection-btn");

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

function showStopProjectionButton() {
  stopProjectionButton.classList.remove("is-hidden");
}

function hideStopProjectionButton() {
  stopProjectionButton.classList.add("is-hidden");
}

stopProjectionButton.addEventListener("click", () => {
  if (projectionWindow && !projectionWindow.closed) {
    projectionWindow.postMessage({ action: "stop" }, "*");
  }

  hideStopProjectionButton();
});

artscreen.forEach((item) => {
  const wrapper = document.createElement("div");

  wrapper.className = "card-wrapper";

  wrapper.innerHTML = `
  <div class="card">
    <img src="${item.image}" alt="${item.name}" class="painting">
    <div class="card-info">
    <span class="card-name"> ${item.name}</span>
    <span class="years"> ${item.year}</span>
    </div>
  </div>
  `;

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

// funktion som sikrer at kort ikke får negativ værdi og går i rotation
function updateCards() {
  cards.forEach((card, index) => {
    card.className = "card-wrapper";

    const diff = (index - currentIndex + cardCount) % cardCount;

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
}

// lytter efter klik på knapper og opdaterer currentIndex - +1 -1 for rotation rotation
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cardCount) % cardCount;

  updateCards();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cardCount;

  updateCards();
});
updateCards();

// swipe-touch på cards i udvalgte værker
// gemmer start position for touch event
let fingerStart = 0;

// Når fingeren rammer skærmen, gemmes dens vandrette position i pixels.
gallery.addEventListener("touchstart", (event) => {
  fingerStart = event.touches[0].clientX;
});

// når finger løftes sammenlignes den med start position hvis den er 50 pixels til højre eller venstre
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

const showGalleryBtn = document.querySelector(".show-gallery-btn");

const allArtworks = document.querySelector(".all-artworks");

const backButton = document.querySelector(".back-button");

const artGrid = document.querySelector(".art-grid");

[...artscreen, ...extraArtworks].forEach((item) => {
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

showGalleryBtn.addEventListener("click", () => {
  allArtworks.classList.add("active");
});

backButton.addEventListener("click", () => {
  allArtworks.classList.remove("active");
});

const englishFlag = document.querySelector("#englishFlag");
const danishFlag = document.querySelector("#danishFlag");

function setLanguage(language) {
  currentLanguage = language;

  localStorage.setItem("language", language);

  if (language === "en") {
    englishFlag.classList.add("selected");
    danishFlag.classList.remove("selected");

    document.querySelector(".index-titel").textContent =
      "Click and choose a painting";

    document.querySelector(".show-gallery-btn").textContent =
      "Show all paintings";

    document.querySelector(".back-button").textContent = "← Back";

    document.querySelector(".gallery-title").textContent = "All paintings";
  }

  if (language === "dk") {
    danishFlag.classList.add("selected");
    englishFlag.classList.remove("selected");

    document.querySelector(".index-titel").textContent = "Klik på et værk";

    document.querySelector(".show-gallery-btn").textContent = "Vis alle værker";

    document.querySelector(".back-button").textContent = "← Tilbage";

    document.querySelector(".gallery-title").textContent = "Alle værker";
  }
}

englishFlag.addEventListener("click", () => {
  setLanguage("en");
});

danishFlag.addEventListener("click", () => {
  setLanguage("dk");
});
