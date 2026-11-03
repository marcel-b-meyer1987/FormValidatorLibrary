
// Robust standard fallback messages in German
const DEFAULT_MESSAGES = {
  valueMissing: "Dieses Feld darf nicht leer sein.",
  typeMismatch: "Bitte gib eine gültige Eingabe ein.",
  patternMismatch: "Das Format dieser Eingabe ist ungültig.",
  tooShort: "Mindestens {minLength} Zeichen erforderlich. Aktuell: {length}.",
  tooLong: "Maximal {maxLength} Zeichen erlaubt.",
  rangeUnderflow: "Der Wert muss mindestens {min} sein.",
  rangeOverflow: "Der Wert darf maximal {max} sein."
};

const DEFAULT_ON_FIELD_ERROR = (field, message) => {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}


export class FormValidator {

    constructor(formElement, customMessages = {}, options = {}) {

        /**
         * @param {HTMLFormElement} formElement - the form element in the DOM that needs validation
         * @param {Object} customMessages - an optional object containing custom messages for some or every validity property
         * @param {Object} options - optional config parameters, such as callbacks
         */

        // return early if no form element has been passed in
        if (!formElement) {
            throw new Error("The FormValidator instance needs at least a form element as argument.");
        }

        // define form and fields
        this.form = formElement;
        this.fields = Array.from(this.form.querySelectorAll("input, textarea, select"));

        // pull in default error messages and override with custom messages (if any)
        this.messages = { ...DEFAULT_MESSAGES, ...customMessages };

        // set onFieldError callback - either to custom or default fallback
        this.onFieldError = options.onFieldError || DEFAULT_ON_FIELD_ERROR;

        this.init();
    }

    init() {

        // turn off browser's default visual feedback on form validation to allow customised styling in CSS
        this.form.setAttribute("novalidate", "");

        // register all the needed event handlers for each field, as well as for the submit call
        this.fields.forEach(field => {
            field.addEventListener("blur", () => this.validateField(field));
            field.addEventListener("input", () => this.validateField(field));
        });

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    // helper function to dynamically replace templates in messages by evaluated strings
    interpolate(template, field) {

        // if template is a function, that should be allowed, too => return it immediately
        if (typeof template === "function") return template(field);

        // otherwise return the string based on the field properties and template
        return template
            .replace("{minLength}", field.minLength)
            .replace("{maxLength}", field.maxLength)
            .replace("{min}", field.min)
            .replace("{max}", field.max)
            .replace("{length}", field.value.length);
    }

    validateField(field) {

        // always reset custom validity first
        field.setCustomValidity("");

        // Check which native HTML 5 error occurs (if any)
        // since field.validity is an object, we loop through our config
        for (const errorKey in this.messages) {
            if (field.validity[errorKey]) {
                // dynamically generate error message based on errorKey and our message table
                const rawMessage = this.messages[errorKey];
                const formattedMessage = this.interpolate(rawMessage, field);

                // pass the message to the browser, triggering :user-invalid pseudo class in CSS
                field.setCustomValidity(formattedMessage);
                break; // prioritise first mistake found
            }
        }

        // trigger UI callback to display the error message in the DOM
        // (in case the field is valid, error message will be "", 
        // hence deleting possible former messages from the DOM)
        this.onFieldError(field, formattedMessage);

        return field.checkValidity(); // true if field is valid, false if invalid
    }

    handleSubmit(event) {

        let isFormValid = true;

        this.fields.forEach(field => {
            const isFieldValid = this.validateField(field);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        if(!isFormValid) {
            event.preventDefault();

            // set focus to first invalid field
            const firstInvalid = this.fields.find(field => !field.validity.valid);
            if (firstInvalid) firstInvalid.focus();
        }
    }

}