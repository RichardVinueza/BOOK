window.onload = initialize;
var file;
var storageRef;
var imagesUpRef;
var deleteButton;

function initialize() {
    file = document.getElementById("file");
    file.addEventListener("change", uploadImagesToFirebase, false);
    storageRef = firebase.storage().ref();
    imagesUpRef = firebase.database().ref().child("imagesUp");
    showImagesFromFirebase();
}

var data;
var show;
var key;

function showImagesFromFirebase() {
    imagesUpRef.on("value", function (snapshot) {
        data = snapshot.val();
        show = "";
        for (key in data) {
            show += '<img width="300" height="300"  class="img-thumbnail" src="' + data[key].url + '"/>' +
            '<div>' + data[key].cocktail + '</div>' + 
            '<div>' + data[key].ingredients + '</div>';
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


        }, function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                console.log('File available at', downloadURL);

                imagesUpRef.push({
                    name: uploadImage.name,
                    url: downloadURL,
                    cocktail: document.getElementById("cocktail").value,
                    ingredients : document.getElementById("ingredients").value
                });


            });

        });


}


