<!DOCTYPE html>
<html lang="en" manifest="/cache.manifest"> 
<head>
	<!--[if IE]>
	<meta http-equiv="X-UA-Compatible" content="chrome=1"> 
	<![endif]-->
	<!-- chrome frame-->
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<meta http-equiv="Content-Language" content="zh-cn" />
	<title>TPS - ͼƬ�ϴ�ϵͳ BETA 1.0 </title>
	<meta name="description" content=""/> 
	<meta name="keywords" content=""/>
	<link href="author" rel="http://avenirzheng.net/">
	<link rel="stylesheet" href="css/global.css" media="screen"/>
	<!--[if lt IE 7]
	<link rel="stylesheet" href="css/ltie7.css" />
	<![endif]-->
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script type="text/javascript" src="swfupload/swfupload.js"></script>
	<script type="text/javascript" src="swfupload/swfupload.queue.js"></script>
	<script type="text/javascript" src="js/fileprogress.js"></script>
	<script type="text/javascript" src="js/handlers.js"></script>
	<script type="text/javascript">
		var swfu;

		window.onload = function() {
			var settings = {
				flash_url : "swfupload/swfupload.swf",
				flash9_url : "swfupload/swfupload_fp9.swf",
				upload_url: "upload.php",
				post_params: {"PHPSESSID" : "<?php echo session_id(); ?>"},
				file_size_limit : "100 MB",
				file_types : "*.*",
				file_types_description : "All Files",
				file_upload_limit : 100,
				file_queue_limit : 0,
				custom_settings : {
					progressTarget : "fsUploadProgress",
					cancelButtonId : "btnCancel"
				},
				debug: false,

				// Button settings
				button_image_url: "img/bg_btn_upload.png",
				button_width: "93",
				button_height: "35",
				button_placeholder_id: "spanButtonPlaceHolder",
				button_text: '',
				button_text_style: "",
				
				// The event handler functions are defined in handlers.js
				swfupload_preload_handler : preLoad,
				swfupload_load_failed_handler : loadFailed,
				file_queued_handler : fileQueued,
				file_queue_error_handler : fileQueueError,
				file_dialog_complete_handler : fileDialogComplete,
				upload_start_handler : uploadStart,
				upload_progress_handler : uploadProgress,
				upload_error_handler : uploadError,
				upload_success_handler : uploadSuccess,
				upload_complete_handler : uploadComplete,
				queue_complete_handler : queueComplete	// Queue plugin event
			};

			swfu = new SWFUpload(settings);
		};
	</script>
</head>
<body id="tps_panel">
	<!--== S ͷ�� ==-->
	<div id="head">
		<h1>TPS - ͼƬ�ϴ�ϵͳ<sup>BETA 1.0</sup></h1>
		<div class="main">
			<!-- ���� -->
			<ul class="nav">
				<li class="tps_nav">
					<a href="#">
						<span>TPS - ͼƬ�ϴ�ϵͳ<sup>BETA 1.0</sup></span>
					</a>
				</li>
				<li class="tms_nav">
					<a href="#">
						<span>TMS - ���ݹ���ϵͳ<sup>BETA 1.0</sup></span>
					</a>
				</li>
			</ul>
			<div class="top_tools">
				<!-- ��ݷ�ʽ -->
				<ul class="shortcut">
					<li><a href="#">�ϴ�ͼƬ</a></li>
					<li></li>
					<li></li>
				</ul>
				<p class="welcome">
					elwinzheng��ӭ��! | <a href="#">�˳�</a>
				</p>
			</div>
		</div>
	</div>
	<!--== E ͷ�� ==-->

	<!--== S ���� ==-->
	<div id="content">
		<!-- ����� -->
		<div class="main">
			<p class="bread_crumbs">
				<span class="unwary">ͼƬ�ϴ�</span> &gt;&gt; <span class="cur">ѡ��ͼƬ</span>
			</p>
			<div class="upload_panel">
				<form id="form1" action="index.php" method="post" enctype="multipart/form-data">
				<div class="btns">
					<span id="spanButtonPlaceHolder" class="btn upload_btn"></span>
					<input id="btnCancel" class="cancel_btn "type="button" value="ȡ���ϴ�" onClick="swfu.cancelQueue();" disabled="disabled" />
				</div>
				<table class="file_status">
					<colgroup> 
						<col class="file_name" /> 
						<col class="orginal_size" /> 
						<col class="compress_size" /> 
						<col class="upload_status" /> 
					</colgroup> 
					<thead>
						<tr>
						<th>�ļ�</th>
						<th>ԭ�ļ���С</th>
						<th>�ϴ����С</th>
						<th>�ϴ�״̬</th>
						</tr>
					</thead>
					<tbody id="fsUploadProgress">
						
					</tbody>
				</table>
			<div class="fieldset flash">
			</div>
			<div id="divStatus" class="upload_result"></div>
			

	</form>
			</div>
		</div>
		<div class="side">
			<ul class="page_nav">
				<li class="on"><a href="#">�ϴ�ͼƬ</a></li>
				<li><a href="#">�ϴ���־</a></li>
				<li><a href="#">�Ż�����</a></li>
			</ul>
		</div>
	</div>
	<!--== E ���� ==-->
	<div id="foot" class="unwary">Copyright 1998-2010 Tencent Inc. All Rights Reserved. ��Ѷ��˾ <a href="#">ISD WEBTEAM</a> ��Ȩ����.</div>

	<script> 
		var holder = document.getElementById('tps_panel');
		holder.ondragover = function () { this.className = 'hover'; return false; };
		holder.ondragend = function () { this.className = ''; return false; };
		holder.ondrop = function (e) {
		  this.className = '';
		  e.preventDefault();

		var dt = e.dataTransfer;
		var files = dt.files;
		for (var i=0,l=files.length;i<l;i++){
			var reader = new FileReader();
			this.fileProgressWrapper = document.createElement("tr");
			this.fileProgressWrapper.className = "progressWrapper";
			//this.fileProgressElement = document.createElement("tr");
			//this.fileProgressElement.className = "progressContainer";

			var progressCancel = document.createElement("a");
			progressCancel.className = "progressCancel";
			progressCancel.href = "#";
			progressCancel.style.display = "none";
			progressCancel.appendChild(document.createTextNode(" "));

			var progressText = document.createElement("td");
			progressText.className = "progressName";
			progressText.appendChild(document.createTextNode(files[i].name));

			var progressBar = document.createElement("td");
			progressBar.className = "progressBarInProgress";
			progressBar.appendChild(document.createTextNode(Math.ceil(files[i].size/1024) + ' KB'));

			var progressStatus = document.createElement("td");
			progressStatus.className = "progressBarStatus";
			progressStatus.appendChild(document.createTextNode(Math.ceil(files[i].size/1024) + ' KB'));
			
			var progressUrl = document.createElement("td");
			progressUrl.className = "progressUrl";
			progressUrl.appendChild(document.createTextNode("http://loaclhost/tps/upload/" +files[i].name));

			this.fileProgressWrapper.appendChild(progressCancel);
			this.fileProgressWrapper.appendChild(progressText);
			this.fileProgressWrapper.appendChild(progressStatus);
			this.fileProgressWrapper.appendChild(progressBar);
			this.fileProgressWrapper.appendChild(progressUrl);

			//this.fileProgressWrapper.appendChild(this.fileProgressElement);
			//document.getElementById(targetID).innerHTML="";
			document.getElementById('fsUploadProgress').appendChild(this.fileProgressWrapper);
			}
			var status = document.getElementById("divStatus");
			status.innerHTML ='<p class="icon_success">�ϴ��ɹ����� ' + "<strong>" + files.length+"</strong>"+ " ���ļ�</p>";
		  return false;
		};
	</script> 
</body>
</html>