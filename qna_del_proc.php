<?
include './admin/include/config.php';
?>
<?
$table="qna";
	$query = "DELETE FROM $table WHERE idx=$idx AND ref=$ref AND level=$level AND step=$step";
	mysql_query($query, $connect);
	//echo $query. "<br />";
?>
<script>
location.href="qna.html";
</script>
