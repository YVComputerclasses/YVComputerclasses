<?php

    $student_name = $_POST['Student_name'];
    $father_name = $_POST['Father_Name'];
    $Mother_name = $_POST['Mother_Name'];
    $Qulification = $_POST['Qulification'];
    $gender = $_POST['Gender'];
    $birth_date = $_POST['BOD'];
    $email = $_POST['E-ID'];
    $phone = $_POST['Pho_No'];
    $com_add = $_POST['Comp_Add'];
    $pincode = $_POST['Pin'];

        $conn = new mysqli('localhost','root','','yvreg');
        if($conn->connect_error){
            die('Connection Failed : '.$conn->connect_error);
        }else{
            $stmt = $conn->prepare("INSERT INTO reg (student_name, father_name, Mother_Name, Qulification, Gender, BOD, E-ID, Pho_No, Comp_Add, Pin)
            VALUES (?,?,?,?,?,?,?,?,?,?)");
            $stmt->bind_param("sssssisisi",$student_name, $father_name ,$Mother_name, $Qulification, $gender, $birth_date, $email, $phone, $com_add, $pincode);
            $stmt->execute();
            echo "Resistrasion Sessesfully...";
            $stmt->close();
            $conn->close();
        }
    

?>