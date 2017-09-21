<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script>
$(document).ready(function(){
$(".super").on("click", function OpenDialog(URL) {
     var options = SP.UI.$create_DialogOptions();
     options.url = '/sites/oneadm/1ADM/Lists/Super%20Users/AllItems.aspx';
     options.width = 1024;
     options.height = 800;
     SP.UI.ModalDialog.showModalDialog(options);
     });
});
// creates a modal popup for the link it is attached to, use class on anchor
// be sure to make href="#" on anchor
//or make it one line in HTML anchor:
//<a onclick="javascript:SP.UI.ModalDialog.OpenPopUpPage('URL',null,1024,600);" href="javascript:void(0);">
</script>
