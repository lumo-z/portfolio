// DOM Elements
const openDialogBtn = document.getElementById("openDialogBtn");
const registrationDialog = document.getElementById("registrationDialog");
const closeRegistrationDialog = document.getElementById(
  "closeRegistrationDialog"
);
const cancelRegistration = document.getElementById("cancelRegistration");
const registrationForm = document.getElementById("registrationForm");
const confirmationDialog = document.getElementById("confirmationDialog");
const cancelConfirmation = document.getElementById("cancelConfirmation");
const confirmRegistration = document.getElementById("confirmRegistration");
const confirmEmail = document.getElementById("confirmEmail");
const successMessage = document.getElementById("successMessage");

// Form Elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const submitRegistrationBtn = document.getElementById("submitRegistration");
const strengthMeter = document.getElementById("strengthMeter");

// Error Elements
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

// Open registration dialog
openDialogBtn.addEventListener("click", () => {
  registrationDialog.classList.add("active");
  // Reset form on open
  registrationForm.reset();
  resetValidation();
});

// Close registration dialog
const closeRegistration = () => {
  registrationDialog.classList.remove("active");
};

closeRegistrationDialog.addEventListener("click", closeRegistration);
cancelRegistration.addEventListener("click", closeRegistration);

// Close confirmation dialog
const closeConfirmation = () => {
  confirmationDialog.classList.remove("active");
};

cancelConfirmation.addEventListener("click", closeConfirmation);

// Validate email
const validateEmail = () => {
  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!email) {
    showError(emailInput, emailError, "请输入邮箱地址");
    return false;
  }

  if (!isValid) {
    showError(emailInput, emailError, "请输入有效的邮箱地址");
    return false;
  }

  hideError(emailInput, emailError);
  return true;
};

// Validate password
const validatePassword = () => {
  const password = passwordInput.value;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isValidLength = password.length >= 2 && password.length <= 12;
  const isValid = hasLetter && hasNumber && isValidLength;

  // Update password strength meter
  if (password.length === 0) {
    strengthMeter.style.width = "0%";
    strengthMeter.className = "strength-meter";
  } else if (password.length < 4) {
    strengthMeter.style.width = "30%";
    strengthMeter.className = "strength-meter";
  } else if (password.length < 8 || !hasLetter || !hasNumber) {
    strengthMeter.style.width = "60%";
    strengthMeter.className = "strength-meter medium";
  } else {
    strengthMeter.style.width = "100%";
    strengthMeter.className = "strength-meter strong";
  }

  if (!password) {
    showError(passwordInput, passwordError, "请输入密码");
    return false;
  }

  if (!isValid) {
    showError(passwordInput, passwordError, "密码必须为2-12位数字字母组合");
    return false;
  }

  hideError(passwordInput, passwordError);
  return true;
};

// Validate password confirmation
const validatePasswordConfirmation = () => {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!confirmPassword) {
    showError(confirmPasswordInput, confirmPasswordError, "请确认密码");
    return false;
  }

  if (password !== confirmPassword) {
    showError(
      confirmPasswordInput,
      confirmPasswordError,
      "两次输入的密码不一致"
    );
    return false;
  }

  hideError(confirmPasswordInput, confirmPasswordError);
  return true;
};

// Show error
const showError = (input, errorElement, message) => {
  input.classList.add("error");
  input.classList.remove("success");
  errorElement.textContent = message;
  errorElement.style.display = "block";
};

// Hide error
const hideError = (input, errorElement) => {
  input.classList.remove("error");
  input.classList.add("success");
  errorElement.style.display = "none";
};

// Reset validation state
const resetValidation = () => {
  [emailInput, passwordInput, confirmPasswordInput].forEach((input) => {
    input.classList.remove("error", "success");
  });

  [emailError, passwordError, confirmPasswordError].forEach((error) => {
    error.style.display = "none";
  });

  strengthMeter.style.width = "0%";
  strengthMeter.className = "strength-meter";
  submitRegistrationBtn.disabled = true;
};

// Check form validity
const checkFormValidity = () => {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isConfirmValid = validatePasswordConfirmation();

  submitRegistrationBtn.disabled = !(
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid
  );
};

// Form input event listeners
emailInput.addEventListener("input", () => {
  validateEmail();
  checkFormValidity();
});

passwordInput.addEventListener("input", () => {
  validatePassword();
  // Re-validate confirmation when password changes
  if (confirmPasswordInput.value) {
    validatePasswordConfirmation();
  }
  checkFormValidity();
});

confirmPasswordInput.addEventListener("input", () => {
  validatePasswordConfirmation();
  checkFormValidity();
});

// Form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateEmail() && validatePassword() && validatePasswordConfirmation()) {
    confirmEmail.textContent = emailInput.value.trim();
    confirmationDialog.classList.add("active");
  }
});

// Confirm registration
confirmRegistration.addEventListener("click", () => {
  // Simulate registration process
  submitRegistrationBtn.disabled = true;
  submitRegistrationBtn.textContent = "处理中...";

  setTimeout(() => {
    closeConfirmation();
    closeRegistration();

    // Show success message
    successMessage.style.display = "block";

    // Reset form
    registrationForm.reset();
    resetValidation();

    // Reset button text
    setTimeout(() => {
      submitRegistrationBtn.textContent = "注册";
    }, 1000);

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 5000);
  }, 1500);
});

// Initial setup
resetValidation();
