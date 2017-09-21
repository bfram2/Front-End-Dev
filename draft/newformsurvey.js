<script type="text/javascript" src="http://teamsites.adm.com/sites/oneadm/1ADM/SiteAssets/Survey/jquery-1.11.3.js"></script>
<script type="text/javascript" src="http://teamsites.adm.com/sites/oneadm/1ADM/SiteAssets/Survey/jquery.SPServices-0.7.1a.min.js"></script>
<script type="text/javascript">
//make radio buttons horizontal based on item per row
$(document).ready(function() {
$().SPServices.SPArrangeChoices({
    columnName:"1. The 1ADM vision has been shared with me and my team.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"2. I understand why ADM is implementing the 1ADM program and an enterprise resource planning system (ERP).",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"3. I have received sufficient 1ADM 2.0 communications and opportunities to ask questions and share concerns.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"4. I believe that the implementation of 1ADM 2.0 will positively influence company business.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"5. I understand the tools and processes that will be implemented at my location as part of the 1ADM 2.0 implementation.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"6. I know when the 2.0 implementation will take place at my location and with my team(s).",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"7. I clearly understand what is changing and what will be required of me after our new tools and processes have been implemented.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"8. I believe that the JDE Purchasing and/or Maintenance module(s) will positively influence my work.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"9. I understand the types of training I will receive and who to contact for assistance and support.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"10. My supervisor has explained the importance of a successful implementation and how this change will benefit me, my location and ADM as a company.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"11. My supervisor has explained what will be required of me for the 1ADM 2.0 implementation and has encouraged me to actively participate.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"12. I am ready, willing and able to actively participate in required training and implementation activities.",
    perRow: 5
});
});
//automatically pull the fields name, department, and job title from AD
 $(document).ready(function() {
  var userName = $().SPServices.SPGetCurrentUser({
   fieldName: "Name"
  });
  var userID = $().SPServices.SPGetCurrentUser({
   fieldName: "Department",
   debug: false
  });
  var userTitle = $().SPServices.SPGetCurrentUser({
   fieldName: "JobTitle"
 });
  $("textarea[title='People Picker']").val(userName);
  $("div[title='People Picker']").text(userName);
  $("textarea[title='Location ID (Loc #):']").val(userID);
  $("input[title='Location ID (Loc #):']").val(userID);
  $("textarea[title='Job Title:']").val(userTitle);
  $("input[title='Job Title:']").val(userTitle); 
 //fist hides the input field, the last hides the text above the input
  $("input[title='Location ID (Loc #):']").attr("readonly",true).css("color","#A0A0A0");
  $("input[title='Job Title:']").attr("readonly",true).css("color","#A0A0A0");
 //Hide People Picker called Name: 
  $("div[title='People Picker']").removeAttr('contenteditable').blur();
  $("div[title='People Picker']").css('color','#A0A0A0');
  $("img[title='Browse']").hide();
  // $("input.sp-peoplepicker-editorInput[title='Name:']").prop('disabled', 'disabled');
  // $('nobr:contains("Name:")').closest("td").next("td").attr("disabled", "disabled"");
  // $("div[id$='_UserField_upLevelDiv']").attr("contentEditable",false); 
  // $("span[id$='_UserField']").find("img").hide();
  // $('input[title="Location ID (Loc #):"]').hide();
  // $('td.ms-formlabel:contains("Location ID (Loc #):")').html('');
 });
</script>

<style type="text/css">
.ms-gridT1 {padding-right: 10px;}
.ms-RadioText {padding-right: 10px; display: inline;}
.ms-long {width: 750px !important;}
</style>