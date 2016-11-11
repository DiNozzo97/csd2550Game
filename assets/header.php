<?php
// Header

echo "<html>";
    echo "<head>";
        // Declare Website Title (Shown in title bar of web browser)
        echo "<title>Tetris</title>";
        // Declare Favicon
        echo "<link rel='icon' href='./img/favicon.png' type='image/x-icon'>";
        // Create link to Bootstrap CSS file (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<link rel='stylesheet' type='text/css' href='css/bootstrap.css'>";
        // Create link to Bootstrap-Switch CSS file (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<link rel='stylesheet' type='text/css' href='css/bootstrap-switch.min.css'>";
        // Create link to my own CSS file (used to overwrite any CSS per my preference)
        echo "<link rel='stylesheet' type='text/css' href='css/styles.css'>";
        // Import the JQuery Library (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<script src='js/jquery-3.1.1.min.js'></script>";
        // Import the Bootstrap JS Library (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<script src='js/bootstrap.min.js'></script>";
        // Import the Bootstrap-Switch JS Library (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<script src='js/bootstrap-switch.min.js'></script>";
        // Import the JQuery MD5 JS Library - used to hash passwords (THE CODE IN THIS FILE IS NOT MY CODE!)
        echo "<script src='js/jquery.md5.js'></script>";
        // Import the Website logic (THE CODE IN THIS FILE IS MY CODE!)
        echo "<script src='js/website.js'></script>";
        // Import the game (THE CODE IN THIS FILE IS MY CODE!)
        echo "<script src='js/game.js'></script>";
    echo "</head>";
    echo "<body>";

        // NAVIGATION BAR
        echo "<nav class='navbar navbar-default'>";
            echo "<div class='container-fluid'>";
                echo "<div class='navbar-header'>";
                    echo "<a class='navbar-brand' href='#'><img id='logo' src='./img/logo-small-static.gif' alt='Tetris Logo'></a>";
                echo "</div>";

                // Navigation Buttons
                echo "<div class='collapse navbar-collapse' id='main-navbar'>";
                    echo "<ul class='nav navbar-nav navbar-right'>";

                        // Play Link
                        echo "<li id='playButton' class='active'><a href='#'>Play</a></li>";

                        // Scores Link
                        echo "<li id='scoresButton'><a href='#' data-toggle='modal' data-target='#scoresModal'>Scores</a></li>";

                        // Sign In/Register Link (displayed in when no user is digned in)
                        echo "<li id='guestNavButton'><a href='#' data-toggle='modal' data-target='#signInModal'>Sign In/Register</a></li>";

                        // User Preferences/SignOut button (displayed when a user is signed in)
                        echo "<li id='signedInNavButton' class='dropdown'>";
                            echo "<a href='#' class='dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>Welcome <span id='navUserNameDisplay'></span> <span class='glyphicon glyphicon-user nav-icon'></span> <span class='caret'></span></a>";
                            echo "<ul class='dropdown-menu'>";
                                echo "<li id='settingsButton'><a href='#' data-toggle='modal' data-target='#settingsModal'>Settings <span class='glyphicon glyphicon-cog nav-icon'></span></a></li>";
                                echo "<li class='divider'></li>";
                                echo "<li><a id='signOutButton' href='#'>Sign Out <span class='glyphicon glyphicon-hand-right nav-icon'></span></a></li>";
                            echo "</ul>";
                        echo "</li>";
                    echo "</ul>";
                echo "</div>";
            echo "</div>";
        echo "</nav>";
    ?>