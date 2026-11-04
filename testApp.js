import { FormValidator } from "./FormValidator.js";

const todoForm = document.getElementById("todoForm");
const validator = new FormValidator(todoForm);

// add a custom rule for the date
validator.addRule({
    name: "future-date",
    message: "Das Fälligkeitsdatum muss heute oder in der Zukunft liegen",
    validate: (field) => {
        if (!field.value) return true; // if empty, this will be caught by native HTML 5 required attribute validation

        const inputDate = new Date(field.value);
        const today = new Date();

        // set times to 0, to compare days only
        inputDate.setHours(0,0,0,0);
        today.setHours(0,0,0,0);

        console.log(inputDate);
        console.log(today);

        // returns true if date is today or in the future,
        // returns false if date is in the past
        return inputDate.getTime() >= today.getTime(); 
    }
});