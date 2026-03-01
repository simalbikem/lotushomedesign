(function () {
  const preloader = document.getElementById("preloader");
  if (!preloader) {
    console.warn("Preloader elementi bulunamadı.");
    return;
  }

  const MIN_SHOW_TIME = 1500; 
  const startTime = Date.now();

  function hidePreloader() {
    const elapsed = Date.now() - startTime;
    const remaining = MIN_SHOW_TIME - elapsed;

    setTimeout(() => {
      preloader.classList.add("hidden");

      setTimeout(() => {
        preloader.remove();
      }, 600);
    }, Math.max(0, remaining));
  }

  window.addEventListener("load", hidePreloader);

  setTimeout(() => {
    if (!preloader.classList.contains("hidden")) {
      hidePreloader();
    }
  }, 3000);
})();