<?php 
// Get the current Year from the server
$currentYear = date("Y");

// Footer Bar
echo "<div class='navbar navbar-default navbar-fixed-bottom'>";
// Container div, used to add nice spacing
    echo "<div class='container'>";
        // Text to display in the footer (uses current year from server time so copyright information is always up to date)
        echo "<p id='built-by' class='navbar-text'>&copy; Timothy Cole $currentYear All Rights Reserved</p>";
    echo "</div>"; // Close .container
echo "</div>"; // Close .navbar
echo "</body>"; // Close body
echo "</html>"; // Close html
?>