<?php
  require "database.php";
  $house = $_GET["House"];
  $location = $_GET["Location"];
  $ids = $_GET["IDs"];

  foreach($ids as $id)
  {
    DB::update("{$house}-students", array("Location" => $location), "ID=%i", $id);
  }
  return true;
?>
