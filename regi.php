<?php
$pdo = new PDO("mysql:host=localhost;dbname=yvreg","root","");
?>
<!doctype html>
<html>
    <head>
        <title>
            Registrain
        </title>
    </head>
<body>
    <div align="center">
        <h1>Registrain Details</h1>
    </div>
    <form action="regi.php" method="POST">
        <table border="1" align="center">
            <tr>
                <td>
                    <label>Student Name</label></td>
                    <td><input type="text" name="Student_name"></td>
            </tr>
            <tr>
                <td>
                    <label>Father Name</label></td>
                    <td><input type="text" name="Father_Name"></td>
            </tr>
            <tr>
                <td>
                    <label>Mother Name</label></td>
                    <td><input type="text" name="Mother_Name"></td>
            </tr>
            <tr>
                <td>
                    <label>Qulification</label></td>
                    <td><input type="text" name="Qulification"></td>
            </tr>
            <tr>
                <td>
                    <label>Gender</label></td>
                    <td><input type="radio" name="Gender" value="Male">Male
                    <input type="radio" name="Gender" value="Femaile">Female</td>
            </tr>
            <tr>
                <td>
                    <label>Birth Of Date</label></td>
                    <td><input type="date" name="BOD"></td>
            </tr>
            <tr>
                <td>
                    <label>Email_Id</label></td>
                    <td><input type="email" name="E-ID"></td>
            </tr>
            <tr>
                <td>
                    <label>Phone_No</label></td>
                    <td><input type="text" name="Pho_No"></td>
            </tr>
            <tr>
                <td>
                    <label>Complete_Address</label></td>
                    <td><input type="text" name="Comp_Add"></td>
            </tr>
            <tr>
                <td>
                    <label>Pincode</label></td>
                    <td><input type="text" name="Pin"></td>
            </tr>
            <tr>
                    <td colspan="2" align="center"><input type="submit" name="btnsave" value="submit" style="font-size: 20px;"></td>
            </tr>
        </table>
    </form>
</body>
</html> 
<?php
    if(isset($_POST['btnsave']))
    {
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

            $stmt = $pdo->prepare("Insert Into reg(Student_Name,Father_Name,Mother_Name,Qualification,Gender,Date_Birth,Email_id,Phone_No,Complete_Address,Pincode)
            values (':sname',':fname',':mname',':qlf',':gender',':bdate',':email',':pno',':add',':pcode')");
            $stmt->bind_param(':sname',$_POST['Student_name']);
            $stmt->bind_param(':fname',$father_name);
            $stmt->bind_param(':mname',$Mother_name);
            $stmt->bind_param(':qlf',$Qulification);
            $stmt->bind_param(':gender',$gender);
            $stmt->bind_param(':bdate',$birth_date);
            $stmt->bind_param(':email',$email);
            $stmt->bind_param(':pno',$phone);
            $stmt->bind_param(':add',$com_add);
            $stmt->bind_param(':pcode',$pincode);
            $stmt->execute();
            echo "<h1>Resistrasion Sessesfully...</h1>";
            $stmt->close();
            $conn->close();
    }
?>