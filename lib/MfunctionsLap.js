"use strike";
 const sliceTextAnimation = (parentText,arr=[" "],userDur=1000,restartDur=2000)=>{
  dur=userDur;
arr.shift(parentText.html())
  let textDur=0;
  let textArr=0;
  let text=arr[textArr];
  //dur
  const animateF=() => {


    if(arr[textArr].slice(0,textDur).lastIndexOf(".")==arr[textArr].length-1){

      clearInterval(animate);
      //clearInterval(check);
      setTimeout(() => {
        textDur=0;
        dur=100
       animate=setInterval(animateF,dur);
        //check=setInterval(checkF,100);
        if(textArr >= arr.length -1 ){
        textArr= -1;
        text=arr[textArr];
        }
        textArr++;
        text=arr[textArr];
      },restartDur);
    }
    else{
    dur=Math.floor(Math.random()*userDur)+1;
    }

     if(textDur>=text.length +1){
      if(arr.length>0 && arr != undefined){
        text=arr[textArr];
        textDur=0;
         }
      textDur=0;
    }
    parentText.html(text.slice(0,textDur));
    textDur++;
  }
let animate=setInterval(animateF,dur);//end interval
    }


    
 const message=(text,dur=1000,fade=500)=>{
  $("body").append(`
  <div style=" width:100%; display:none; height:100px; display:flex; align-items:center; justify-content: center;position:fixed;bottom:0;"id="messageShow">
   <span style="padding:10px 15px; max-width:70%; color:white;background:rgba(32, 32, 32, 0.863);border-radius:30px; font-size:small;" id="messageText">
    ${text}</span>
</div>
  `);
  $("body #messageShow").fadeIn(fade);
  setTimeout(() => {
    $("body #messageShow").fadeOut(fade);
      setTimeout(() => {
      $("body #messageShow").remove();
        },fade+300);
  }, dur);

}

 const  getQr=(el)=>{
  return document.querySelector(el);
}
 const getId=(el)=>{
  return document.getElementById(el);
}
 const getExtn=(file,test=false)=>{
const  fileExtn=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
if(test===false){
  return fileExtn;
}
else{
return test.includes(fileExtn);
}
}

 const clickImageViewer=()=>{//jquery
let count=false;
$("img").click(function(){
const src=$(this).attr("src").toString();
$("body").append(`<div id="v112" style='
  width:100%; height:100%; position:fixed; 
  background:rgba(0,0,0,0.4);display:flex; 
  align-items:center; justify-content:center;'><img src="${src}" style="width:90%; height:90%; border-radius:10px;">
  </div>
`);
$("#v112").click(function(){
  $(this).fadeOut(200);
setTimeout(() => {
  $("#v112").remove();
},500);
count=false;
  });

});
}

 const download=(link)=>{
  let location=window.location.href.slice(0,window.location.href.lastIndexOf("/"));
  let path=location+"/"+link;
  let a=document.createElement("a");
  a.href=path;
  a.target="_blank";
  a.download=link;
  a.click();
  }

 const  warning=(heading="Wrong Command", content="you click a wrong button",button1="Cancel",button2="Ok",callBack=null,back=null)=>{
  $("body").append(` <div id="warning"
  style="overflow:auto;width:100%;height:100%;display:flex; position:fixed; justify-content:center; align-items:center; background:rgb(0,0,0,0.4);">
   <div style="height:auto; width:80%; padding:20px 20px; border-radius:10px;max-height:700px;background:rgb(20, 17, 31);margin:0 auto;box-shadow:1px 1px 10px 0px black;">
    <header style="text-align:center; color:rgb(255, 0,94); font-size:x-large;">${heading}</header>
    <div id="content" style="color:rgb(207, 202, 250); font-family:Verdana, Geneva, Tahoma, sans-serif;font-size:small;">${content}</div>
  <div style="display:flex; justify-content:space-around;padding:9px;"><button id="b1" style="width:100px; padding:5px; background:rgb(255, 0, 85);">${button1}</button><button  id="b2" style="width:100px; padding:5px; background:rgb(71, 21, 252);color:white !important">${button2}</button></div>
  </div></div>`);
  
  $("#b1").click(function(){
   // $("#b1").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() => {
  document.querySelector("#warning").remove();
  back != null ? back() : "" ;
  },500);
  });
  
  $("#b2").click(function(){
  //   $("#b2").off("click");
    $("#warning").fadeOut(300);
   setTimeout(() =>{ 
  document.querySelector("#warning").remove();
  if(callBack!=null){
  callBack();
  }
  },500);
  });
  

}

 const href=(link,target="_blank")=>{
  if(link.lastIndexOf(".") > -1){
  let a=document.createElement("a");
  a.href=link;
  a.target=target;
  a.click();
   message("loading...",3000,300)
  }
  else{
    message("link fail")
  }
  }

   const imageReader=(input,imageSrc,callBack=null,bg=false,extn=[".jpg",".jpeg",".png"])=>{
    var file=input.val();
    file=file.slice(file.lastIndexOf("."),file.length).toLowerCase();
    if(extn.includes(file)){
    reader=new FileReader();
    reader.onload=(function(e){
   !bg ? imageSrc.attr("src",e.target.result) : imageSrc.css("background-image","url('"+e.target.result+"')");
 
   callBack != null ? callBack(e.target.result) : "" ;  
  });
    reader.readAsDataURL(input[0].files[0]);
    }//end if etn valid
    else{
      message("please use image with <b>.jpg .png .jpeg</b> extension",4000,300);
    }  
  }

   const replaceBrWithNL=(text)=>{
    let textArr=text.split("<br>");
      let newText="";
    textArr.forEach((e)=>{
      newText+=e+"\n";
    })
    return newText;
}

   const removeSpace=(text)=>{
    let textArr=text.split(" ");
    let newText="";
    textArr.forEach((e)=>{
   newText+=e;
    });
    return newText;
}


 const filterNumber=(text="",characters=["\n"," "])=>{
  let filtered="";
  let i;
  for(i=0;i<text.length;i++){
    let e=text[i];
    if(!characters.includes(e)){
      filtered+=""+e;
      }
    }
    return filtered;
  }
  
   const textToNameFormat=(text)=>{
     if(text===undefined || text===null)return
  const name=text.split(" ");
  var newName="";
  name.forEach((e)=>{
    newName+=" "+e.charAt(0).toUpperCase()+e.slice(1,e.length).toLowerCase();
  })
  return newName;
  }
  
  const filter=(text,chr="<br>")=>{
    text=text.split(chr);
    let filtered="";
    text.forEach((e)=>{
      filtered+=e;
    });
    return filtered;
  }

  const replaceAll=(text,text1,text2)=>{
    text=text.split(text1);
    let newText="";
    text.forEach((e)=>{
      newText+=e+text2;
    })
  }
  
  const action=(elName,eventType,func)=>{
    getQr(elName).addEventListener(eventType,func);
  }
  const setCss=(elName,property,value)=>{
  //getQr(elName).
  }