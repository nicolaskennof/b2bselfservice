//this code is require to keep the member to stay as him in the journey inside the browser.
$(document).ready(function() {
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
     // $(".member-name").text(data.contactName);
  });

  $(document).on("click", "#newOrder", function(event) {
    event.preventDefault();
    console.log("entra al click de nuevo pedido");
    // Make a newBook object
    var email = $("#userEmail").text().trim();
    var userName=$("#userName").text().trim();
    localStorage.setItem('emailInput', email);
    localStorage.setItem('nameInput', userName);

    $.get("/add", function(data) {
      window.location.href = "/add";
    });
  });
});
