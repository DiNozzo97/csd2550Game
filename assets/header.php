<!-- Header -->
	<!-- NAVIGATION BAR -->

		<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="./"><img src="./img/title-logo-trans-small.png" alt="Tetris Logo"></a>
		    </div><!-- /.navbar-header -->

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="main-navbar">
		      <ul class="nav navbar-nav navbar-right">
		        <li <?php if ((stripos($_SERVER['REQUEST_URI'],'index.php') !== false) OR (substr($_SERVER['REQUEST_URI'], -1) == "/")) {echo 'class="active"';} ?> ><a href="./">Play<?php if (stripos($_SERVER['REQUEST_URI'],'index.php') !== false) {echo '<span class="sr-only">(current)</span>';} ?></a></li>

				<li <?php if (stripos($_SERVER['REQUEST_URI'],'book.php') !== false) {echo 'class="active"';} ?> ><a href="./book.php">Scores<?php if (stripos($_SERVER['REQUEST_URI'],'book.php') !== false) {echo '<span class="sr-only">(current)</span>';} ?></a></li>
		      </ul>
		     
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
