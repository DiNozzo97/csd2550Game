// The function resetSessionStorage removes the data of the previously signed in user and resets each value to the default load value
function resetSessionStorage() {
    sessionStorage.signedIn = "false";
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
    var validationPassed = true,
        totalErrors = [],
        invalidNames = [],
        duplicateEmail = false,
        existingUsers = JSON.parse(localStorage.users),
        lwrEmailAddress = $('#emailRegister').val().toLowerCase(), // Make the email address lowercase, so that it can be used to check for existing records
        emptyFields = [];
    // Check to see that all of the fields have been filled in
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

    // Validate the firstName/lastName/email
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
    // See if the email address already exists 
    for (i = 0; i < existingUsers.length; i += 1) {
        if (existingUsers[i].emailAddress == lwrEmailAddress) {
            duplicateEmail = true;
            validationPassed = false;
        }
        if (duplicateEmail == true) {
            $( "#emailRegisterGroup" ).addClass( "has-error" );
            totalErrors.push("#emailRegisterGroup");
        }
    }

    // Validate that the 2 passwords entered match (I am currently not enforcing any password rules other than NOT empty!)
    var passwordsMatch = true;
    if ($('#passwordRegister').val() != $('#confirmPasswordRegister').val()) {
        $( "#passwordRegisterGroup" ).addClass( "has-error" );
        passwordsMatch = false;
        totalErrors.push("#passwordRegister");
        validationPassed = false;
    }

    // Finally, if there has been an error, display a message, otherwise generate a Salt and a hash and then add the user.
    if (validationPassed) {
        // Generate a 4 CHAR SALT
        var salt = "";
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@£$%";
        for( i=0; i < 4; i++ )
            salt += charset.charAt(Math.floor(Math.random() * charset.length));
        addUser($('#firstNameRegister').val(), $('#lastNameRegister').val(), lwrEmailAddress, salt, $.md5(salt + $('#passwordRegister').val()), $("#publicScoresRegister").is(':checked'));
        $('#registerModal').modal('hide');
        alertActivator("signIn", "success", "You have successfully registered your account, sign in below:", true)
        $("#registerForm").trigger('reset');
    } else { // If Validation failed
        var errorMessage = "";
        if (emptyFields.length > 0) {
            errorMessage += "Please complete the ";
            for (i=0;i < emptyFields.length; i++) {
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
            for (i=0;i < invalidNames.length; i++) {
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

        // Make all valid inputs green
        var allInputGroups = ["#firstNameRegisterGroup", "#lastNameRegisterGroup", "#emailRegisterGroup", "#passwordRegisterGroup"];
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
    var validationPassed = true,
        totalErrors = [],
        invalidNames = [],
        duplicateEmail = false,
        existingUsers = JSON.parse(localStorage.users),
        lwrEmailAddress = $('#emailSettings').val().toLowerCase(), // Make the email address lowercase, so that it can be used to check for existing records
        emptyFields = [];
    // Check to see that all of the fields have been filled in
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

    // Validate the firstName/lastName/email
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
    // See if the email address already exists 
    for (i = 0; i < existingUsers.length; i += 1) {
        if ((existingUsers[i].emailAddress == lwrEmailAddress) && (sessionStorage.currentEmail != lwrEmailAddress)) {
            duplicateEmail = true;
            validationPassed = false;
        }
        if (duplicateEmail == true) {
            $( "#emailSettingsGroup" ).addClass( "has-error" );
            totalErrors.push("#emailSettingsGroup");
        }
    }

    // Validate that the 2 passwords entered match (I am currently not enforcing any password rules other than NOT empty!)
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

        if ($('#passwordSettings').val() == '') {
            passwordHash = existingUsers[sessionStorage.currentArrayPosition].passwordHash;
            salt = existingUsers[sessionStorage.currentArrayPosition].passwordSalt;

        } else {
            // Generate a 4 CHAR SALT
            salt = "";
            var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@£$%";
            for( i=0; i < 4; i++ )
                salt += charset.charAt(Math.floor(Math.random() * charset.length));
            passwordHash = $.md5(salt + $('#passwordSettings').val());
        }
        editUser($('#firstNameSettings').val(), $('#lastNameSettings').val(), $('#emailSettings').val(), salt, passwordHash, $("#publicScoresSettings").is(':checked'));

        $('#settingsModal').modal('hide');
        $('.alert.settings').hide();
        resetSettings();
        alertActivator("main", "success", "New settings saved!", true)
    } else { // If Validation failed
        var errorMessage = "";
        if (emptyFields.length > 0) {
            errorMessage += "Please complete the ";
            for (i=0;i < emptyFields.length; i++) {
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
            for (i=0;i < invalidNames.length; i++) {
                errorMessage += invalidNames[i];
                if (i < invalidNames.length - 2)
                    errorMessage += ", ";
                else if (i == invalidNames.length - 2)
                    errorMessage += " and ";
            }
            errorMessage += " field(s) are invalid. <br>";
        }
        if (duplicateEmail == true) {
            errorMessage += "There is already a user Settingsed with this email address. <br>";
        }
        if (passwordsMatch != true) {
            errorMessage += "The passwords you have entered do not match. Please try again.";
        }
        // Create alert for the user
        alertActivator("settings", "danger", errorMessage, false);

        // Make all valid inputs green
        var allInputGroups = ["#firstNameSettingsGroup", "#lastNameSettingsGroup", "#emailSettingsGroup", "#passwordSettingsGroup"];
        $.each(allInputGroups, function(index, value) {
            if ($.inArray(value, totalErrors) == -1) {
                $( value ).addClass( "has-success" );
            }
        });

    }
}

function editUser(firstName, lastName, emailAdr, pwdSalt, pwdHash, postScores) {
    var usersObj = JSON.parse(localStorage.users),
        arrayPos = sessionStorage.currentArrayPosition;
    usersObj[arrayPos].firstName = firstName;
    usersObj[arrayPos].lastName = lastName;
    usersObj[arrayPos].emailAddress = emailAdr;
    usersObj[arrayPos].passwordSalt = pwdSalt;
    usersObj[arrayPos].passwordHash = pwdHash;
    usersObj[arrayPos].saveScore = postScores;
    localStorage.users = JSON.stringify(usersObj);
    sessionStorage.currentEmail = emailAdr;
    sessionStorage.currentFirstName = firstName;
    sessionStorage.currentLastName = lastName;
    sessionStorage.currentPostToScores = postScores;
    checkLoginStatus(); //To update the name in navBar if required
}

// The function resetSettings will initialise the settings data in the input boxs
function resetSettings() {
    $('#firstNameSettings').val(sessionStorage.currentFirstName);
    $('#lastNameSettings').val(sessionStorage.currentLastName);
    $('#emailSettings').val(sessionStorage.currentEmail);
    $('#confirmPasswordSettings').val('');
    $('#passwordSettings').val('');
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
        existingUsers = JSON.parse(localStorage.users);
    // Get the value of email address and find it in the user array
    for (i = 0; i < existingUsers.length; i += 1) {
        if (existingUsers[i].emailAddress == $('#emailSignIn').val().toLowerCase()) {
            if (existingUsers[i].passwordHash == ($.md5(existingUsers[i].passwordSalt + $('#passwordSignIn').val()))) {
                sessionStorage.signedIn = true;
                sessionStorage.currentArrayPosition = i;
                sessionStorage.currentEmail = existingUsers[i].emailAddress;
                sessionStorage.currentFirstName = existingUsers[i].firstName;
                sessionStorage.currentId = existingUsers[i].id;
                sessionStorage.currentLastName = existingUsers[i].lastName;
                sessionStorage.currentPostToScores = existingUsers[i].saveScore;
                sessionStorage.highScore = existingUsers[i].highScore;
                checkLoginStatus();
                alertActivator("main", "success", "You have successfuly signed in.", true);
                $('#signInModal').modal('hide');
                userAuthenticated = true;
                $("#signInForm").trigger('reset');
                resetSettings();
            }
        }
    }
    if (userAuthenticated == false) {
        $("#signInGroup").addClass("has-error");
        alertActivator("signIn", "danger", "Incorrect email/password combination", false);
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
    var newUserObj = {
        id: localStorage.nextID,
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAdr,
        passwordSalt: pwdSalt,
        passwordHash: pwdHash,
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
    var usersObj = JSON.parse(localStorage.users);
    usersObj.splice(sessionStorage.currentArrayPosition, 1);
    localStorage.users = JSON.stringify(usersObj);
    deleteScores();
    resetSessionStorage();
    checkLoginStatus();
    $('.modal').modal('hide');
    alertActivator("main", "danger", "Your account has been deleted", true);
}

// The deleteScores function will delete the currently signed in users scores from the scoreboard
function deleteScores() {
    var existingScoresObj = JSON.parse(localStorage.scores),
        newScoresObj = [];


    for (i = 0; i < existingScoresObj.length; i++ ) {
        if (existingScoresObj[i].userId != sessionStorage.currentId) {
            newScoresObj.push(existingScoresObj[i]);
        }
    }

    localStorage.scores = JSON.stringify(newScoresObj);
    $('#deleteScoresModal').modal('hide');
    alertActivator("settings", "success", "Scores Deleted!", true);

}

// The displayScores function will sort and display the scores on the 'Scores' modal
function displayScores() {
    var scoresObj = JSON.parse(localStorage.scores),
        counter = 0;
    scoresObj.sort(function(no1, no2){
        return no2.score - no1.score
    });
    $("#scoresTableBody").empty();
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
    });
    // When the each button is pressed ->  add 'active' class and remove 'active' class from other buttons
    $( "#playButton" ).click(function() {
        activateNavButton("playButton");
    });
    $( "#scoresButton" ).click(function() {
        activateNavButton("scoresButton");
        displayScores();
    });
    $( "#guestNavButton" ).click(function() {
        activateNavButton("guestNavButton");
    });
    $( "#settingsButton" ).click(function() {
        activateNavButton("signedInNavButton");
        resetSettings();
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

    initGame();


});

// Detect Key Presses
$( document ).keydown(function(event) {
    switch (event.which) {
        case 37: 
            console.log("Left Arrow");
            break;
        case 38: 
            console.log("Up Arrow");
            break;
        case 39: 
            console.log("Right Arrow");
            break;
        case 40: 
            console.log("Down Arrow");
            break;
    }
});