<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script> 
ExecuteOrDelayUntilScriptLoaded(init_defaultWP, "sp.ribbon.js");

//Set focus on our list web part
var webPart = document.getElementById('MSOZoneCell_WebPartWPQ2');
WpClick({target: webPart});

//Prevent it from losing focus
SP.Ribbon.WebPartComponent.$3_1.deselectWebPartAndZone = function() { };

</script>