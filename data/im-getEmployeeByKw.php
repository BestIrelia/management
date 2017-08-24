<?php
 /**通过关键词查询数据，由main.html调用**/
 header('Content-Type:application/json');
$output = [];

@$kw = $_REQUEST['kw'];  //@符号可以压制当前行产生的错误提示

if(empty($kw)) {
    echo '[]';  //若客户端未提交kw，则直接返回一个空数组
    return;
 }

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT mid,name FROM  im_employee  WHERE name LIKE '%$kw%'";
 $result = mysqli_query($conn, $sql);

while(($row=mysqli_fetch_assoc($result))!==null){
	$output[] = $row;
}

  echo json_encode($output);
  ?>