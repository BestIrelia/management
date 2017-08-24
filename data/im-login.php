<?php
/**账号登录，由login.html文件调用**/
header('Content-Type:application/json');

$output = [];

@$user = $_REQUEST['user'];      
@$pwd = $_REQUEST['pwd'];  //@符号可以压制当前行产生的错误提示

//访问数据库
$conn = mysqli_connect('w.rdc.sae.sina.com.cn','1wyj14k4mx','himwzhjy3jkihkhy153wz443i3xyy3z41z334j54','app_management',3306);
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT user,level,user_employee_id FROM  im_user WHERE user='$user' AND pwd='$pwd'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result); 

if(empty($row))
   echo '[]';
else
{
    $output[] = $row;
    echo json_encode($output);
}
?>