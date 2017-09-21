function SendLinkbyMail(href) {
var formattedBody = "Dear Sir or Madam, \n\nHere are some useful documents I would like to share with you. http://www.google.co.uk";

var a = document.createElement('a');
var linkText = document.createTextNode("Create new email");
a.appendChild(linkText);
a.title = "Create new email";

var mailToLink = "mailto:oli@spacecadets.co.uk?";
var mailContent = "Subject=Documents to share&";
mailContent += "cc=bob@spacecadets.co.uk&";
mailContent += "body=" + encodeURIComponent(formattedBody);

a.href = mailToLink + mailContent;
document.getElementById("ex").appendChild(a);
}