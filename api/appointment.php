<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect(getenv('DB_HOST') ?: 'localhost', 'root', '', 'hms');
if ($db_conn === false) {
    echo json_encode(["error" => "Could not connect to the database"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        
        $user_id = $_GET['user_id'];
        $query = "SELECT * FROM appointment WHERE user_id = $user_id";
        $result = mysqli_query($db_conn, $query);
        
        if (!$result) {
            echo json_encode(["error" => "Query failed: " . mysqli_error($db_conn)]);
            exit();
        }
        
        $users = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
        
        echo json_encode($users);
        break;
        case "POST":
            $user_id = $_GET['user_id'];

        $booking = json_decode(file_get_contents('php://input'));

        if (
            empty($booking->name) ||
            empty($booking->email) ||
            empty($booking->phone) ||
            empty($booking->date) ||
            empty($booking->doctor) ||
            empty($booking->hospital) ||
            empty($booking->time)||
            empty($booking->message)
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }

        $name = mysqli_real_escape_string($db_conn, $booking->name);
        $email = mysqli_real_escape_string($db_conn, $booking->email);
        $phone = mysqli_real_escape_string($db_conn, $booking->phone);
        $doctor = mysqli_real_escape_string($db_conn, $booking->doctor);
        $hospital = mysqli_real_escape_string($db_conn, $booking->hospital);
        $date = mysqli_real_escape_string($db_conn, $booking->date);
        $time = mysqli_real_escape_string($db_conn, $booking->time);
        $message = mysqli_real_escape_string($db_conn, $booking->message);

        $sql = mysqli_query($db_conn, "INSERT INTO appointment (user_id, name, email, phone, doctor, hospital, date, time, message) VALUES ('$user_id','$name', '$email', '$phone', '$doctor', '$hospital', '$date', '$time', '$message')");

        if ($sql) {
            echo json_encode(["success" => "Booking Added Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add booking. Please check the data."]);
        }
        break;
       case "DELETE":
            $path= explode('/', $_SERVER["REQUEST_URI"]);
            $result= mysqli_query($db_conn, "DELETE FROM appointment WHERE id= '$path[4]' ");
            if($result)
            {
              echo json_encode(["success"=>"User Record Deleted Successfully"]);
              return;
            } else {
              echo json_encode(["Please Check the User Data!"]);
              return;
            }

          break;    

}
?>
