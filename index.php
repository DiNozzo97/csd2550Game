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
        <!-- Import the Website logic (THE CODE IN THIS FILE IS MY CODE!) -->
        <script src='js/website.js'></script> 
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
                        <div id="signInGroup" class="form-group">
                            <!-- I have opted to use a text input over an email input, to allow me to implement my own email validation -->
                            <input type="text" class="form-control text-center has-error sign-in" id="emailSignIn" placeholder="Email Address">
                            <input type="password" class="form-control text-center sign-in" id="passwordSignIn" placeholder="Password">
                        </div><!-- /.signInGroup -->
                        <button id="signInButton" type="button" class="btn btn-info sign-in" onclick="processSignIn();">Sign In</button>
                    </div><!-- /.modal-body -->
                    <div class="modal-footer">
                        <p class="help-block">No account? <a href="#" data-toggle="modal" data-target="#registerModal">Create one!</a></p>
                    </div><!-- /.modal-footer -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#signInModal -->

        <!-- Modal displayed for the user to register -->
        <div id="registerModal" class="modal fade" data-keyboard="false">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title">Create an account</h2>
                    </div><!-- /.modal-header -->
                    <div class="modal-body">
                        <div id="registerAlert"></div>
                        <div id="firstNameRegisterGroup" class="form-group">
                            <input type="text" class="form-control text-center register" id="firstNameRegister" placeholder="First Name">
                        </div><!-- /.firstNameRegisterGroup -->
                        <div id="lastNameRegisterGroup" class="form-group">
                            <input type="text" class="form-control text-center register" id="lastNameRegister" placeholder="Last Name">
                        </div><!-- /.lastNameRegisterGroup -->
                        <div id="emailRegisterGroup" class="form-group">
                            <!-- I have opted to use a text input over an email input, to allow me to implement my own email validation -->
                            <input type="text" class="form-control text-center register" id="emailRegister" placeholder="Email Address">
                        </div><!-- /.emailRegisterGroup -->
                        <div id="passwordRegisterGroup" class="form-group">
                            <input type="password" class="form-control text-center register" id="passwordRegister" placeholder="Password">
                            <input type="password" class="form-control text-center register" id="confirmPasswordRegister" placeholder="Confirm Password">
                        </div><!-- /.passwordRegisterGroup -->
                        <div class="checkbox register">
                            <label for="publicScoresRegister">Post my scores to the public scoreboard</label>
                            <input class="pull-right" type="checkbox" value="true" id="publicScoresRegister" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                        </div><!-- /.checkbox -->
                        <button id="registerButton"type="button" class="btn btn-info register" onclick="processRegistration();">Register</button>
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
                        <div id="firstNameSettingsGroup" class="form-group">
                            <input type="text" class="form-control text-center settings" id="firstNameSettings" placeholder="First Name">
                        </div><!-- /.firstNameSettingsGroup -->
                        <div id="lastNameSettingsGroup" class="form-group">
                            <input type="text" class="form-control text-center settings" id="lastNameSettings" placeholder="Last Name">
                        </div><!-- /.lastNameSettingsGroup -->
                        <div id="emailSettingsGroup" class="form-group">
                            <!-- I have opted to use a text input over an email input, to allow me to implement my own email validation -->
                            <input type="email" class="form-control text-center settings" id="emailSettings" placeholder="Email Address">
                        </div><!-- /.emailSettingsGroup -->
                        <div id="passwordSettingsGroup" class="form-group">
                            <input type="password" class="form-control text-center settings" id="passwordSettings" placeholder="Password">
                            <input type="password" class="form-control text-center settings" id="confirmPasswordSettings" placeholder="Confirm Password">
                        </div><!-- /.passwordSettingsGroup -->
                        <div class="settingsButtons">
                            <button data-toggle="modal" data-target="#deleteScoresModal" id="clearScoresSettingsButton" type="button" class="btn btn-danger settings">Clear My Scores</button>
                            <button data-toggle="modal" data-target="#deleteAccountModal" id="deleteAccountSettingsButton" type="button" class="btn btn-danger settings">Delete My Account</button>
                        </div><!-- /.settingsButtons -->
                        <div class="checkbox settings">
                            <label for="publicScoresSettings">Post my scores to the public scoreboard</label>
                            <input class="pull-right" type="checkbox" value="true" id="publicScoresSettings" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                        </div><!-- /.checkbox -->
                        <div class="settingsButtons">
                            <button id="saveSettingsButton" type="button" class="btn btn-success inlineSettings settings" onclick="processSettings();">Save</button>
                            <button id="cancelSettingsButton" type="button" class="btn btn-danger inlineSettings settings" data-dismiss="modal" onclick="resetSettings();">Cancel</button>
                        </div><!-- /.settingsButtons -->
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
                        </div><!-- /.settingsButtons -->
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
                        </div><!-- /.settingsButtons -->
                    </div><!-- /.modal-body -->
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /#deleteScoresModal -->


        <!-- Display the Footer from the base file -->
        <?php require 'assets/footer.php';?>

    </body>
</html>