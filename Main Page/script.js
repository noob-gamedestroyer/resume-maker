

function addNewWEField() {
    // alert("adding new field");
    let newNode=document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('weField');
    newNode.classList.add('mt-2');
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    let weAddButtonOb=document.getElementById("weAddButton");
    let weOb=document.getElementById("we");

    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewAQField() {
    // alert("adding new field");
    let newNode=document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('eqField');
    newNode.classList.add('mt-2');
    newNode.setAttribute("rows", 2);
    newNode.setAttribute("placeholder", "Enter here");

    let aqAddButtonOb=document.getElementById("aqAddButton");
    let aqOb=document.getElementById("aq");

    aqOb.insertBefore(newNode, aqAddButtonOb);
}

function addNewSkField() {
    // alert("adding new field");
    let newNode=document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('skField');
    newNode.classList.add('mt-2');
    newNode.setAttribute("rows", 1);
    newNode.setAttribute("placeholder", "Enter here");

    let skillsAddButtonOb=document.getElementById("skillsAddButton");
    let skillsOb=document.getElementById("skills");

    skillsOb.insertBefore(newNode, skillsAddButtonOb);
}

function generateResume() {


    // import firebase from 'firebase.js';
    // firebase.initializeApp(firebaseConfig);

    //get element values
    let nameField = document.getElementById("nameField").value;
    let contactField = document.getElementById("contactField").value;
    let addressField = document.getElementById("addressField").value;
    let profileField = document.getElementById("profileField").value;
    let gitField = document.getElementById("gitField").value;
    let linkedInField = document.getElementById("linkedinField").value;
    let weField = document.getElementsByClassName('weField');
    let aqField = document.getElementsByClassName('eqField');
    let skField = document.getElementsByClassName('skField');
    const user = firebase.auth().currentUser;
    let str = "";
    let aqStr = "";
    let skStr = "";

    //set the resume objects values
    document.getElementById('name').innerHTML = nameField;
    document.getElementById('contact').innerHTML = contactField;
    document.getElementById('address').innerHTML = addressField;
    document.getElementById('gitL').innerHTML = gitField;
    document.getElementById('linkedInL').innerHTML = linkedInField;
    document.getElementById("profile").innerHTML = profileField;
    document.getElementById("email").innerHTML = user.email;


    for (let e of weField) {
        str = str + `<li> ${e.value} </li>`;
    }

    for (let e of aqField) {
        aqStr = aqStr + `<li> ${e.value} </li>`;
    }

    for (let e of skField) {
        skStr = skStr + `<li> ${e.value} </li>`;
    }

    document.getElementById("weT").innerHTML = str;
    document.getElementById("aqT").innerHTML = aqStr;
    document.getElementById("skT").innerHTML = skStr;

    let imgFile = document.getElementById('imgField').files[0];
    let reader = new FileReader();
    try {
        reader.readAsDataURL(imgFile);
    } catch (error) {
        alert("Select a photo");
    }

    var storageRef = firebase.storage().ref(user.uid);
    var picRef = storageRef.child(imgFile.name);

    // try {
    //     picRef.put(imgFile).then(function(snapshot){
    //         console.log('uploaded file');
    //     });
    // } catch (error) {
    //     console.log(error.message);
    // }


    // try {
    //   firebase.database().ref(user.uid).set({
    //     name: nameField,
    //     email: user.email,
    //     contact: contactField,
    //     address: addressField,
    //     git: gitField,
    //     linkedIn: linkedInField,
    //     profile: profileField,
    //     we: str,
    //     aq: aqStr,
    //     sk: skStr,
    //     pic: imgFile.name
    //   });
    // } catch (error) {
    //   alert(error.message);
    // }

    reader.onloadend = function() {
        document.getElementById('imgTemplate').src = reader.result;
    };

    hideForm();
};


function printResume() {
    window.print();
}

function savedResume(){
    const user = firebase.auth().currentUser;

    firebase
      .database()
      .ref(user.uid)
      .once("value", (snapshot) => {
        document.getElementById("name").innerHTML = snapshot.val().name;
        document.getElementById("contact").innerHTML = snapshot.val().contact;
        document.getElementById("address").innerHTML = snapshot.val().address;
        document.getElementById("gitL").innerHTML = snapshot.val().git;
        document.getElementById("linkedInL").innerHTML = snapshot.val().linkedIn;
        document.getElementById("profile").innerHTML = snapshot.val().profile;
        document.getElementById("email").innerHTML = user.email;
        document.getElementById("weT").innerHTML = snapshot.val().we;
        document.getElementById("aqT").innerHTML = snapshot.val().aq;
        document.getElementById("skT").innerHTML = snapshot.val().sk;
        var storage = firebase.storage().ref(user.uid + '/' + snapshot.val().pic);
        storage.getDownloadURL().then((url) => {
            document.getElementById('imgTemplate').src = url;
        })
        hideForm();
      });
}

function hideForm(){
    document.getElementById('resume-form').style.display = 'none';
    document.getElementById('resume-template').style.display = 'block';
    document.getElementById('header').style.display = 'none';
}

function logOut() {
    firebase.auth().signOut().then(() => {
        location.replace("../resume-maker/");
        window.alert("Logged out");
    }).catch((error) => {
        window.alert(error);
    });
}
