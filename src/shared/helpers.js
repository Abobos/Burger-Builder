export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});

export const checkFormValidity = (
  value,
  rules,
  trimmedValue = value.trim()
) => {
  let isValid = false;

  if (!rules) {
    return true;
  }

  if (rules.required) isValid = trimmedValue !== "";

  if (rules.minLength)
    isValid = trimmedValue.length >= rules.minLength && isValid;

  if (rules.maxLength)
    isValid = trimmedValue.length <= rules.maxLength && isValid;

  if (rules.isEmail) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(trimmedValue) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(trimmedValue) && isValid;
  }

  return isValid;
};
