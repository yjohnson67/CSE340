const passButton = document.querySelector('#pb');

passButton.addEventListener("click", function() {
   const passwordField = document.getElementById('password');
   const type = passwordField.getAttribute("type");
   if (type === "password") {
      passwordField.setAttribute("type", "text");
   } else {
      passwordField.setAttribute("type", "password");
   }
});