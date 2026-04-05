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
    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        if (
            empty($user->name) ||
            empty($user->username) ||
            empty($user->email) ||
            empty($user->telNum) ||
            empty($user->password)
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }

$name = mysqli_real_escape_string($db_conn, $user->name);
$username = mysqli_real_escape_string($db_conn, $user->username);
        $email = mysqli_real_escape_string($db_conn, $user->email);
        $telNum = mysqli_real_escape_string($db_conn, $user->telNum);
        $password = mysqli_real_escape_string($db_conn, $user->password);

        $check_query = mysqli_query($db_conn, "SELECT * FROM users WHERE email = '$email'");
        if (mysqli_num_rows($check_query) > 0) {
            echo json_encode(["error" => "Email already exists"]);
            exit();
        }


$sql = mysqli_query($db_conn, "INSERT INTO users (username, user_type, email, Tel_Num, password) VALUES ('$username', 'patient', '$email', '$telNum', '$password')");

        if ($sql) {
            echo json_encode(["success" => "User Added Successfully"]);
        } else {
            echo json_encode(["error" => "Failed to add user. Please check the data."]);
        }
        break;
        
    }
?>
