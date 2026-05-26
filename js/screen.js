"use strict"

const artscreen = [
  {
    id: 1,
    image: "img/frits-albert-florentinus-strand.png",
    name: "Frits A. F. Strand",
    year: "1853-1936",
    video: "videos/frits.mp4",
  },
  {
    id: 2,
    image: "img/jette-hansen.png",
    name: "Jette Hansen",
    year: "1946-",
    video: "videos/jette.mp4",
  },
  {
    id: 3,
    image: "img/marie-heiberg.png",
    name: "Marie Heiberg",
    year: "1942-2008",
    video: "videos/marie.mp4",
  },
  {
    id: 4,
    image: "img/ole-norge.png",
    name: "Ole Norge",
    year: "1951-2012",
    video: "videos/ole.mp4",
  },
  {
    id: 5,
    image: "img/patrick-larsen.png",
    name: "Patrick Larsen",
    year: "1951-1986",
    video: "videos/patrick.mp4",
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
  
    <img src"${item.image}" alt="${item.name}" class="painting">
  
    <div class="card-info">
  
    <span class="card-name"> ${item.name}</span>
  
    <span class="years"> ${item.year}</span>

    </div>

  </div>
  `;

  wrapper.addEventListener("click",() => {
    const selectedVideo = item.video;

    localStorage.setItem("selectedPortrait", selectedVideo);

    if (projectionWindow && !projectionWindow.closed){
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




