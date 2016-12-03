// The function resetSessionStorage removes the data of the previously signed in user and resets each value to the default load value
function resetSessionStorage() {
    sessionStorage.signedIn = false;
    sessionStorage.currentArrayPosition = false;
    sessionStorage.currentId = "";
    sessionStorage.currentFirstName = "";
    sessionStorage.currentLastName = "";
    sessionStorage.currentEmail = "";
    sessionStorage.currentPostToScores = false;
}

// Check to see if this is a new session and if so initialise session storage
if (sessionStorage.length == 0) {
    resetSessionStorage();
}

// Check to see if the game has been previously run on this computers and if not, initialise local storage
if (localStorage.length == 0) {
    localStorage.nextID = 0;
    localStorage.users = "[]";
    localStorage.scores = "[]";
}

// The function processRegistration will validate the inputted data on the Registration form
function processRegistration() {
    // Reset any previous validation attempts
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");
    // Declaring some variables that can help keep track of the validation progress
    var validationPassed = true,
        totalErrors = [],
        invalidNames = [],
        duplicateEmail = false,
        existingUsers = JSON.parse(localStorage.users), // Convert the users JSON string in to a JS object so that it can be searched for duplicate users
        lwrEmailAddress = $('#emailRegister').val().toLowerCase(), // Make the email address lowercase, so that it can be used to check for existing records
        emptyFields = [];
    // check to see whether each field has been left empty, if so, make the input glow red (class has-error), add it to the emptyFields array and the totalErrors array (used to check at the end which fields have failed validation)
    if ($('#firstNameRegister').val() == '') {
        $("#firstNameRegisterGroup").addClass("has-error");
        emptyFields.push("First Name");
        totalErrors.push("#firstNameRegister");
        validationPassed = false;
    }
    if ($('#lastNameRegister').val() == '') {
        $("#lastNameRegisterGroup").addClass("has-error");
        emptyFields.push("Last Name");
        totalErrors.push("#lastNameRegister");
        validationPassed = false;
    }
    if (lwrEmailAddress == '') {
        $("#emailRegisterGroup").addClass("has-error");
        emptyFields.push("Email Address");
        totalErrors.push("#emailRegister");
        validationPassed = false;
    }
    if ($('#passwordRegister').val() == '') {
        $("#passwordRegisterGroup").addClass("has-error");
        emptyFields.push("Password");
        totalErrors.push("#passwordRegister");
        validationPassed = false;
    }
    if ($('#postcodeRegister').val() == '') {
        $("#postcodeRegisterGroup").addClass("has-error");
        emptyFields.push("Postcode");
        totalErrors.push("#postcodeRegister");
        validationPassed = false;
    }

    // check to see whether the firstName/lastName/email/phoneNumber(if entered) inputs match a regex expression to check data validity, if not, make the input glow red (class has-error), add it to the invalidNames array and the totalErrors array (used to check at the end which fields have failed validation)
    if (!(/^[-'a-zA-Z ]*$/.test($('#firstNameRegister').val()))) {
        $("#firstNameRegisterGroup").addClass("has-error");
        invalidNames.push("First Name");
        totalErrors.push("#firstNameRegisterGroup");
        validationPassed = false;
    }
    if (!(/^[-'a-zA-Z ]*$/.test($('#lastNameRegister').val()))) {
        $("#lastNameRegisterGroup").addClass("has-error");
        invalidNames.push("Last Name");
        totalErrors.push("#lastNameRegister");
        validationPassed = false;
    }
    if (!(/^[\w-\.]{1,64}@([\w-]+\.){1,255}[\w-]{2,4}$/.test(lwrEmailAddress))) {
        $("#emailRegisterGroup").addClass("has-error");
        invalidNames.push("Email Address");
        totalErrors.push("#emailRegisterGroup");
        validationPassed = false;
    }
    if ((!(/(\+44|0)\d{10}/.test($('#phoneRegister').val()))) && ($('#phoneRegister').val() != '')) {
        $("#phoneNumberRegisterGroup").addClass("has-error");
        invalidNames.push("UK Phone Number");
        totalErrors.push("#phoneNumberRegisterGroup");
        validationPassed = false;
    }
    // Check the validity of the post code, if it is not true then make the input glow red (class has-error), add it to the invalidNames array and the totalErrors array (used to check at the end which fields have failed validation)
    if (!validatePostcode($('#postcodeRegister').val())) {
        $("#postcodeRegisterGroup").addClass("has-error");
        invalidNames.push("Postcode");
        totalErrors.push("#postcodeRegister");
        validationPassed = false;
    }
    // See if the email address is already registered (by searching through each existing users email address)
    for (var i = 0; i < existingUsers.length; i += 1) {
        if (existingUsers[i].emailAddress == lwrEmailAddress) {
            duplicateEmail = true;
            validationPassed = false;
        }
        // if it is then, make the input glow red (class has-error) and add it to the totalErrors array (used to check at the end which fields have failed validation)
        if (duplicateEmail == true) {
            $( "#emailRegisterGroup" ).addClass( "has-error" );
            totalErrors.push("#emailRegisterGroup");
        }
    }

    // Validate that the 2 passwords entered match (I am currently not enforcing any password rules other than NOT empty!), if not, make the input glow red (class has-error), add it to the totalErrors array (used to check at the end which fields have failed validation)
    var passwordsMatch = true;
    if ($('#passwordRegister').val() != $('#confirmPasswordRegister').val()) {
        $( "#passwordRegisterGroup" ).addClass( "has-error" );
        passwordsMatch = false;
        totalErrors.push("#passwordRegister");
        validationPassed = false;
    }

    // Finally, if there has been an error, display a message, otherwise generate a Salt and a hash and then add the user.
    if (validationPassed) {
        // Generate a 4 CHAR random SALT
        var salt = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@£$%";
        for(var i=0; i < 4; i++ )
            salt += charset.charAt(Math.floor(Math.random() * charset.length));
        // add the user and hash the password + SALT in the process
        addUser($('#firstNameRegister').val(), $('#lastNameRegister').val(), lwrEmailAddress, salt, $.md5(salt + $('#passwordRegister').val()), $('#phoneRegister').val(), $('#postcodeRegister').val(), $("#publicScoresRegister").is(':checked'));
        // Hide the sign up modal
        $('#registerModal').modal('hide');
        // Display an alert on the login screen to the user
        alertActivator("signIn", "success", "You have successfully registered your account, sign in below:", true)
        // Clear the form/alerts, incase another user wants to sign up without refreshing the page
        $("#registerForm").trigger('reset');
        $('.alert.register').hide();

    } else { // If Validation failed, check the status of the various validation checks and display the relevant errors (with correct grammer)
        var errorMessage = "";
        if (emptyFields.length > 0) {
            errorMessage += "Please complete the ";
            for (var i=0;i < emptyFields.length; i++) {
                errorMessage += emptyFields[i];
                if (i < emptyFields.length - 2)
                    errorMessage += ", ";
                else if (i == emptyFields.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s). <br>";
        }
        if (invalidNames.length > 0) {
            errorMessage += "The value you entered in the ";
            for (var i=0;i < invalidNames.length; i++) {
                errorMessage += invalidNames[i];
                if (i < invalidNames.length - 2)
                    errorMessage += ", ";
                else if (i == invalidNames.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s) are invalid. <br>";
        }
        if (duplicateEmail == true) {
            errorMessage += "There is already a user registered with this email address. <br>";
        }
        if (passwordsMatch != true) {
            errorMessage += "The passwords you have entered do not match. Please try again.";
        }
        // Create alert for the user
        alertActivator("register", "danger", errorMessage, false);

        // Make all valid inputs (inputs that aren't in the totalError array) green (class has-success)
        var allInputGroups = ["#firstNameRegisterGroup", "#lastNameRegisterGroup", "#emailRegisterGroup", "#passwordRegisterGroup", "#phoneNumberRegisterGroup", "#postcodeRegisterGroup"];
        $.each(allInputGroups, function(index, value) {
            if ($.inArray(value, totalErrors) == -1) {
                $( value ).addClass( "has-success" );
            }
        });

    }
}

// The function processSettings will validate the inputted data on the Registration form
function processSettings() {
    // Reset any previous validation attempts
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");
    // Declaring some variables that can help keep track of the validation progress
    var validationPassed = true,
        totalErrors = [],
        invalidNames = [],
        duplicateEmail = false,
        existingUsers = JSON.parse(localStorage.users), // Convert the users JSON string in to a JS object so that it can be searched for duplicate users
        lwrEmailAddress = $('#emailSettings').val().toLowerCase(), // Make the email address lowercase, so that it can be used to check for existing records
        emptyFields = [];
    // check to see whether each field has been left empty, if so, make the input glow red (class has-error), add it to the emptyFields array and the totalErrors array (used to check at the end which fields have failed validation)
    if ($('#firstNameSettings').val() == '') {
        $("#firstNameSettingsGroup").addClass("has-error");
        emptyFields.push("First Name");
        totalErrors.push("#firstNameSettings");
        validationPassed = false;
    }
    if ($('#lastNameSettings').val() == '') {
        $("#lastNameSettingsGroup").addClass("has-error");
        emptyFields.push("Last Name");
        totalErrors.push("#lastNameSettings");
        validationPassed = false;
    }
    if (lwrEmailAddress == '') {
        $("#emailSettingsGroup").addClass("has-error");
        emptyFields.push("Email Address");
        totalErrors.push("#emailSettings");
        validationPassed = false;
    }
    if ($('#postcodeSettings').val() == '') {
        $("#postcodeSettingsGroup").addClass("has-error");
        emptyFields.push("Postcode");
        totalErrors.push("#postcodeSettings");
        validationPassed = false;
    }

    // check to see whether the firstName/lastName/email/phoneNumber(if entered) inputs match a regex expression to check data validity, if not, make the input glow red (class has-error), add it to the invalidNames array and the totalErrors array (used to check at the end which fields have failed validation)
    if (!(/^[-'a-zA-Z ]*$/.test($('#firstNameSettings').val()))) {
        $("#firstNameSettingsGroup").addClass("has-error");
        invalidNames.push("First Name");
        totalErrors.push("#firstNameSettingsGroup");
        validationPassed = false;
    }
    if (!(/^[-'a-zA-Z ]*$/.test($('#lastNameSettings').val()))) {
        $("#lastNameSettingsGroup").addClass("has-error");
        invalidNames.push("Last Name");
        totalErrors.push("#lastNameSettings");
        validationPassed = false;
    }
    if (!(/^[\w-\.]{1,64}@([\w-]+\.){1,255}[\w-]{2,4}$/.test(lwrEmailAddress))) {
        $("#emailSettingsGroup").addClass("has-error");
        invalidNames.push("Email Address");
        totalErrors.push("#emailSettingsGroup");
        validationPassed = false;
    }
    if ((!(/(\+44|0)\d{10}/.test($('#phoneSettings').val()))) && ($('#phoneSettings').val() != '')) {
        $("#phoneNumberSettingsGroup").addClass("has-error");
        invalidNames.push("UK Phone Number");
        totalErrors.push("#phoneNumberSettingsGroup");
        validationPassed = false;
    }
    // Check the validity of the post code, if it is not true then make the input glow red (class has-error), add it to the invalidNames array and the totalErrors array (used to check at the end which fields have failed validation)
    if (!validatePostcode($('#postcodeSettings').val())) {
        $("#postcodeSettingsGroup").addClass("has-error");
        invalidNames.push("Postcode");
        totalErrors.push("#postcodeSettings");
        validationPassed = false;
    }
    // See if the email address is already registered (by searching through each existing users email address)
    for (var i = 0; i < existingUsers.length; i += 1) {
        if ((existingUsers[i].emailAddress == lwrEmailAddress) && (sessionStorage.currentEmail != lwrEmailAddress)) {
            duplicateEmail = true;
            validationPassed = false;
        }
        // if it is then, make the input glow red (class has-error) and add it to the totalErrors array (used to check at the end which fields have failed validation)
        if (duplicateEmail == true) {
            $( "#emailSettingsGroup" ).addClass( "has-error" );
            totalErrors.push("#emailSettingsGroup");
        }
    }

    // Validate that the 2 passwords entered match (I am currently not enforcing any password rules other than NOT empty!), if not, make the input glow red (class has-error), add it to the totalErrors array (used to check at the end which fields have failed validation)
    var passwordsMatch = true;
    if ($('#passwordSettings').val() != $('#confirmPasswordSettings').val()) {
        $( "#passwordSettingsGroup" ).addClass( "has-error" );
        passwordsMatch = false;
        totalErrors.push("#passwordSettings");
        validationPassed = false;
    }

    // Finally, if there has been an error, display a message, otherwise generate a Salt and a hash and then add the user.
    if (validationPassed) {
        var passwordHash,
            salt;

        // I have allowed the facility for the password field to be left empty, in order to keep the existing password. This therefore fetches the existing password if it is left blank, otherwise it will take the users input and update the password.
        if ($('#passwordSettings').val() == '') {
            passwordHash = existingUsers[sessionStorage.currentArrayPosition].passwordHash;
            salt = existingUsers[sessionStorage.currentArrayPosition].passwordSalt;

        } else {
            // Generate a 4 CHAR SALT
            salt = "";
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@£$%";
            for(var i=0; i < 4; i++ )
                salt += charset.charAt(Math.floor(Math.random() * charset.length));
            passwordHash = $.md5(salt + $('#passwordSettings').val());
        }
        // now update the user
        editUser($('#firstNameSettings').val(), $('#lastNameSettings').val(), $('#emailSettings').val(), salt, passwordHash, $('#phoneSettings').val(), $('#postcodeSettings').val(), $("#publicScoresSettings").is(':checked'));

        // Hide the settings modal
        $('#settingsModal').modal('hide');
        // clear any validation alerts in settings
        $('.alert.settings').hide();
        // reload the new settings in to the form in case the user wants to make any more adjustments
        resetSettings();
        // Alert the user that their new settings have saved
        alertActivator("main", "success", "New settings saved!", true)
    } else { // If Validation failed, check the status of the various validation checks and display the relevant errors (with correct grammer)
        var errorMessage = "";
        if (emptyFields.length > 0) {
            errorMessage += "Please complete the ";
            for (var i=0;i < emptyFields.length; i++) {
                errorMessage += emptyFields[i];
                if (i < emptyFields.length - 2)
                    errorMessage += ", ";
                else if (i == emptyFields.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s). <br>";
        }
        if (invalidNames.length > 0) {
            errorMessage += "The value you entered in the ";
            for (var i=0;i < invalidNames.length; i++) {
                errorMessage += invalidNames[i];
                if (i < invalidNames.length - 2)
                    errorMessage += ", ";
                else if (i == invalidNames.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s) are invalid. <br>";
        }
        if (duplicateEmail == true) {
            errorMessage += "There is already a user registered with this email address. <br>";
        }
        if (passwordsMatch != true) {
            errorMessage += "The passwords you have entered do not match. Please try again.";
        }
        // Create alert for the user
        alertActivator("settings", "danger", errorMessage, false);

        // Make all valid inputs (inputs that aren't in the totalError array) green (class has-success)
        var allInputGroups = ["#firstNameSettingsGroup", "#lastNameSettingsGroup", "#emailSettingsGroup", "#passwordSettingsGroup", "#phoneNumberSettingsGroup", "#postcodeSettingsGroup"];
        $.each(allInputGroups, function(index, value) {
            if ($.inArray(value, totalErrors) == -1) {
                $( value ).addClass( "has-success" );
            }
        });

    }
}

// The function editUser will update the users details in Local Storage
function editUser(firstName, lastName, emailAdr, pwdSalt, pwdHash, phoneNumber, postcode, postScores) {
    var usersObj = JSON.parse(localStorage.users), // convert the JSON string in to a JS object
        arrayPos = sessionStorage.currentArrayPosition; // get the array position of the user to update from Session Storage
    // Update the details in the object
    usersObj[arrayPos].firstName = firstName;
    usersObj[arrayPos].lastName = lastName;
    usersObj[arrayPos].emailAddress = emailAdr;
    usersObj[arrayPos].passwordSalt = pwdSalt;
    usersObj[arrayPos].passwordHash = pwdHash;
    usersObj[arrayPos].phoneNumber = phoneNumber;
    usersObj[arrayPos].postcode = postcode;
    usersObj[arrayPos].saveScore = postScores;

    localStorage.users = JSON.stringify(usersObj); // Convert the Object back in to a JSON string and save it back in localstorage
    // Update the session storage with the new data
    sessionStorage.currentEmail = emailAdr;
    sessionStorage.currentFirstName = firstName;
    sessionStorage.currentLastName = lastName;
    sessionStorage.currentPostToScores = postScores;
    checkLoginStatus(); //To update the name in navBar if required
}

// The function resetSettings will initialise the settings data in the settings input boxes
function resetSettings() {
    var usersObj = JSON.parse(localStorage.users), // convert the JSON string in to a JS object
        arrayPos = sessionStorage.currentArrayPosition; // get the array position of the user to update from Session Storage

    $('#firstNameSettings').val(sessionStorage.currentFirstName);
    $('#lastNameSettings').val(sessionStorage.currentLastName);
    $('#emailSettings').val(sessionStorage.currentEmail);
    $('#confirmPasswordSettings').val('');
    $('#passwordSettings').val('');
    $('#phoneSettings').val(usersObj[arrayPos].phoneNumber);
    $('#postcodeSettings').val(usersObj[arrayPos].postcode);

    if (sessionStorage.currentPostToScores == "true") 
        $('#publicScoresSettings').bootstrapSwitch('state', true);
    else
        $('#publicScoresSettings').bootstrapSwitch('state', false);
}

// The function processSignIn will validate the inputted data on the sign in form
function processSignIn() {
    // Reset any previous validation attempts
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");
    var userAuthenticated = false,
        existingUsers = JSON.parse(localStorage.users); // convert the JSON users into a JS object
    for (var i = 0; i < existingUsers.length; i++) { // Get the value of email address and find it in the user array
        if (existingUsers[i].emailAddress == $('#emailSignIn').val().toLowerCase()) { // if the email address is found
            if (existingUsers[i].passwordHash == ($.md5(existingUsers[i].passwordSalt + $('#passwordSignIn').val()))) { // and the password matches
                // set session storage data
                sessionStorage.signedIn = true;
                sessionStorage.currentArrayPosition = i;
                sessionStorage.currentEmail = existingUsers[i].emailAddress;
                sessionStorage.currentFirstName = existingUsers[i].firstName;
                sessionStorage.currentId = existingUsers[i].id;
                sessionStorage.currentLastName = existingUsers[i].lastName;
                sessionStorage.currentPostToScores = existingUsers[i].saveScore;
                sessionStorage.highScore = existingUsers[i].highScore;
                checkLoginStatus(); // update the nav bar to the signed in version
                // let the user know they are signed in
                alertActivator("main", "success", "You have successfuly signed in.", true);
                // Hide the sign in modal
                $('#signInModal').modal('hide');
                // set user as authenticated (local variable so that it skips producing login error)
                userAuthenticated = true;
                // Clear the inputs for the next user
                $("#signInForm").trigger('reset');
                // update the settings fields with the signed in users details, ready for editing.
                resetSettings();

            }
        }
    }

    if (userAuthenticated == false && $('#emailSignIn').val() == "") { // if the user didn't enter an email address
        $("#signInGroup").addClass("has-error"); // make the inputs glow red
        alertActivator("signIn", "danger", "Please enter an email address", false); // alert the user that they didn't enter an email address
    }
    else if (userAuthenticated == false && $('#passwordSignIn').val() == "") { // if the user didn't enter a password
        $("#signInGroup").addClass("has-error"); // make the inputs glow red
        alertActivator("signIn", "danger", "Please enter a password", false); // alert the user that they didn't enter a password
    }
    else if (userAuthenticated == false ) { // if the user didn't enter a matching email/password
        $("#signInGroup").addClass("has-error"); // make the inputs glow red
        alertActivator("signIn", "danger", "Incorrect email/password combination", false); // alert the user that they didn't enter the correct credentials (not too specific for security reasons)
    }

}

// The function alertActivator will create an alert to notify the user of an action 
function alertActivator(location, type, message, closable) {
    if (closable == true) 
        $('#'+location+'Alert').html('<div class="alert alert-'+type+' alert-dismissible fade in '+location+'" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +message+'</div>');
    else
        $('#'+location+'Alert').html('<div class="alert alert-'+type+' fade in '+location+'" role="alert">'+message+'</div>');
}

// The function activateNavButton will add 'active' class to called button and remove 'active' class from other buttons
function activateNavButton(buttonID) {
    $( ".active" ).removeClass( "active" );
    $( "#"+buttonID ).addClass( "active" );
}

// The function validatePostcode will check the validity of the inputted postcode
function validatePostcode(postcode) {
    // Declare variable in scope of the function
    var result;
    // Strip/Sanatize any non alpha-numeric characters from the postcode (as it will be used inside a URL in the GET request)
    postcode = postcode.replace(/\W/g, '');
    // see if postcode is empty (after removing any non numerical characters)
    if (postcode == '')
        return false;
    // Form and store the URL to use in the get request
    var validationURL = "http://api.postcodes.io/postcodes/" + postcode + "/validate";
    // Create an ajax request that fires a get request to the API
    $.ajax({
        type: 'GET',
        url: validationURL,
        dataType: 'json',
        // 
        success: function( data ) {
            // Store the validity result from the API in a variable
            result = data.result;
        },
        data: {},
        // I have made it synchronous in order to easily access the variable outside of the ajax request
        async: false
    });
    // Return the result
    return result;
}

// The function checkLoginStatus can be called to check login status and show the appropriate navigation items
function checkLoginStatus() {
    if (sessionStorage.signedIn == "true") {
        // Fetch the name of the current user and add it to the Navigation Bar Display
        $("#navUserNameDisplay").html(sessionStorage.currentFirstName);

        // Display the 'signed in' version of the navigation bar (and hide the guest version)if the user is signed in and vice versa
        $("#guestNavButton").hide();
        $("#signedInNavButton").show();
        // Redraw the top data to show the users stats
        initGame();
    } else {
        $("#guestNavButton").show();
        $("#signedInNavButton").hide();
    }
}

// The addUser function will add a user to local storage (after the data has been validated)
function addUser(firstName, lastName, emailAdr, pwdSalt, pwdHash, phoneNumber, postcode, postScores) {
    // parse existing JSON array into an object
    var usersObj = JSON.parse(localStorage.users);
    var newUserObj = {
        id: localStorage.nextID,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAdr,
        passwordSalt: pwdSalt,
        passwordHash: pwdHash,
        phoneNumber: phoneNumber,
        postcode: postcode,
        saveScore: postScores,
        highScore: 0,
    };
    // add the new user to the usersObj
    usersObj.push(newUserObj);
    localStorage.users = JSON.stringify(usersObj);
    localStorage.nextID = parseInt(localStorage.nextID) + 1;
}

// The saveScore function will save a score to local storage
function saveScore(score) {
    // parse existing JSON array into an object
    var scoresObj = JSON.parse(localStorage.scores);
    var newScoreObj = {
        userId: sessionStorage.currentId,
        name: sessionStorage.currentFirstName +" "+sessionStorage.currentLastName,
        score: score
    };
    // add the new score to the scoresObj
    scoresObj.push(newScoreObj);
    localStorage.scores = JSON.stringify(scoresObj);
}

// The deleteCurrentUser function will delete a user from local storage
function deleteCurrentUser() {
    var usersObj = JSON.parse(localStorage.users); // parse existing JSON array into an object
    usersObj.splice(sessionStorage.currentArrayPosition, 1); //delete the user from the array
    localStorage.users = JSON.stringify(usersObj); // update the Local Storage JSON data
    deleteScores(); // Delete the deled users scores
    resetSessionStorage(); // Clear session storage
    checkLoginStatus(); // update the Nav bar back to the guest version
    // Hide all of the modals
    $('.modal').modal('hide');
    // Alert the user
    alertActivator("main", "danger", "Your account has been deleted", true);
}

// The deleteScores function will delete the currently signed in users scores from the scoreboard
function deleteScores() {
    var existingScoresObj = JSON.parse(localStorage.scores), // Parse the scores into a JS object
        newScoresObj = [];

    // Find the scores that don't belong to the deleted user and copy them into a new object
    for (var i = 0; i < existingScoresObj.length; i++ ) {
        if (existingScoresObj[i].userId != sessionStorage.currentId) {
            newScoresObj.push(existingScoresObj[i]);
        }
    }

    // update local storage with the new object
    localStorage.scores = JSON.stringify(newScoresObj);
    // hide the delete scores modal
    $('#deleteScoresModal').modal('hide');
    // alert the user
    alertActivator("settings", "success", "Scores Deleted!", true);

}

// The displayScores function will sort and display the scores on the 'Scores' modal
function displayScores() {
    var scoresObj = JSON.parse(localStorage.scores), // Parse the scores into a JS object
        counter = 0;
    // Sort the scores in decending order
    scoresObj.sort(function(no1, no2){ 
        return no2.score - no1.score
    });
    // clear any data currently displayed on the scoreboard
    $("#scoresTableBody").empty();
    // Add the top 10 scores to the score board
    $.each(scoresObj, function( index, value ) {
        if (counter < 10) {
            $("#scoresTableBody").append("<tr><td>"+value.name+"</td><td>"+value.score+"</td></tr>");
            counter++;
        }
    });

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
        $('.alert').hide();
        alertActivator("main", "success", "You have successfully signed out!", true);
        // Restart the game
        initGame();
    });
    // When the each button is pressed ->  add 'active' class and remove 'active' class from other buttons and Pause tbe game if a modal is opened
    $( "#playButton" ).click(function() {
        activateNavButton("playButton");
    });
    $( "#scoresButton" ).click(function() {
        activateNavButton("scoresButton");
        displayScores();
        if (gameOverState == false)
            pause();
    });
    $( "#guestNavButton" ).click(function() {
        activateNavButton("guestNavButton");
        if (gameOverState == false)
            pause();
    });
    $( "#settingsButton" ).click(function() {
        activateNavButton("signedInNavButton");
        resetSettings();
        if (gameOverState == false)
            pause();
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

    // Initialise the game
    initGame();


});