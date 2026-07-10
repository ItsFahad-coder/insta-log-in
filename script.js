function showLoader() {
  const loader = document.getElementById("loader");

  loader.style.display = "block";

  setTimeout(() => {
    loader.style.display = "none";
  }, 2500);
}
