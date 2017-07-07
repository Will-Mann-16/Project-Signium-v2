<?php
  require "database.php";
  $house = $_GET["house"];

  $results = DB::query("SELECT * FROM {$house}-locations");

  return json_encode($results);
?>
