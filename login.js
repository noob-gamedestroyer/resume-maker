
function login() {
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;

    

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then((userCredential) => {
      var user = userCredential.user;
      location.replace("Main Page/index.html");
    })
    .catch((error) => {
      var errorMsg = error.message;
      window.alert(errorMsg);
    });


}

function register() {

  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    location.replace("Main Page/index.html");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(errorMessage);
    // ..
  });

}