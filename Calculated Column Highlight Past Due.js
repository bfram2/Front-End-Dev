=IF(ISBLANK([Due Date]),"Missing Due date","<img src='/_layouts/images/blank.gif' onload=""{"&"var SPday=new Date();"&"    SPday.setFullYear("&YEAR([Due Date])&","&MONTH([Due Date])-1&","&DAY([Due Date])&");"&"    var Days=Math.round((SPday.getTime()-new Date().getTime())/86400000);"&"    var Range=[ -365*20 , -365*10 , -365*5 , 0 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 14 , 21 ];"&"    var CSS=['#fff', '#fff', '#fff', '#FFD6D6', '#fff', '#CEE5CE', '#CEE5CE', '#CEE5CE', '#CEE5CE', '#CEE5CE', '#CEE5CE', '#CEE5CE', '#fff'];"&"    for (var i=0;i<Range.length;i++){var Color=CSS[i];if(Days<Range[i]){break}}"&"    var TR=this;while(TR.tagName!='TR'){TR=TR.parentNode}"&"    TR.style.backgroundColor=Color;"&"    this.parentNode.innerHTML=Math.abs(Days)+' days '+((Days<0)?'past':'left');"&"}"">")

//calculated column with JavaScript using [Due Date] column
//highlight light pink if past due
//highlight light green if 1-7 days until due date
//Only works in SharePoint list, very hard to customize