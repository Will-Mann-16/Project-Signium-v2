<?php
  require "database.php";
  $house = $_GET["House"];
  $student = json_decode($_GET["Student"]);
  $id = $_GET["ID"];

  $firstname = isset($student["Firstname"]) ? true : false;
  $surname = isset($student["Surname"]) ? true: false;
  $yeargroup = isset($student["Yeargroup"]) true: false;
  $location = isset($student["Location"]) true: false;

  if($firstname){
    DB::update("${house}-students", array("Firstname" => $student["Firstname"]), "ID=%i", $id);
  }
  if($surname){
    DB::update("${house}-students", array("Surname" => $student["Surname"]), "ID=%i", $id);
  }
  if($yeargroup){
    DB::update("${house}-students", array("Yeargroup" => $student["Yeargroup"]), "ID=%i", $id);
  }
  if($location){
    DB::update("${house}-students", array("Location" => $student["Location"]), "ID=%i", $id);
  }
  return true;
?>
