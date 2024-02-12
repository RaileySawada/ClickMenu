document.addEventListener("DOMContentLoaded", function () {
    let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes")) || [];

    displaySelectedDishes(selectedDishes);

    document.getElementById("orders").addEventListener("click", function (event) {
        if (event.target.classList.contains("delete")) {
            let index = event.target.dataset.index;
            selectedDishes.splice(index, 1);
            localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
            displaySelectedDishes(selectedDishes);
            updateTotalPrice(selectedDishes);
        }
    });
    document.getElementById("orders").addEventListener("change", function (event) {
        if (event.target.classList.contains("check")) {
            let index = event.target.closest(".order").dataset.index;
            let isChecked = event.target.checked;

            selectedDishes[index].isChecked = isChecked;
            localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));

            updateTotalPrice(selectedDishes);
        }
    });
    document.querySelector(".selector input[type='checkbox']").addEventListener("change", function (event) {
        let selectAllCheckbox = event.target;
        let allDishCheckboxes = document.querySelectorAll(".check");

        allDishCheckboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;

            let index = checkbox.closest(".order").dataset.index;
            selectedDishes[index].isChecked = selectAllCheckbox.checked;
        });

        localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
        updateTotalPrice(selectedDishes);
    });
    document.getElementById("checkout-btn").addEventListener("click", function () {
        let totalSelectedPrice = calculateTotalPrice(selectedDishes);

        if (totalSelectedPrice > 0) {
            displayPopupContainer(getCheckedDishes(selectedDishes));
        } else {
            alert("Please select at least one dish before checking out.");
        }
    });
});

function displaySelectedDishes(selectedDishes) {
    let reservationContainer = document.getElementById("order-list");
    
    reservationContainer.innerHTML = "";

    if (selectedDishes.length === 0) {
        let noDishesReserved = document.createElement("p");
        noDishesReserved.classList.add("nodish-txt")
        noDishesReserved.innerText = "No dish/dishes reserved";
        reservationContainer.appendChild(noDishesReserved);
    } else {
        selectedDishes.forEach((dish, index) => {
            displaySelectedDish(dish, index);
        });
    }
}

function displaySelectedDish(dish, index) {
    let reservationContainer = document.getElementById("orders");
    let orderList = document.getElementById("order-list");

    let existingDishElement = document.querySelector(`.order[data-name="${dish.name}"]`);

    if (existingDishElement) {
        let quantityElement = existingDishElement.querySelector(".qty");
        let quantity = parseInt(quantityElement.innerText) + (dish.quantity || 1);
        quantityElement.innerText = quantity;

        let totalPriceElement = existingDishElement.querySelector(".order-totalPrice p");
        totalPriceElement.innerText = "₱" + (dish.price * parseInt(quantity));

        let existingDish = selectedDishes.find((selectedDish) => selectedDish.name === dish.name);
        existingDish.quantity = quantity;
        localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
    } else {
        let selectedDish = document.createElement("div");
        selectedDish.classList.add("order");
        selectedDish.dataset.index = index;
        selectedDish.dataset.name = dish.name;

        let left = document.createElement("div");
        left.classList.add("left-section");

        let checkbox = document.createElement("div");
        checkbox.classList.add("checkbox");

        let check = document.createElement("input");
        check.classList.add("check");
        check.setAttribute("type", "checkbox");

        let order_pic = document.createElement("div");
        order_pic.classList.add("order-pic");

        let pic = document.createElement("img");
        pic.classList.add("selectedOrderPic");
        pic.setAttribute("src", dish.image);

        let order_name = document.createElement("div");
        order_name.classList.add("order-name");

        let orderName = document.createElement("p");
        orderName.innerText = dish.name;

        let right = document.createElement("div");
        right.classList.add("right-section");

        let order_price = document.createElement("div");
        order_price.classList.add("order-price");

        let orderPrice = document.createElement("p");
        orderPrice.innerText = "₱" + dish.price;

        let order_qty = document.createElement("div");
        order_qty.classList.add("order-quantity");

        let minus = document.createElement("button");
        minus.classList.add("minus");
        minus.innerText = "-";
        minus.addEventListener("click", function () {
            updateQuantityAndCheck(dish, -1, index);
        });

        let qty = document.createElement("p");
        qty.classList.add("qty");
        qty.innerText = dish.quantity || 1;

        let plus = document.createElement("button");
        plus.classList.add("plus");
        plus.innerText = "+";
        plus.addEventListener("click", function () {
            updateQuantityAndCheck(dish, 1, index);
        });

        let order_totalPrice = document.createElement("div");
        order_totalPrice.classList.add("order-totalPrice");

        var totalP = (dish.price * parseInt(qty.innerText));

        let totalPrice = document.createElement("p");
        totalPrice.innerText = "₱" + totalP;

        let order_action = document.createElement("div");
        order_action.classList.add("order-action");

        let action = document.createElement("p");
        action.innerText = "Delete";
        action.classList.add("drop");
        action.addEventListener("click", function () {deleteDish(index);});

        reservationContainer.appendChild(orderList);
        orderList.appendChild(selectedDish);
        selectedDish.appendChild(left);
        left.appendChild(checkbox);
        checkbox.appendChild(check);
        left.appendChild(order_pic);
        order_pic.appendChild(pic);
        left.appendChild(order_name);
        order_name.appendChild(orderName);
        selectedDish.appendChild(right);
        right.appendChild(order_price);
        order_price.appendChild(orderPrice);
        right.appendChild(order_qty);
        order_qty.appendChild(minus);
        order_qty.appendChild(qty);
        order_qty.appendChild(plus);
        right.appendChild(order_totalPrice);
        order_totalPrice.appendChild(totalPrice);
        right.appendChild(order_action);
        order_action.appendChild(action);
    }

}
function deleteDish(index) {
    let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes")) || [];
    
    selectedDishes.splice(index, 1);
    localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));

    let dishElement = document.querySelector(`.order[data-index="${index}"]`);
    dishElement.remove();
}
function updateTotalPrice(selectedDishes, deletedDish) {
    let totalPriceElement = document.querySelector(".totalPrice-txt p");
    let total = 0;

    selectedDishes.forEach((dish) => {
        if (dish.isChecked) {
            total += dish.price * (dish.quantity || 1);
        }
    });

    if (deletedDish && deletedDish.isChecked) {
        total -= deletedDish.price * (deletedDish.quantity || 1);
    }

    totalPriceElement.innerText = "₱ " + total;
}
function updateQuantityAndCheck(dish, change, index) {
    let selectedDishes = JSON.parse(localStorage.getItem("selectedDishes")) || [];
    dish.quantity = (dish.quantity || 1) + change;
    if (dish.quantity < 1) {
        selectedDishes.splice(index, 1);
        localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));

        let dishElement = document.querySelector(`.order[data-index="${index}"]`);
        dishElement.remove();
    } else {
        selectedDishes[index] = dish;
        localStorage.setItem("selectedDishes", JSON.stringify(selectedDishes));
    }

    displaySelectedDishes(selectedDishes);
}

function displayPopupContainer(selectedDishes) {
    let popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");
    let popupContent = document.createElement("div");
    popupContent.setAttribute("id","popup-content");

    let closeButton = document.createElement("button");
    closeButton.classList.add("close-btn");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", function () {
        popupContainer.style.display = "none";
    });

    document.getElementById("order-list").appendChild(popupContainer);
    popupContainer.appendChild(popupContent);
    popupContainer.appendChild(closeButton);

    popupContent.innerHTML = "";

    if (selectedDishes.length > 0) {
        selectedDishes.forEach((dish) => {
            let dishInfoContainer = document.createElement("div");
            dishInfoContainer.classList.add("popup-dish-info");

            let dishImage = document.createElement("img");
            dishImage.classList.add("popup-dish-image");
            dishImage.setAttribute("src", dish.image);
            dishInfoContainer.appendChild(dishImage);

            let dishInfo = document.createElement("div");
            dishInfo.classList.add("popup-dish-details");

            let nameInfo = document.createElement("p");
            nameInfo.classList.add("popup-dish-name");
            nameInfo.innerText = `${dish.name}`;
            dishInfo.appendChild(nameInfo);

            let quantityInfo = document.createElement("p");
            quantityInfo.innerText = `Quantity: ${dish.quantity || 1}`;
            dishInfo.appendChild(quantityInfo);

            let totalPriceInfo = document.createElement("p");
            totalPriceInfo.innerText = `Total Price: ₱ ${dish.price * (dish.quantity || 1)}`;
            dishInfo.appendChild(totalPriceInfo);

            dishInfoContainer.appendChild(dishInfo);
            popupContent.appendChild(dishInfoContainer);
        });

        let totalInfo = document.createElement("p");
        totalInfo.classList.add("totalPrice");
        totalInfo.innerText = `Total Price: ₱ ${calculateTotalPrice(selectedDishes)}`;
        popupContent.appendChild(totalInfo);

        let orderButton = document.createElement("button");
        orderButton.classList.add("order-btn");
        orderButton.innerText = "Place Order";
        orderButton.addEventListener("click", function () {
            moveSelectedDishesToOrders(selectedDishes);
            popupContainer.style.display = "none";
            alert("Order Placed! Redirecting to Orders page...");
            setTimeout(function () {
                window.location.href = "../Pages/Orders.html";
            }, 2000);
        });

        popupContent.appendChild(orderButton);
    }
}

function calculateTotalPrice(selectedDishes) {
    let total = 0;

    selectedDishes.forEach((dish) => {
        if (dish.isChecked) {
            total += dish.price * (dish.quantity || 1);
        }
    });

    return total;
}

function getCheckedDishes(selectedDishes) {
    return selectedDishes.filter(dish => dish.isChecked);
}

function moveSelectedDishesToOrders(selectedDishes) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    let checkedDishes = selectedDishes.filter((dish) => dish.isChecked);

    orders = orders.concat(checkedDishes);

    localStorage.setItem("orders", JSON.stringify(orders));

    deleteSelectedDishesFromReservation(selectedDishes);
}

function deleteSelectedDishesFromReservation(selectedDishes) {
    selectedDishes.forEach((dish) => {
        let index = selectedDishes.findIndex((selectedDish) => selectedDish.name === dish.name);

        let dishElement = document.querySelector(`.order[data-index="${index}"]`);
        if (dishElement) {
            dishElement.remove();
        }
    });

    localStorage.removeItem("selectedDishes");
}