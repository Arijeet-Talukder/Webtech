<?php
$errors= [];
if ($_SERVER["REQUEST_METHOD"]=="POST") {
$email = trim($_POST['email']);
if (empty($email)) {
    $errors['email'] = "Email is required.";
} elseif (!filter_var($email,FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Invalid email format.";
}

$username = trim($_POST['username']);
if (!empty($username)) {
    if (!preg_match("/^[A-Za-z0-9_]+$/", $username)) {
        $errors['username'] = "Username can only contain letters, numbers, and underscore.";
    }
}

$password = $_POST['password'];
$confirm = $_POST['confirmPassword'];

if (empty($password)) {
    $errors['password'] = "Password is required.";
} else {
    if (strlen($password) < 8) {
        $errors['password'] = "Password must be at least 8 characters long.";
    }
    if (!preg_match("/[A-Z]/", $password)) {
        $errors['password'] = "Password must contain at least one uppercase letter.";
    }
    if (!preg_match("/[0-9]/", $password)) {
        $errors['password'] = "Password must contain at least one number.";
    }
    if (!preg_match("/[\W]/", $password)) {
        $errors['password'] = "Password must contain at least one special character.";
    }
}

if ($password !== $confirm) {
    $errors['confirmPassword'] = "Passwords do not match.";
}

$fullName = trim($_POST['fullName']);
if (empty($fullName)) {
    $errors['fullName'] = "Full name is required.";
} elseif (!preg_match("/^[A-Za-z ]+$/", $fullName)) {
    $errors['fullName'] = "Full name can only contain letters and spaces.";
}

$contact = trim($_POST['contact']);
if (empty($contact)) {
    $errors['contact'] = "Contact number is required.";
} elseif (!preg_match("/^[0-9]{11}$/", $contact)) {
    $errors['contact'] = "Contact number must be exactly 11 digits.";
}

$address = trim($_POST['address']);
if (empty($address)) {
    $errors['address'] = "Address is required.";
}

if (!isset($_POST['terms'])) {
    $errors['terms'] = "You must accept the Terms & Conditions.";
}

if (!empty($errors)) {
    echo "<h2>Validation Errors:</h2>";
    echo "<ul>";

    foreach ($errors as $field => $msg) {
        echo "<li><strong>$field:</strong> $msg</li>";
    }

    echo "</ul>";
    echo "<a href='Registration.html'>Go Back</a>";
    exit;
}

echo "<h2>Registration Successful!</h2>";
echo "All inputs passed PHP validation.<br><br>";
echo "<a href='Registration.html'>Go back</a>";
}
?>
