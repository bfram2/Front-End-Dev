<script type="text/javascript" src="http://teamsites.adm.com/sites/GLOPMO/Test/SiteAssets/jquery-1.11.3.js"></script>
<script type="text/javascript" src="http://teamsites.adm.com/sites/GLOPMO/Test/SiteAssets/jquery.SPServices-0.7.1a.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
$().SPServices.SPArrangeChoices({
    columnName:"1. I understand why ADM is implementing the 1ADM program and an enterprise resource planning system (ERP).",
    perRow: 5
});

$().SPServices.SPArrangeChoices({
    columnName:"2. I understand what will be implemented at my location as part of the 1ADM 2.0 deployment and implementation.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"3. I know when the 2.0 rollout will happen for my team/location.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"4. I clearly understand what is changing and what will be required of me after go live.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"5. I understand the training I will receive before go live and whom to contact for assistance with new processes and tools if I have questions after go live.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"6. I receive sufficient 1ADM 2.0 communications and opportunities to ask questions and share concerns.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"7. The 1ADM vision has been shared with me and my team.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"8. My supervisor has explained the importance of a successful implementation and how this change will benefit me, my location and ADM as a company.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"9. My supervisor has explained what will be required of me for the 1ADM 2.0 JDE deployment and encourages me to actively participate.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"10. I believe that the 1ADM 2.0 JDE deployment will positively influence company business.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"11. I believe that the JDE Purchasing and Maintenance modules will positively influence my work.",
    perRow: 5
});
$().SPServices.SPArrangeChoices({
    columnName:"12. I am ready, willing and able to actively participate in required training and deployment activities.",
    perRow: 5
});
});
 $(document).ready(function() {
  var userName = $().SPServices.SPGetCurrentUser({
   fieldName: "Name"
  });
  var userID = $().SPServices.SPGetCurrentUser({
   fieldName: "Department"
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
  //$('input[title="Location ID (Loc #):"]').attr("disabled", "disabled");
 });
</script>

<style type="text/css">
.ms-gridT1 {padding-right: 10px;}
.ms-RadioText {padding-right: 10px;}
</style>


