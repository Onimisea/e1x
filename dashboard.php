<?php

if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION["username"])) {
    header("Location: ./login.html?error=notLoggedIn");
    exit();
}

require_once "./classes/utils.php";

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
  />
  <title><?=$_SESSION['username']?> | E-DoubleOne Academy</title>
  <meta name="robots" content="index, follow" />
  <meta
  name="description"
  content="The best affiliate program from the best online learning platform."
  />
  <meta name="keywords" content="E1xacademy" />
  <meta name="author" content="Onimisea" />

  <link
  rel="stylesheet"
  href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
  />

  <link
  href="https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css"
  rel="stylesheet"
  />

  <link
  rel="shortcut icon"
  href="assets/imgs/cropped-favicon.fw_-32x32.png"
  type="image/x-icon"
  style="background-color: white"
  />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
  rel="stylesheet"
  />

  <link rel="stylesheet" href="assets/css/dashboard.css" />
</head>

<body>
  <aside class="sidebar" id="sidebar">
      <section class="emailTel">
            <p><?=$_SESSION['username']?></p>
            <p><?=$_SESSION['refcode']?></p>
        </section>
    <ul>
        <li>
          <a href="./dashboard.php" class="sideLinks" id="dash">
            <i class='bx bxs-palette'></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="#" id="quiz" class="sideLinks">
            <i class='bx bxs-pen'></i>
            <span>Downlines</span>
          </a>
        </li>
        <li>
          <a href="#" id="with" class="sideLinks">
            <i class='bx bx-money-withdraw'></i>
            <span>Withdraw</span>
          </a>
        </li>
        <li>
          <a href="#" id="upg" class="sideLinks">
            <i class='bx bx-upload'></i>
            <span>Reward Programme</span>
          </a>
        </li>
        <li>
          <a href="#" id="ma" class="sideLinks">
            <i class='bx bxs-user-account'></i>
            <span>My Account</span>
          </a>
        </li>
        <li>
          <a href="#" id="crl" class="sideLinks">
            <i class='bx bxs-copy-alt'></i>
            <span>Referral Link</span>
          </a>
        </li>
        <li>
          <a href="processes/logout.php" class="logoutBtn">
            <i class='bx bx-log-out'></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
  </aside>


  <main>
    <header class="header" id="header">
      <section class="wrapper">
        <figure>
            <img
            class="logo"
            id="logo"
            src="assets/imgs/edoubleone-academy-logo.fw_.png"
            alt="E-DoubleOne Academy Logo"
            />
          </figure>

        <section class="emailTel">
            <p><?=$_SESSION['username']?></p> |
            <p><?=$_SESSION['refcode']?></p>
        </section>

        <a href="processes/logout.php" class="headerCta"><i class="bx bx-sign-out"></i> <span>Logout</span></a>
      </section>
    </header>

    <section class="body">
      <section class="wrapper">
        <section class="refBox" id="refBox"></section>

        <section class="cards" id="cards"></section>

        <section class="ylrWrapper" id="ylrWrapper">
            <h2>Your Last Referrals</h2>

            <section id="ylr"></section>
        </section>
      </section>
    </section>

    <footer>
      <section class="wrapper">
        <section class="sitemap">
          <section class="item">
            <h3>Other Pages</h3>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Courses</li>
              <li>Contact Us</li>
              <li>Become an Affiliate</li>
            </ul>
          </section>
          <section class="item">
            <h3>Our Programs</h3>
            <ul>
              <li>Data/Business Analytics</li>
              <li>Data Engineering</li>
              <li>Data Modeling</li>
              <li>Data Science</li>
              <li>Data Visualization</li>
            </ul>
          </section>
          <section class="item">
            <h3>Quick Link</h3>
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Disclaimer</li>
              <li>Credit</li>
              <li>FAQ</li>
            </ul>
          </section>
          <section class="item">
            <h3>Contact Info</h3>
            <ul>
              <li><a href="#">
                <i class="fa fa-home" aria-hidden="true"></i><span>16028 Elegant court, Bowie MD 20716</span></a></li>
              <li><a href="mailto:info@e1xacademy.com">
                <i class="bx bx-envelope"></i
                ><span>info@e1xacademy.com</span></a></li>
              <li><a href="tel:+12409064083">
                <i class="bx bx-phone-call"></i><span>+12409064083</span></a></li>
              <li class="footerSocial"><a href="#" class="socials"><i class="bx bxl-facebook-circle"></i></a>
                <a href="#" class="socials"><i class='bx bxl-instagram'></i></a>
                <a href="#" class="socials"><i class='bx bxl-linkedin-square'></i></a></li>
            </ul>
          </section>
        </section>

        <section class="copyright">
          <figure>
            <img
            class="logo"
            src="assets/imgs/edoubleone-academy-logo.fw_.png"
            alt="E-DoubleOne Academy Logo"
            />
          </figure>

          <p>
            Copyrights &copy; E-DoubleOne Academy 2021, All Rights Reserved.
          </p>
        </section>
      </section>
    </footer>
  </main>

  <script src="assets/js/dashboard.js" type="module"></script>
</body>
</html>