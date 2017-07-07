<?php
  require "database.php";
  $id = $_GET["id"];
  $house = $_GET["house"];

  DB::delete("{$house}-students", "ID=%i", $id);
  return true;
?>
