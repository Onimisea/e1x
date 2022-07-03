<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];
$subtype = $_SESSION['subtype'];
$quizId = $_SESSION['quizId'];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$selectQuiz = "SELECT * FROM `quiz` WHERE `id` = ?";

$i = 1;

$selectedAns = $_POST['selectedAns'];

// prepare and bind
$stmt = $conn->prepare($selectQuiz);
$stmt->bind_param('s', $quizId);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $co = $row['co'];

        $selectCaE = "SELECT * FROM `users` WHERE `username` = ?";

        // prepare and bind
        $stmt2 = $conn->prepare($selectCaE);
        $stmt2->bind_param('s', $username);

        $stmt2->execute();
        $result2 = $stmt2->get_result();

        if ($result2->num_rows > 0) {
            while ($row2 = $result2->fetch_assoc()) {
                $cae = $row2['cae'];
                $total_quiz = $row2['total_quiz'];
                $quiz_earnings = $row2['quiz_earnings'];
                $total_earnings = $row2['total_earnings'];
                $balance = $row2['balance'];
            }
        }

        if ($selectedAns === $co) {
            echo "<h3>Correct! You have earned <span class='naira'>$cae</span>. Well, done.</h3>";

            $total_quiz2 = $total_quiz + 1;
            $quiz_earnings2 = $quiz_earnings + $cae;
            $total_earnings2 = $total_earnings + $cae;
            $balance2 = $balance + $cae;

            $updateUser = "UPDATE `users` SET `total_quiz`=?,`quiz_earnings`=?,`total_earnings`=?,`balance`=? WHERE `username` = ?";

            // prepare and bind
            $stmt3 = $conn->prepare($updateUser);
            $stmt3->bind_param('iiids', $total_quiz2, $quiz_earnings2, $total_earnings2, $balance2, $username);

            $stmt3->execute();
            $result3 = $stmt3->get_result();

        } else {
            echo "<h3>Wrong! Try again later.</h3>";
        }
    }
}

$conn->close();

//

//                     $userUpdated = mysqli_query($conn, $updateUser);
// }

//             }

//         }

//     }

// }
