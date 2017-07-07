S<?php
  require "database.php";

  $house = $_GET["House"];
  $result = DB::query("SELECT * FROM {$house}-students");



  return json_encode($result);
?>
