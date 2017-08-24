<?php
 /**编辑员工信息，由editEmployee.html调用**/
 header('Content-Type:application/json');
$output = [];

@$mid = $_REQUEST['mid'];  //@符号可以压制当前行产生的错误提示
@$phone = $_REQUEST['phone'];
@$email = $_REQUEST['email'];
@$department = $_REQUEST['department'];
@$job = $_REQUEST['job'];
@$employee_id = $_REQUEST['employee_id'];
@$id_card = $_REQUEST['id_card'];
@$address = $_REQUEST['address'];

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "UPDATE im_employee SET phone=$phone,email='$email',department='$department',job='$job',employee_id='$employee_id',id_card='$id_card',address='$address' WHERE mid=$mid";
 $result = mysqli_query($conn, $sql);

  echo json_encode($result);
  ?>