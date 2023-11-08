<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "trial";

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// Modify the SQL query to order by date in descending order and limit the result to 10 rows
$query = "SELECT * FROM testtab ORDER BY date DESC LIMIT 10";
$data = mysqli_query($conn, $query);

$total = mysqli_num_rows($data);

if ($total != 0) {
  $xData = array();
  $yData = array();
  $zData = array();
  $dates = array();

  while ($result = mysqli_fetch_assoc($data)) {
    $dates[] = $result['date'];
    $xData[] = $result['x'];
    $yData[] = $result['y'];
    $zData[] = $result['z'];
  }

  // Combine all data into a single associative array
  $combinedData = array(
    'dates' => $dates,
    'x' => $xData,
    'y' => $yData,
    'z' => $zData
  );

  echo json_encode($combinedData);
} else {
  echo "no record";
}

mysqli_close($conn);
?>
