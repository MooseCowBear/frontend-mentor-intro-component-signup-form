const form = document.querySelector("form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

console.log(firstName, lastName, email, password);

//on change events to keep the color of neutral one when input to form

form.addEventListener("submit", function(event) {
    console.log("form submitted");
    event.preventDefault();
    let submit = true;
    //for each, we need to check if valid if not display error
    if (isEmpty(firstName)) {
        displayEmptyError(firstName);
        submit = false;
    }
    else {
        console.log("name was valid");
        removeEmptyError(firstName);
    }
    if (isEmpty(lastName)) {
        displayEmptyError(lastName);
        submit = false;
    }
    else {
        removeEmptyError(lastName);
    }
    if (isEmpty(password)) {
        displayEmptyError(password);
        submit = false;
    }
    else {
        removeEmptyError(password);
    }
    if (!isValidEmail(email)) {
        console.log("email invalid");
        displayInvalidError(email);
        submit = false;
    }
    else {
        console.log("email valid");
        removeInvalidError(email);
    }
    if (submit) {
        form.submit();
    }
}); 

function isEmpty(input) {
    if (input.value === null || input.value === ""){
        return true;
    }
    return false;
}

function isValidEmail(input) {
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegExp.test(input.value);
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

        input.after(warning); //insert warning after input
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