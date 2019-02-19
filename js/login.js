window.onload = initialize;

function initialize() {
    initializeFirebase();

    document.getElementById("form-login").addEventListener("submit", doLogin);
    console.log("initialize");


}

function doLogin(event) {
    console.log("doLogin");
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;

    var refAuth = firebase.auth();
    refAuth.signInWithEmailAndPassword(email, password).then(
        function () {
            alert("login successfull");
            if(email == "richard@admin.com"){
                window.location.href="bookAdmin.html"  
            }else{
                window.location.href="book.html"
            }
             
        }
    ).catch(
        function (error) {
            alert("Error");
        }
    )

    // Desde línea 30-37 nos sirve para saber el usuario que esta en nuestra página
    var user = firebase.auth().currentUser;

    if (user) {

    } else {

    }



}


function initializeFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAHwrQhSGXIhAx3V7VK1huCLhqP43eHwZc",
        authDomain: "crudbook.firebaseapp.com",
        databaseURL: "https://crudbook.firebaseio.com",
        projectId: "crudbook",
        storageBucket: "crudbook.appspot.com",
        messagingSenderId: "106583233886"
    };
    firebase.initializeApp(config);
}