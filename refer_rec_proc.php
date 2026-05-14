<?
include_once './admin/include/config.php';
?>
<?
	if($HTTP_REFERER){
		$query = "INSERT INTO refer_url (ip,referer,regdate) VALUES ('$_SERVER[REMOTE_ADDR]','$HTTP_REFERER',now() );";
		$result = mysql_query($query, $connect);
	}
?>