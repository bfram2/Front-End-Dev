<script type="text/javascript">
function GetElementByText(tagName, title)
{
var a = document.getElementsByTagName(tagName);

for (var i=0; i < a.length; i++)
{
if (a[i].text)
{
if (a[i].text === title)
{
return a[i];
}
}
}

return null;
}

if (window.onload)
{
var oLoad = window.onload;
window.onload = function bodyLoad()
{
oLoad();

var o = GetElementByText("ie:menuitem","Upload Document");
var k = GetElementByText("ie:menuitem","Upload Multiple Documents");
if (o || k)
{
o.disabled = true;
k.disabled = true;
}
}
}
</script>