import { ref, reactive } from "vue";
import useValidators from "./validators";

const errors = reactive({})

export default function () {
  const { isEmpty, minMaxLength, isEmail } = useValidators();

  const validateByFieldName = (fieldName, fieldValue) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : ""
  }
  const validateEmailField = (fieldValue) => {
    errors.email = !fieldValue ? isEmpty("email", fieldValue) : isEmail(fieldValue)
  }
  const validatePasswordField = (fieldValue) => {
    errors.password = !fieldValue ? isEmpty("password", fieldValue) : minMaxLength("password", fieldValue, 5, 32)
  }
  const validateRepeatedPasswordField = (fieldValue, fieldValue2) => {
    errors.repeatedPassword = fieldValue != fieldValue2 ? "Password don't match" : ""
  }

  return { errors, validatePasswordField, validateRepeatedPasswordField, validateEmailField, validateByFieldName };
}
