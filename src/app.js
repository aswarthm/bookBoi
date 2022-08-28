  var data;
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
  get(child(dbRef, '/volunteer/sindhu/kids/Student 1')).then((snapshot) => {
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
  function writeToPath(path, data) {
    const db = getDatabase();
    set(ref(db, path), data);
  }

  //writeUserData("shishira", 2, "", "mel", 40)
  
  get(child(dbRef, '/volunteer/sindhu/')).then((snapshot) => {
    document.getElementById("volName").innerHTML = "Sindhu Sharma"
    document.getElementById("volAge").innerHTML = "Age: " + snapshot.val()["age"]
    document.getElementById("numKids").innerHTML = "No of Children: " + snapshot.val()["numKids"]
  });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//populate dropdown
var ddKids = document.getElementById("ddKids")
get(child(dbRef, '/volunteer/sindhu/kids/')).then((snapshot) => {
    var list = ""

    //console.log(snapshot.val());
    var a = snapshot.val()
    for(var kid in a){
        //console.log(kid)
        list += '<li><a class="dropdown-item" href="#dropdown" id="' + kid +'">' + kid + '</a></li>'
    }

    ddKids.innerHTML = list

    allowKidSelection()
  });

  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function allowKidSelection(){
  var userSelection = document.getElementsByClassName('dropdown-item');//kid is selected in dropdown
  //onsole.log(userSelection)
  for(let i = 0; i < userSelection.length; i++) {
      userSelection[i].addEventListener("click", function() {
      //console.log(userSelection[i].id);
      var kidName = String(userSelection[i].id)
      document.getElementById("ddBtn").innerHTML = kidName
      document.getElementById("aMoreInfo").href= "student.html?name=" + kidName
      var a = "";
      get(child(dbRef, "volunteer/sindhu/kids/" + kidName)).then((snapshot) => {
          //console.log(snapshot.val());
          a = snapshot.val()
          //console.log(a)
          for(var book in a["books"]){

            console.log(a["books"][book]["end"])

            if(a["books"][book]["end"] == "-1"){//book is not read
                //console.log(book)
                document.getElementById("pCurrBook").innerHTML = "Current book: " + String(book)
                document.getElementById("pStTime").innerHTML = "Start Time: " + String(a["books"][book]["start"])

                document.getElementById("btnAccept").addEventListener("click", function() {
                    var numBooksRead = a["numBooksRead"]
                    numBooksRead++;
                    console.log("num", numBooksRead)
                    writeToPath("volunteer/sindhu/kids/"+kidName+"/numBooksRead/", numBooksRead)
                    if(numBooksRead > 4){
                      var ok =""
                      document.getElementById("alert").innerHTML='<strong>Congratulations!</strong> New coupon unlocked<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'
                      document.getElementById("alert").classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show")
                      var level = parseInt(a["level"]) + 1
                      writeToPath("volunteer/sindhu/kids/"+kidName+"/level/", level)
                      writeToPath("volunteer/sindhu/kids/"+kidName+"/numBooksRead/", 0)
                    }

                    var today = new Date()
                    var endTime = today.getDate() +"-"+ today.getMonth() +"-"+  today.getFullYear()
                    console.log(endTime)
                    var path = "volunteer/sindhu/kids/"+kidName+"/books/"+book+"/end/"
                    console.log(path)
                    writeToPath(path, String(endTime))
                    fillRows()
                    fillHitlist()
                });
                document.getElementById("btnExtend").addEventListener("click", function() {
                    var today = new Date()
                    var stTime = today.getDate() +"-"+ (today.getMonth()-1) +"-"+  today.getFullYear()
                    //console.log(stTime)
                    var path = "volunteer/sindhu/kids/"+kidName+"/books/"+book+"/start/"
                    //console.log(path)
                    document.getElementById("pStTime").innerHTML = "Start Time: " + String(stTime)
                    writeToPath(path, String(stTime))
                    fillRows()
                    fillHitlist()
                });
                break;
            }
            else{
                
                document.getElementById("pCurrBook").innerHTML = "Current book: -"
                document.getElementById("pStTime").innerHTML = "Start Time: -"
            }
          }

        });
 
    })
  }
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function drawChart(rows){

    var container = document.getElementById("timeline");
    var chart = new google.visualization.Timeline(container);
    var dataTable = new google.visualization.DataTable();
  
    dataTable.addColumn({ type: "string", id: "kidName" });
    dataTable.addColumn({ type: "string", id: "bookName" });
    dataTable.addColumn({ type: "date", id: "Start" });
    dataTable.addColumn({ type: "date", id: "End" });
  
    for (let i = 0; i < rows.length; i++) {
      dataTable.addRow(rows[i]);
    }
    //console.log(rows)
    //dataTable.addRows(rows);
  
    google.visualization.events.addListener(chart, "ready", changeBorderRadius);
    google.visualization.events.addListener(chart, "select", changeBorderRadius);
    google.visualization.events.addListener(chart, "onmouseover", changeBorderRadius);
    google.visualization.events.addListener(chart, "onmouseout", changeBorderRadius);
  
    function changeBorderRadius() {
      let borderRadius = 4;
      var chartColumns = container.getElementsByTagName("rect");
      Array.prototype.forEach.call(chartColumns, function (column) {
        if (
          column.getAttribute("fill") != "none" &&
          column.getAttribute("stroke") != "1"
        ) {
          column.setAttribute("rx", borderRadius);
          column.setAttribute("ry", borderRadius);
        }
      });
    }
  
    var options = {
      backgroundColor: "#f7f7f7",
      alternatingRowStyle: false,
    };
  
    chart.draw(dataTable, options);
}

function fillRows(){
    get(child(dbRef, '/volunteer/sindhu/kids/')).then((snapshot) => {
        //console.log(snapshot.val());
        var rows = []
        var a = snapshot.val()

        for (var kid in a){
            for (var book in a[kid]["books"]){
                //console.log(a[kid]["books"][book])
                var start = String(a[kid]["books"][book]["start"])
                start = start.split("-")
                start = new Date(start[2], start[1], start[0], 0, 0, 0, 0)
                
                var end = String(a[kid]["books"][book]["end"])
                if (end != "-1"){
                    end = end.split("-")
                    end = new Date(end[2], end[1], end[0], 0, 0, 0, 0)
                }
                else{
                    end = new Date()
                }

                rows[rows.length] = [
                    kid,
                    book,
                    start,
                    end
                ]
                
            }
        }
        //console.log(rows)
        drawChart(rows)
      });
}

google.charts.load("current", { packages: ["timeline"], callback: fillRows }); //calls main after loading chart library

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//fill hitlist
function fillHitlist(){
    get(child(dbRef, '/volunteer/sindhu/kids/')).then((snapshot) => {
        
        //console.log(snapshot.val());
        var a = snapshot.val()
        var list = ""
        for(var kid in a){
            for(var book in a[kid]["books"]){
                if(a[kid]["books"][book]["end"] == "-1"){
                    var start = String(a[kid]["books"][book]["start"]).split("-")
                    start = new Date(start[2], start[1], start[0], 0, 0, 0, 0)
                    if(new Date() - start > (14*24*60*60*1000)){
                        list += '<p class="p-pricing">' + kid + '</p>'
                    }
                    break;
                }
            }
        }
        document.getElementById("divHitlist").innerHTML = list
      });
}

fillHitlist()