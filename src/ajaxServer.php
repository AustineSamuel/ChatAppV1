<?php
session_start();
$con=new mysqli("localhost","root","","playerchatapp");
//$con=new mysqli("localhost","id16654496_austinesamuel914","Me**2001Smart","id16654496_playerusers");;

function rndName($len){
  $Rname=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  $mainName="";
  for ($i=0; $i < $len; $i++) { 
    $mainName.=$Rname[rand(0,count($Rname)-1)];
  }
return $mainName;
}


function connect(){
  global $con; 
if($con){
   return true;
}
else{
  return false;
}
}


function uploadImage($name=array(),$surportedExtn=["image/jpeg","image/jpg","image/png","image/jpg","image/gif"]){
  if($name["error"]==0){
  $tmp=$name["tmp_name"];
  $type=trim(mime_content_type($tmp));
  $fileName=$name["name"];
$extn=strtolower(substr($fileName,strrpos($fileName,"."),strlen($fileName)));
if(in_array($type,$surportedExtn)){
  $imageName=substr(trim(md5(rndName(30))),0,15);
 $save=!file_exists("images/".$imageName."".$extn) ? move_uploaded_file($tmp,"images/".$imageName."".$extn):false;
 if($save){
   return $imageName."".$extn;
 }
 else{
   return false;
 }
 }
 else{
  return "notSuported";
}
}
}



function deleteFile($name){
  if(file_exists($name)){
    unlink($name);
    return "deleted";
  }
  else{
    return "not exist";
  }
}

if($_SERVER["REQUEST_METHOD"]=="POST"){
  if(!isset($_POST["add"])){
  if(connect()){
  if(!isset($_POST["action"])){
  $name=isset($_POST["newUserName"]) ? $_POST["newUserName"] : "";
  $image=isset($_FILES["userProfileImage"]) ? uploadImage($_FILES["userProfileImage"]):false;
  $date=Date("Y-M-D-H:I:S");
 $save=$con->query("INSERT INTO groupchat(name,message,profileImage,date)
  VALUES('$name','join','$image','$date');
  ");
  if($save){
     echo json_encode(array("name"=>$name,"image"=>$image));
}
else{
  echo "fail to save Error:".$con->error;
}
  }
  else if(trim($_POST["action"])=="loadPrev"){
    $json=[];
    $fetch=$con->query("SELECT * FROM `groupchat`");
    if($fetch->num_rows>0){
      while($row=$fetch->fetch_assoc()){
array_push($json,array(
  "id"=>$row["id"],
  "name"=>$row["name"],
  "message"=>htmlspecialchars_decode($row["message"]),
  "image"=>$row["profileImage"],
  "date"=>$row["date"]
));
      }
     }
     echo json_encode($json);
  }
}
  }



if(isset($_POST["add"])){
function addToActiveUsers(){                
global  $con;///=new \mysqli("localhost","root","","playerchatapp");
  if($con){
   $date=Date("D-M-Y:H:I:S");
   $name=$_POST["name"];
   $image=$_POST["image"];
   $id=$_POST["id"];
   $save=$con->query("
   INSERT INTO groupchatActiveUsers(name,profileImage,rid)
   VALUES('$name','$image','$id');
   ");
   echo $save ? " saved":"fail".$con->error;
  }
  else{
     echo "not connected";
  }
  }  
  addToActiveUsers();       
}

function loadUsers(){
  global $con;
  $json=[];
  $fetch=$con->query("SELECT * FROM `groupchatactiveusers`");
  if($fetch->num_rows>0){
     while($row=$fetch->fetch_assoc()){
array_push($json,array(
"id"=>$row["id"],
"name"=>$row["name"],
"image"=>$row["profileImage"],
"rid"=>$row["rid"]
));
    }
    }
    echo json_encode($json);
}
if(isset($_POST["loadUsers"])){
  loadUsers();
}
if(isset($_POST["imgB"])){
  $name=$_POST["newName"];
   $image=isset($_FILES["newImage"]) ? uploadImage($_FILES["newImage"]):false;
$imgB = $_POST["imgB"];
echo $image;
deleteFile("images/".$imgB);
$con->query("
update `groupchat` set profileImage='$image', name='$name' where profileImage='$imgB' 
") ? "updated":"fail  to update";
}
}
else{
echo "null";
}