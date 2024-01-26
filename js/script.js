const hamburger = document.querySelector(".hamburger-menu");
const backdrop = document.querySelector(".backdrop-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    backdrop.classList.toggle("active");
    profile.classList.remove("clicked");
    logout.classList.remove("clicked");
});

const profile = document.querySelector(".profile");
const logout = document.querySelector(".logout-cont");
profile.addEventListener("click", () => {
    hamburger.classList.remove("active");
    backdrop.classList.remove("active");
    profile.classList.toggle("clicked");
    logout.classList.toggle("clicked");
});

const logoutBtn = document.querySelector(".logout-btn");
logoutBtn.addEventListener("click", () => {
    window.location.replace("../index.html");
});