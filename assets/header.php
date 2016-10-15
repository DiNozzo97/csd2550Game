<!-- Header -->
<!-- NAVIGATION BAR -->

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="./"><img id="logo" src="./img/logo-small-static.gif" alt="Tetris Logo"></a>
        </div><!-- /.navbar-header -->

        <!-- Navigation Buttons -->

        <div class="collapse navbar-collapse" id="main-navbar">
            <ul class="nav navbar-nav navbar-right">

                <!-- Play Link (Returns Home) -->
                <li><a href="./">Play</a></li>

                <!-- Scores Link -->
                <li><a href="#" data-toggle="modal" data-target="#myModal">Scores</a></li>

                <!-- Sign In/Register Link (displayed in guest mode) -->
                <li id="guestNavButton"><a href="#" data-toggle="modal" data-target="#myModal">Sign In/Register</a></li>

                <!-- User Preferences/SignOut button (displayed when a user is signed in) -->
                <li id="signedInNavButton" class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Welcome <span id="navUserNameDisplay"></span> <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="#">Settings</a></li>
                        <li class="divider"></li>
                        <li><a id="signOutButton" href="#">Sign Out</a></li>
                    </ul>
                </li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
