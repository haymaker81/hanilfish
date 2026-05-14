<?
include_once './admin/include/config.php';
?>
<?
	$query = "SELECT count FROM visit_rec WHERE  date='$today' and hour=".date("G");
	$result = mysql_query($query, $connect);
	$res = mysql_fetch_row($result);

	if(!$res[0]){
		$query = "INSERT INTO visit_rec (count,date,hour) VALUES (1,'$today',".date("G").");";
		$result = mysql_query($query, $connect);
	}
	else{
		$count=$res[0]+1;
		$query = "UPDATE visit_rec SET count=$count WHERE  date='$today' and hour=".date("G");
		$result = mysql_query($query, $connect);
	}
?>