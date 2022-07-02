<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$quizIdsArr = [];

$selectAllQuizIds = "SELECT `id` FROM `quiz`";

// prepare and bind
$stmt = $conn->prepare($selectAllQuizIds);
// $stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $quizCount = $result->num_rows;

    while ($row = $result->fetch_assoc()) {
        $quizIdsArr[] = $row['id'];
        $randQuizId = array_rand($quizIdsArr);

        $quizId = $quizIdsArr[$randQuizId];

        $_SESSION['quizId'] = $quizId;
    }

    $selectQuiz = "SELECT * FROM `quiz` WHERE `id` = ?";

    // prepare and bind
    $stmt2 = $conn->prepare($selectQuiz);
    $stmt2->bind_param('i', $quizId);

    $stmt2->execute();
    $result2 = $stmt2->get_result();

    if ($result2->num_rows > 0) {
        while ($row2 = $result2->fetch_assoc()) {
            $question = $row2['question'];
            $correct_option = $row2['co'];
            $rowOptions = [$row2['oa'], $row2['ob'], $row2['oc'], $row2['od']];
            shuffle($rowOptions);
        }
    }
    $conn->close();
}

?>

    <section class="queHeader" id="queHeader">
        <h2>Question</h2>
        <section class="queTimer" id="qt"></section>
    </section>

    <section class="queBody">
        <h4><?=$question?></h4>

        <section class="ansBox">
            <label class="labelWrapper"><?=$rowOptions[0]?>
                <input class="option" type="radio" name="options" id="A" value="<?=$rowOptions[0]?>">
                <span class="checkmark"></span>
            </label>

          <label class="labelWrapper"><?=$rowOptions[1]?>
            <input class="option" type="radio" name="options" id="B" value="<?=$rowOptions[1]?>">
            <span class="checkmark"></span>
          </label>

          <label class="labelWrapper"><?=$rowOptions[2]?>
            <input class="option" type="radio" name="options" id="C" value="<?=$rowOptions[2]?>">
            <span class="checkmark"></span>
          </label>

          <label class="labelWrapper"><?=$rowOptions[3]?>
            <input class="option" type="radio" name="options" id="D" value="<?=$rowOptions[3]?>">
            <span class="checkmark"></span>
          </label>
        </section>

        <input class="secBtn" id="submitQuizBtn" type="submit" name="submit-ans" value="Submit">
      </section>