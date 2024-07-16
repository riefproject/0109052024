AOS.init();

// Launch confetti on page load
window.onload = function () {
  var confettiSettings = { target: "confetti-canvas", max: 100 };
  var confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();

  // Function to gradually fade out the confetti
  setTimeout(() => {
    let opacity = 1;
    let fadeOut = setInterval(() => {
      if (opacity > 0) {
        opacity -= 0.05;
        document.getElementById("confetti-canvas").style.opacity =
          opacity;
      } else {
        clearInterval(fadeOut);
        confetti.clear();
      }
    }, 100);
  }, 3000); // Start fading out after 3 seconds
};