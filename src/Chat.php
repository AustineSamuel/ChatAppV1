<?php
namespace MyApp;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

$con=new \mysqli("localhost","root","","playerchatapp");

function saveMessage($name,$message,$image){                
$con=new \mysqli("localhost","root","","playerchatapp");
if($con){
    $date=Date("D-M-Y:h:i:s");
    $message=htmlspecialchars($message);
    $save=$con->query("
 INSERT INTO groupchat(name,message,profileImage,date)
 VALUES('$name','$message','$image','$date');
 ");
 echo $save ? "saved":"fail".$con->error;
}
else{
   echo "not connected";
}
}                                                                                                                                  

       

    function removeFromActiveUsers($id){                
        $con=new \mysqli("localhost","root","","playerchatapp");
        if($con){
         $date=Date("D-M-Y:h:i:s");
         $save=$con->query("
         delete from `groupchatActiveUsers` where rid='$id';
         ");
         echo $save ? "removed saved":"fail to remove".$con->error;
        }
        else{
           echo "not connected";
        }
        }         

        
    function rndName($len){
        $Rname=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
        $mainName="";
        for ($i=0; $i < $len; $i++) { 
          $mainName.=$Rname[rand(0,count($Rname)-1)];
        }
      return $mainName;
      }

   
class Chat implements MessageComponentInterface {
    protected $clients;
    public function __construct() {
        $this->clients = new \SplObjectStorage;
        echo "waiting for commection";
    }

    public function onOpen(ConnectionInterface $conn){
        // Store the new connection to send messages to 
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
        }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');
     $message=explode("\$",$msg);

            foreach ($this->clients as $client) {
           
            if ($from !== $client) {
                if($message[1]!="11eehostLife"){
                // The sender is not the receiver, send to each client connected
                $client->send(json_encode($message));
                $message[1]!="typing" && $message[0]!="liteChatName11" ? saveMessage($message[0],$message[1],$message[2]):"";
                }
             }
             else if($from === $client){
                 $client->send($from->resourceId); 
             }
        }
   
    }
    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
        removeFromActiveUsers($conn->resourceId);
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}