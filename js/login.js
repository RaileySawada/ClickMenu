const form = document.querySelector(".login-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.email.value;
    const password = form.pswd.value;

    const authenticated = authentication(email, password)

    if(authenticated){
        window.location.href = "Pages/Home.html";
    }else{
        alert("Login Failed");
    }
})

function authentication(email, password){
    if(email === "raileydelapena@gmail.com" && password === "railey12345"){
        return true;
    }else{
        return false;
    }
}

const forms = document.querySelector(".forms");
const close = document.querySelector(".close");
const join = document.querySelector(".join-btn");
const main = document.getElementById("blur");
const bot = document.querySelector(".bot-section");
join.addEventListener("click", () => {
    forms.classList.toggle("show");
    close.classList.toggle("show");
    main.classList.toggle("active");
    forms.classList.toggle("active");
    bot.classList.toggle("active");
})
close.addEventListener("click", () => {
    forms.classList.toggle("show");
    close.classList.toggle("show");
    main.classList.toggle("active");
    forms.classList.toggle("active");
    bot.classList.toggle("active");
})

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".dish-container").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
    touchStartX = e.touches ? e.touches[0].pageX : null;
    touchDeltaX = 0;
}
const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    if (e.touches && e.touches.length > 0) {
        touchDeltaX = touchStartX - e.touches[0].pageX;
    }
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
    if (Math.abs(touchDeltaX) > 50) {
        carousel.scrollLeft += touchDeltaX > 0 ? firstCardWidth : -firstCardWidth;
    }
    touchStartX = null;
    touchDeltaX = 0;
}
const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchstart", dragStart);
carousel.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);