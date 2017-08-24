<?php
 /**删除员工信息，由editEmployee.html调用**/
 header('Content-Type:application/json');
$output = [];

@$mid = $_REQUEST['mid'];  //@符号可以压制当前行产生的错误提示

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "DELETE FROM im_employee WHERE mid=$mid";
 $result = mysqli_query($conn, $sql);

$output[] = $result;

  echo json_encode($output);
  ?>