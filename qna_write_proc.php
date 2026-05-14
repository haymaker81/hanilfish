<?
include './admin/include/config.php';
?>
<?
$table="qna";

$chk_sbj=checkAdStr($subject);
$chk_con=checkAdStr($content);

if($chk_sbj=="" && $chk_con=="" ){

	$query = "SELECT MAX(idx) FROM $table";
	//echo $query."<br>";
	$result = mysql_query($query, $connect);
	$list = mysql_fetch_array($result);

	if(!$list[0]){
		$idx=0;
	}else{
		$idx=$list[0];
	}

	$idx=$idx+1;

	$query = "INSERT INTO $table (idx, ref, email, name, pw, subject, content, regdate)  VALUES ( $idx,$idx,'$email','$name','$pw', '$subject', '$content', now() );";
	//echo $query;
	$result = mysql_query($query, $connect);
?>
	<script>
	location.href="qna.html";
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