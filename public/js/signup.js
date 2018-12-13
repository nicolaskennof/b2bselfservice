$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var nameInput = $("input#name-input");
  var streetInput = $("input#street-input");
  var extNumInput = $("input#extNum-input");
  var intNumInput = $("input#intNum-input");
  var neighborhoodInput = $("input#neighborhood-input");
  var zipCodeInput = $("input#zipCode-input");
  var cityInput = $("input#city-input");
  var stateInput = $("input#state-input");
  var taxIdInput = $("input#taxId-input");
  var contactNameInput = $("input#contactName-input");
  var telephoneInput = $("input#telephone-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      street: streetInput.val().trim(),
      extNum: extNumInput.val().trim(),
      intNum: intNumInput.val().trim(),
      neighborhood: neighborhoodInput.val().trim(),
      zipCode: zipCodeInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      taxId: taxIdInput.val().trim(),
      contactName: contactNameInput.val().trim(),
      telephone: telephoneInput.val().trim()
    };

    if (
      !userData.email ||
      !userData.password ||
      !userData.name ||
      !userData.street ||
      !userData.extNum ||
      //!userData.intNum || The interior number is optional
      !userData.neighborhood ||
      !userData.zipCode ||
      !userData.city ||
      !userData.state ||
      !userData.taxId ||
      !userData.contactName ||
      !userData.telephone
    ) {
      alert(
        "Por favor ingrese todos los datos requeridos. El único campo que no es obligatorio es el número interior..."
      );
      return;
    }
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    nameInput.val("");
    streetInput.val("");
    extNumInput.val("");
    intNumInput.val("");
    neighborhoodInput.val("");
    zipCodeInput.val("");
    cityInput.val("");
    stateInput.val("");
    taxIdInput.val("");
    contactNameInput.val("");
    telephoneInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      street: userData.street,
      extNum: userData.extNum,
      intNum: userData.intNum,
      neighborhood: userData.neighborhood,
      zipCode: userData.zipCode,
      city: userData.city,
      state: userData.state,
      taxId: userData.taxId,
      contactName: userData.contactName,
      telephone: userData.telephone
    })
      .then(function(data) {
        window.location.replace(data);
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    var errMsg = "";
    if (err.responseJSON.errors[0].message === "email must be unique") {
      errMsg = "Este correo electrónico ya está registrado.";
    } else {
      errMsg = "Error del servidor. Favor de volver a intentar.";
    }
    $("#alert .msg").text(errMsg);
    $("#alert").fadeIn(500);
    $("#alert").css("display", "block");
  }
});