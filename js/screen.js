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

  wrapper.addEventListener("click",)() => {
    const selectedVideo = item.video;

    localStorage.setItem("selectedPortrait", selectedVideo);

    if (projectionWindow && !projectionWindow.closed){
      projectionWindow.postMessage(
        {
          video: selectedVideo,
        },
        "*",
      )
    }
  }


})

