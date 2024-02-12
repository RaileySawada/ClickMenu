const dqStar = document.querySelectorAll(".rating-dq .star");
dqStar.forEach((item, idx)=> {
    item.addEventListener("click", function () {
        dqStar.forEach(i=>{
            i.classList.replace("bxs-star", "bx-star");
            i.classList.remove("active");
        })
        for(let i=0;i<dqStar.length;i++){
            if(i<=idx){
                dqStar[i].classList.replace("bx-star", "bxs-star");
                dqStar[i].classList.add("active");
            }
        }
    });
});
const ssStar = document.querySelectorAll(".rating-ss .star");
ssStar.forEach((item, idx)=> {
    item.addEventListener("click", function () {
        ssStar.forEach(i=>{
            i.classList.replace("bxs-star", "bx-star");
            i.classList.remove("active");
        })
        for(let i=0;i<ssStar.length;i++){
            if(i<=idx){
                ssStar[i].classList.replace("bx-star", "bxs-star");
                ssStar[i].classList.add("active");
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.querySelector('.submit-btn');
    const userReviewForm = document.querySelector('.user-review');
    const usersReviewContainer = document.querySelector('.users-review');
    const userNameInput = document.querySelector('.username');

    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    storedReviews.forEach((review) => {
        usersReviewContainer.appendChild(createReviewElement(review));
    });

    submitBtn.addEventListener('click', function () {
        const selectedDQStars = document.querySelectorAll('.rating-dq .star.active');
        const selectedSSStars = document.querySelectorAll('.rating-ss .star.active');
        const reviewTextarea = document.querySelector('.user-review textarea');
        const selectedOrder = document.getElementById('order-selector').value;
        const userName = userNameInput.value || 'Your Name';

        if (selectedDQStars.length > 0 && selectedSSStars.length > 0 && reviewTextarea.value.trim() !== '') {
            const newReview = {
                name: userName,
                order: getSelectedDishName(selectedOrder),
                dqStars: selectedDQStars.length,
                ssStars: selectedSSStars.length,
                review: reviewTextarea.value,
            };

            storedReviews.unshift(newReview);
            localStorage.setItem('reviews', JSON.stringify(storedReviews));

            usersReviewContainer.insertBefore(createReviewElement(newReview), usersReviewContainer.firstChild);

            userReviewForm.reset();
            dqStar.forEach((star) => {
                star.classList.replace('bxs-star', 'bx-star');
                star.classList.remove('active');
            });
            ssStar.forEach((star) => {
                star.classList.replace('bxs-star', 'bx-star');
                star.classList.remove('active');
            });
        } else {
            alert('Please provide a valid review with at least one star for dish quality and seller service.');
        }
    });

    function createReviewElement(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('row', 'customer-review');
        reviewElement.innerHTML = `
            <div class="row top-section">
                <div class="c-review">
                    <div class="customer-profile-cont">
                        <img class="customer-profile" src="../images/user-profiles/main-profile.jpg" alt="Customer's Profile">
                    </div>
                    <div class="customer">
                        <p class="customer-name">Railey Dela Peña</p>
                        <p class="customer-order">Order: <span>${review.order}</span></p>
                    </div>
                    <div class="rate">
                        <div class="dish-quality">
                            <p>Dish Quality</p>
                            <div class="users-rate dishQuality">
                                ${createStarElements(review.dqStars)}
                            </div>
                        </div>
                        <div class="seller-service">
                            <p>Seller Service</p>
                            <div class="users-rate sellerService">
                                ${createStarElements(review.ssStars)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row review-section">
                <div class="review-txt-cont">
                    <pre class="review">${review.review}</pre>
                </div>
            </div>
        `;
        return reviewElement;
    }

    function createStarElements(numStars) {
        let starElements = '';
        for (let i = 0; i < numStars; i++) {
            starElements += '<i class="bx bxs-star star"></i>';
        }
        return starElements;
    }

    function getSelectedDishName(orderValue) {
        const orderSelector = document.getElementById('order-selector');
        const selectedOption = orderSelector.querySelector(`option[value="${orderValue}"]`);
        return selectedOption ? selectedOption.textContent : '';
    }
});