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
        $emergency = json_decode(file_get_contents('php://input'));

        if (
            empty($emergency->condition) ||
            empty($emergency->location) ||
            empty($emergency->urgency) ||
            empty($emergency->selectedDoctor) ||
            empty($emergency->selectedDoctorId) ||
            empty($emergency->roomId) || // Check for room id
            empty($emergency->patientName) // Check for patient name
        ) {
            echo json_encode(["error" => "Please fill in all fields"]);
            exit();
        }
        $condition = mysqli_real_escape_string($db_conn, $emergency->condition);
        $location = mysqli_real_escape_string($db_conn, $emergency->location);
        $urgency = mysqli_real_escape_string($db_conn, $emergency->urgency);
        $selectedDoctor = mysqli_real_escape_string($db_conn, $emergency->selectedDoctor);
        $selectedDoctorId = mysqli_real_escape_string($db_conn, $emergency->selectedDoctorId);
        $roomId = mysqli_real_escape_string($db_conn, $emergency->roomId); // Escape room id
        $patientName = mysqli_real_escape_string($db_conn, $emergency->patientName); // Escape patient name

        $sql = mysqli_query($db_conn, "INSERT INTO emergency_requests (condition_patient, Location, Urgency, selected_doctor, room_id, patient_name , doc_id) VALUES ('$condition', '$location', '$urgency', '$selectedDoctor', '$roomId', '$patientName' ,'$selectedDoctorId')");

        if ($sql) {
            echo json_encode(["success" => "Emergency request submitted successfully"]);
        } else {
            echo json_encode(["error" => "Failed to submit emergency request. Please try again later."]);
        }
        break;

    case "GET":
        // Assuming you want to fetch emergency requests only for the logged-in doctor
        // You can pass the doctor's ID as a query parameter
      if (!isset($_GET['doc_Id'])) {
    echo json_encode(["error" => "Doctor ID is required"]);
    exit();
}

$doctorId = $_GET['doc_Id'];

        // Fetch emergency requests specific to the logged-in doctor
        $sql = "SELECT * FROM emergency_requests WHERE doc_id = '$doctorId'";
        $result = mysqli_query($db_conn, $sql);

        if (!$result) {
            echo json_encode(["error" => "Failed to fetch emergency requests"]);
            exit();
        }

        $emergencyRequests = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $emergencyRequests[] = $row;
        }

        echo json_encode($emergencyRequests);
        break;
}
?>
