// for frontend

function showForm(formID){ // Show a specific form based on the form id provided.
    // Select all HTML elements with form-box class. Then iterate through all these elements and remove their active class.
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));

    // Select element with the form ID provided to make it active.
    document.getElementById(formID).classList.add("active");

}

// Self Teach: Read the signup error code and show its message on the registration form.
const signupError = new URLSearchParams(window.location.search).get("signup");
const signupMessages = new Map([
    ["email", "Enter a valid Northwestern email address."],
    ["password", "Use a password with at least 8 characters."],
    ["password-policy", "Choose a stronger password and try again."],
    ["failed", "We couldn't complete signup. Please try again."]
]);

if (signupMessages.has(signupError)) {
    showForm("register-form");
    const message = document.getElementById("signup-error");
    message.textContent = signupMessages.get(signupError);
    message.hidden = false;
}




/* 
** JavaScript Documentation **
document -> represents the HTML document which is a webpage in this case
            we can manipulate HTML elements

nodeList

* Methods *
querySelectorAll()  -> find all HTML elements that match a CSS selector
                        and return a nodeList (collection of elements)
.forEach() -> Loops through each item in an array or collection (including a NodeList) 
               and executes a function for each item.

* Properties *
.classList -> A read-only property of an HTML element that provides access to its CSS classes.
             use methods such as .add(), .remove(), and .toggle() to modify them.



*/
