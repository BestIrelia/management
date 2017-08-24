<?php
 /**分页查询数据，由main.html的新闻模块调用**/
 header('Content-Type:application/json');
 $callback=$_GET['callback']; 
$output = [];

$count = 5; //一次最多查询 5 条
@$start = $_REQUEST['start'];  //@符号可以压制当前行产生的错误提示

if(empty($start)) {
    $start = 0; //默认从 0 开始
 }

 $conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
 $sql = 'SET NAMES UTF8';
 mysqli_query($conn,  $sql);
 $sql = "SELECT nid,title,img_sm,detail_lead,public_time FROM  im_news  LIMIT  $start,$count";
 $result = mysqli_query($conn, $sql);

while(($row=mysqli_fetch_assoc($result))!==null){
	$output[] = $row;
}

  echo $callback."(".json_encode($output).")";
  ?>