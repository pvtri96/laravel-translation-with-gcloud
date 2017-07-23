<?php
$file = include './data/tooltip.php';

file_put_contents('./data/tooltip.json', json_encode($file));