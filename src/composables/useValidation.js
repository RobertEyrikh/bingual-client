import { reactive } from "vue";
import useValidators from "../helpers/validators";

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
  const validateWordField = (index, fieldValue) => {
    errors[index] = !fieldValue ? isEmpty("word", fieldValue) : ""
  }

  return { errors, validatePasswordField, validateRepeatedPasswordField, validateEmailField, validateByFieldName, validateWordField };
}
