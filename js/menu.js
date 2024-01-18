let dishes = {
    data: [
        {
            image: "../images/dishes/pork-sinigang.png",
            name: "Pork Sinigang",
            description: "Good Quality Pork extra tamarind and vegetables",
            price: "200",
            day1: "Monday",
            day2: "Wednesday",
            day3: "Friday"
        },
        {
            image: "../images/dishes/beef-kaldereta.png",
            name: "Beef Kaldereta",
            description: "Tender beef simmered in a hot tomato sauce and vegetables",
            price: "250",
            day1: "Tuesday",
            day2: "Thursday",
            day3: "Friday"
        },
        {
            image: "../images/dishes/beef-bulalo.png",
            name: "Beef Bulalo",
            description: "Soup of tender beef shanks and marrow bones and vegetables",
            price: "300",
            day1: "Wednesday",
            day2: "Thursday",
            day3: "Monday"
        },
        {
            image: "../images/dishes/beef-steak.png",
            name: "Beef Steak",
            description: "Succulent slices of beef marinated and cooked in a savory soy-citrus sauce",
            price: "250",
            day1: "Monday",
            day2: "Wednesday",
            day3: "Thursday"
        },
        {
            image: "../images/dishes/pinakbet.png",
            name: "Pinakbet",
            description: "Colorful medley of mixed vegetables, simmered in shrimp paste",
            price: "150",
            day1: "Monday",
            day2: "Tuesday",
            day3: "Friday"
        },
        {
            image: "../images/dishes/bicol-express.png",
            name: "Bicol Express",
            description: "Bold and fiery flavors of Bicolano cuisine, spicy coconut stew with pork, chilies",
            price: "200",
            day1: "Monday",
            day2: "Tuesday",
            day3: "Friday"
        },
        {
            image: "../images/dishes/pork-karekare.png",
            name: "Pork Kare-kare",
            description: "Rich and creamy stew featuring tender pork, tripe and savory peanut sauce",
            price: "300",
            day1: "Tuesday",
            day2: "Wednesday",
            day3: "Thursday"
        },
        {
            image: "../images/dishes/sisig.png",
            name: "Sisig",
            description: "Sizzling dish finely chopped of season pork face, and onions with egg",
            price: "150",
            day1: "Wednesday",
            day2: "Thursday",
            day3: "Tuesday"
        },
        {
            image: "../images/dishes/menudo.png",
            name: "Menudo",
            description: "Scrumptiously rich tomato based stew of pork meat, liver, and hint of sweetness",
            price: "200",
            day1: "Tuesday",
            day2: "Thursday",
            day3: "Friday"
        }
    ],
};

/*const categories = [...new Set(dishes.map((data) => {return data}))]
let i = 0;

document.getElementById('dish-menu').innerHTML = categories.map((data) =>{
    var {image, name, description, price, day1, day2, day3} = data;
    return(
        `<div class='dish ${day1} ${day2} ${day3}'>
            <div class='dish-info'>
                <div class='dish-img-cont'>
                    <img class='dish-img' src='${image}' alt=''>
                </div>
                <div class='info'>
                    <p class='dish-name'>${name}</p>
                    <p class='dish-desc'>${description}</p>
                    <div class='price-section'>
                        <div class='price-cont'>
                            <p class='price'>₱ ${price}</p>
                        </div>
                        <div class='add-cont'>`+
                            "<button class='add' oclick='addToReservation("+(i++)+")'>Add to Reservation</button>"+
                        `</div>
                    </div>
                </div>
            </div>
        </div>`
    )
}).join('');*/

for(let i of dishes.data){
    let dish_cont = document.createElement("div");
    dish_cont.classList.add("dish");
    dish_cont.classList.add(i.day1);
    dish_cont.classList.add(i.day2);
    dish_cont.classList.add(i.day3);

    let dish_info = document.createElement("div");
    dish_info.classList.add("dish-info");

    let dish_img_cont = document.createElement("div");
    dish_img_cont.classList.add("dish-img-cont");

    let dish_img = document.createElement("img");
    dish_img.setAttribute("src", i.image);
    dish_img.classList.add("dish-img");

    let inf = document.createElement("div");
    inf.classList.add("info");

    let dish_name = document.createElement("p");
    dish_name.classList.add("dish-name");
    dish_name.innerText = i.name;

    let dish_desc = document.createElement("p");
    dish_desc.classList.add("dish-desc");
    dish_desc.innerText = i.description;

    let price_section = document.createElement("div");
    price_section.classList.add("price-section");

    let price_cont = document.createElement("div");
    price_cont.classList.add("price-cont");

    let price = document.createElement("p");
    price.classList.add("price");
    price.innerText = "₱" + i.price;

    let add_cont = document.createElement("div");
    add_cont.classList.add("add-cont");

    let add_btn = document.createElement("button");
    add_btn.classList.add("add");
    add_btn.innerText = "Add to Reservation";
    add_btn.setAttribute("onclick", "addToReservation()");


    document.getElementById("dish-menu").appendChild(dish_cont);
    dish_cont.appendChild(dish_info);
    dish_info.appendChild(dish_img_cont);
    dish_img_cont.appendChild(dish_img);
    dish_info.appendChild(inf);
    inf.appendChild(dish_name);
    inf.appendChild(dish_desc);
    inf.appendChild(price_section);
    price_section.appendChild(price_cont);
    price_cont.appendChild(price);
    price_section.appendChild(add_cont);
    add_cont.appendChild(add_btn);
}

function filterDish(selectedDay) {
    const allDishes = document.querySelectorAll('.dish');
    
    allDishes.forEach(dish => {
        if (dish.classList.contains(selectedDay) || selectedDay === 'All') {
            dish.classList.remove("hide");
        } else {
            dish.classList.add("hide");
        }
    });
}

document.getElementById('selector').addEventListener('change', function() {
    removeActiveClasses();
    const selectedDay = this.value;
    filterDish(selectedDay);
});

filterDish('All');

document.getElementById("search-btn").addEventListener("click", () => {
    let searchInput = document.getElementById("search-bar").value;
    let elements = document.querySelectorAll(".dish-name");
    let dishess = document.querySelectorAll(".dish");

    removeActiveClasses();
    
    elements.forEach((element, index) => {
        if(element.innerText.toUpperCase().includes(searchInput.toUpperCase())){
            dishess[index].classList.remove("hide");
        }
        else{
            dishess[index].classList.add("hide");
        }
    });
});

const dishImage = document.querySelectorAll(".dish-img");
const info = document.querySelectorAll(".dish-info");
dishImage.forEach(dish_img => {
    dish_img.addEventListener("click", () => {
        removeActiveClasses();
        dish_img.classList.toggle("active");
        dish_img.closest(".dish").classList.toggle("active");
    });
});
info.forEach(information => {
    information.addEventListener("click", () => {
        removeActiveClasses();
        information.classList.toggle("active");
        information.closest(".dish").classList.toggle("active");
    });
});

function removeActiveClasses(){
    dishImage.forEach(dish_img => {
        dish_img.classList.remove("active");
        dish_img.closest(".dish").classList.remove("active");
    });
}

//RESERVATION
/*var reservation = [];

function addToReservation(a){
    reservation.push({...})
}

function displayFoods(a){
    let j = 0;
    if(reservation.length == 0){
        document.getElementById("order").innerHTML = "Your Cart is Empty";
    }
    else{
        document.getElementById("order").innerHTML = reservation.map((items) => {
            var {image, name, price} = items;
            return(
                `<div class="order">
                    <div class="left-section">
                        <div class="checkbox">
                            <input class="check" type="checkbox">
                        </div>
                        <div class="order-pic">
                            <img src=${image} alt="Beef Bulalo Photo">
                        </div>
                        <div class="order-name">
                            <p>Beef Bulalo</p>
                        </div>
                    </div>
                    <div class="right-section">
                        <div class="order-price">
                            <p>₱ ${price}</p>
                        </div>
                        <div class="order-quantity">
                            <button class="minus">-</button>
                            <input class="qty" type="number" value="2" min="1" max="10">
                            <button class="plus">+</button>
                        </div>
                        <div class="order-totalPrice">
                            <p>₱ 600</p>
                        </div>
                        <div class="order-action">
                            <p>Delete</p>
                        </div>
                    </div>
                </div>`
            );
        }).join('');
    }
}*/