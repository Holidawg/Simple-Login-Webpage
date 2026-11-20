function showForm(formID){ // Show a specific form based on the form id provided.
    // Select all HTML elements with form-box class. Then iterate through all these elements and remove their active class.
    document.querySelectorAll(".form-box").forEach(form => form.classList.remove("active"));

    // Select element with the form ID provided to make it active.
    document.getElementById(formID).classList.add("active");

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