const form = document.querySelector("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

console.log(firstName, lastName, email, password);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const firstNameValid = acceptInput(firstName);
    const lastNameValid = acceptInput(lastName);
    const passwordValid = acceptInput(password);
    const emailVaild = acceptEmail();

    if (firstNameValid && lastNameValid && passwordValid && emailVaild) {
        form.submit();
    }
});

function acceptEmail() {
    if (email.value.length === 0) {
        displayEmptyError(email);
        return false;
    }
    else if (!isValidEmail(email)) {
        console.log("email invalid");
        displayInvalidError(email);
        return false;
    }
    else {
        console.log("email valid");
        removeInvalidError(email);
    }
    return true;

    function isValidEmail(input) {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegExp.test(input.value);
    }
}

function acceptInput(input) {
    if (input.value.length === 0) {
        console.log("empty field");
        displayEmptyError(input);
        return false;
    }
    removeEmptyError(input);
    return true;
}

function highlightError(input) {
    input.style.backgroundImage = "url('./images/icon-error.svg')";
    input.style.backgroundRepeat = "no-repeat";
    input.style.backgroundPosition = "center right 1em";

    input.style.border = "2px solid hsl(0, 100%, 74%)";
}

function displayEmptyError(input) {
    highlightError(input);

    //need to check if the warning is already displayed
    const sibling = input.nextSibling;
    if (sibling !== null && sibling.nodeName !== "P"){
        const warning = document.createElement("p");
        warning.setAttribute("class", "warning");
        warning.innerText = `${input.placeholder} cannot be empty`;

        input.after(warning); 
    }
}

function displayInvalidError(input) {
    highlightError(input);
    const sibling = input.nextSibling;
    if (sibling !== null && sibling.nodeName !== "P"){
        const warning = document.createElement("p");
        warning.setAttribute("class", "warning");
        warning.innerText = `Looks like this is not a valid ${input.placeholder.toLowerCase()}`;

        input.after(warning);
    }
}

function removeEmptyError(input) {
    removeHighlightError(input);
    const sibling = input.nextSibling;
    if (sibling !== null && sibling.nodeName === "P"){
        sibling.remove();
    }
}

function removeInvalidError(input) {
    removeHighlightError(input);
    const sibling = input.nextSibling;
    if (sibling !== null && sibling.nodeName === "P"){
        sibling.remove();
    }
}

function removeHighlightError(input) {
    input.style.background = "none";
    input.style.border = "1px solid hsl(249, 10%, 26%)";
}