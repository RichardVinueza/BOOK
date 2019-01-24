window.onload = initialize; //Espera a que se cargué la página para llamar a la función ==> function initialize(){}

var formBookings;
var refBookings;
var tbodyTableBookings;
var CREATE = "DONE";
var UPDATE = "MODIFY";
var modo = CREATE;
var refBookingToEdit;


function initialize() {
  formBookings = document.getElementById("form-bookings");
  formBookings.addEventListener("submit", sendBookingToFirebase, false);

  tbodyTableBookings = document.getElementById("tbody-table-bookings");

  refBookings = firebase.database().ref().child("Bookings");

 showBookingsFromFirebase();

}

function showBookingsFromFirebase() {
  refBookings.on("value", function (snap) { //Me devuelve el valor correspondiente a cada convalidación
    var data = snap.val(); //Me da los valores de firebase que existen dentro de la referencia remBookings
    var rowsToShow = "";
    for (var key in data) {
      rowsToShow += "<tr>" +
        "<td>" + data[key].name + "</td>" +
        "<td>" + data[key].surname + "</td>" +
        "<td>" + data[key].phoneNumber + "</td>" +
        "<td>" + data[key].adultQuestion + "</td>" +
        "<td>" + data[key].identityDocument + "</td>" +
        "<td>" + data[key].customers + "</td>" +
        "<td>" +
        '<button class ="btn tbn-dafault edit" data-booking="' + key + '">' +
        '<i class="fas fa-pen"></i>' +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class ="btn tbn-danger delete" data-booking="' + key + '">' +
        '<i class="fas fa-trash"></i>' +
        '</button>' +
        "</td>" +
        "<td>" +
        "</td>" +
        "</tr>"

    }
    tbodyTableBookings.innerHTML = rowsToShow;
    if (rowsToShow != "") {
      var editElements = document.getElementsByClassName("edit");
      for (var i = 0; i < editElements.length; i++) {
        editElements[i].addEventListener("click", editBookingFromFirebase, false);
      }
      var deleteElements = document.getElementsByClassName("delete");
      for (var i = 0; i < deleteElements.length; i++) {
        deleteElements[i].addEventListener("click", deleteBookingFromFirebase, false);
      }


    }

  });
}

function editBookingFromFirebase() {
  var keyFromBookingsToEdit = this.getAttribute("data-booking");
  refBookingsToEdit = refBookings.child(keyFromBookingsToEdit);
  refBookingsToEdit.once("value", function(snap) {
    var data = snap.val();
    document.getElementById("name").value = data.name;
    document.getElementById("surname").value = data.surname;
    document.getElementById("phone-number").value = data.phoneNumber;
    document.getElementById("adult-question").value = data.adultQuestion;
    document.getElementById("identity-document").value = data.identityDocument;
    document.getElementById("customers").value = data.customers;
  });
  document.getElementById("button-send-booking").value = UPDATE;
  modo = UPDATE;

}

function deleteBookingFromFirebase() {
  var keyFromBookingDelete = this.getAttribute("data-booking");
  var refBookingToDelete = refBookings.child(keyFromBookingDelete);
  refBookingToDelete.remove();
}


function sendBookingToFirebase(event) {
  event.preventDefault();//Esto nos sirve para prevenir el comportamiento por defecto que causa window.onload = initialize
  switch (modo) {
    case CREATE:
      refBookings.push({ //Aquí añado el registro, el objeto janson
        name: event.target.name.value,
        surname: event.target.surname.value,
        phoneNumber: event.target.phoneNumber.value,
        adultQuestion: event.target.adultQuestion.value,
        identityDocument: event.target.identityDocument.value,
        customers: event.target.customers.value

      });
      break;
    case UPDATE:
      refBookingsToEdit.update({
        name: event.target.name.value,
        surname: event.target.surname.value,
        phoneNumber: event.target.phoneNumber.value,
        adultQuestion: event.target.adultQuestion.value,
        identityDocument: event.target.identityDocument.value,
        customers: event.target.customers.value


      });
      modo = UPDATE;
      document.getElementById("button-send-booking").value = CREATE;
      break;
  }


  formBookings.reset();
}

