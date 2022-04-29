function handleBackToTop() {
  const scrollOffsetTrigger = 40
  const button = document.getElementById("btn-back-to-top");

  // Show button if user scrolls down a bit
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > scrollOffsetTrigger
     || document.documentElement.scrollTop > scrollOffsetTrigger) {
      button.style.display = "block";
    } else {
      // Hide button otherwise
      button.style.display = "none";
    }
  });
  
  // Go to top of page when user clicks on button
  button.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

window.addEventListener("load", handleBackToTop);
