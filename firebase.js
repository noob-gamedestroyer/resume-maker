var firebaseConfig = {
  apiKey: "AIzaSyDBCgLEX26leQNqhj7wfAN8R9P2sKIj2_Y",
  authDomain: "resume-maker-f6e3f.firebaseapp.com",
  databaseURL: "https://resume-maker-f6e3f-default-rtdb.firebaseio.com",
  projectId: "resume-maker-f6e3f",
  storageBucket: "resume-maker-f6e3f.appspot.com",
  messagingSenderId: "368589610912",
  appId: "1:368589610912:web:a32c0f8df5489423e50ec5",
  measurementId: "G-0L1X2BVPE0"
};

firebase.initializeApp(firebaseConfig);
firebase.auth();
firebase.database();