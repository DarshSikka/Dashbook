Webcam.set({
width:150,
height:150,
image_quality:'jpg',
jpg_quality:100
});
var today=new Date;
var currentDate=today.getDate();
var currentMinute=today.getMinutes();
var currentHour=today.getHours();
function updateTime(){//keeps updating time to make correct time production after message sending
    if(currentMinute<60){
        currentMinute++;
    }
    else{
        currentHour++;
        currentMinute=0;
        if(currentHour<24){
            currentDate++;
        }
    }
    }
window.setInterval(60000, updateTime());
var username=localStorage.getItem("youTheUser");
var roomname=localStorage.getItem("roomname");
document.getElementById("roomNameVal").innerHTML=roomname;
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
  var name;
  firebase.initializeApp(firebaseConfig);
function getData() { //puts all message display, sore client side
    firebase.database().ref("/"+roomname).on('value', function(snapshot) 
    { document.getElementById("chat").innerHTML =""; snapshot.forEach(function(childSnapshot) 
{ childKey  = childSnapshot.key; childData = childSnapshot.val();
     if(childKey != "roomname") {
    firebase_message_id = childKey;
    message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
likes=message_data['like'];
message=message_data['message'];
laughs=message_data['laughs'];
part1="<h4>#"+name+"<img src='tick.png' class='user_tick'></h4><br>"
part2="<h5 class='message_h4'>"+message+"</h5><br>"
part3="<button id='"+firebase_message_id+"'class='btn btn-warning' onclick='updateLike(this.id)' value='"+likes+"'><span class='glyphicon glyphicon-thumbs-up'>#like</span>"+likes+
"</button>";
part4="<button id='laugh"+firebase_message_id+"'class='btn btn-warning' onclick='updateLaugh(this.id)' value='"+laughs+"'>&#128515;#laugh</span>"
+laughs+"</button>"
//😡
row=part1+part2+part3+part4;
document.getElementById("chat").innerHTML+=row;
 } });  }); }
getData();
function updateLaugh(ha){
    ha2=ha.replace('laugh', '')
    if(localStorage.getItem("laughOrNoFor"+ha)!=1){
        current_laughs=document.getElementById(ha).value;
        current_laughs=Number(current_laughs)+1;
        console.log(current_laughs);
        firebase.database().ref(roomname).child(ha2).update({
          laughs:current_laughs
        });
    }
    else{
        window.alert("You cannot laugh at a message more than once.")
    }
     localStorage.setItem("laughOrNoFor"+ha, 1);
}
function logout(){//logs out of the system, back to login page
    localStorage.removeItem("youTheUser");
    localStorage.removeItem("roomname");
    window.location="index.html";
}
var message="";
function send(){//Sends text message
    message=tinymce.get("Message").getContent();
   if(message.indexOf("https://")>-1){
       pos=message.indexOf("https://");
       message_1=message.slice(pos, message.length);
       pos_2=message_1.indexOf(' ');
       message_2=message_1.slice(0, pos_2);
       message=message.replace(message_2, '<a class="link"href="'+message_2+'">'+message_2+'</a>');
   }
   firebase.database().ref("/").child(roomname).push(
       {
          name:username+"<sup class='tem'>"+currentHour+":"+currentMinute+":"+currentDate+"</sup>",
          message:message,
          like:0,
          laughs:0
       }
   );  
   document.getElementById("Message").value="";
   window.location='chat.html';
}
function updateLike(para){//makes the functionality of likes
    if(localStorage.getItem("likedOrNoFor"+para)!=1){
    current_likes=document.getElementById(para).value;
    current_likes=Number(current_likes)+1;
    console.log(current_likes);
    firebase.database().ref(roomname).child(para).update({
      like:current_likes
    });
}
else{
    window.alert("You cannot like a message more than once.")
}
 localStorage.setItem("likedOrNoFor"+para, 1);
}
function photoMessage(){ //function that produces photo preview for user.
    Webcam.attach("#image-attachment");
}
function photoTake(){//function that takes photo and sends the message
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById('photo').innerHTML = 
        '<img id="Photo"src="'+data_uri+'"/>';
      } );
      var myUpload=document.getElementById('Photo').src;
      imager="<img src='"+myUpload+"'>"
      firebase.database().ref("/").child(roomname).push({
          message:imager,
          like:0,
          name:username+"<sup class='tem'>"+currentHour+":"+currentMinute+":"+currentDate+"</sup>",
          laughs:0
      })
}
rd=document.getElementById("read");
function toggle(){
    document.getElementById("mess").style.display='none';
}
function toggle2(){
    document.getElementById("mess").style.display='';
}
