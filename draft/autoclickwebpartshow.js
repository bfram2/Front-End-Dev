<script> 
ExecuteOrDelayUntilScriptLoaded(init_defaultWP, "sp.ribbon.js");

//Set focus on our list web part
var webPart = document.getElementById('MSOZoneCell_WebPartWPQ2');
WpClick({target: webPart});

//Prevent it from losing focus
SP.Ribbon.WebPartComponent.$3_1.deselectWebPartAndZone = function() { };

</script>