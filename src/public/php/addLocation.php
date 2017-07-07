<?php
  require "database.php";
  $location = json_decode($_GET["Location"]);
  $house = $_GET["House"];

  DB:insert("{$house}-locations", array("Name" => $location["Name"], "Heading" => $location["Heading"], "Colour" => $location["Colour"]));
  return true;

?>
