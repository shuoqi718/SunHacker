<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Title -->
        <title>Welcome to SunHacker</title>
    
        <!-- Required Meta Tags Always Come First -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
    
        <!-- Favicon -->
        <link rel="shortcut icon" href="favicon.ico">
    
        <!-- Google Fonts -->
        <link href="//fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800" rel="stylesheet">
    
        <!-- CSS Global Compulsory -->
        <link rel="stylesheet" href="assets/vendor/bootstrap/bootstrap.min.css">
    
        <!-- CSS Implementing Plugins -->
        
    
        <!-- CSS Template -->
        <link rel="stylesheet" href="assets/css/styles.op-agency.css">
    
        <!-- CSS Customization -->
        <link rel="stylesheet" href="assets/css/custom.css">
    <!-- Bootstrap core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom fonts for this template -->
    <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="vendor/simple-line-icons/css/simple-line-icons.css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet">

    <!-- Custom styles for this template -->
    <!-- <link href="css/new-age.min.css" rel="stylesheet"> -->
    <link href="css/new-age.css" rel="stylesheet">
    <link rel="stylesheet" href="css/jquery-ui-1.12.1/jquery-ui.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/uvplanner.css">

  </head>

  <body id="page-top">

    <<header id="js-header" class="u-header u-header--sticky-top u-header--toggle-section u-header--change-appearance" data-header-fix-moment="300">
        <div class="u-header__section u-header__section--dark g-bg-black-opacity-0_4 g-transition-0_3 g-py-10" data-header-fix-moment-exclude="g-bg-black-opacity-0_4 g-py-10" data-header-fix-moment-classes="g-bg-black-opacity-0_7 g-py-0">
          <nav class="navbar navbar-expand-lg">
            <div class="container">
              <!-- Responsive Toggle Button -->
              <button class="navbar-toggler navbar-toggler-right btn g-line-height-1 g-brd-none g-pa-0 g-pos-abs g-top-3 g-right-0" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="navBar" data-toggle="collapse" data-target="#navBar">
                <span class="hamburger hamburger--slider">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
                </span>
                </span>
              </button>
              <!-- End Responsive Toggle Button -->
    
              <!-- Logo -->
              <a href="#!" class="js-go-to navbar-brand u-header__logo"
              data-type="static">
              <a class="navbar-brand js-scroll-trigger" href="index.html" style="text-shadow:0px 0px 15px orange;"> SunHacker</a>
           </a>
              <!-- End Logo -->
    
              <!-- Navigation -->
              <div class="collapse navbar-collapse align-items-center flex-sm-row g-pt-10 g-pt-5--lg" id="navBar">
                <ul class="navbar-nav text-uppercase g-font-weight-600 ml-auto">
                  <li class="nav-item g-mx-20--lg">
                    <a href="index.html" class="nav-link px-0">Home
                        
                  
                </a>
                  </li>
                  <li class="nav-item g-mx-20--lg">
                    <a href="whatisuv.html" class="nav-link px-0">Learning-Studio
                  
                </a>
                  </li>
                  <li class="nav-item g-mx-20--lg active">
                    <a href="currentuvi.html" class="nav-link px-0">Current-UVI
               
                </a>
                  </li>
                  <li class="nav-item g-mx-20--lg">
                    <a href="uvcompare.html" class="nav-link px-0">Visual-Comparison
                  
                </a>
                  </li>
                  <li class="nav-item g-mx-20--lg">
                    <a href="riskassess.html" class="nav-link px-0">Risk-Calculator
                  
                </a>
                  </li>
                  <li class="nav-item g-ml-20--lg g-mr-0--lg">
                    <a href="clinic.html" class="nav-link px-0 active">Clinic-Finder
                        <span class="sr-only">(current)</span>
                  
                </a>
                  </li>
                </ul>
              </div>
              <!-- End Navigation -->
            </div>
          </nav>
        </div>
      </header>


      <section id="planner">
        <div class="container text-center" style="margin-bottom: 100px;">
          <h3>Make your own activity planner</h3>
        </div>
        <div class="container">
          <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="progress"></div>
          </div>
        </div>
        <div class="container card card-custom" style="height: 500px; margin-top: 100px;" id="planner-content">
          <div class="row justify-content-center text-center custom" id="0">
            <h3>Instructions</h3>
            <div class="card-body">
              You can use this tool to make your plan of your future activities within 7 days. Please follow the instruction and we will provide you a detailed information and suggestions about your activity.<br><br>
            </div>
            <div class="text-center" style="margin-top: 50px;">
                <button class="btn btn-primary" id="start">Start</button>
            </div>
          </div>
          <div class="row justify-content-center text-center custom hidden" id="1">
            <h3 class="w-100">1. Please pick the date of activity</h3>
            <div class="form-group custom w-100" style="margin-top: 50px;">
              <input type="text" class="form-control w-50" id="datepicker">
            </div>
            <div class="text-center" style="margin-top: 50px;">
                <button class="btn btn-primary" id="date">Continue</button>
            </div>
          </div>
          <div class="row justify-content-center text-center custom hidden" id="2">
            <h3 class="w-100">2. Please select the type of activity</h3>
            <div class="form-group custom" style="margin-top: 50px;">
              <select class="form-control" id="activity">
                <option value="0">Please select an activity</option>
                <option value="hiking">Hiking</option>
                <option value="swimming">Swimming</option>
                <option value="sunshine">Beach Sunshine</option>
              </select>
            </div>
          </div>
          <div class="row justify-content-center text-center custom hidden" id="3">
            <h3 class=" w-100">Here is our suggestions:</h3>
            <p>The uv index at that day is <span id="uv-index"></span>. The risk is <span id="risk-level"></span>.</p>
            <p class="w-100">Please provide your email address to send your emails about our suggestions. (We will not collect your email address)</p>
            <input type="email" id="email-address" placeholder="Please enter your email">
            <br>
            <button class="btn btn-primary" id="send-email">Submit</button>
          </div>
        </div>
      </section>


      <footer class="text-center">
        

          <div class="g-color-gray-dark-v5 g-theme-bg-gray-dark-v2  g-py-30 g-py-70--md">
            <a class="d-inline-block g-mb-30" href="/">
              <img class="img-fluid g-width-100" src="img/logo.png" alt="Image description">
            </a>
   
            <ul class="list-inline text-uppercase g-font-weight-700 g-font-size-11 mb-0">
              <li class="list-inline-item g-px-12--md">
                <a class="g-color-white-opacity-0_7 g-color-white--hover g-text-underline--none--hover" href="#!">About</a>
              </li>
              <li class="list-inline-item g-px-12--md">
                <a class="g-color-white-opacity-0_7 g-color-white--hover g-text-underline--none--hover" href="#!">Why we</a>
              </li>
              <li class="list-inline-item g-px-12--md">
                <a class="g-color-white-opacity-0_7 g-color-white--hover g-text-underline--none--hover" href="#!">Services</a>
              </li>
              <li class="list-inline-item g-px-12--md">
                <a class="g-color-white-opacity-0_7 g-color-white--hover g-text-underline--none--hover" href="#!">Team</a>
              </li>
              <li class="list-inline-item g-px-12--md">
                <a class="g-color-white-opacity-0_7 g-color-white--hover g-text-underline--none--hover" href="#!">Contact</a>
              </li>
            </ul>
          </div>
        </footer>
        <!-- End Footer -->
  
        <a class="js-go-to u-go-to-v1" href="#!"
           data-type="fixed"
           data-position='{
             "bottom": 15,
             "right": 15
           }'
           data-offset-top="400"
           data-compensation="#js-header"
           data-show-effect="zoomIn">
          <i class="hs-icon hs-icon-arrow-top"></i>
        </a>
      </main>
  
     
  

    <script>
      function jump(){
        window.location = "whatisuv.html"
      }
    </script>
    <!-- firebase script -->
    <!-- Firebase App is always required and must be first -->
    <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js"></script>

<!-- 
    <script src="https://www.gstatic.com/firebasejs/5.4.0/firebase.js"></script> -->


    <!-- Add additional services that you want to use -->
    <script src="https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js"></script>
    <script>
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCdzlQqW2LotCQYz_nNabvm6ruWWZJI5cE",
        authDomain: "sunhacker-22d59.firebaseapp.com",
        databaseURL: "https://sunhacker-22d59.firebaseio.com",
        projectId: "sunhacker-22d59",
        storageBucket: "sunhacker-22d59.appspot.com",
        messagingSenderId: "602951114141"
      };
      firebase.initializeApp(config);
    </script>
    


    
    <!-- <script src="js/map.js"></script> -->

    <!-- Bootstrap core JavaScript -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="css/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
     

    <!-- Plugin JavaScript -->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    

    <!-- Custom scripts for this template -->
    <script src="js/new-age.min.js"></script>
    <script src="js/uvplanner.js"></script>
   
    <!-- <script src="js/datatable.js"></script> -->
    
  </body>

</html>
