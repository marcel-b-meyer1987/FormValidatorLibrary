
// Robust standard fallback messages in German
export const DEFAULT_MESSAGES = {
  valueMissing: "Dieses Feld darf nicht leer sein.",
  typeMismatch: "Bitte gib eine gültige Eingabe ein.",
  patternMismatch: "Das Format dieser Eingabe ist ungültig.",
  tooShort: "Mindestens {minLength} Zeichen erforderlich. Aktuell: {length}.",
  tooLong: "Maximal {maxLength} Zeichen erlaubt.",
  rangeUnderflow: "Der Wert muss mindestens {min} sein.",
  rangeOverflow: "Der Wert darf maximal {max} sein."
};

// Default callback for rendering error messages in UI
export const DEFAULT_ON_FIELD_ERROR = (field, message) => {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}