document.addEventListener("DOMContentLoaded", function () {
    let selectedDishes = JSON.parse(localStorage.getItem("orders")) || [];

    displaySelectedDishes(selectedDishes);

    document.getElementById("checkout-btn").addEventListener("click", function () {
        let totalSelectedPrice = calculateTotalPrice(selectedDishes);

        if (totalSelectedPrice > 0) {
            moveSelectedDishesToOrders(selectedDishes);
            alert("Order Placed!");
        } else {
            alert("Please select at least one dish before checking out.");
        }
    });
});

function displaySelectedDishes(selectedDishes) {
    let ordersContainer = document.getElementById("orders");

    ordersContainer.innerHTML = "";

    if (selectedDishes.length === 0) {
        let noDishesReserved = document.createElement("p");
        noDishesReserved.classList.add("nodish-txt");
        noDishesReserved.innerText = "No dish/dishes reserved";
        ordersContainer.appendChild(noDishesReserved);
    } else {
        selectedDishes.forEach((dish, index) => {
            displaySelectedDish(dish, index);
        });
    }
}

function displaySelectedDish(dish, index) {
    let ordersContainer = document.getElementById("orders");

    let orderElement = document.createElement("div");
    orderElement.classList.add("order");

    let orderDetails = document.createElement("div");
    orderDetails.classList.add("order-details");

    let dishImage = document.createElement("img");
    dishImage.classList.add("order-dish-image");
    dishImage.setAttribute("src", dish.image);

    let dishInfo = document.createElement("div");
    dishInfo.classList.add("order-dish-info");

    let nameInfo = document.createElement("p");
    nameInfo.classList.add("dish-name");
    nameInfo.innerText = `${dish.name}`;

    let quantityInfo = document.createElement("p");
    quantityInfo.innerText = `Quantity: ${dish.quantity || 1}`;

    let totalPriceInfo = document.createElement("p");
    totalPriceInfo.innerText = `Total Price: ₱ ${dish.price * (dish.quantity || 1)}`;

    ordersContainer.appendChild(orderElement);
    orderElement.appendChild(orderDetails);
    orderDetails.appendChild(dishImage);
    orderDetails.appendChild(dishInfo);
    dishInfo.appendChild(nameInfo);
    dishInfo.appendChild(quantityInfo);
    dishInfo.appendChild(totalPriceInfo);
}

function moveSelectedDishesToOrders(selectedDishes) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let checkedDishes = selectedDishes.filter((dish) => dish.isChecked);

    orders = orders.concat(checkedDishes);

    localStorage.setItem("orders", JSON.stringify(orders));

    localStorage.removeItem("orders");

    displaySelectedDishes([]);
}