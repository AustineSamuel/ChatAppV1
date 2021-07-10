
//some UIs
const list=$(".list");
const chats=$(".chats")
const user=$(".user")
$("#viewProfile").click(function(){
  const width=innerWidth;
  if(width<500){
    //both should view"|
    $("#input").hide();
    $("#backProfile").css("display","inline");
    $(".chats").css("width","0%").css("display","none")
$(".user").css("width","100%").css("display","block");
}
  else if(width>500 && width< 650){
    //only userProfile
    $("#backProfile").css("display","inline");
    $(".chats").css("width","").css("display","none")
$(".user").css("width","50%").css("display","block");
$(".list").css("width","50%").css("display","block");

  }
  else{
    //nothing

  }
})
$("#viewUsers").click(function(e){

  const width=innerWidth;
  if(width<500){
    //both should view"|
    $("#backList").css("display","inline");
    $(".chats").css("width","0").css("display","none")
$(".list").css("width","100%").css("display","block");
$("#input").hide();
}
  else if(width>500 && width< 650){
    //only userProfile
    $("#backList").css("display","inline");
    $(".chats").css("width","0%").css("display","none")
$(".user").css("width","50%").css("display","block");
$(".list").css("width","50%").css("display","block");

  }
  else{
    //nothing
  }
  })
  $("#backProfile").click(function(){
    const width=innerWidth;
    $("#input").show();
    if(width<500){
      //both should view"|
      $("#backProfile").css("display","none");
      $(".chats").css("width","").css("display","")
  $(".user").css("width","").css("display","");
  $(".list").css("width","").css("display","");

  }
    else if(width>500 && width< 650){
      //only userProfile
      $("#backProfile").css("display","none");
      $(".chats").css("width","").css("display","block")
  $(".user").css("width","").css("display","");
  $(".list").css("width","").css("display","");
  
    }
    
  });

  $("#backList").click(function(){
    const width=innerWidth;
    $("#backList").css("display","none");
    
    if(width<500){
      $("#input").show();
  
      //both should view"|
      $(".chats").css("width","").css("display","")
  $(".user").css("width","").css("display","");
  $(".list").css("width","").css("display","");
  
  }
    else if(width>500 && width< 650){
      //only userProfile
      $(".chats").css("width","").css("display","")
  $(".user").css("width","").css("display","");
  $(".list").css("width","").css("display","");
  
    }
   
  })
  let imageReady=false;
  let nameReady=false;
$("#login #image").on("change",function(){
imageReader($(this),$("#login #img"),done,true);
function done(){
imageReady=true;
}
});
$("#login #name").on("keyup",function(){
  const val=$(this).val();
  if(val.length >2){
  nameReady=true;
  }
  else{
    nameReady=false;
  }
})