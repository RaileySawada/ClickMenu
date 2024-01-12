const hamburger = document.querySelector(".hamburger-menu");
const backdrop = document.querySelector(".backdrop-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    backdrop.classList.toggle("active");
})

/*----------MENU PAGE SCRIPT----------*/
const dishImage = document.querySelectorAll(".dish-img");
dishImage.forEach(dish_img => {
    dish_img.addEventListener("click", () => {
        removeActiveClasses();
        dish_img.classList.toggle("active");
        dish_img.closest(".dish").classList.toggle("active");
    });
});

function removeActiveClasses(){
    dishImage.forEach(dish_img => {
        dish_img.classList.remove("active");
        dish_img.closest(".dish").classList.remove("active");
    });
}
/*----------END OF MENU PAGE SCRIPT----------*/