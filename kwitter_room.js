
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyDxrtp9CRH8W-A9B5bL4lD3ksP5rH6Sfzg",
      authDomain: "dashbook-364dd.firebaseapp.com",
      databaseURL: "https://dashbook-364dd.firebaseio.com",
      projectId: "dashbook-364dd",
      storageBucket: "dashbook-364dd.appspot.com",
      messagingSenderId: "591508273192",
      appId: "1:591508273192:web:0df7071d8d91f168b09d1d",
      measurementId: "G-TWCXV5NQ5Q"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
   var XTRAroom="";

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log(Room_names);
      //Start code
        row="<div class='roomname' id='"+Room_names+"'onclick='re(this.id)'><a class='room_Name'>#"+Room_names+"</a></div><hr>"
        document.getElementById("output").innerHTML+=row;
      /*End code*/
      });});}
getData();
function addRoom(){
  XTRAroom=document.getElementById("room_to_add").value;
  firebase.database().ref("/").child(XTRAroom).update({
        roomname:XTRAroom
  });
  localStorage.setItem("roomname", XTRAroom);
  window.location="chat.html";
}

function re(heiss){
      console.log(heiss);
      localStorage.setItem("roomname", heiss);
      window.location="chat.html";
}
document.getElementById("wel").innerHTML="Welcome "+localStorage.getItem("youTheUser");
function logout(){
      localStorage.removeItem("youTheUser");
      localStorage.removeItem("roomname");
      window.location="index.html";
}
function search(){
var input, filter, ul, li, a, i, txtValue;
input = document.getElementById("myInput");
filter = input.value.toUpperCase();
ul = document.getElementById("output");
li = ul.getElementsByTagName("div");
for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue =a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
        a.style.display='';
    } else {
        li[i].style.display = 'none';
        a.style.display="none"
    }
}
}
