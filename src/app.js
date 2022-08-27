  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
  import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCYNqsZ5mV03Dxpcwvzey2cargq83JkA2I",
    authDomain: "bookboi-5feb1.firebaseapp.com",
    projectId: "bookboi-5feb1",
    storageBucket: "bookboi-5feb1.appspot.com",
    messagingSenderId: "945345749279",
    appId: "1:945345749279:web:acbc16605e63028e91d02a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const dbRef = ref(getDatabase());
  get(child(dbRef, '/volunteer')).then((snapshot) => {
    console.log(snapshot.val());
  });

  function writeUserData(name, age, books, gender, level) {
    const db = getDatabase();
    set(ref(db, 'volunteer/sindhu/kids/' + name), {
      age: age,
      books: {"lol":1},
      gender : gender,
      level, level
    });
  }

  writeUserData("shishira", 2, "", "mel", 40)