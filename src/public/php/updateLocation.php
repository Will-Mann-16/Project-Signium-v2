<?php
  require "database.php";
  $house = $_GET["House"];
  $location = json_decode($_GET["Location"]);
  $id = $_GET["ID"];

  $name = isset($location["Name"]) ? true : false;
  $heading = isset($location["Heading"]) ? true: false;
  $colour = isset($location["Colour"]) true: false;

  if($name){
    DB::update("${house}-locations", array("Name" => $location["Name"]), "ID=%i", $id);
  }
  if($heading){
    DB::update("${house}-locations", array("Heading" => $location["Heading"]), "ID=%i", $id);
  }
  if($colour){
    DB::update("${house}-locations", array("Colour" => $location["Colour"]), "ID=%i", $id);
  }

  return true;
?>
