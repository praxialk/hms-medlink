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
        $contact = json_decode(file_get_contents('php://input'));

        if (
            empty($contact->name) ||
            empty($contact->email) ||
            empty($contact->message)
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }
        $name = mysqli_real_escape_string($db_conn, $contact->name);
        $email = mysqli_real_escape_string($db_conn, $contact->email);
        $message = mysqli_real_escape_string($db_conn, $contact->message);

        $sql = mysqli_query($db_conn, "INSERT INTO contact_us (Name, Email, Message) VALUES ('$name', '$email', '$message')");

        if ($sql) {
            echo json_encode(["success" => "Message sent successfully"]);
        } else {
            echo json_encode(["error" => "Failed to send message. Please try again later."]);
        }
        break;
}
?>
