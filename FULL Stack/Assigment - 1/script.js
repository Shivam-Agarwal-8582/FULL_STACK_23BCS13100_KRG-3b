const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  let valid = true;

  // Reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";
  successMessage.textContent = "";

  // Validate Name
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    valid = false;
  }

  // Validate Email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!emailInput.value.match(emailPattern)) {
    emailError.textContent = "Enter a valid email.";
    valid = false;
  }

  // Validate Password
  if (passwordInput.value.trim() === "") {
    passwordError.textContent = "Password is required.";
    valid = false;
  }

  // Success
  if (valid) {
    successMessage.textContent = "Registration Successful";
    form.reset();
  }
});
