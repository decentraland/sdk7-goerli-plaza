<?php
header('Content-Type: application/json');
// Replace `*` with `https://decentraland.org` to restrict access
header('Access-Control-Allow-Origin: *');

// It's a preflight request. Respond accordingly.
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, PUT');
    header('Access-Control-Allow-Headers: Content-Type, x-apikey, cache-control');
    exit;
}


// PARAMETER

// This is your API token
// $apiToken = "COME_UP_WITH_YOUR_OWN_API_TOKEN_HERE";
$apiToken = "6518855968885408010c01fc";

// Here you can define your table
function ensureTableExists($db, $table) {
    global $table;  // Access the global $table variable
    $db->exec("CREATE TABLE IF NOT EXISTS $table (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        posX INTEGER,
        posY INTEGER,
        hexColor TEXT
    )");
}




// Check for valid API token
if ($_SERVER['HTTP_X_APIKEY'] !== $apiToken) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'Invalid API token']);
    exit;
}

// Function to sanitize file or table names
function sanitizeName($name) {
    $name = preg_replace("/[^a-zA-Z0-9]/", '', $name);  // Remove non-alphanumeric characters
    $name = substr($name, 0, 50);  // Limit the length to 50 characters
    return $name;
}

// Get and sanitize the 'table' parameter
$table = isset($_GET['table']) ? sanitizeName($_GET['table']) : 'pixels';

// Get and sanitize the 'id' parameter
$id = isset($_GET['id']) ? sanitizeName($_GET['id']) : null;

// Set up the database connection
try {
    $db = new PDO('sqlite: database.sqlite');
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Handle different request methods
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getPixels($db, $table);
        break;
    case 'POST':
        initPixels($db, $table);
        break;
    case 'PUT':
        updatePixel($db, $table, $id);
        break;
    default:
        echo json_encode(['message' => 'Method not supported']);
        break;
}

// Returns all pixel in the table, if table does not exist returns ´[]´
function getPixels($db, $table) {
    try {
        $query = "SELECT * FROM $table";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $pixels = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($pixels);
    } catch (Exception $e) {
        http_response_code(200);
        echo json_encode([]);
    }
}

// Takes array of pixel data and inits the sqlLite database
// Then returns the array with _id
function initPixels($db, $table) {
    ensureTableExists($db, $table);

    $inputData = json_decode(file_get_contents('php://input'), true);

    if ($inputData === null || !is_array($inputData)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data provided']);
        return;
    }

    $successfulEntries = [];  // Array to collect successfully added entries
    $errors = [];  // Array to collect error messages

    foreach ($inputData as $entry) {
        if (!isset($entry['posX'], $entry['posY'], $entry['hexColor'])) {
            $errors[] = 'Missing required fields for a pixel entry.';
            continue;  // Skip to next entry if validation fails
        }

        try {
            $stmt = $db->prepare("INSERT INTO $table (posX, posY, hexColor) VALUES (?, ?, ?)");
            $stmt->execute([$entry['posX'], $entry['posY'], $entry['hexColor']]);
            $insertId = $db->lastInsertId();
            $entry['_id'] = intval($insertId);  // Add the _id to the entry
            $successfulEntries[] = $entry;  // Store the entry with _id
        } catch (Exception $e) {
            $errors[] = $e->getMessage();  // Collect error messages
        }
    }

    // Check for errors
    if (!empty($errors)) {
        http_response_code(400);  // Bad Request
        echo json_encode(['errors' => $errors]);  // Return the error messages
    } else {
        echo json_encode($successfulEntries);  // Return the successfully added entries
    }
}

function updatePixel($db, $table, $id) {

    // Ensure the table exists before attempting to update data
    ensureTableExists($db, $table);

    // Get input data
    $inputData = json_decode(file_get_contents('php://input'), true);

    // Check if inputData is not null and is an array
    if ($inputData === null || empty($id)) {
        http_response_code(400);
        echo json_encode(['error' => 'No JSON data provided or missing id']);
        return;
    }

    // Validate input data
    if (!isset($inputData['posX'], $inputData['posY'], $inputData['hexColor'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }

    try {
        $query = "UPDATE $table SET posX = ?, posY = ?, hexColor = ? WHERE _id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$inputData['posX'], $inputData['posY'], $inputData['hexColor'], $id]);

        // Check if any row was updated
        if ($stmt->rowCount() > 0) {
            $updatedData = array_merge(['_id' => $id], $inputData);  // Combine _id with input data
            echo json_encode($updatedData);  // Return the updated data
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'No pixel found with _id ' . $id]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
}


?>
