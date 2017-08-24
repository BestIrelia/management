<?php
 /**分页查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];

$count = 5; //一次最多查询 5 条
@$start = $_REQUEST['start'];  //@符号可以压制当前行产生的错误提示

if(empty($start)) {
    $start = 0; //默认从 0 开始
 }

 $conn =mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT mid,name FROM  im_employee  LIMIT  $start,$count";
 $result = mysqli_query($conn, $sql);

while(($row=mysqli_fetch_assoc($result))!==null){
	$output[] = $row;
}

  echo json_encode($output);
  ?>