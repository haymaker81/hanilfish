<?
include './admin/include/config.php';
?>
<?
	$table="qna";
	$query = "SELECT idx FROM $table WHERE idx=$idx AND ref=$ref AND level=$level AND step=$step AND pw='$pw'";
	$result = mysql_query($query, $connect);
	$list = mysql_fetch_array($result);

	//echo $query.$list[idx];

	if($list[idx]){
		
		if($mode=="mod"){
		?>
			<script>
			opener.location.href="qna_modify.html?idx=<?=$idx?>&ref=<?=$ref?>&level=<?=$level?>&step=<?=$step?>";
			window.close();
			</script>
		<?
		}else{
		?>
			<script>
			opener.location.href="qna_del_proc.php?idx=<?=$idx?>&ref=<?=$ref?>&level=<?=$level?>&step=<?=$step?>";
			window.close();
			</script>
		<?
		}
	}else{
		?>
		<script>
			alert("비밀번호가 다릅니다.");
			history.back(-1);
		</script>
		<?
	}
?>
