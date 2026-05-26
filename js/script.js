const videoElement = document.querySelector("#projectionVideo");

function showVideo(videoPath) {
  videoElement.src = videoPath;

  videoElement.play();
}
