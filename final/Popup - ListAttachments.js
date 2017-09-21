/* List all attachments when clicking the paperclip
 * ---------------------------------------------
 * Created by Alexander Bautz
 * alexander.bautz@gmail.com
 * http://sharepointjavascript.wordpress.com
 * Copyright (c) 2010-2012 Alexander Bautz (Licensed under the MIT X11 License)
 * v1.71 for SharePoint 2010
 * LastMod: 13.09.2014
 * ---------------------------------------------
 * Include reference to:
 *  jquery - http://jquery.com
 * ---------------------------------------------
 
 Paste the below code into a HTML Web Part (always make the bottom webpart and have ID in view), after uploading ListAttachemnts to SiteAssests:
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" type="text/javascript"></script>
<script src="http://teamsites.adm.com/sites/oneadm/1ADM/SiteAssets/ListAttachments.js" type="text/javascript"></script>
<script type="text/javascript">
var argObj = {hideIdColumn:true, clickToOpen:false, clickMouseover:"Click to open", oneClickOpenIfSingle:true};

customListAttachments(argObj);
//$(".ms-vb2:has(img)").css('width','350px');
</script>
 
*/

var argPlaceholder;
function customListAttachments(argObj){
	var thisWPContainer, isListView, intName, thisListCTX, thisRow, idColIndex, attcolIndex;	
	if(argPlaceholder===undefined){
		argPlaceholder = argObj;
	}else{
		argObj = argPlaceholder;
	}
	$("div[id^='WebPartWPQ']").each(function(){
		thisWPContainer = $(this);
		isListView = false;
		thisWPContainer.find(".ms-viewheadertr th").each(function(i){	
			intName = $(this).find('div:first').attr('name');
			if(intName=='ID'){
				thisWPContainer.data("idColIndex",this.cellIndex);
				thisWPContainer.data("ctxNum",$(this).find('div:first').attr('CtxNum'));
				// Hide ID column
				if(argObj.hideIdColumn){
					$(this).addClass('dummyHideClass');
				}
			}else if(intName=='Attachments'){
				isListView = true;
				thisWPContainer.data("attcolIndex",this.cellIndex);
			}
		});
		if(!isListView){
			return;
		}
		if(thisWPContainer.data("idColIndex")==undefined && location.href.match(/ShowInGrid=True/)==null && isListView){
			alert("The ID column must be in the view.\nYou may hide it in the script call by setting the argument \"hideIdColumn\" to true.");
		}
		thisListCTX = thisWPContainer.data("ctxNum");
		if(thisListCTX!==undefined){
			thisListCTX = eval("ctx"+thisListCTX);
		}
		thisWPContainer.find("table.ms-listviewtable tbody[beenthere!=1]").each(function(){		
			// Prevent processing of the same tbody multiple times			
			if($(this).attr('isloaded')!=='false'){
				$(this).attr('beenthere','1');			
				if(this.id.match('aggr')==null){
					$(this).find("tr:has(td.ms-vb2)").each(function(){					
						thisRow = $(this);									
						idColIndex = thisWPContainer.data("idColIndex");
						attcolIndex = thisWPContainer.data("attcolIndex");
						// Hide ID column
						if(argObj.hideIdColumn){
							thisRow.find(">td:eq("+idColIndex+")").addClass('dummyHideClass');
						}
						thisRow.data('itemID',thisRow.find(">td:eq("+idColIndex+")").text());
						thisRow.data('listGuid',thisListCTX.listName);
						if(argObj.clickToOpen){						
							thisRow.find(">td:eq("+attcolIndex+")").find('img').attr('title',argObj.clickMouseover).css('cursor','pointer').click(function(){
								showAtt(this,argObj);
							});	
						}else{
							thisRow.find(">td:eq("+attcolIndex+")").find('img').attr('title','').css('cursor','wait').mouseover(function(){
								showAtt(this,argObj);
							});					
						}			
					});
				}else if(this.id.match('aggr')!=null && argObj.hideIdColumn){
					$(this).find("td[cellIndex="+thisWPContainer.data("idColIndex")+"]").addClass('dummyHideClass');
				}
			}
		});
	});
	// Hide ID column if specified
	if(argObj.hideIdColumn){
		$(".dummyHideClass").hide();
	}
}

function showAtt(elm,argObj){
	var elmOffset, pageOffset, pTop, pLeft, allAtt, wrapBuffer;
	elmOffset = $(elm).offset();
	pageOffset = $("#s4-mainarea").offset();
	pTop = elmOffset.top-pageOffset.top;
	pLeft = elmOffset.left-parseInt($("#s4-leftpanel-content").css('width'),10)-10;
	allAtt = getAllAttachments($(elm).parents('tr:first').data('listGuid'),$(elm).parents('tr:first').data('itemID'));
	wrapBuffer = [];
	if(allAtt.count===1 && argObj.clickToOpen && argObj.oneClickOpenIfSingle){
		customViewDoc(allAtt.items[0].fullPath);
		return;
	}
	if(allAtt.count>0){							
		$.each(allAtt.items,function(i,item){
			wrapBuffer.push("<div id='customAttDiv_"+i+"' nowrap='nowrap' style='font-family:Arial;font-size:11px;padding:1px'>");
			wrapBuffer.push("<img id='customAtt_"+i+"_icon' style='vertical-align:middle' src='/_layouts/images/ic"+item.ext+".gif' border='0'>&nbsp;");
			wrapBuffer.push("<a href='"+item.fullPath+"' ");
			wrapBuffer.push("onclick='customHideMenu(true);customViewDoc(\""+item.fullPath+"\");return false;' id='customAtt_"+i+"' target='_blank'>");							
			wrapBuffer.push(item.name+"</a></div>");
		});						
	}            	        			        
	$("#customAttPreviewWrapper").html(wrapBuffer.join('')).css({top:pTop,left:pLeft}).show();
}

// Placeholder for the attachment links
$("div.ms-bodyareacell").prepend("<div id='customAttPreviewWrapper' style='padding:5px;background-color:white;border:1px gray solid;position:absolute;display:none;cursor:pointer' onmouseout='customMouseOutHideMenu(event)'></div>");

function customViewDoc(url){
	var openOk = ViewDoc(url,'SharePoint.OpenDocuments.3');
	if(!openOk){
		window.open(url,"_blank","status=0,toolbar=0,resizable=1");
	}
}

function getAllAttachments(listName,itemID){
	var returnHTMLBuffer, result, attObj, ext;
	returnHTMLBuffer = [];
	result = {count:0,items:[]};
	attObj = spjs_GetAttachmentCollection({'listName':listName,'listItemID':itemID});
	$.each(attObj,function(name,obj){
		ext = name.substring(name.lastIndexOf('.')+1);
		result.items.push({ext:ext,name:name,fullPath:obj.fullPath.split("'").join("%27")});
		result.count++;
	});
	return result;
}

// Overcome the missing onmouseleave event in Firefox
function customMouseOutHideMenu(e){
	var target, relTarg, relTargID, isInWrapper;
	if(!e){
		var e = window.event;
	}
	target = e.srcElement || e.target;	
	relTarg = e.relatedTarget || e.toElement;
	relTargID = $(relTarg).attr('id');
	relTargID = (relTargID===undefined)?'':relTargID;
	isInWrapper = ($(target).attr('id')=='customAttPreviewWrapper' || $(target).parents("div[id='customAttPreviewWrapper']").length>0);
	if(!isInWrapper || relTargID.match('customAtt')==null){
		customHideMenu(true);
	}
}

// Hide menu if user moves mouse outside the container
function customHideMenu(hide){
	if(hide){
		$("#customAttPreviewWrapper").hide();
	}else{
		if(typeof(hideMenu)!='undefined'){
			clearTimeout(hideMenu);
		}
	}
}

/*************************************************************
				Web service interactions
*************************************************************/
/* spjs_GetAttachmentCollection
	Argument type: object
		Object properties: listName,listbaseUrl[optional],listItemID
	LastMod: 18.08.2010
	Used to get the collection of attachments from a list item
*/
function spjs_GetAttachmentCollection(argObj){
	var returnObj, content, fullPath, name;
	if(argObj.listBaseUrl==undefined){
		argObj.listBaseUrl=L_Menu_BaseUrl;
	}
	returnObj = {};
	content = [];
	content.push("<GetAttachmentCollection xmlns='http://schemas.microsoft.com/sharepoint/soap/'>");
	content.push("<listName>"+argObj.listName+"</listName>");
	content.push("<listItemID>"+argObj.listItemID+"</listItemID>");
	content.push("</GetAttachmentCollection>");
	spjs_wrapSoapRequest(argObj.listBaseUrl+"/_vti_bin/lists.asmx","http://schemas.microsoft.com/sharepoint/soap/GetAttachmentCollection",content,function(data){
		$(data).find('Attachment').each(function(i){		
			fullPath = $(this).text();
			name = fullPath.substring(fullPath.lastIndexOf('/')+1);
			returnObj[name]={'fullPath':fullPath,'index':i};			
		});	
	});
	return returnObj;
}

/* spjs_wrapSoapRequest 
	- internal use
	LastMod: 07.07.2010
*/
function spjs_wrapSoapRequest(webserviceUrl,requestHeader,soapBody,successFunc){
	var xmlWrap = [];
		xmlWrap.push("<?xml version='1.0' encoding='utf-8'?>");
		xmlWrap.push("<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>");
		xmlWrap.push("<soap:Body>");
		xmlWrap.push(soapBody);
		xmlWrap.push("</soap:Body>");
		xmlWrap.push("</soap:Envelope>");
		xmlWrap = xmlWrap.join('');
	$.ajax({
		async:false,
		type:"POST",
		url:webserviceUrl,
		contentType:"text/xml; charset=utf-8",
		processData:false,
		data:xmlWrap,
		dataType:"xml",
		beforeSend:function(xhr){
			xhr.setRequestHeader('SOAPAction',requestHeader);
		},
		success:successFunc
	});
}

function customTimeoutLoop(id){
var obj = $("#"+id);
var isloaded = ($(obj).attr('isloaded')=='true')?true:false;
	if(!isloaded){
		$(obj).hide();
		setTimeout(function(){
			customTimeoutLoop(id);
		},10);
	}else{
		$(obj).show();
		customListAttachments();	
	}
}

function ExpGroupRenderData(d, a, e) {
    ULSA13: {
    }
    var c = document.getElementById("tbod" + a + "_"), b = document.createElement("DIV"), f = a.split("-");
    b.innerHTML = "<TABLE><TBODY id=\"tbod" + a + "_\" isLoaded=\"" + e + "\">" + d + "</TBODY></TABLE>";
    c.parentNode.replaceChild(b.firstChild.firstChild, c); 
	customTimeoutLoop("tbod" + a + "_");   
}
