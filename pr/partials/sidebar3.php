<aside class="sidebar" id="sidebar">

    <section class="user-profile">
        <img src="../pr/user/pp/<?=$_SESSION['pp']?>" alt="<?=$_SESSION['username']?>">
        
        <section class="user-title">
            <h4 class="user-name"><?=$_SESSION['username']?></h4>
            <small class="user-subs"><?=$_SESSION['subtype']?></small>
        </section>
    </section>


    <ul>
        <li>
          <a href="./adminDashboard" class="sideLinks" id="dash">
            <i class='bx bxs-palette'></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href="./adminUsers" id="users" class="sideLinks">
            <i class='bx bxs-pen'></i>
            <span>Users</span>
          </a>
        </li>
        <li>
          <a href="./adminQuiz" id="quiz" class="sideLinks">
            <i class='bx bxs-pen'></i>
            <span>Quiz</span>
          </a>
        </li>
        <li>
          <a href="./adminPins" id="pins" class="sideLinks">
            <i class='bx bxs-user-account'></i>
            <span>Pins</span>
          </a>
        </li>
        <li>
          <a href="./adminRequests" id="reqs" class="sideLinks">
            <i class='bx bx-money-withdraw'></i>
            <span>Requests</span>
          </a>
        </li>
        
        <li>
          <a href="./adminDispatchers" id="pds" class="sideLinks">
            <i class='bx bx-upload'></i>
            <span>Pin Dispatchers</span>
          </a>
        </li>
        <li>
          <a href="../pr/processes/alp2.php">
            <i class='bx bx-log-out'></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>>
  </aside>
