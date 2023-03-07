export default function useValidators() {
  const isEmpty = (fieldName, fieldValue) => {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
  };
  const minMaxLength = (fieldName, fieldValue, min, max) => {
    if (fieldValue.length < min || fieldValue.length > max) {
      return `The ${fieldName} should be ${min} to ${max} characters long`;
    } else {
      return "";
    }
  };
  const isEmail = (fieldValue) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return !EMAIL_REGEXP.test(fieldValue) ? "Enter a valid email adress" : "";
  };
  return { isEmpty, minMaxLength, isEmail }
}
