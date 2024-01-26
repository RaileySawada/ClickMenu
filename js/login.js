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