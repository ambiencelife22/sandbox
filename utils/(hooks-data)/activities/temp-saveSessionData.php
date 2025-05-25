<?php
header('Content-Type: application/json')
header('Access-Control-Allow-Origin: *')
header('Access-Control-Allow-Methods: POST')
header('Access-Control-Allow-Headers: Content-Type')

$host = 'localhost'
$db   = 'your_db_name'
$user = 'your_db_user'
$pass = 'your_db_password'
$charset = 'utf8mb4'

$dsn = 'mysql:host=$hostdbname=$dbcharset=$charset'
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
]

try {
    $pdo = new PDO($dsn, $user, $pass, $options)
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode())
}

$data = json_decode(file_get_contents('php://input'))

if(isset($data->activityType) && isset($data->sessionData)) {
    $stmt = $pdo->prepare('INSERT INTO session_data_table (activityType, sessionData) VALUES (?, ?)')
    $stmt->execute([$data->activityType, json_encode($data->sessionData)])
    echo json_encode(['success' => true])
    exit()  // Exit after successfully inserting and echoing
}

if(!isset($data->activityType) || !isset($data->sessionData)) {
    echo json_encode(['success' => false, 'message' => 'Invalid data.'])
}
?>
