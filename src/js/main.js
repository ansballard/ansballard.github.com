(() => {

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/cache.sw.js").then(() => {
      console.log("Service Worker Registered");
    }, () => {
      console.log("Service Worker Failed to Register");
    });
  }

})();
