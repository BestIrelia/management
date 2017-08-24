<?php
 /**查询新闻详情数据，由newsDetail.html调用**/
 header('Content-Type:application/json');
$output = [];

@$nid = $_REQUEST['nid'];  //@符号可以压制当前行产生的错误提示

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT title,img_lg,detail_lead,detail,public_time FROM  im_news  WHERE nid=$nid";
 $result = mysqli_query($conn, $sql);

$row = mysqli_fetch_assoc($result); 
	
$output[] = $row;

  echo json_encode($output);
  ?>