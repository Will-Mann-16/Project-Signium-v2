<?php
  require "database.php";
  $id = $_GET["id"];
  $house = $_GET["house"];

  DB::delete("{$house}-locations", "ID=%i", $id);
  return true;
?>
