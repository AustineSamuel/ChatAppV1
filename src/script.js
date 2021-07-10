let newMessages=0;
let aboutOpen=false;
let iHaveSeenMessage=true;
let whoSeeMyMessage=[];
const scroll=()=>{//jquery function
  $("#board").animate({scrollTop:getQr("#board").scrollHeight},"fast");
}
function typing(imgSrc=""){
$("#board").append(`
<div id="typing"><img src="images/${imgSrc}" class="img"><span>typing..</span></div>
`);
setTimeout(() => {
 $("#typing").remove();
},Math.floor(Math.random()*2000)+500);
scroll();
}
const searchUser=(el)=>{
  const found=false;
  
  users.forEach((e,i)=> {
    if(e.image==el.image){
      found=true
    }
    if(found &&e.image==el.image){
      users.splice(i,1);
    }
  });
  return found;
}
  function newMessage(message,imgSrc,name){
    if(message==undefined||imgSrc==undefined||name==undefined)return
    $("#board").append(`
    <div class="flexStart" id="message">
    <img src="images/${imgSrc}"><div class="content"><small><span id="othersName"> ${name} :</span> ${message}</small> </div>
   </div>
  `);
  scroll();
  iHaveSeenMessage=false;
  newMessageSeen=[];
  }
  function addTime(date=""){
    $("#board").append(` 
    <div class="flexCenter" id="message">
    <span >${date}</span>
     </div>
     `);
  }
function myMessage(message,imgSrc){
  $("#board").append(`
  <div class="flexEnd" id="message">
  <div id="mineContent" class="content"><small> ${message}</small></div><img style="display:none;" src="images/${imgSrc}" id="mine">
</div>
  `);
  scroll();
  $("#views").hide();
  whoSeeMyMessage=[];
}
let edit1=false;
let edit2=false;
function join(name,imgSrc){
$("#board").append(`
<div class="flexCenter" id="message">
<div id="join" class="content"><img src="images/${imgSrc}"><br><span>${name} connect to this group
  </span></div>
</div>
`);
}


function change(name,imgSrc){
  $("#board").append(`
  <div class="flexCenter" id="message">
  <div id="join" class="content"><img src="images/${imgSrc}"><br><span>${name} update profile 
    </span></div>
  </div>
  `);
  scroll();
  }


function left(name,imgSrc){
  $("#board").append(`
  <div class="flexCenter" id="message">
  <div id="join" class="content"><img src="images/${imgSrc}"><br><span>${name}  disconnected
    </span></div>
  </div>
  `);
  }
let newMessageSeen=[];

const searchSeen=(imgName)=>{
  found=false
  newMessageSeen.forEach((e)=>{
if(e.src==imgName){
  found=true;
}
  })
  return found
}
  function showViews(arr){
    if(arr.length<1)return
    $("#views").show().children().children(".seenBy").html("");
    arr.forEach((e)=>{
    $("#views #viewsCtn .seenBy").append(`
   <img src="images/${e.src}" originlaId="${e.id}">`)
    });
  }
showViews(newMessageSeen);
function showUsers(arr){
  $("#allUsersCtn").html("");

 $(".users").html("");

  if(arr.length>0){
    $("#peopleActive").html(`
    You and
     <span id="peopleActive" class="w3-padding">${arr.length-1}</span>
     ${arr.length-1 > 1 ? " others ":"other"} are active in this chat list
    `);
  arr.forEach((e,i)=>{
if(i<5){
  $(".users").append(`
 <img src="images/${e.image}">
 `);
}
if(i==arr.length-1){
  $(".users").append(`<sup>${arr.length>5? "+"+i-4:""}</sup>`);
}
  $("#allUsersCtn").append(`
<div class="flexRound" id="member">
<div id="img" style="background-image:url('images/${e.image}');"><i class="fa fa-circle"></i></div>
<div id="allName">${textToNameFormat(e.name)}</div><button class="fa fa-ellipsis-v"></button>
</div>
`);
});
  }
  else{
    $("#allUsersCtn").html("<div class='w3-center'>nobody is active yet");
    $("#peopleActive").html("poeple are offline ..invite your friends");
  }
  $("#allUsersCtn #member").click(function(){//jqueryt
    let img=$(this).children().css("background-image");
    img=filter(img,['url("']);
    img=filter(img,['")']);
    const name=$(this).children("#allName").html();
    viewUser(img,textToNameFormat(name))
   })

 }

function viewUser(imgSrc,name){
  getQr("#viewUser img").setAttribute("src",imgSrc)
  getQr("#viewUser span").innerHTML=name
  getQr("#viewUser").style.display="flex";
  action("#viewUser .close","click",()=>{
    
    getQr("#viewUser").style.display="none";
  });
}

let myId=undefined;
let setUp=false;
let users=null

const loadUsers=()=>{
  $.post({
    url:"ajaxServer.php",
    data:{"loadUsers":"true","action":"null"},
    success:function(e){
      users=JSON.parse(e);
    showUsers(users);
    },
    error:function(){
      alert("error can't load users");
    }
  });
  refresh=0;
}
refreshNow=false;
function refreshA(){
  if(refreshNow){
  setTimeout(() => {
    window.location.href=window.location;
  },0);
}
}
let refresh=0;
const connect=()=>{
  action(".update","click",(e)=>{
    if(e.target.innerHTML!="updated."&&edit1&&edit2){
    $("#updateForm").ajaxSubmit({
  beforeSubmit:function(){
    e.target.innerHTML="updating...";
  },
  success:function(x){
    console.log(x);
  userInfo.name=getQr("#newName").value;
  userInfo.img=x;
  userInfo.image=x;
  localStorage.setItem("userId",userInfo.img);
  localStorage.setItem("name",userInfo.name);
    e.target.innerHTML="updated.";
    sendMessage(userInfo.name+"$change$"+userInfo.img);
    refreshNow=true;
  },
  error:function(){
    alert("eror can't update")
  }
    })
    }
    else{
      alert("Please change your pofileImage and name before you click this button")
    }
  })
  
  function done(){
    if(!isNaN(myId)){
    $.post({
      url:"ajaxServer.php",
      data:{"name":userInfo.name,"image":userInfo.img,"id":myId,"action":"true","add":"true"},
      success:function(e){
         setUp=true;
         loadUsers();
      },
      error:function(){
        alert("somthing went wrong");
      }
    })
  }
  }
  function getPrevChat(callBack=null){
    $("#board").html("");
    $.post({
url:"ajaxServer.php",
data:{"action":"loadPrev"},
success:function(e){
 // console.log(e);
  e=JSON.parse(e);
  e.forEach((e,i)=>{
    if(e.message!="typing" && e.name!="typing"){
if(e.message=="join"){
  !userVfry ? join(e.name,e.image):"";
}
else if(e.message=="change"){
  change(e.name,e.image);
}
else{
  if(e.image!=userInfo.img){
    newMessage(e.message,e.image,textToNameFormat(e.name));
  }
  else{
    myMessage(e.message,userInfo.img);
  }
  if(i%2==0){
    addTime(e.date);
  }

}
    }
    iHaveSeenMessage=true;
  });

  callBack!=null ? callBack():""
  scroll();

 },
error:function(){
  alert("can't load prev message");
}
    })
  }
const con =new WebSocket("ws://localhost:8080");


action("textarea","keyup",(e)=>{
  val=e.target.value;
 if(val.length==1){
  sendMessage(userInfo.img+"$typing$ ");
}
});
/*"""
*/
con.onopen=(e)=>{
  getPrevChat(done);
  function done(){
    setTimeout(() => {
      sendMessage(" $11eehostLife$ ")
    }, 0);
  }
}

con.onmessage=(e)=>{
  refreshNow ? refreshA():"";
 refresh=refresh>10 ? loadUsers():""
if(!setUp){
   myId=e.data;
    done();
  //setUp=true;
  }
  else{
    if(e.data==myId)return
    e=JSON.parse(e.data);
    
      if(e[1] !="change" && e[1] != "typing" && e[1].split("%")[1]==undefined){ 
     newMessage(e[1],e[2],e[0]); 
       aboutOpen ?  getQr(".about #messagesRvd b").innerHTML=newMessages+=1:"";
    if(!searchUser(e)){
      users.push(e);
     loadUsers(users);
        }
  }
  if(e[1] == "change"){
    change(e[0],e[2]);
  }
  if(e[1] == "typing" || e[0] == "typing"){
    typing(e[0]);
       }
  if(e[1].split("%")[0].toUpperCase().includes("SEEN11LITECHAT")){
const userSeen=e[1].split("%")
iHaveSeenMessage=true;
!searchSeen(userSeen[1]) ? newMessageSeen.push({"src":userSeen[1],"id":e[0]}):""
     }

   }
   showViews(newMessageSeen);
  }

con.onclose=(e)=>{
  left(userInfo.name,userInfo.img);
}

  function sendMessage(message){
    let send=con.send(message);
   return send ? "send":"fail"
    }
 
function close(){
  sendMessage("close8080connection");
}


$(".chats,#input").hover(function(){
  if(iHaveSeenMessage) return;
sendMessage("liteChatName11$seen11LiteChat%"+userInfo.image+"$ end");
  iHaveSeenMessage=true
    });
    ondblclick=()=>{
      sendMessage("liteChatName11$seen11LiteChat%"+userInfo.image+"$ end");
    }
//jquery library is used 
$("#send").click(function(){
  const val=$("textarea").val();
  if(val.length > 0 && val != " "){
 myMessage(val,userInfo.img);
 sendMessage(userInfo.name+"$"+val+"$"+userInfo.img);
 $("textarea").val("");
  //send
  }
 });


}

function submitForm(callBack=null){ 
  $("#login form").ajaxSubmit({
  success:function(e){
    $("#login").hide(100);
    console.log(e);
    callBack!=null ? callBack(e) : "";
  },
  error:function(e){
    console.log(e);
  }
  });
}
const userInfo={"name":undefined,"img":undefined}
function addConnection(e){
 e=JSON.parse(e);
userInfo.name=textToNameFormat(e.name);
userInfo.img=e.image;
localStorage.setItem("userId",e.image);
localStorage.setItem("name",e.name);
$("#login").hide();
connect();
varify();
  }

$("#login #go").click(function(){
  if(nameReady&&imageReady){
  ///console.log($("#login input").val())
  submitForm(addConnection);
$(this).html("<i class='fa fa-spinner'></i>");
  }
  else if(!nameReady){
    alert("please enter a valid name")
  }
  else if(!imageReady){
    alert("please choose a valid picture")
  }
    });

let userVfry=null

  onload=()=>{
    

action('#search input',"keyup",(e)=>{
  value=e.target.value.toLowerCase();
  const arr=users!=null ? users.filter((e,i)=>{
    return e.name.toLowerCase().includes(value);
  }):"";
  setTimeout(() => {
    showUsers(arr);
  }, 0);
 });

  let check=localStorage.getItem("userId");
  let name=localStorage.getItem("name");
    if(check!=null && check!=undefined){
    
         userInfo.image=check;
      userInfo.name=textToNameFormat(name);
      getQr("#newName").value=name;
userInfo.img=check;
$("div#login").hide()
connect();
varify();
    }
    else{
      $("div#login").show(100).css("display","flex")
      console.log(check+""+name)
    }


    ///user changes
  action("#newImage","change",()=>{
    edit2=true;
  imageReader($("#newImage"),$("#profileImage .img"),null,true);
});
getQr("#newId").value=myId;
getQr("#imgB").value=userInfo.img
  action(".edit","keyup",(e)=>{
    const val=e.target.value;
    getQr("form #newName").value=val;
    edit1=true;
    })
  getQr("#imgB").value=userInfo.img
 $(".about .close,#messagesRvd").on("click",function(){
    $(".about").hide(100);
    aboutOpen=false;
  });
  action("#aboutApp","click",()=>{
    aboutOpen=true;
    newMessages=0;
    $(".about .close,#messagesRvd b").html("");
    $(".about").show(100).children("textarea").val("");
  });

  action(".sendContactForm","click",()=>{
    if( $(".sendContactForm").html()=="Thank you!")return
    const name=$("#inputData").val();
    const message=$("#contact").val();
    if(/[0-9]/.test(name)||name.includes("@")){
$.post({
  url:"myData/save.php",
  data:{"contact":name,"message":message},
  success:function(){
    alert("your message have being sent thank you!");
  $(".sendContactForm").html("Thank you!");
  $("#inputData").val("");
  $("#contact").val("");
  },
  error:function(){
    alert("error")
  }
})
    }
    else{
      alert("please write a valid email or phone number");
    }
  });

  }//end onload
  function varify(){
    $("#profileImage .img, .profileImage").css("background-image","url('images/"+userInfo.img+"')");
    $(".user .edit").val(userInfo.name);
    userVfry=true;
  }
 