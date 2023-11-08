<?php
class gy521 {
    public $link = '';
    function __construct($x, $y, $z, $tempr, $gx, $gy, $gz) {
        $this->connect();
        $this->storeInDB($x, $y, $z, $tempr, $gx, $gy, $gz);
        $this->deleteOldData();
    }

    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'trial') or die('Cannot select the DB');
    }

    function storeInDB($x, $y, $z, $tempr, $gx, $gy, $gz) {
        $query = "INSERT INTO testtab (x, y, z, tempr, gx, gy, gz) VALUES ('$x', '$y', '$z', '$tempr', '$gx', '$gy', '$gz')";
        $result = mysqli_query($this->link, $query) or die('Errant query:  ' . $query);
    }

    function deleteOldData() {
        $max_entries = 150; // Set the maximum number of entries to keep
        $query = "SELECT COUNT(*) AS total FROM testtab";
        $result = mysqli_query($this->link, $query);
        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $total_entries = $row["total"];
            if ($total_entries > $max_entries) {
                $delete_count = $total_entries - $max_entries;
                $delete_query = "DELETE FROM testtab ORDER BY id ASC LIMIT $delete_count";
                $delete_result = mysqli_query($this->link, $delete_query);
                if ($delete_result) {
                    echo "$delete_count old data entries deleted successfully.";
                } else {
                    echo "Error deleting old data: " . mysqli_error($this->link);
                }
            }
        }
    }
}

if ($_GET['x'] != '' && $_GET['y'] != '' && $_GET['z'] != '' && $_GET['tempr'] != '' && $_GET['gx'] != '' && $_GET['gy'] != '' && $_GET['gz'] != '') {
    $gy521 = new gy521($_GET['x'], $_GET['y'], $_GET['z'], $_GET['tempr'], $_GET['gx'], $_GET['gy'], $_GET['gz']);
}
?>
