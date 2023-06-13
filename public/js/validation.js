document.getElementById('username').addEventListener('input', function (ev) {
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,}$/;
  let userInput = ev.currentTarget;
  let username = userInput.value;
  if (usernameRegex.test(username)) {
    userInput.classList.add("valid-text");
    userInput.classList.remove("invalid-text");
  } else {
    userInput.classList.remove("valid-text");
    userInput.classList.add("invalid-text");
  }
});

const password1 = document.getElementById('password');
const password2 = document.getElementById('confirm-password');
password1.addEventListener("input", function () {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[/\*\-\+!@#$\^&~\[\]]).{8,}$/;
  let userInput = password1;
  let password = userInput.value;
  if (passwordRegex.test(password) && password === password2.value) {
    userInput.classList.add("valid-text");
    password2.classList.add("valid-text");
    userInput.classList.remove("invalid-text");
    password2.classList.remove("invalid-text");
  } else {
    userInput.classList.remove("valid-text");
    password2.classList.remove("valid-text");
    userInput.classList.add("invalid-text");
    password2.classList.add("invalid-text");
  }
});

password2.addEventListener("input", function () {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[/\*\-\+!@#$\^&~\[\]]).{8,}$/;
  let userInput = password2;
  let password = userInput.value;
  if (passwordRegex.test(password) && password === password1.value) {
    userInput.classList.add("valid-text");
    password1.classList.add("valid-text");
    userInput.classList.remove("invalid-text");
    password1.classList.remove("invalid-text");
  } else {
    userInput.classList.remove("valid-text");
    password1.classList.remove("valid-text");
    userInput.classList.add("invalid-text");
    password1.classList.add("invalid-text");
  }
});

document.getElementById('email').addEventListener("input", function (ev) {
  let emailInput = ev.currentTarget;
  emailInput.classList.toggle("valid-text", emailInput.checkValidity());
  emailInput.classList.toggle("invalid-text", !emailInput.checkValidity());
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("regform").addEventListener("submit", function (ev) {
    ev.preventDefault();
    const validAge = document.getElementById("confirmAge").checked;
    const validTOS = document.getElementById("TOS").checked;
    if (
      document.querySelectorAll(".valid-text").length === 4 &&
      document.getElementById("password").value === document.getElementById
        ("confirm-password").value &&
      validAge &&
      validTOS &&
      ev.currentTarget.tagName === "FORM"
    ) {
      console.log("Form is valid and can be submitted!");
      console.log(ev.currentTarget);
      document.getElementById("regform").submit();
      res.redirect('/login');
    } else {
      ev.preventDefault();
      console.log("Form is invalid!");
      return;
    }
    console.log(ev);
  });
});
