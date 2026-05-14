<?
include './admin/include/config.php';
?>
<?
$chk_sbj=checkAdStr($subject);
$chk_con=checkAdStr($content);

if($chk_sbj=="" && $chk_con=="" ){

	$table="qna";
	$query = "UPDATE $table SET name='$name',email='$email',subject='$subject',content='$content' WHERE  idx=$idx AND ref=$ref AND level=$level AND step=$step";
	$result = mysql_query($query, $connect);

	//echo $query.":".$result . "<br />";
?>
	<script>
	location.href="qna_view.html?idx=<?=$idx?>&ref=<?=$ref?>&level=<?=$level?>&step=<?=$step?>";
	</script>
<?
}else{
	if($chk_sbj!=""){
		?>
			<script>
			alert("제목에 광고성 제한 단어가 들어 있습니다.\r\n등록할 수 없습니다.");
			history.back(-1);
			</script>
		<?
	}else{
		?>
			<script>
			alert("게시물 내용중 광고성 제한 단어가 들어 있습니다.\r\n등록할 수 없습니다.");
			history.back(-1);
			</script>
		<?
	}
}
?>