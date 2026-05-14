/* alert 메세지 구문 시작 ************************************/
var MSG_NO_INPUT 			= "(이)가 입력되지 않았습니다.";
var MSG_INPUT_REPEAT		= "다시 입력하여 주십시오.";
/* alert 메세지 구문 끝 :  ************************************/

/*
 * 함수명 : POST
 * 설  명 : 링크를 POST형식으로 넘긴다.
 * 형  식 : 주소, 겟방식의 주소, 타겟(삭제가능)
 * 예) <a href="#" onClick="POST('./Link.asp','a=aaa&b=bbb&c=ccc','target')">링크~</a>
 */
function POST(page,get,target){
	
	var obj = document.createElement("div");
	obj.id = "href";
	document.body.appendChild(obj);	
	
	var href = document.getElementById("href");
	var form, hiddenform;

	form = "";
	hiddenform = "";
	
	if (get != ""){
		gettmp = get.split("&");
		for (i=0;i<gettmp.length;i++){
			hidden_name = gettmp[i].split("=")[0];
			hidden_value = gettmp[i].split("=")[1];
			hiddenform = hiddenform + " <input type='hidden' name='"+ hidden_name + "' value='"+ hidden_value +"'> ";
		}
	}
	
	form = form + " <form name='LINKPAGE' method='POST'> ";
	form = form + hiddenform ;
	form = form + " </form> ";

	href.style.display = "none";
	href.innerHTML = form;
	
	if (!target) target = "";

	var frm = document.LINKPAGE;
	frm.action = page;
	frm.target = target;
	frm.submit();
	
}


/* 필수 항목 입력 여부 체크
 * 예) if(requiredField(frm.are_code, "지역코드")) return;
 */
function requiredField(obj, objName){
    if(objName == null || objName == "") objName = obj.name;

    if(obj.value.replace(/[ ]/g, "") == ""){
        alert("[" + objName + "]" + MSG_NO_INPUT + "\n" + MSG_INPUT_REPEAT);
        if(obj.select != null) obj.select();
        obj.focus();
        return true;;
    }
    return false;
}

/* 필수 항목 입력 여부 체크
 * 예) if(requiredFieldRADIO(frm.are_code, "지역코드")) return;
 */
function requiredFieldRADIO(obj, objName){
    if(objName == null || objName == "") objName = obj.name;

    if(getChecked(obj) == ""){
        alert("[" + objName + "](이)가 선택되지 않았습니다.\n다시 선택하여 주십시오.");
        obj[0].focus();
        return true;;
    }
    return false;
}



function file_check(obj, check) {
	var count=0;
	
	ext = obj.value;
	ext = ext.substring(ext.lastIndexOf(".")+1);
	ext = ext.toLowerCase(); 
	
	if (check != "" ) {
		checkarr = check.split(",")
	}else{	
		checkarr = ["pdf", "hwp", "doc", "xls", "ppt", "txt", "hul", "htm", "html", "gif", "jpg", "wav", "mp3", "wma", "alz", "zip", "rar", "arj", "swf", "css", ""]
	}
	
	for (var i=0; i <= checkarr.length; i++){
		if (ext == checkarr[i]){
			count = count + 1;
		}
	}
	
	if (count > 0){
		return true;
	}else{
		alert("※파일 업로드 가능 파일 형식은 아래와 같습니다.\n -확장자("+ checkarr +")");	
		obj.focus();
		obj.select();
		return false;
	}
}


/* 숫자만 입력 가능하게 함
 * onkeypress 이벤트에 적용 : ime-mode를 반드시 disabled로 설정해야 함.
 * 예) style="ime-mode:disabled" onkeypress="onlyNumber()"
 */
function onlyNumber()
{
	if( window.event.keyCode >= 48 && window.event.keyCode <= 57) {
	} else {
		window.event.keyCode = "";
	}
}


//========== 무조건 숫자만 체크 ========================
function Chk_Num(fo_Field) {		//무조건 숫자만 체크
	if (isNaN(fo_Field.value)) {
	  alert("숫자를 입력하십시오.");
	  fo_Field.focus();
	  fo_Field.select();
	}
}


function addComma(val)
{
	var rtnVal = "";
	var stack = "";

	for(var i=0; i<val.length; i++){
		stack = val.charAt(i) + stack;
	}
	for(var i=0; i<stack.length; i++){
		if(i%3 == 0 && i!=0){
			rtnVal = stack.charAt(i) + "," + rtnVal;
		}else{
			rtnVal = stack.charAt(i) + rtnVal;
		}
	}
	return rtnVal
}






/****************************************************************************
 * Check 객체 제어 함수
 * 작성일 : 2004-11-10
 ***************************************************************************/
/*
 * 함수명 : getChecked
 * 설  명 : Radio 객체에서 체크된 항목의 value 를 반환한다.
 * @param _obj (Radio, 체크)
 * @return String, 체크된 항목의 value, 없을 경우 ""
 */
function getChecked(_obj){
	if (_obj == null) return "";
	
	//1건 일 경우에 대한 처리
	if(_obj.length == null){
		_objLen=1;			
	}else{
		_objLen= _obj.length;
	}
	for(var i=0; i<_objLen; i++){
		if(_obj.length == null){
			if(_obj.checked)
				return _obj.value;
		}else{
			if(_obj[i].checked)
				return _obj[i].value;
		}
	}
	return "";
}

/*
 * 함수명 : getCheckedCount
 * 설  명 : Radio 객체에서 체크된 항목 수를 반환한다.
 * @param _obj (Radio, 체크)
 * @return String, 체크된 항목수, 없을 경우 0
 */
function getCheckedCount(_obj){
	var cnt=0;
	var chkLen=0;
	if (_obj == null) return cnt;

//1건 일 경우에 대한 처리
	if(_obj.length == null){
		_objLen=1;			
	}else{
		_objLen= _obj.length;
	}
	
	for(var i=0; i<_objLen; i++){
		if(_obj.length == null){
			if(_obj.checked)
				cnt++;
		}else{
			if(_obj[i].checked)
				cnt++;
		}
	}
	return cnt;
}

// 모든 체크 박스의 checked 속성 세팅
function chkAllRows(chkMain, chk){
	if(chk == null){
		return;
	}
	// 2건 이상일 경우 실행 됨.
	for(i=0; chk.length != null && i<chk.length; i++){
		if(chkMain.checked){
			chk[i].checked = true;
		}else{
			chk[i].checked = false;
		}
	}
	// 1건 일때 실행됨.
	if(chk.length == null){
		if(chkMain.checked){
			chk.checked = true;
		}else{
			chk.checked = false;
		}
	}

}


/* 엔터키 입력시 원하는 함수 호출하기
 * onkeypress 이벤트에 적용
 * 예) onkeypress="key13Check('goSearch1()')"
 */
function key13Check(fnc){
	if(window.event.keyCode == 13){
        eval(fnc);
	}
}


// 팝업 화면 생성
function popUpWindow(url, popName, width, height, scroll, resizable){
	if( width == null || width == "" ) width = 600;
	if( height == null || height == "" ) height = 500;
	if( resizable == null || resizable == "" ) resizable = "yes";
	
	var left, top;
	top  = (window.screen.height - height) / 2;
	left = (window.screen.width  - width ) / 2;
	sFeatures = "width="+width+",height="+height+",left="+left+",top="+top+",resizable="+resizable;
	if(scroll == "yes") sFeatures += ",scrollbars=yes";
	else sFeatures += ",status=no,toolbar=no,menubar=no,location=no";

	var obj = window.open(url,popName,sFeatures);
	obj.focus();
	return obj;
}
// 팝업 화면 생성
function popUpWindow_(url, popName, width, height, scroll, resizable){
	if( width == null || width == "" ) width = 600;
	if( height == null || height == "" ) height = 500;
	if( resizable == null || resizable == "" ) resizable = "yes";
	
	var left, top;
	top  = 0//(window.screen.height - height) / 2;
	left = 0//(window.screen.width  - width ) / 2;
	sFeatures = "width="+width+",height="+height+",left="+left+",top="+top+",resizable="+resizable;
	if(scroll == "yes") sFeatures += ",scrollbars=yes";
	else sFeatures += ",status=no,toolbar=no,menubar=no,location=no";

	var obj = window.open(url,popName,sFeatures);
	obj.focus();
	return obj;
}

/*
 * 함수명 : ImagePreview
 * 설  명 : 이미지 미리보기
 * 형  식 : onChange="ImagePreview(this,'Photo')"  
 * 예) <input type="file" name="imgfile" onChange="ImagePreview(this,'이미지보여줄위치ID')">
 */
function ImagePreview(src,key) {
	
	if (navigator.product != "Gecko"){
		if (navigator.appVersion.indexOf("MSIE 8") > -1){
			document.getElementById(key).innerHTML = "<div align='center' style='font-size:11px'>미리보기는<br>MS IE 7.0<br>이하에서만<br>가능합니다.</div>";
			return;
		}
	}else{
		document.getElementById(key).innerHTML = "<div align='center' style='font-size:11px'>미리보기는<br>MS IE계열만<br>가능합니다.</div>";
		return;
	}

	if (src.value != ""){
		if(src.value.match(/\.(gif|jpg|jpeg|png)$/i)) {
		
			document.getElementById(key).innerText="";
			document.getElementById(key).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src.value + "',sizingMethod=scale)";
		
		} else {
		
			document.getElementById(key).style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='',sizingMethod=scale)";
			
			alert("이미지 파일만 올려주세요");
			//src.select();
			//document.selection.clear();
			
		}
	}
	
}


/*덱스트 파일업로드 그래프*/
function ShowProgress() { 
strAppVersion = navigator.appVersion; 
if (strAppVersion.indexOf('MSIE')!=-1 && 
strAppVersion.substr(strAppVersion.indexOf('MSIE')+5,1) > 4) {
//winstyle = "dialogWidth=385px; dialogHeight:150px; center:yes"; 
winstyle = "dialogWidth=385px; dialogHeight:150px; center:no"; 
window.showModelessDialog("/_Manager/include/dext/show_progress.asp?nav=ie", null, winstyle); 
}else { 
//winpos = "left=" + ((window.screen.width-380)/2)+",top="+((window.screen.height-110)/2);
winpos = "left=10,top=10";
winstyle="width=380,height=110,status=no,toolbar= no,menubar = no,location=no,resizable=no,scrollbars=no,copyhistory=no," + winpos; 
window.open("/_Manager/include/dext/show_progress.asp",null,winstyle); 
} 

return; 
}

/* 영역 프린트 시작 */
/*
Body 전체를 <DIV ID="objContents"></DIV> 로 감싼후
맨끝에 <DIV ID="objSelection"></DIV> 추가..
그뒤에 프린트영역 지정
<DIV id="Print_DIV"></DIV> 영역만 프린트
*/
function printDiv () { 
	if (document.all && window.print) { 
		window.onbeforeprint = beforeDivs; 
		window.onafterprint = afterDivs; 
		//window.print(); 
		Print(window);
	} 
} 

function beforeDivs () { 
	if (document.all) { 
		objContents.style.display = 'none'; 
		objSelection.innerHTML = document.all['Print_DIV'].innerHTML; 
	} 
} 

function afterDivs () { 
	if (document.all) { 
		objContents.style.display = 'block'; 
		objSelection.innerHTML = ""; 
	} 
} 


function SetPrintSettings() {
	factory.printing.header = "";			// Header에 들어갈 문장 
	factory.printing.footer = "";			// Footer에 들어갈 문장 
	factory.printing.portrait = true;		// true 면 가로인쇄, false 면 세로 인쇄 
	factory.printing.leftMargin = 1.0;		// 왼쪽 여백 사이즈 
	factory.printing.topMargin = 1.0;		// 위 여백 사이즈 
	factory.printing.rightMargin = 1.0;		// 오른쪽 여백 사이즈 
	factory.printing.bottomMargin = 1.0;	// 아래 여백 사이즈 
}

function Print(frame) {

	if ( !factory.object ) {
		if(confirm("ActiveX 설치후 인쇄하시겠습니까?")){
			alert("인터넷창 상단의 ActiveX를 설치후 진행하여 주십시요.");
		}else{
			window.print();			
		}		
	}else{
		SetPrintSettings();
		if(confirm("미리보기후 인쇄하시겠습니까?")){
			factory.printing.Preview();     // 현재윈도를 프린트하는뜻(window대신에 frame을 지정해주면 해당 프레임을 출력합니다.)
		}else{
			factory.printing.Print(true);     // 현재윈도를 프린트하는뜻(window대신에 frame을 지정해주면 해당 프레임을 출력합니다.)
		}
	}

}
/* 영역 프린트 종료 */


function nextFocus(sFormName,sNow,sNext)
{
	var sForm = 'document.'+ sFormName +'.'
	var oNow = eval(sForm + sNow);

	if (typeof oNow == 'object')
	{
		if ( oNow.value.length == oNow.maxLength)
		{
			var oNext = eval(sForm + sNext);

			if ((typeof oNext) == 'object')
				oNext.focus();
		}
	}
}



/*** 포커스 테두리 넣기 시작 ***/
document.write ("<style>.FocusLine{	border:#627dce 1px solid; }</style>");
function FocusIN(i, classname) {
	if (classname != ""){
		(i).className = 'FocusLine '+ classname ;
	}else{
		(i).style.border = '#627dce 1px solid';
	}
}
function FocusOUT(i, border, classname) {
	if (classname != ""){
		(i).className = classname;
	}else{
		(i).style.border = border;
	}
}

function linecss(){
	var obj = document.getElementsByTagName('input');
	var obj_txa = document.getElementsByTagName('textarea');
	for( e =0; e < obj.length; e++ ){
		var type = obj[e].getAttribute('type');
		if( type == 'text' || type == 'password' || type == 'file'){
			tmp = ""+obj[e].onfocus+"";

			tmp = tmp.replace("function onfocus()", "");		//ie8
			tmp = tmp.replace("function anonymous()", "");		//~ie7
			tmp = tmp.replace("{", "");
			tmp = tmp.replace("}", "");
			
			tmp2 = ""+obj[e].onblur+"";

			tmp2 = tmp2.replace("function onblur()", "");		//ie8
			tmp2 = tmp2.replace("function anonymous()", "");	//~ie7
			tmp2 = tmp2.replace("{", "");
			tmp2 = tmp2.replace("}", "");
			obj[e].onfocus = new Function ( ""+tmp+";"+"FocusIN(this, '"+ obj[e].className +"')" );
			obj[e].onblur = new Function ( ""+tmp2+";"+"FocusOUT(this,'"+ obj[e].style.border +"', '"+ obj[e].className +"')" );
		}
	}

	for( t =0; t < obj_txa.length; t++ ){
		if (obj_txa[t].style.display != "none") {
			tmp = ""+obj_txa[t].onfocus+"";

			tmp = tmp.replace("function onfocus()", "");		//ie8
			tmp = tmp.replace("function anonymous()", "");		//~ie7
			tmp = tmp.replace("{", "");
			tmp = tmp.replace("}", "");
			
			tmp2 = ""+obj_txa[t].onblur+"";

			tmp2 = tmp2.replace("function onblur()", "");		//ie8
			tmp2 = tmp2.replace("function anonymous()", "");	//~ie7
			tmp2 = tmp2.replace("{", "");
			tmp2 = tmp2.replace("}", "");
			
			obj_txa[t].onfocus = new Function ( ""+tmp+";"+"FocusIN(this, '"+ obj_txa[t].className +"')" );
			obj_txa[t].onblur = new Function ( ""+tmp2+";"+"FocusOUT(this,'"+ obj_txa[t].style.border +"', '"+ obj_txa[t].className +"')" );
		}
	}
	
	clearInterval(linecss_process);
}

var linecss_process = "";
linecss_process = setInterval('linecss()',1000);

/*** 포커스 테두리 넣기 종료 ***/


/* 새로고침, F1~F12 차단막기*/
/*
document.onkeydown=KeyEventHandle;
document.onkeyup=KeyEventHandle;
*/
function KeyEventHandle() {
	if( 
		(event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) 
		|| 
		(event.keyCode >= 112 && event.keyCode <= 123) 
	   )
	 { 

		event.keyCode = 0; 
		event.cancelBubble = true; 
		event.returnValue = false; 

	} 
}


//========= Email Check 스크립트 =========
// 사용법: return emailCheck(this) 형태로 쓰시면 됩니다.(Email 오류시 포커스 이동)
// 콤마(',')를 구분으로 여러개의 메일주소를 입력할 때는 emailCheck(this, ',') 형태로 쓰시면 됩니다.
function emailCheck(_email, _delim) {
    var email = _email.value;
    var aidx = -1; // @ 위치
    var didx = -1; // . 위치
    var valid = true;
    var arrSpChSet= new Array(" ", "\"", "'", "#", "%"); // 체크할 특수문제 셋

    // 입력정보가 없을 경우
    if(_email==null || email.length < 1) { return true; }
    if(_delim==null || _delim.length < 1) _delim = " ";

    var emails = email.split(_delim);

    for(var i=0; i < emails.length; i++) {
        email = emails[i];


		if (/^[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+)*@[0-9a-zA-Z-]+(\.)+([0-9a-zA-Z-]+)([\.0-9a-zA-Z-])*$/.test(email) == false){
            valid = false; break;
		}
    }

    // 주소가 형식에 맞지 않을 때
    if(!valid) {
        alert("E-mail ( " + email + " )주소가 정확하지 않습니다!");
        _email.focus();
    }

    return valid;
}

//========= 주민등록번호 Check 스크립트 =========
// 사용법: Check_Jumin(frm.Jumin1, frm.Jumin2) 형태로 쓰시면 됩니다.
function Check_Jumin(ssn1, ssn2) {

	var chk =0;
	var yy  = ssn1.value.substring(0,2);
	var mm  = ssn1.value.substring(2,4);
	var dd  = ssn2.value.substring(4,6);
	var sex = ssn2.value.substring(0,1);

	// 주민등록번호를 자리수에 맞게 입력했는지 체크
	if (ssn2.value.split(" ").join("") == "") {
		alert ('주민등록번호를 입력하십시오.');
		ssn1.focus();
		return false;
	}
	if (ssn1.value.length!=6) {
		alert ('주민등록번호 앞자리를 입력하십시오');
		ssn1.focus();
		return false;
	}
	if (ssn2.value.length != 7 ) {
		alert ('주민등록번호 뒷자리를 입력하십시오.');
		ssn2.focus();
		return false;
	}
	if (isNaN(ssn1.value) || isNaN(ssn2.value)) {
		ssn1.value = ""
		ssn2.value = ""
		alert('주민등록번호는 숫자만 가능합니다.');
		return false;
	}
	if ((ssn1.value.length!=6)||(mm <1||mm>12||dd<1)){
		alert ('주민등록번호 앞자리가 잘못되었습니다.');
		ssn1.focus();
		return false;
	}
	if ((sex != 1 && sex !=2 && sex !=3 && sex !=4 )||(ssn2.value.length != 7 )){
		alert ('주민등록번호 뒷자리가 잘못되었습니다.');
		ssn2.focus();
		return false;
	}

	for (var i = 0; i <=5 ; i++) {
		chk = chk + ((i%8+2) * parseInt(ssn1.value.substring(i,i+1)))
	}
	for (var i = 6; i <=11 ; i++) {
		chk = chk + ((i%8+2) * parseInt(ssn2.value.substring(i-6,i-5)))
	}

	chk = 11 - (chk %11)
	chk = chk % 10

	if (chk != ssn2.value.substring(6,7)) {
		alert ('주민등록번호가 정확하지 않습니다.');
		ssn1.focus();
		return false;
	}
	
	return true;
}

/*공백체크*/
function checkSpace( str )
{
	if(str.search(/\s/) != -1){
		return 1;
	}else {
		return "";
	}
}
/** 
* string String::cut(int len)
* 글자를 앞에서부터 원하는 바이트만큼 잘라 리턴합니다.
* 한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않습니다.
*/
String.prototype.cut = function(len) {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) {
		l += (str.charCodeAt(i) > 128) ? 2 : 1;
		if (l > len) return str.substring(0,i);
	}
	return str;
}

/** 
* bool String::bytes(void)
* 해당스트링의 바이트단위 길이를 리턴합니다. (기존의 length 속성은 2바이트 문자를 한글자로 간주합니다)
*/
String.prototype.bytes = function() {
	var str = this;
	var l = 0;
	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
	return l;
}


var is=false;
function ImgResize(str, size){
	
	if(is==false){
		if(document.getElementById(str).width > size){
			document.getElementById(str).width = size;
		}
	}
	is=true;
}




function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function _ID(obj){return document.getElementById(obj)}


//한글입력 체크
//예) if(!checkHangulChar(chk_name)) return;
function checkHangulChar(chk_name){
	if (/^[가-힝]{0,}$/.test(chk_name.value) == false){
	   alert("한글로만 입력하십시요.\n공백이나 특수문자는 입력할 수 없습니다.");
	   chk_name.focus();
	   chk_name.select();
	   return false;
	}
	return true;
}
function isHangul(s) 
{
     var len;
     
     len = s.length;

     for (var i = 0; i < len; i++)  {
         if (s.charCodeAt(i) != 32 && (s.charCodeAt(i) < 44032 || s.charCodeAt(i) > 55203))
             return false;
     }
     return true;
}

function addCashComma(obj)
{
	var isMinus = false;
	if(obj.value.indexOf("-") != -1 ){
		obj.value = obj.value.substring(obj.value.indexOf("-")+1)
		isMinus = true;
	}
	var numValue = ""+delCashComma(obj);
	var cashReturn = "";
	for (var i = numValue.length-1; i >= 0; i--){
		cashReturn = numValue.charAt(i) + cashReturn;
		if (i != 0 && i%3 == numValue.length%3) cashReturn = "," + cashReturn;
	}
	if(isMinus){
		obj.value = "-"+cashReturn;
	}else{
		obj.value = cashReturn;
	}
}

function delCashComma(obj)
{
	var numValue = obj.value;
	obj.value =  replace(numValue,",","");
	return obj.value;
}


function addCashComma2(obj)
{
	var isMinus = false;
	if(obj.indexOf("-") != -1 ){
		obj = obj.substring(obj.indexOf("-")+1)
		isMinus = true;
	}
	var numValue = ""+delCashComma2(obj);
	var cashReturn = "";
	for (var i = numValue.length-1; i >= 0; i--){
		cashReturn = numValue.charAt(i) + cashReturn;
		if (i != 0 && i%3 == numValue.length%3) cashReturn = "," + cashReturn;
	}
	
	if(isMinus){
		obj = "-"+cashReturn;
	}else{
		obj = cashReturn;
	}
	
	return obj;
}

function delCashComma2(obj)
{
	var numValue = obj;
	obj =  replace(numValue,",","");
	return obj;
}

/**
 *  문자열에 있는 특정문자패턴을 다른 문자패턴으로 바꾸는 함수.
 */
function replace(targetStr, searchStr, replaceStr)
{
	var len, i, tmpstr;
	len = targetStr.length;
	tmpstr = "";
	for ( i = 0 ; i < len ; i++ ) {
		if ( targetStr.charAt(i) != searchStr ) {
			tmpstr = tmpstr + targetStr.charAt(i);
		}
		else {
			tmpstr = tmpstr + replaceStr;
		}
	}
	return tmpstr;
}











/*** 이동레이어 관련 : start ***/
var appname = navigator.appName.charAt(0);
var move_type = false;
var divpop_id;

 function Start_move(e,thisID){
	 var event = e || window.event;
	 divpop_id = thisID;
	 //익스
	 if( appname == "M" ){
		 target_Element = event.srcElement;
	}else{ //익스외
		if (event.which !=1){
			return false;
		}
		else{
			move_type = true;
			target_Element = event.target;
		}
	}

	move_type = true;
	Move_x = event.clientX;
	Move_y = event.clientY;
	if( appname == "M" ) target_Element.onmousemove = Moveing;
	else document.onmousemove = Moveing;
 }


 function Moveing(e){
	var event = e || window.event;

	if(move_type == true){
		var Nowx = event.clientX - Move_x;
		var Nowy = event.clientY - Move_y;
		var targetName = document.getElementById(divpop_id);
		targetName.style.left = int_n(targetName.style.left) + Nowx;
		targetName.style.top = int_n(targetName.style.top) + Nowy;
		Move_x = event.clientX;
		Move_y = event.clientY;
		return false;
	}
 }

 function Moveing_stop(){
	move_type =  false;
}

function int_n(cnt){
	if( isNaN(parseInt(cnt)) == true ) var re_cnt = 0;
	else var re_cnt = parseInt(cnt);
	return re_cnt;
}

document.onmouseup = Moveing_stop;


function controlCookie( name, elemnt ){

	if ( elemnt.checked ){

	    var today = new Date()
	    var expire_date = new Date(today.getTime() + 60*60*6*1000)

		setCookie( name=name, value='true', expires=expire_date, path='/' );
		if (_ID(name) == null) setTimeout( "self.close()" );
		else setTimeout( "_ID('" + name + "').style.display='none'" );
	}
	else clearCookie( name );

	return
}

/*** 이동레이어 관련 : end ***/

/*** Cookie 생성 ***/
function setCookie( name, value, expiredays ){ 
    var todayDate = new Date(); 
    todayDate.setDate( todayDate.getDate() + expiredays ); 
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";" 
} 

/*** Cookie 제거 ***/
function clearCookie( name ){
    var today = new Date();
    var expire_date = new Date(today.getTime() - 60*60*24*1000);
    document.cookie = name + "= " + "; expires=" + expire_date.toGMTString();
}

/*** Cookie 체크 ***/

function GetCookie (name) { 
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

function getCookieVal (offset) {
	var endstr = document.cookie.indexOf (";", offset); 
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
} 
/*** Cookie 컨트롤 ***/
function PopupLayerClose( name, cookiename, elemnt ){

	if ( elemnt.checked ){
		setCookie( cookiename, 'done', 1 );
		setTimeout( "_ID('" + name + "').style.display='none'" );
	}

	return;
}



/* 입력 텍스트의 바이트 수 체크
 * 예) if(!check_msglen(frm.htl_comid, 15, "공급업체 상품코드")) return;
 */
function check_msglen(obj, maxlen, objName)
{
    if(objName == null) objName = obj.name;
    var length = calculate_msglen(obj.value);
    if (length > maxlen) {
        alert("[" + objName + "]은(는) 최대 " + maxlen + " Bytes까지 쓸수 있습니다.\n현재 " + length + " Bytes를 사용하였습니다.");
        obj.select();
        obj.focus();
        return false;
    }
    return true;
}


/* 입력 텍스트의 바이트 수 계산하기
 * 예) var len = calculate_msglen(obj.value);
 */
function calculate_msglen(message)
{
	var nbytes = 0;

	for (i=0; i<message.length; i++) {
		var ch = message.charAt(i);
		if(escape(ch).length > 4) {
			nbytes += 2;
		} else if (ch == '\n') {
			if (message.charAt(i-1) != '\r') {
				nbytes += 1;
			}
		} else if (ch == '<' || ch == '>') {
			nbytes += 4;
		} else {
			nbytes += 1;
		}
	}

	return nbytes;
}

function getCheckedValue(chk, diffLetter){
	var rtnValue="";


if (chk == null){ return ""; }
	if (diffLetter == null || diffLetter == ""){
		diffLetter="|";
	}
	
	var chkLen = chk.length;
	if (chk.length==null){
		chkLen = 1;
	}
	for (i=0; i< chkLen;i++){
		if(parseInt(chkLen)==1){
			if(chk.checked){
				rtnValue = rtnValue+chk.value;
				rtnValue = rtnValue+diffLetter;
			}
		}else {
			if(chk[i].checked){
				rtnValue = rtnValue+chk[i].value;
				rtnValue = rtnValue+diffLetter;
			}
		}
	}
	//맨우측에 붙은 구분자 제거하기
	if (rtnValue.length >= 1 ) {
			if (rtnValue.lastIndexOf(diffLetter) != -1){
					rtnValue = rtnValue.substring(0,rtnValue.length-1);
			}
	}
	return rtnValue;
	
}

//비교 상품 수 체크
//ex) onclick='return ItemCompareChkCnt(frmList.chk)'
function ItemCompareChkCnt (chk) { 
	var chkLen = getCheckedCount(chk);
	if(chkLen > 2){
			alert("2개 이상 상품은 비교 할 수 없습니다.");
			return false;
	}
	return true;
}



function addCashComma_(obj)
{
	var isMinus = false;
	/*
	if(obj.indexOf("-") != -1 ){
		obj = obj.substring(obj.indexOf("-")+1)
		isMinus = true;
	}
	*/
	var numValue = ""+obj;
	var cashReturn = "";
	for (var i = numValue.length-1; i >= 0; i--){
		cashReturn = numValue.charAt(i) + cashReturn;
		if (i != 0 && i%3 == numValue.length%3) cashReturn = "," + cashReturn;
	}
	if(isMinus){
		obj = "-"+cashReturn;
	}else{
		obj = cashReturn;
	}
	
	return obj;
}

function test123(){
	alert(123);
}