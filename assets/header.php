<!-- Header -->
		<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">
		<link rel="icon" href="./favicon.ico" type="image/x-icon">
		<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
		<link rel="stylesheet" type="text/css" href="css/styles.css">
	</head>
	<body>
	<!-- NAVIGATION BAR -->

		<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-navbar" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="./"><img src="./img/title-logo-trans-small.png" alt="Tetris Logo"></a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="main-navbar">
		      <ul class="nav navbar-nav navbar-right">
		        <li <?php if ((stripos($_SERVER['REQUEST_URI'],'index.php') !== false) OR (substr($_SERVER['REQUEST_URI'], -1) == "/")) {echo 'class="active"';} ?> ><a href="./">Home<?php if (stripos($_SERVER['REQUEST_URI'],'index.php') !== false) {echo '<span class="sr-only">(current)</span>';} ?></a></li>
				<li <?php if (stripos($_SERVER['REQUEST_URI'],'book.php') !== false) {echo 'class="active"';} ?> ><a href="./book.php">Book a Technician<?php if (stripos($_SERVER['REQUEST_URI'],'book.php') !== false) {echo '<span class="sr-only">(current)</span>';} ?></a></li>
		      </ul>
		     
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
