
// Robust standard fallback messages in German
export const DEFAULT_MESSAGES = {
  valueMissing: "This field must not be left blank.",
  typeMismatch: "Please make a valid entry.",
  patternMismatch: "The format is invalid.",
  tooShort: "At least {minLength} characters needed. Currently entered: {length}.",
  tooLong: "No more than {maxLength} characters allowed.",
  rangeUnderflow: "The value must be at least {min}.",
  rangeOverflow: "The value may not be higher than {max}."
};

// Default callback for rendering error messages in UI
export const DEFAULT_ON_FIELD_ERROR = (field, message) => {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}