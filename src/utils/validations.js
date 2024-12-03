export function validateFormData(formData) {
  const { firstName, friendsName, gender, animal, language, category } =
    formData;

  // Initialize an errors object
  let errors = {};

  // Regular expression to check if a string consists only of letters
  const lettersOnlyRegex = /^[A-Za-z]+$/;

  // Validate firstName: not empty and consists only of letters
  if (!firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  } else if (!lettersOnlyRegex.test(firstName)) {
    errors.firstName = "First name should contain letters only.";
  }

  // Validate friendsName: can be empty, but if not, consists only of letters
  if (friendsName && !lettersOnlyRegex.test(friendsName.trim())) {
    errors.friendsName = "Friend's name should contain letters only.";
  }

  // Validate gender: not empty
  if (!gender.trim()) {
    errors.gender = "Please select your gender.";
  }

  // Validate animal: not empty
  if (!animal.trim()) {
    errors.animal = "Please choose an animal.";
  }

  // Validate category: not empty
  if (!category.trim()) {
    errors.category = "Please select a category.";
  }

  // Determine if the form data is valid based on the presence of errors
  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
}
