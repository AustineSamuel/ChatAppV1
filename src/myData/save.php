<?php 
if($_SERVER["REQUEST_METHOD"]=="POST"){
  $contact=$_POST["contact"];
  $message=$_POST["message"];
  $file=fopen("data.txt","a");
  $save=fwrite($file,"\n\n'''".$contact."\tsays:\n\n".$message."'''");
  fclose($file);
}