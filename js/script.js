const hamburger = document.querySelector(".hamburger-menu");
const backdrop = document.querySelector(".backdrop-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    backdrop.classList.toggle("active");
})

const dishImage = document.querySelectorAll(".dish-img");
const dish = document.querySelector(".dish");
let activeDishImage = null;
let activeDish = null;
dishImage.forEach(dishImage => {
    dishImage.addEventListener("click", () => {
        if((activeDishImage && activeDishImage !== dishImage) || (activeDish && activeDish !== dish)){
            activeDishImage.classList.remove("active");
            activeDish.classList.remove("active");
        }
        dishImage.classList.toggle("active");
        dishImage.closest(".dish").classList.toggle("active");
        /*activeDishImage = dishImage;*/
        activeDishImage = dishImage.classList.contains("active") ? dishImage : null;
        activeDish = dish.classList.contains("active") ? dish : null;
    });
});