const videoElement = document.querySelector("#projectionVideo");

function showVideo(videoPath) {
  videoElement.src = videoPath;

  videoElement.play();
}

window.addEventListener("message", (event) => {
  const selectedVideo = event.data.video;

  if (selectedVideo) {
    showVideo(selectedVideo);
  }
});
