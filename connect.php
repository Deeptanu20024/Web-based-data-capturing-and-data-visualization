<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
   die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST["submit"])) {
   $fName = $_POST["firstName"];
   $lName = $_POST["lastName"];
   $email = $_POST["email"];
   $cNumber = $_POST["contactNumber"];
   $feedback = $_POST["feedback"];

   $query = "INSERT INTO contact_details (firstName, lastName, email, contactNumber, feedback) VALUES ('$fName', '$lName', '$email', '$cNumber', '$feedback')";

   if (mysqli_query($conn, $query)) {
      echo "Data inserted into the database.";
      // Redirect to the Contact Us page
      header("Location: index.html");
      exit(); // Make sure to exit after the redirect
   } else {
      echo "Error: " . mysqli_error($conn);
   }
}

mysqli_close($conn);
?>
