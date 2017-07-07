<?php
    require "dependencies/jwtHelper.php";
    require "database.php";
    $config = parse_ini_file("cfg/config.ini", true);
    $secretKey = base64_decode($config["login"]["jwt_key"]);
    $jwt = $_POST["Token"];
    $token = JWT::decode($jwt, $secretKey);
    $user = DB::queryFirstRow("SELECT Email, Name, Role, HouseName FROM users WHERE AccessToken=%s", $token);
    return json_encode($user);
?>
