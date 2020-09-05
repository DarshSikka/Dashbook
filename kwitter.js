var user= "";
function addUser(){
user=document.getElementById("userName").value+"intoDashbook₹in";
localStorage.setItem("youTheUser", user);
window.location="dashbook_room.html";
}
window.addEventListener('keydown', func)
function func(e){
    maku=e.keyCode;
    if(maku==13){
        addUser();
    }
}
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
  firebase.initializeApp(firebaseConfig);
  var myNotifications=0;
  function getData(){
      firebase.database().ref("/").on('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
              myNotifications++;
              document.getElementById("notifications").innerHTML=myNotifications;
          });
      });
  }
  getData();