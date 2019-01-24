window.onload = initialize; //Espera a que se cargué la página para llamar a la función ==> function initialize(){}

var formConvalidaciones;
var refConvalidaciones;
var tbodyTablaConvalidaciones;
var CREATE = "Añadir Convalidación";
var UPDATE = "Modificar Convalidación";
var modo = CREATE;
var refConvalidacionAEditar;


function initialize() {
  formConvalidaciones = document.getElementById("form-convalidaciones");
  formConvalidaciones.addEventListener("submit", enviarConvalidacionAFirebase, false);

  tbodyTablaConvalidaciones = document.getElementById("tbody-tabla-convalidaciones");

  refConvalidaciones = firebase.database().ref().child("Convalidaciones");

  mostrarConvalidacionesDeFirebase();

}

function mostrarConvalidacionesDeFirebase() {
  refConvalidaciones.on("value", function (snap) { //Me devuelve el valor correspondiente a cada convalidación
    var datos = snap.val(); //Me da los valores de firebase que existen dentro de la referencia refConvalidaciones
    var filasAMostrar = "";
    for (var key in datos) {
      filasAMostrar += "<tr>" +
        "<td>" + datos[key].cicloAConvalidar + "</td>" +
        "<td>" + datos[key].moduloAConvalidar + "</td>" +
        "<td>" + datos[key].cicloAportado + "</td>" +
        "<td>" + datos[key].moduloAportado + "</td>" +
        "<td>" +
        '<button class ="btn tbn-dafault editar" data-convalidacion="' + key + '">' +
        '<span class="glyphicon glyphicon-pencil"></span>' +
        '</button>' +
        "</td>" +
        "<td>" +
        '<button class ="btn tbn-danger borrar" data-convalidacion="' + key + '">' +
        '<span class="glyphicon glyphicon-trash"></span>' +
        '</button>' +
        "</td>" +
        "</tr>"

    }
    tbodyTablaConvalidaciones.innerHTML = filasAMostrar;
    if (filasAMostrar != "") {
      var elementosEditables = document.getElementsByClassName("editar");
      for (var i = 0; i < elementosEditables.length; i++) {
        elementosEditables[i].addEventListener("click", editarConvalidacionDeFirebase, false);
      }
      var elementosBorrables = document.getElementsByClassName("borrar");
      for (var i = 0; i < elementosBorrables.length; i++) {
        elementosBorrables[i].addEventListener("click", borrarConvalidacionDeFirebase, false);
      }


    }

  });
}

function editarConvalidacionDeFirebase() {
  var keyDeConvalidacionAEditar = this.getAttribute("data-convalidacion");
  refConvalidacionAEditar = refConvalidaciones.child(keyDeConvalidacionAEditar);
  refConvalidacionAEditar.once("value", function(snap) {
    var datos = snap.val();
    document.getElementById("modulo-a-convalidar").value = datos.moduloAConvalidar;
    document.getElementById("ciclo-a-convalidar").value = datos.cicloAConvalidar;
    document.getElementById("modulo-aportado").value = datos.moduloAportado;
    document.getElementById("ciclo-aportado").value = datos.cicloAportado;

  });
  document.getElementById("boton-enviar-convalidacion").value = UPDATE;
  modo = UPDATE;

}

function borrarConvalidacionDeFirebase() {
  var keyDeConvalidacionABorrar = this.getAttribute("data-convalidacion");
  var refConvalidacionABorrar = refConvalidaciones.child(keyDeConvalidacionABorrar);
  refConvalidacionABorrar.remove();
}


function enviarConvalidacionAFirebase(event) {
  event.preventDefault();//Esto nos sirve para prevenir el comportamiento por defecto que causa window.onload = initialize
  switch (modo) {
    case CREATE:
      refConvalidaciones.push({ //Aquí añado el registro, el objeto janson
        moduloAConvalidar: event.target.moduloAConvalidar.value,
        cicloAConvalidar: event.target.cicloAConvalidar.value,
        moduloAportado: event.target.moduloAportado.value,
        cicloAportado: event.target.cicloAportado.value

      });
      break;
    case UPDATE:
      refConvalidacionAEditar.update({
        moduloAConvalidar: event.target.moduloAConvalidar.value,
        cicloAConvalidar: event.target.cicloAConvalidar.value,
        moduloAportado: event.target.moduloAportado.value,
        cicloAportado: event.target.cicloAportado.value


      });
      modo = UPDATE;
      documet.getElementById("boton-enviar-convalidacion").value = CREATE;
      break;
  }


  formConvalidaciones.reset();
}

