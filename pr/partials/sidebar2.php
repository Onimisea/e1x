<aside class="sidebar" id="sidebar">

    <section class="user-profile">
        <img src="pr/user/pp/<?=$_SESSION['pp']?>" alt="<?=$_SESSION['username']?>">
        
        <section class="user-title">
            <h4 class="user-name"><?=$_SESSION['username']?></h4>
            <small class="user-subs"><?=$_SESSION['subtype']?></small>
        </section>
    </section>


    <ul>
        <li>
          <a href="./userDashboard" class="sideLinks" id="dash">
            <i class='bx bxs-palette'></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="./userQuiz" id="quiz" class="sideLinks">
            <i class='bx bxs-pen'></i>
            <span>Quiz</span>
          </a>
        </li>
        <li>
          <a href="./userWithdraw" id="with" class="sideLinks">
            <i class='bx bx-money-withdraw'></i>
            <span>Withdraw</span>
          </a>
        </li>
        <li>
          <a href="./userAccount" id="ma" class="sideLinks">
            <i class='bx bxs-user-account'></i>
            <span>My Account</span>
          </a>
        </li>
        <li>
          <a href="./userUpgrade" id="upg" class="sideLinks">
            <i class='bx bx-upload'></i>
            <span>Upgrade</span>
          </a>
        </li>
        <li>
          <a href="./userLink" id="crl" class="sideLinks">
            <i class='bx bxs-copy-alt'></i>
            <span>Referral Link</span>
          </a>
        </li>
        <li>
          <a href="pr/processes/logoutProcess.php">
            <i class='bx bx-log-out'></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>>
  </aside>
