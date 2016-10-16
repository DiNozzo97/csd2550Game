<!DOCTYPE html>

<html>
    <head>
        <!-- Declare Website Title (Shown in title bar of web browser) -->
        <title>Tetris</title>
        <!-- Declare Favicon -->
        <link rel="icon" href="./img/favicon.png" type="image/x-icon">
        <!-- Create link to Bootstrap CSS file (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <!-- Create link to Bootstrap-Switch CSS file (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <link rel="stylesheet" type="text/css" href="css/bootstrap-switch.min.css">
        <!-- Create link to my own CSS file (used to overwrite any CSS per my preference) -->
        <link rel="stylesheet" type="text/css" href="css/styles.css">
        <!-- Import the JQuery Library (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/jquery-3.1.1.min.js'></script>
        <!-- Import the Bootstrap JS Library (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/bootstrap.min.js'></script> 
        <!-- Import the Bootstrap-Switch JS Library (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/bootstrap-switch.min.js'></script> 
        <!-- Import the JQuery MD5 JS Library - used to hash passwords (THE CODE IN THIS FILE IS NOT MY CODE!) -->
        <script src='js/jquery.md5.js'></script> 
        <script>

            // The function resetSessionStorage removes the data of the previously signed in user and resets each value to the default load value
            function resetSessionStorage() {
                sessionStorage.signedIn = "false";
                sessionStorage.currentId = "";
                sessionStorage.currentFirstName = "";
                sessionStorage.currentLastName = "";
                sessionStorage.currentEmail = "";
                sessionStorage.currentPostToScores = "false";
            }
            
            // Check to see if this is a new session and if so initialise session storage
            if (sessionStorage.length == 0) {
                resetSessionStorage();
            }
            
            // Check to see if the game has been previously run on this computers and if not, initialise local storage
            if (localStorage.length == 0) {
                localStorage.users = "[]";
            }

            // The function alertActivator will create an alert to notify the user of an action 
            function alertActivator(location, type, message) {
                $('#'+location+'Alert').html('<div class="alert alert-'+type+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +message+'</div>')
            }

            // The function activateNavButton will add 'active' class to called button and remove 'active' class from other buttons
            function activateNavButton(buttonID) {
                $( ".active" ).removeClass( "active" )
                $( "#"+buttonID ).addClass( "active" );
            }

            // The function checkLoginStatus can be called to check login status and show the appropriate navigation items
            function checkLoginStatus() {
                if (sessionStorage.signedIn == "true") {
                    // Fetch the name of the current user and add it to the Navigation Bar Display
                    $("#navUserNameDisplay").html(sessionStorage.currentFirstName);

                    // Display the 'signed in' version of the navigation bar (and hide the guest version)if the user is signed in and vice versa
                    $("#guestNavButton").hide();
                    $("#signedInNavButton").show();
                } else {
                    $("#guestNavButton").show();
                    $("#signedInNavButton").hide();
                }
            }
            
            // The addUser function will add a user to local storage (after the data has been validated)
            function addUser(firstName, lastName, emailAdr, pwdSalt, pwdHash, postScores) {
                // parse existing JSON array into an object
                var usersObj = JSON.parse(localStorage.users);
                var newUSerObj = {
                                    firstName: firstName,
                                    lastName: lastName,
                                    emailAddress: emailAdr,
                                    passwordSalt: pwdSalt,
                                    passwordHash: pwdHash,
                                    saveScore: postScores,
                                    highScore: 0,
                                };
                // add the new user to the usersObj
                usersObj.push(newUSerObj);
                localStorage.users = JSON.stringify(usersObj);
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
                $( "#signOutButton" ).click(function() {
                    resetSessionStorage();
                    checkLoginStatus();
                    alertActivator("main", "success", "You have successfully signed out!");
                });
                // When the each button is pressed ->  add 'active' class and remove 'active' class from other buttons
                $( "#playButton" ).click(function() {
                    activateNavButton("playButton");
                });
                $( "#scoresButton" ).click(function() {
                    activateNavButton("scoresButton");
                });
                $( "#guestNavButton" ).click(function() {
                    activateNavButton("guestNavButton");
                });
                $( "#settingsButton" ).click(function() {
                    activateNavButton("signedInNavButton");
                });

                // When the sign in/scores/settings modal is closed, make play active again
                $('#signInModal').on('hide.bs.modal', function () {
                    activateNavButton("playButton");
                });
                $('#scoresModal').on('hide.bs.modal', function () {
                    activateNavButton("playButton");
                });
                $('#settingsModal').on('hide.bs.modal', function () {
                    activateNavButton("playButton");
                });

                // Make the checkboxs into switches switch
                $("#publicScoresRegister").bootstrapSwitch();
                $("#publicScoresSettings").bootstrapSwitch();

            });
        </script>
    </head>
    <body>
        <!-- Display the navbar/header from the base file -->
        <?php require'assets/header.php'; ?>

        <!-- Placeholder that is used when an alert is created -->
        <div id = "mainAlert"></div>

        <!-- Modal displayed for the user to sign in -->
        <div id="signInModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Sign In</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div id="signInAlert"></div>
                        <form class="form-horizontal">
                            <input type="email" class="form-control text-center sign-in" id="email" placeholder="Email Address">
                            <input type="password" class="form-control text-center sign-in" id="pwd" placeholder="Password">
                            <button id="signInButton" type="button" class="btn btn-info sign-in">Sign In</button>

                        </form>
                    </div><!-- /.modal-body -->
                    <div class="modal-footer">
                        <p class="help-block">No account? <a href="#" data-toggle="modal" data-target="#registerModal">Create one!</a></p>
                    </div><!-- /.modal-footer -->
                </div><!-- /.modal-content -->

            </div><!-- /.modal-dialog -->
        </div><!-- /#signInModal -->

        <!-- Modal displayed for the user to sign in -->
        <div id="registerModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Create an account</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div id="registerAlert"></div>
                        <form class="form-horizontal">
                            <input type="text" class="form-control text-center register" id="firstNameRegister" placeholder="First Name">
                            <input type="text" class="form-control text-center register" id="lastNameRegister" placeholder="Last Name">
                            <input type="email" class="form-control text-center register" id="emailRegister" placeholder="Email Address">
                            <input type="password" class="form-control text-center register" id="passwordRegister" placeholder="Password">
                            <input type="password" class="form-control text-center register" id="confirmPasswordRegister" placeholder="Confirm Password">

                            <div class="checkbox register">
                                <label for="publicScoresRegister">Post my scores to the public scoreboard</label>
                                <input class="pull-right" type="checkbox" value="true" id="publicScoresRegister" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                            </div><!-- /.checkbox -->

                            <button id="registerButton"type="button" class="btn btn-info register">Register</button>

                        </form>
                    </div><!-- /.modal-body -->
                    <div class="modal-footer">
                        <p class="help-block">Already have an account? <a id="registerToSignIn" href="#" data-dismiss="modal">Sign in!</a></p>
                    </div><!-- /.modal-footer -->
                </div><!-- /.modal-content -->

            </div><!-- /.modal-dialog -->
        </div><!-- /#registerModal -->

        <!-- Modal displaying the scoreboard -->
        <div id="scoresModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Scores</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div id="scoresAlert"></div>
                        <table class="table table-striped" id="tblGrid">
                            <thead id="tblHead">
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div><!-- /.modal-body -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#scoresModal -->

        <!-- Modal displayed for the user to adjust user settings -->
        <div id="settingsModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Settings</h2>
                        <p class="help-block text-center">Edit the information below to update your profile. <br>If you wish to change your password, enter your new password and then confirm it, <br> otherwise your password will remain.</p>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div id="settingsAlert"></div>
                        <form class="form-horizontal">
                            <input type="text" class="form-control text-center register" id="firstNameRegister" placeholder="First Name">
                            <input type="text" class="form-control text-center register" id="lastNameRegister" placeholder="Last Name">
                            <input type="email" class="form-control text-center register" id="emailRegister" placeholder="Email Address">
                            <input type="password" class="form-control text-center register" id="passwordRegister" placeholder="Password">
                            <input type="password" class="form-control text-center register" id="confirmPasswordRegister" placeholder="Confirm Password">
                            <div class="settingsButtons">
                                <button data-toggle="modal" data-target="#deleteScoresModal" id="clearScoresSettingsButton" type="button" class="btn btn-danger settings">Clear My Scores</button>
                                <button data-toggle="modal" data-target="#deleteAccountModal" id="deleteAccountSettingsButton" type="button" class="btn btn-danger settings">Delete My Account</button>
                            </div>
                            <div class="checkbox settings">
                                <label for="publicScoresRegister">Post my scores to the public scoreboard</label>
                                <input class="pull-right" type="checkbox" value="true" id="publicScoresSettings" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                            </div><!-- /.checkbox -->
                            <div class="settingsButtons">
                                <button id="saveSettingsButton" type="button" class="btn btn-success inlineSettings settings">Save</button>
                                <button id="cancelSettingsButton" type="button" class="btn btn-danger inlineSettings settings" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div><!-- /.modal-body -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#settingsModal -->

        <!-- Modal to confirm account Delete -->
        <div id="deleteAccountModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Do you really want to delete your account?</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div class="settingsButtons">
                            <button id="yesClearScoresSettingsButton" type="button" class="btn btn-success settings">Yes</button>
                            <button id="noClearScoresSettingsButton" type="button" class="btn btn-danger settings" data-dismiss="modal">No</button>
                        </div>
                    </div><!-- /.modal-body -->
                </div><!-- /.modal-content -->

            </div><!-- /.modal-dialog -->
        </div><!-- /#deleteAccountModal -->

        <!-- Modal to confirm scoreData Delete -->
        <div id="deleteScoresModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Do you really want to delete your scores?</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div class="settingsButtons">
                            <button id="yesClearScoresSettingsButton" type="button" class="btn btn-success settings">Yes</button>
                            <button id="noClearScoresSettingsButton" type="button" class="btn btn-danger settings" data-dismiss="modal">No</button>
                        </div>
                    </div><!-- /.modal-body -->
                </div><!-- /.modal-content -->

            </div><!-- /.modal-dialog -->
        </div><!-- /#deleteScoresModal -->


        <!-- Display the Footer from the base file -->
        <?php require 'assets/footer.php';?>

    </body>
</html>