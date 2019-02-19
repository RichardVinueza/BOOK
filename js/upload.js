window.onload = initialize;
var file;
var storageRef;
var imagesUpRef;

function initialize() {
    file = document.getElementById("file");
    file.addEventListener("change", uploadImagesToFirebase, false);

    storageRef = firebase.storage().ref();

    imagesUpRef = firebase.database().ref().child("imagesUp");

    showImagesFromFirebase();
}

function showImagesFromFirebase() {
    imagesUpRef.on("value", function (snapshot) {
        var data = snapshot.val();
        var show = "";
        for (var key in data) {
            show += '<img width="300" height="300"  class="img-thumbnail" src="' + data[key].url + '"/>';

        }
        document.getElementById("images-from-firebase").innerHTML = show;
    })

}

function uploadImagesToFirebase() {
    var uploadImage = file.files[0];

    var uploadTask = storageRef.child("images/" + uploadImage.name).put(uploadImage);

    uploadTask.on("state_changed",
        function (snapshot) {

        }, function (error) {
            alert("error");

        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                alert("Enviado");
                console.log('File available at', downloadURL);
                alert("url obtenido");
                imagesUpRef.push({ name: uploadImage.name, url:downloadURL });


            });
            /*
            var downloadURL = uploadTask.snapshot.getdownloadURL;
            alert("Enviada " + downloadURL);
            crearNodoEnBDFirebase(uploadImage.name, downloadURL)
            */

        });


}

/*
function crearNodoEnBDFirebase( nameImage, downloadURL){
    imagesUpRef.push({nombre: nameImage, url: downloadURL});


}
*/















































/*
var myFile;

function initialize() {
    initializeFirebase();

    document.getElementById("my-file").addEventListener("change", uploadFile);
    document.getElementById("Upload").addEventListener("submit", uploadPhoto)


}

function uploadPhoto(event) {
    event.preventDefault();
    var refImages = firebase.storage().ref().child("images/") //Tiene que ser igual a como lo tienes en tu base datos.
    var uploadTask = refImages.put(myFile);

    uploadTask.on("state_change",
        function (snapshot) {
            var subido = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        },

        function (error) {
            alert("error");
        },
        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log("File avaible at", downloadURL);
                document.getElementById("download-image").src = downloadURL;
            });
        });


    refImages.put(myFile).then(function () {
        console.log("File uploaded successfully")

    });

}



function uploadFile(event) {
    var imageToLoad = "<img src='' id='blah' alt='image'/>";
    readURL(event.target);


}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        myfile = input.files[0];

    }

}
*/

