<!DOCTYPE html>

<html>
    <head>
        <!-- Declare Website Title (Shown in title bar of web browser) -->
        <title>Tetris</title>
        <!-- Declare Favicon -->
        <link rel="icon" href="./img/favicon.png" type="image/x-icon">
        <!-- Create link to Bootstrap CSS file (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <!-- Create link to my own CSS file (used to overwrite any CSS per my preference) -->
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <!-- Import the JQuery Library (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/jquery-3.1.1.min.js'></script>
        <!-- Import the Bootstrap JS Library (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/bootstrap.min.js'></script> 
        <script>

            // The function resetSessionStorage removes the data of the previously signed in user and resets each value to the default load value
            function resetSessionStorage() {
                sessionStorage.signedIn = "false";
                sessionStorage.currentFirstName = "";
                sessionStorage.currentLastName = "";
                sessionStorage.postToScores = "false";
            }

            // Check to see if this is a new session and if so initialise session storage
            if (sessionStorage.length == 0) {
                resetSessionStorage();
            }

            // The function alertActivator will create an alert to notify the user of an action
            function alertActivator(location, type, message) {
                if (location == "main") {
                    $('#mainPageAlert').html('<div class="alert alert-'+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +message+'</div>')
                } else {
                    $('#modalAlert').html('<div class="alert alert-'+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +message+'</div>')
                }

            }

            // The function checkLoginStatus can be called to check login status and show the appropriate navigation items
            function checkLoginStatus() {
                if (sessionStorage.signedIn == "true") {
                    // Fetch the name of the current user and add it to the Navigation Bar Display
                    document.getElementById("navUserNameDisplay").innerHTML = sessionStorage.currentFirstName + " " + sessionStorage.currentLastName;

                    // Display the 'signed in' version of the navigation bar (and hide the guest version)if the user is signed in and vice versa
                    $("#guestNavButton").hide();
                    $("#signedInNavButton").show();
                } else {
                    $("#guestNavButton").show();
                    $("#signedInNavButton").hide();
                }
            }

            // When the page has fully loaded 
            $( document ).ready(function() {
                // Check whether a user is signed in (in order to show the correct NavBar)
                checkLoginStatus();
                // forever, if the user hovers over the logo, switch to the animated version, otherwise return to static logo
                $( "#logo" ).hover(
                    function() {
                        $('#logo').attr("src", "./img/logo-small-animated.gif");
                    }, function() {
                        $('#logo').attr("src", "./img/logo-small-static.gif");
                    }
                );
                // When the Sign Out button is pressed
                document.getElementById("signOutButton").onclick =
                    function() {
                    resetSessionStorage();
                    checkLoginStatus();
                    alertActivator("main", "success", "You have successfully signed out!");
                };
            });
        </script>
    </head>
    <body>
        <!-- Display the navbar/header from the base file -->
        <?php require'assets/header.php'; ?>
        <!-- Placeholder that is used when an alert is created -->
        <div id = "mainPageAlert"></div>


        <!-- Display the Footer from the base file -->
        <?php require 'assets/footer.php';?>

    </body>
</html>