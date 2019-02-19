window.onload = initialize;

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


function initialize() {
    initializeFirebase();

    document.getElementById("form-signup").addEventListener("submit", doSignUp);
    console.log("initialize");
}



function doSignUp(event) {
    event.preventDefault();
    var email = event.target.email.value;
    var password = event.target.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (result) {
            alert("User created successfully");
            console.log(JSON.stringify(result));
        })

        .catch(function (error) {
            //Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Error");
        });

}

