<?
include_once './admin/include/config.php';
?>
<script>
function getCookie (name) {
 var arg = name + "=";
 var alen = arg.length;
 var clen = document.cookie.length;
 var i = 0;
 while (i < clen) {
     var j = i + alen;
     if (document.cookie.substring(i, j) == arg)
       return getCookieVal (j);
     i = document.cookie.indexOf(" ", i) + 1;
     if (i == 0) break;
 }
 return null;
}
</script>
<?
	$query = "select * from popup where sdate<now() and edate>now() ";
	$result = mysql_query($query, $connect);

	while($res = mysql_fetch_array($result)){
		
		if($res[poptype]==1){
			if($res[closeflag]==1){
	?>
	<script>
if ( getCookie( "pop<?=$res[idx]?>" ) != "done"  ) {
	window.open('/admin/include/popup.php?idx=<?=$res[idx]?>&name=pop<?=$res[idx]?>','pop<?=$res[idx]?>','width=<?=$res[w]?>px,height=<?=$res[h]?>px,left=<?=$res[l]?>, top=<?=$res[t]?>,status=no,title=yes ,resizable=1,scrollbars=1');
}
</script>
<?
		}else{
?>
<script>
	window.open('/admin/include/popup.php?idx=<?=$res[idx]?>&name=pop<?=$res[idx]?>','pop<?=$res[idx]?>','width=<?=$res[w]?>px,height=<?=$res[h]?>px,left=<?=$res[l]?>, top=<?=$res[t]?>,status=no,title=yes ,resizable=1,scrollbars=1');
</script>
<?		
			}
		}else{
			$popmove="";
			
			if($res[closeflag]==1){
					if($res[poptype]==2){
						$popmove="onMouseDown=\\\"Start_move(event,'pop".$res[idx]."');\\\" onMouseUp=\\\"Moveing_stop();\\\"";
					}
					$content_str=str_replace("\n","",$res[content]);
					$content_str=str_replace("\r","",$content_str);
					$content_str=str_replace("\n\r","",$content_str);
					$content_str=str_replace("\r\n","",$content_str);
					$content_str=str_replace("\"","\\\"",$content_str);
			?>
				<script>
					if ( getCookie( "pop<?=$res[idx]?>" ) != "done"  ) {
						<!-- 이동레이어 팝업창 시작 -->
						document.writeln("<div id=\"pop<?=$res[idx]?>\" STYLE=\"position:absolute; width:0; height:0; left:<?=$res[l]?>; top:<?=$res[t]?>; z-index:9994;\">    \n");
						document.writeln("  <div <?=$popmove?> style='cursor:;'>    \n");
						document.writeln("	<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">    \n");
						document.writeln("	  <tr>    \n");
						document.writeln("		<td><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">    \n");
						document.writeln("			<tr>    \n");
						document.writeln("			  <td style=\"background: URL('/include/PopupLayer/popup_top_left.gif') no-repeat;\" nowrap width=\"12\" height=\"33\"></td>    \n");
						document.writeln("				  <td style=\"background: URL('/include/PopupLayer/popup_top_bg.gif') repeat-x; text-align:right;\"><img src=\"/include/PopupLayer/popup_bu_close.gif\" onClick=\"_ID('pop<?=$res[idx]?>').style.display='none'\" style=\"cursor:pointer;\" /></td>    \n");
						document.writeln("				  <td style=\"background: URL('/include/PopupLayer/popup_top_right.gif') no-repeat;\" nowrap width=\"12\" height=\"33\"></td>    \n");
						document.writeln("				</tr>    \n");
						document.writeln("				<tr>    \n");
						document.writeln("				  <td style=\"background: URL(/include/PopupLayer/popup_left_bg.gif) repeat-y;\" nowrap width=\"12\"></td>    \n");
						document.writeln("				  <td><!-- 팝업내용 : Start -->    \n");
						document.writeln("					<table width=\"<?=$res[w]?>\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">    \n");
						document.writeln("					  <tr>    \n");
						document.writeln("						<td height=\"<?=$res[h]?>\" bgcolor=\"#FFFFFF\">    \n");
						
						document.writeln("				<?=$content_str?>		    \n");
						
						document.writeln("						</td>    \n");
						document.writeln("					  </tr>    \n");
						document.writeln("					  <tr>    \n");
						document.writeln("						<td height=21 align=\"right\" class=\"stxt\" bgcolor=\"#FFFFFF\">    \n");
						document.writeln("							<b>오늘하루 이창을 열지않음</b>    \n");
						document.writeln("						  <input type=\"checkbox\" style=\"cursor:pointer;\" onClick=\"PopupLayerClose( 'pop<?=$res[idx]?>', 'pop<?=$res[idx]?>', this );\"></td>    \n");
										  
						document.writeln("							</tr>    \n");
						document.writeln("					</table>    \n");
						document.writeln("					<!-- 팝업내용 : End -->    \n");
						document.writeln("				  </td>    \n");
						document.writeln("				  <td style=\"background: URL(/include/PopupLayer/popup_right_bg.gif) repeat-y;\" nowrap width=\"12\"></td>    \n");
						document.writeln("				</tr>    \n");
						document.writeln("				<tr>    \n");
						document.writeln("				  <td style=\"background: URL(/include/PopupLayer/popup_bottom_left.gif) no-repeat;\" nowrap width=\"12\" height=\"12\"></td>    \n");
						document.writeln("				  <td style=\"background: URL(/include/PopupLayer/popup_bottom_bg.gif) repeat-x;\"></td>    \n");
						document.writeln("				  <td style=\"background: URL(/include/PopupLayer/popup_bottom_right.gif) no-repeat;\" nowrap width=\"12\" height=\"12\"></td>    \n");
						document.writeln("				</tr>    \n");
						document.writeln("			  </table></td>    \n");
						document.writeln("		  </tr>    \n");
						document.writeln("		</table>    \n");
						document.writeln("	  </div>    \n");
						document.writeln("	</div>    \n");
						<!-- 이동레이어 팝업창 끝 -->
					}
				</script>
			<?
			}else{
						if($res[poptype]==2){
							$popmove="onMouseDown=\"Start_move(event,'pop".$res[idx]."');\" onMouseUp=\"Moveing_stop();\"";
						}
			?>
				<!-- 이동레이어 팝업창 시작 -->
						<div id="pop<?=$res[idx]?>" STYLE="position:absolute; width:0; height:0; left:<?=$res[l]?>; top:<?=$res[t]?>; z-index:9994;">;
						  <div <?=$popmove?> style='cursor:;'>
							<table border="0" cellspacing="0" cellpadding="0">
							  <tr>
								<td><table cellpadding="0" cellspacing="0" border="0">
									<tr>
									  <td style="background: URL('/include/PopupLayer/popup_top_left.gif') no-repeat;" nowrap width="12" height="33"></td>
									  <td style="background: URL('/include/PopupLayer/popup_top_bg.gif') repeat-x; text-align:right;"><img src="/include/PopupLayer/popup_bu_close.gif" onClick="_ID('pop<?=$res[idx]?>').style.display='none'" style="cursor:pointer;" /></td>
									  <td style="background: URL('/include/PopupLayer/popup_top_right.gif') no-repeat;" nowrap width="12" height="33"></td>
									</tr>
									<tr>
									  <td style="background: URL(/include/PopupLayer/popup_left_bg.gif) repeat-y;" nowrap width="12"></td>
									  <td><!-- 팝업내용 : Start -->
										<table width="<?=$res[w]?>" cellpadding="0" cellspacing="0" border="0">
										  <tr>
											<td height="<?=$res[h]?>" bgcolor="#FFFFFF">
												<?=$res[content]?>
											</td>
										  </tr>
										  <tr>
											<td height=21 align="right" class="stxt" bgcolor="#FFFFFF">&nbsp;</td>
												</tr>
										</table>
										<!-- 팝업내용 : End -->
									  </td>
									  <td style="background: URL(/include/PopupLayer/popup_right_bg.gif) repeat-y;" nowrap width="12"></td>
									</tr>
									<tr>
									  <td style="background: URL(/include/PopupLayer/popup_bottom_left.gif) no-repeat;" nowrap width="12" height="12"></td>
									  <td style="background: URL(/include/PopupLayer/popup_bottom_bg.gif) repeat-x;"></td>
									  <td style="background: URL(/include/PopupLayer/popup_bottom_right.gif) no-repeat;" nowrap width="12" height="12"></td>
									</tr>
								  </table></td>
							  </tr>
							</table>
						  </div>
						</div>
						<!-- 이동레이어 팝업창 끝 -->
			<?
			}
		}
	}
?>





