$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      alert("¡Por favor ingrese información en ambos campos para continuar!"); //maybe it's better to make into a modal here, as they don't like alerts...
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    var errMsg='';
    if(err.status==401){
      errMsg='Correo eletrónico o contraseña incorrectos. Por favor vuelva a intentar.';
    }
    else{
      errMsg='Hay un error del servidor. Favor de volver a intentar';
    }
    $("#alert").text(errMsg);
    $("#alert").fadeIn(500);
    $("#alert").css("display", "inline-block");
  }
});