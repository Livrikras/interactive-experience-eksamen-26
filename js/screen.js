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
    videoDK: "videos/jette.mp4",
    videoEN: "videos/jette-en.mp4",
  },
  {
    id: 3,
    image: "img/marie-heiberg.png",
    name: "Marie Heiberg",
    year: "1942-2008",
    videoDK: "videos/marie.mp4",
    videoEN: "videos/marie-en.mp4",
  },
  {
    id: 4,
    image: "img/ole-norge.png",
    name: "Ole Norge",
    year: "1951-2012",
    videoDK: "videos/ole.mp4",
    videoEN: "videos/ole-en.mp4",
  },
  {
    id: 5,
    image: "img/patrick-larsen.png",
    name: "Patrick Larsen",
    year: "1951-1986",
    videoDK: "videos/patrick.mp4",
    videoEN: "videos/patrick-en.mp4",
  },
];

const gallery = document.querySelector(".gallery");

const prevButton = document.querySelector(".carousel-button.prev");

const nextButton = document.querySelector(".carousel-button.next");

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

    if (projectionWindow && !projectionWindow.closed) {
      projectionWindow.postMessage(
        {
          video: selectedVideo,
        },
        "*",
      );
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
prevButton.onclick = function () {
  currentIndex = (currentIndex - 1 + cardCount) % cardCount;

  updateCards();
};

nextButton.onclick = function () {
  currentIndex = (currentIndex + 1) % cardCount;

  updateCards();
};

updateCards()

const englishFlag = document.querySelector("#englishFlag");

const danishFlag = document.querySelector("#danishFlag");


englishFlag.addEventListener("click", () => {
  currentLanguage = "en";

  localStorage.setItem("language", "en");
});



danishFlag.addEventListener("click", () => {
  currentLanguage = "dk";

  localStorage.setItem("language", "dk");
});
