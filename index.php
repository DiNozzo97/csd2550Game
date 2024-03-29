<!DOCTYPE html>

<!-- Display the navbar/header from the base file -->
<?php require'assets/header.php'; ?>

<!-- Placeholder that is used when an alert is created -->
<div id = "mainAlert"></div>
<div class="container">
    <canvas id="mainCanvas" class="center-block" width="500" height="520"></canvas>
</div>


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
                <form id="signInForm" onsubmit="processSignIn(); return false;">
                    <div id="signInGroup" class="form-group">
                        <!-- I have opted to use a text input over an email input, to allow me to implement my own email validation -->
                        <input type="text" class="form-control text-center has-error sign-in" id="emailSignIn" placeholder="Email Address">
                        <input type="password" class="form-control text-center sign-in" id="passwordSignIn" placeholder="Password">
                    </div><!-- /.signInGroup -->
                    <button id="signInButton" type="submit" class="btn btn-info sign-in">Sign In</button>
                </form>
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
                <form id="registerForm" onsubmit="processRegistration(); return false;">
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
                    <div id="phoneNumberRegisterGroup" class="form-group">
                        <input type="text" class="form-control text-center register" id="phoneRegister" placeholder="UK Phone Number (Optional)">
                    </div><!-- /.phoneNumberGroup -->
                    <div id="postcodeRegisterGroup" class="form-group">
                        <input type="text" class="form-control text-center register" id="postcodeRegister" placeholder="Postcode">
                    </div><!-- /.postcodeGroup -->
                    <div class="checkbox register">
                        <label for="publicScoresRegister">Post my scores to the public scoreboard</label>
                        <input class="pull-right" type="checkbox" value="true" id="publicScoresRegister" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                    </div><!-- /.checkbox -->
                    <button id="registerButton"type="submit" class="btn btn-info register">Register</button>
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
                    <tbody id="scoresTableBody">
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
                <form id="settingsForm" onsubmit="processSettings(); return false;">
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
                    <div id="phoneNumberSettingsGroup" class="form-group">
                        <input type="text" class="form-control text-center settings" id="phoneSettings" placeholder="UK Phone Number (Optional)">
                    </div><!-- /.phoneNumberSettingsGroup -->
                    <div id="postcodeSettingsGroup" class="form-group">
                        <input type="text" class="form-control text-center settings" id="postcodeSettings" placeholder="Postcode">
                    </div><!-- /.postcodeSettingsGroup -->
                    <div class="settingsButtons">
                        <button data-toggle="modal" data-target="#deleteScoresModal" id="clearScoresSettingsButton" type="button" class="btn btn-danger settings">Clear My Scores</button>
                        <button data-toggle="modal" data-target="#deleteAccountModal" id="deleteAccountSettingsButton" type="button" class="btn btn-danger settings">Delete My Account</button>
                    </div><!-- /.settingsButtons -->
                    <div class="checkbox settings">
                        <label for="publicScoresSettings">Post my scores to the public scoreboard</label>
                        <input class="pull-right" type="checkbox" value="true" id="publicScoresSettings" checked data-size="mini" data-on-color="primary" data-off-color="default" data-on-text="Yes" data-off-text="No">
                    </div><!-- /.checkbox -->
                    <div class="settingsButtons">
                        <button id="saveSettingsButton" type="submit" class="btn btn-success inlineSettings settings">Save</button>
                        <button id="cancelSettingsButton" type="button" class="btn btn-danger inlineSettings settings" data-dismiss="modal" onclick="resetSettings();">Cancel</button>
                    </div><!-- /.settingsButtons -->
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
                <h2 class="modal-title">Do you really want to permenantly delete your account and scores?</h2>
            </div><!-- /.modal-header -->
            <div class="modal-body">
                <div class="settingsButtons">
                    <button id="yesClearScoresSettingsButton" type="button" class="btn btn-success settings" onclick="deleteCurrentUser();">Yes</button>
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
                <h2 class="modal-title">Do you really want to permenantly delete your scores?</h2>
            </div><!-- /.modal-header -->
            <div class="modal-body">
                <div class="settingsButtons">
                    <button id="yesClearScoresSettingsButton" type="button" class="btn btn-success settings" onclick="deleteScores();">Yes</button>
                    <button id="noClearScoresSettingsButton" type="button" class="btn btn-danger settings" data-dismiss="modal">No</button>
                </div><!-- /.settingsButtons -->
            </div><!-- /.modal-body -->
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /#deleteScoresModal -->


<!-- Display the Footer and close the html/body tags from the base file -->
<?php require 'assets/footer.php';?>
