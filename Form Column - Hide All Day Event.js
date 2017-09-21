<script type="text/javascript">
_spBodyOnLoadFunctionNames.push("hideall()");

function hideall()
{
HideField("Recurrence");
HideField("All Day Event");
HideField("Workspace");
HideField("Start Time");
HideField("End Time");
}

function HideField(title)
{
var header_h3=document.getElementsByTagName("h3") ;

for(var i = 0; i <header_h3.length; i++)
{
   var el = header_h3[i];
   var foundField ;
  if(el.className=="ms-standardheader")
   {
       for(var j=0; j<el.childNodes.length; j++)
       { 
           if(el.childNodes[j].innerHTML == title || el.childNodes[j].nodeValue == title)
           { 
               var elRow = el.parentNode.parentNode ;
               elRow.style.display = "none"; //and hide the row
               foundField = true ;
               break;
           }
       }        
   }

   if(foundField) 
       break ;

}
}
</script>