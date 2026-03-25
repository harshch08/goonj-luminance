<?php
// Database Configuration for Hostinger
// Copy this to db-config.php and fill in your actual credentials

define('DB_HOST', 'localhost'); // Usually 'localhost' on Hostinger
define('DB_NAME', 'your_database_name'); // Your database name from Hostinger
define('DB_USER', 'your_database_user'); // Your database username
define('DB_PASS', 'your_database_password'); // Your database password
define('DB_CHARSET', 'utf8mb4');

// Create connection
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database Connection Error: " . $e->getMessage());
        throw new Exception("Database connection failed");
    }
}
?>
