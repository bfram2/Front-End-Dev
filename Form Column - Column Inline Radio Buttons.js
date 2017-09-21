<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
$().SPServices.SPArrangeChoices({
    columnName:"",
    perRow: 5
});

$().SPServices.SPArrangeChoices({
    columnName:"",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"",
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
   var userEm = $().SPServices.SPGetCurrentUser({
   fieldName: "Email"
 });
   var userAcc = $().SPServices.SPGetCurrentUser({
   fieldName: "Name"
 });
  $("textarea[title='People Picker']").val(userName);
  $("div[title='People Picker']").text(userName);
  $("textarea[title='Location ID (Loc #):']").val(userID);
  $("input[title='Location ID (Loc #):']").val(userID);
  $("textarea[title='Job Title:']").val(userTitle);
  $("input[title='Job Title:']").val(userTitle);
  $("textarea[title='Employee ID:']").val(userAcc);
  $("input[title='Employee ID:']").val(userAcc);
  $("textarea[title='E-mail:']").val(userEm);
  $("input[title='E-mail:']").val(userEm);
 //fist hides the input field, the last hides the text above the input
  $("input[title='Location ID (Loc #):']").attr("readonly",true).css("color","#A0A0A0");
  $("input[title='Job Title:']").attr("readonly",true).css("color","#A0A0A0");
  $("input[title='Employee ID:']").attr("readonly",true).css("color","#A0A0A0");
  $("input[title='E-mail:']").attr("readonly",true).css("color","#A0A0A0");
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