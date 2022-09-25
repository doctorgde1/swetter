<?php

include_once "database/user.php";


if (isset($_POST["submitRegst"])) {
    $regUsername = htmlspecialchars(stripslashes(trim($_POST["usernameRegst"])));
    $regEmail = htmlspecialchars(stripslashes(trim($_POST["emailRegst"])));
    $regPassword = htmlspecialchars(stripslashes(trim($_POST["passwordRegst"])));
    isEmty($regUsername, "Username is required");
    isEmty($regEmail, "Email is required");
    isEmty($regPassword, "Password is required");
    validate_data($regUsername, "/^[0-9a-zA-Z]+$/", "$regUsername is incorect email");
    validate_data($regEmail, "/\w+([\.-]?|\w+)*@\w+([\.-]?|\w+)*(\.\w{2,3})+$/", "$regEmail is incorect email");
    validate_data($regPassword, "/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/", "Incorect password");
    $user = new User($regUsername, $regEmail, $regPassword);
    if ($user->select_username($regUsername) != null) {
        die("<p>User $regUsername already exist</p>");
    } else {
        $user->registr();
        echo "<p>Registered successfully</p>";
    }
} 
elseif (isset($_POST["submitLogin"])) {
    $logUsername = htmlspecialchars(stripslashes(trim($_POST["usernameLogin"])));
    $logPassword = htmlspecialchars(stripslashes(trim($_POST["passwordLogin"])));
    if (isset($_SESSION["user_id"]) && isset($_SESSION["username"]) && $_SESSION["username"] == $logUsername) {
        die("<p>You are already logged in</p>");
    } else {
        $user = new User($logUsername, null, $logPassword);
        if ($user->select_username($logUsername) == $logUsername && $user->select_password($logPassword) == $logPassword) {
            $user->login();
            echo "<p>Logged in successfully</p>";
        } else {
            die("<p>Incorect username or password</p>");
        }
    }
}


function validate_data($data, $pattern, $message)
{
    if (!preg_match($pattern, $data)) {
        die("<p>$message</p>");
    }
}
function isEmty($data, $message)
{
    if (empty($data)) {
        die("<p>$message</p>");
    }
}
