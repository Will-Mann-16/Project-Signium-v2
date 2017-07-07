<?php
  require "database.php";

  $house = $_GET["House"];

  $student = json_decode($_POST["Student"]);
  $student["Firstname"] = htmlspecialchars($student["Firstname"]);
  $student["Surname"] = htmlspecialchars($student["Surname"]);
  DB::insert("{$house}-students", array('Firstname' => $student["Firstname"], 'Surname' => $student["Surname"], 'Yeargroup' => $student["Yeargroup"], 'Location' => 1))
  return true;
?>
