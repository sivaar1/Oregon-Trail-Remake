<?php
$servername = "studentdb-maria.gl.umbc.edu";
$username = "kz79934";
$password = "Kru1161994";
$dbname = "kz79934";
//get values to add
$q = $_GET['q'];
$vals = explode(',', $q);
$name = $vals[0];
$score = $vals[1];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$sql = "INSERT INTO highscores (name, score) VALUES ('$name', '$score')";
$result = $conn->query($sql);
if($result){
    echo "Success!";
}else{
    echo "Insert failed: " . $conn->error;
}
$conn->close();
?>