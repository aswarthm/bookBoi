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
   //console.log(snapshot.val());
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

 // writeUserData("shishira", 2, "", "mel", 40)


  function fillBooks(name){
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    var a;
    var b;
    console.log(name)    
    get(child(dbRef, "/")).then((snapshot) => {

    //console.log(snapshot.val())
    name = String(name)
    console.log(name)
    var stuff = snapshot.val()
    var kid = stuff["volunteer"]["sindhu"]["kids"][name]
    var bookList = stuff["books"]
    document.getElementById("Name_student").innerHTML= name;
    console.log(kid)
    document.getElementById("Age_student").innerHTML="Age: "+kid["age"];

    console.log(kid["age"])
    var srNo = 0

    var htmlstring = ''

    for (var book in stuff["books"]){
      
      //console.log(stuff["books"][book]["level"])

      /*<tr bgcolor= "00ff00"> <th scope="row">1 book name</th> <td>start date</td><td>end date</td><td>@mdo</td></tr> */

      if (bookList[book]["level"] == kid["level"]){
        srNo = srNo + 1

        //book in already read
        if (kid["books"] != null && book in kid["books"]){
          
          if (kid["books"][book]["end"] == "-1"){
            htmlstring += '<tr bgcolor="#bdffbd"> <th scope="row">'+ srNo +'. &emsp;' + book + '</th> <td>'
            htmlstring += kid["books"][book]["start"] + '</td><td>'
            htmlstring += '-' + '</td><td>' + 'In progress' + '</td></tr>'

            //console.log(name, "reading", book)
            
          }
          else{
            //console.log(name, "read", book)
            htmlstring += '<tr bgcolor="#80ff80"> <th scope="row">'+ srNo +'. &emsp;' + book + '</th> <td>'
            htmlstring += kid["books"][book]["start"] + '</td><td>'
            htmlstring += kid["books"][book]["end"] + '</td><td>' + 'Read' + '</td></tr>'
            
          }
        }
        else{
          //console.log(name,"not read", book)
          if (bookList[book]["genre"] == kid["prevGenre"]){
            htmlstring += '<tr bgcolor="#f7f7f7"> <th scope="row">'+ srNo +'. &emsp;' + book + '</th> <td>'
            htmlstring += '-' + '</td><td>' + '-' + '</td><td>' + '<button type="button" class="btn btn-primary" disabled>Assign</button>' + '</td></tr>'
          }
          else{
            htmlstring += '<tr bgcolor="#f7f7f7"> <th scope="row">'+ srNo +'. &emsp;' + book + '</th> <td>'
            htmlstring += '-' + '</td><td>' + '-' + '</td><td>' + '<button type="button" class="btn btn-primary btn-assign" id="'+ book +'">Assign</button>' + '</td></tr>'
          }

        } 

      }
      //console.log(htmlstring)
      

    
    }  
    document.getElementById("table").innerHTML = htmlstring    
    
    var btns = document.getElementsByClassName("btn-assign")

    for (let i=0; i < btns.length; i++){
      btns[i].addEventListener("click", function() {
        var book = String(btns[i].id)
        console.log(book)


        set(ref(db, 'volunteer/sindhu/kids/' + name + '/books/'+ book), {
          start: String((new Date().getDate() - 16) + "-" + new Date().getMonth()  + "-" + new Date().getFullYear()),
          end : "-1"
        });

        set(ref(db, 'volunteer/sindhu/kids/' + name + '/prevGenre'), bookList[book]["genre"]);
        fillBooks(name)
      })


    }

    
    
  });
  
  }

  

//fillBooks("Student 1")



/*if (book end == -1){
            //light green(in progress)
          }
          else{
            //dark green
          }
        }
        else{

          //white
 */


/*<tr> <th scope="row">1 book name</th> <td>Mark</td><td>Otto</td><td>@mdo</td></tr> */

window.onload = function() {
  var url_string = (window.location.href);
  var url = new URL(url_string);
  var name = String(url.searchParams.get("name"))
  console.log(name);
  fillBooks(name)
}