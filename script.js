const form = document.querySelector("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

console.log(firstName, lastName, email, password);

//on change events to keep the color of neutral one when input to form

form.addEventListener("submit", function(event) {
    console.log("form submitted");
    //for each, we need to check if valid if not display error
    let submit = true;
    if (firstName.checkValidity()) {
        console.log("missing a name");
        displayEmptyError(firstName);
        submit = false;
    }
    if (lastName.checkValidity()) {
        displayEmptyError(lastName);
        submit = false;
    }
    if (password.checkValidity()) {
        displayEmptyError(password);
        submit = false;
    }
    if (email.validity.valueMissing || !email.validity.typeMismatch) {
        displayInvalidError(email);
        submit = false;
    }
    if (!submit){
        event.preventDefault(); //don't submit form
    }
});

function highlightError(input) {
    input.style.backgroundImage = "url('./images/icon-error.svg')";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "center right 1em";

    input.style.border = "2px solid hsl(0, 100%, 74%)";
}

function displayEmptyError(input) {
    highlightError(input);

    const warning = document.createElement("p");
    warning.setAttribute("class", "warning");
    warning.innerText = `${input.placeholder} cannot be empty`;

    input.after(warning); //insert warning after input
}

function displayInvalidError(input) {
    highlightError(input);

    const warning = document.createElement("p");
    warning.setAttribute("class", "warning");
    warning.innerText = `Looks like this is not a valid ${input.placeholder.toLowerCase()}`;

    input.after(warning);
}