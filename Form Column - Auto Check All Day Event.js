<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript">

alert('started');

if (jQuery) { 
  // jQuery is loaded 
  alert('found jQuery');
} else {
  // jQuery is not loaded
  alert('NO jQuery');
}


 if (!$('span[title=All Day Event] > input').attr("checked"))
 {
 alert('found All Day Event');
 $('span[title=All Day Event] > input').click();
 }
 //hide check-box
 //$('tr:has(span[title=All Day Event])').not('tr:has(tr)').hide();

alert('all done');
</script>