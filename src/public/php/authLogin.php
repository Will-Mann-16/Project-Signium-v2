<?php
    require "dependencies/jwtHelper.php";
    require "database.php";

    $loggedIn = false;
    $mainUser = null;
    $users = DB::query("SELECT * FROM users");
    $credentials = json_decode($_POST["Credentials"]);
    foreach($users as $user){
        if($user["Email"] === $credentials["Email"]){
            if(password_verify($user["Password"], $credentials["Password"])){
              $loggedIn = true;
              $mainUser = $user;
            }
        }
    }
    $config = parse_ini_file("cfg/config.ini", true);
    $secretKey = base64_decode($config["login"]["jwt_key"]);
    $jwt = "";
    if($loggedIn){
      $token = $mainUser["AccessToken"];
      $jwt = JWT::encode($token, $secretKey);
    }
    $result = array("success" => $loggedIn, "jwt_token" => $jwt);
    return json_encode($result);
?>
