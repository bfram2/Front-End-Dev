/* Outside Sources: 
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://malsup.github.com/jquery.cycle.all.js"></script>
<script src="//cloud.github.com/downloads/malsup/cycle/jquery.cycle.all.latest.js"></script> 
*/

$('.ms-quickLaunch').prepend('<a href="http://teamsites.adm.com/sites/oneadm/1ADM/SitePages/main.aspx" alt="home"><img src="http://teamsites.adm.com/sites/oneadm/1ADM/SiteAssets/1ADM%20Logo.jpg" style="border:none;"></img></a>'); //add logo to navigation bar

$(document).ready(function(){
/*var months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']; //souptonuts month and year
var date = new Date();
var mon = date.getMonth();
var year = date.getFullYear();
var currmon = months[mon]; //pull current month out of array
alert(currmon+" "+year); //debugging the month
document.getElementById("souptonuts").innerHTML = currmon+' '+year; //input month & year to html

$("a.soupl").on("click", function OpenDialog(URL) {
     var options = SP.UI.$create_DialogOptions();
     options.url = 'http://teamsites.adm.com/sites/oneadm/1ADM/Lists/Updates/SoupApp.aspx';
     options.width = 1024;
     options.height = 800;
     SP.UI.ModalDialog.showModalDialog(options);
});*/

getNews();
getSpot();
getBINews();
getBIUpdates();
jQuery.noConflict();
});

function getBINews() {
var SelectedView = "http://teamsites.adm.com/sites/oneadm/1ADM/Lists/BI%20Updates/View.aspx";
$("#binews").load(SelectedView+" #WebPartWPQ2 .ms-listviewtable",function() {
$("#binews *").removeAttr("onclick");
$("#binews *").removeAttr("onfocus");
$("#binews *").removeAttr("onmouseover");
$("#binews *").removeAttr("iid");
$(".ms-vh2").css("display","none");
$(".ms-listviewtable *").css("cursor","default");
$("a.ms-listviewtable *").css("cursor","pointer");
$("td.ms-listviewtable").css("padding","0px").css("margin","0px");
$(".ms-listviewtable *").css("background","white");
$(".ms-listviewtable *").css("border","none");
$(".ms-listviewtable *").css("color","#676767");
$(".ms-vh-icon").css("display","none");
$(".s4-itm-cbx").css("display","none");
});
}

function getBIUpdates() {
var SelectedView = "http://teamsites.adm.com/sites/oneadm/1ADM/Lists/BI%20Updates/Training.aspx";
$("#biup").load(SelectedView+" #WebPartWPQ2 .ms-listviewtable",function() {
$("#biup *").removeAttr("onclick");
$("#biup *").removeAttr("onfocus");
$("#biup *").removeAttr("onmouseover");
$("#biup *").removeAttr("iid");
$(".ms-vh2").css("display","none");
$(".ms-listviewtable *").css("cursor","default");
$("a.ms-listviewtable *").css("cursor","pointer");
$("td.ms-listviewtable").css("padding","0px").css("margin","0px");
$(".ms-listviewtable *").css("background","white");
$(".ms-listviewtable *").css("border","none");
$(".ms-listviewtable *").css("color","#676767");
$(".ms-vh-icon").css("display","none");
$(".s4-itm-cbx").css("display","none");
});
}

//gather up the News items using JQuery SPServices API
function getNews() {
var SelectedView = "http://teamsites.adm.com/sites/oneadm/1ADM/Lists/Updates/WebApp.aspx";
$("#newsfeed").load(SelectedView+" #WebPartWPQ2 .ms-listviewtable",function() {
$("#newsfeed *").removeAttr("onclick");
$("#newsfeed *").removeAttr("onfocus");
$("#newsfeed *").removeAttr("onmouseover");
$("#newsfeed *").removeAttr("iid");
$(".ms-vh2").css("display","none");

$(".ms-listviewtable *").css("cursor","default");
$("a.ms-listviewtable *").css("cursor","pointer");
$("td.ms-listviewtable").css("padding","0px").css("margin","0px");
$(".ms-listviewtable *").css("background","white");
$(".ms-listviewtable *").css("border","none");
$(".ms-listviewtable *").css("color","#676767");
$(".ms-vh-icon").css("display","none");
$(".s4-itm-cbx").css("display","none");
});
}

//gather up the Spotlight items using JQuery SPServices API
function getSpot() {
	var SelectedView = "http://teamsites.adm.com/sites/oneadm/1ADM/Lists/Updates/SpotlightApp.aspx";
$("#spotlight").load(SelectedView+" #WebPartWPQ2 .ms-listviewtable",function() {
$("#spotlight *").removeAttr("onclick");
$("#spotlight *").removeAttr("onfocus");
$("#spotlight *").removeAttr("onmouseover");
$("#spotlight *").removeAttr("iid");
$("#spotlight *").removeAttr("cellSpacing");
$("#spotlight *").removeAttr("cellPadding");
$(".ms-vh2").css("display","none");
$(".ms-listviewtable *").css("border","none");

});
}

//activate sliding banner, JS above this point
jQuery(document).ready(function() {
	jQuery('.fp-slides').cycle({
		fx: 'scrollHorz',
		timeout: 4000,
		delay: 0,
		speed: 900,
		next: '.fp-next',
		prev: '.fp-prev',
		pager: '.fp-pager',
		continuous: 0,
		sync: 1,
		pause: 1,
		pauseOnPagerHover: 1,
		cleartype: true,
		cleartypeNoBg: true
	}); //will continue to recycle text and image, use speed to affect pauses
 });