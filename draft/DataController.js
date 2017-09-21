//THIS SCRIPT REQUIRES THE AJAX FUNCTIONALITY.
//PLEASE ENSURE THAT THE AJAX FUNCTIONALITY IS INCLUDED WHEN
//THIS IS USED.

//EXAMPLE OF HOW TO USE THIS DATA CONTROLLER *******************************************************

//$(document).ready(function () {
//    //Set the scope of the search button to this site - no need to scope it outside of our site.
//    document.getElementById("ctl00_PlaceHolderSearchArea_ctl01_SBScopesDDL").value = "This Site";
//    getProcessData(pageHandler);
//});
// *************************************************************************************************

// GLOBAL VARIABLES
var _processXml = null;
var _processViewUrl = "/dept/IT/FX/BPM/SitePages/ProcessPageTemplate.aspx";
var _processEditUrl = "/dept/it/fx/BPM/sitepages/processedit.aspx";
var _processNewUrl = "/dept/IT/FX/BPM/sitepages/processnew.aspx";
var _processListId = "{C1BA7974-5AE0-438B-B99F-6F26018E5E3A}";

// Process object catalog for easy indexing
var _catalog = new Array();

// GLOBAL OBJECTS
var process = function () {
    this.id = "";
    this.parentid = "";
    this.parentName = "";
    this.parentSequence = "";
    this.name = "";
    this.businessArea = "";
    this.owner = "";
    this.level = "";
    this.cost = "";
    this.SLA = "";
    this.purpose = "";
    this.inputs = "";
    this.outputs = "";
    this.notes = "";
    this.version = "";
    this.classification = "";
    this.objectives = "";
    this.scope = "";
    this.referenceFramework = "";
    this.sequence = "";
    this.description = "";
    this.status = "";
    this.children = new Array();
    this.informationItems = new Array();
    this.masterdata = "";
    this.transactiondata = "";
    this.indexPath = "";
    this.fullIndex = "";
    this.accountableExecutive = "";
    this.stakeholders = "";
    this.stage="";

    this.sort = function () {
        this.children = this.children.sort();
    }

    this.getStakeholders = function(){
        var ary = new Array();
        var objAry = new Array();
        
        if ((this.stakeholders == null) || (this.stakeholders.length == 0)) {
            return null;
        }else{
            ary = this.stakeholders.split(";#");
            
            for (var i = 0; i < ary.length; i++) {
                objAry[ary[i]] = ary[i + 1];
                i++;
            }
            return objAry;
        }
    }

    this.setSequence = function (sIndex) {
        if ((sIndex != null) && (sIndex != "") && (sIndex != "")) {
            sIndex = sIndex.split(".")[0];            
        } else {
            sIndex = 0;
        }
        this.sequence = sIndex
        //if (sIndex == null) { return; }
        //sIndex = sIndex.split(".")[0];
        //this.sequence = sIndex;
    }

    this.setParentSequence = function (sIndex) {
        if (sIndex == null) { return; }
        sIndex = sIndex.split(".")[0];
        this.parentSequence = sIndex;
    }
    this.getParentId = function () {
        if((this.parentid !=null) && (this.parentid !="") && (this.parentid !="")){
            return (this.parentid.split(";#")[0]);
        } else {
            return null;
        }
        
    }
    this.getLevel = function () {        
        var indx = this.getFullIndex();
        if (indx != null) {
            return indx.split(".").length;
        }
    }

    this.addToIndexPath = function (sIndex) {
        if (sIndex == null) { return; }

        if (this.indexPath == "") {
            this.indexPath = sIndex;
        } else {
            this.indexPath = this.indexPath + "." + sIndex;
        }
    }
    this.getFullIndex = function () {
        return getIndex(this);
        //if (this.indexPath == "") {
        //    return this.sequence;
        //} else {
        //    return this.indexPath + "." + this.sequence;
        //}
    }
    this.getOwnerName = function () {
        if((this.owner !="") && (this.owner !=null) && (this.owner !="undefined")){
            return this.owner.split(";#")[1];
        }else{
            return "";
        }
    }
    
    this.getAccountableExecutiveName = function () {
        if ((this.accountableExecutive != "") && (this.accountableExecutive != null) && (this.accountableExecutive != "undefined")) {
            return this.accountableExecutive.split(";#")[1];
        } else {
            return "";
        }
    }

    this.getLookupId = function () {
        return this.id + ";#" + this.id;
    }
    this.getAttachmentURL = function () {
        return "";
    };
    this.getEditUrl = function () {
        return "";
    };

    this.isDecendentOf = function (sId) {
        var obj = this;
        var returnVal = false;

        do {
            if (obj.id == sId) {
                returnVal = true;
                break;
            }
            obj = getProcess(obj.getParentId());
            
        } while (obj != null)

        return returnVal
    };

    this.getTopParent = function () {
        var parent;
        do {
            parent = getProcess(obj.getParentId());
        } while (obj != null)

        return parent;
    };
}

function getIndex(oProcess) {
    //debugger;
    var fullIndex = oProcess.sequence;    
    var parentObj = getProcess(oProcess.getParentId());

    while ((parentObj != null) || (parentObj != undefined))
    {
        fullIndex = parentObj.sequence + "." + fullIndex;
        parentObj = getProcess(parentObj.getParentId());
    }

    return fullIndex;
}

function sortProcesses(a, b) {
    // debugger;
    return a.sequence - b.sequence;
    //if (a.sequence > b.sequence) { return 1 };
    //if (a.sequence < b.sequence) { return -1 };
    //return 0;
}


function getParentArray(sId) {
    var obj = getProcess(sId);
    var ary = new Array();

    do {
        ary.unshift(obj.id);
        obj = getProcess(obj.getParentId());
    } while (obj != null)

    return ary;
}

function getParamValue(querystring) {
    var qstring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < qstring.length; i++) {
        var urlparam = qstring[i].split('=');
        if (urlparam[0] == querystring) {
            return urlparam[1];
        }
    }
}


function getProcessData(callback) {
    //if we have already went and got the xml, we don't need it again;
    if (_processXml != null) {
        callback();
        return;
    }

    //Using GET will cache the calls and the data. Recommended to use POST
    $.ajax({
        type: "POST",
        url: "http://teamsites.adm.com/dept/IT/FX/BPM/_vti_bin/owssvr.dll?Cmd=Display&XMLDATA=TRUE&List={C1BA7974-5AE0-438B-B99F-6F26018E5E3A}&CacheControl=0",
        dataType: "xml",
        success: function (xml) {
            _processXml = xml;
            callback();
        },
        error: function (err) { alert(err); }
    });
}

//maps a node to an object
function getProcessObject(node) {
    if (node != null) {
        //debugger;
        var obj = new process();
        obj.id = node.getAttribute("ows_ID");
        obj.name = node.getAttribute("ows_LinkTitle");
        obj.level = node.getAttribute("ows_Level");
        obj.owner = node.getAttribute("ows_Owner");
        obj.businessArea = node.getAttribute("ows_Business_x0020_Area");
        obj.parentid = node.getAttribute("ows_Parent_x003a_ID_x003a_ID");
        obj.objectives = node.getAttribute("ows_Objectives");
        obj.inputs = node.getAttribute("ows_Inputs");
        obj.outputs = node.getAttribute("ows_Outputs");
        obj.stakeholders = node.getAttribute("ows_Stakeholders");
        obj.index = node.getAttribute("ows_ProcessIndex");
        obj.parentAttrId = node.getAttribute("ows_Parent_x003a_ID_x003a_ID");
        // Do we need to make parent mandatory?
        if (node.getAttribute("ows_Parent") != null) {
            obj.parentName = (node.getAttribute("ows_Parent")).split(";#")[1];
        }
        if (node.getAttribute("ows_ParentName_x003a_ProcessIndex") != null) {
            obj.setParentSequence((node.getAttribute("ows_ParentName_x003a_Sequence")).split()[1]);
        }
        obj.description = node.getAttribute("ows_Description");
        obj.notes = node.getAttribute("ows_GeneralNotes");
        obj.status = node.getAttribute("ows_Status");
        obj.referenceFramework = node.getAttribute("ows_Reference_x0020_Framework");
        obj.purpose = node.getAttribute("ows_Purpose");
        obj.setSequence(node.getAttribute("ows_Sequence"));
        obj.version = node.getAttribute("ows_Process_x0020_Version");
        obj.classification = node.getAttribute("ows_Classification");
        obj.accountableExecutive = node.getAttribute("ows_AccountableExecutive");
        obj.stage = node.getAttribute("ows_Stage");
        
        //alert(obj.getIndexString());
        //set the catalog array
        _catalog[obj.id] = obj;
    }   
    
    
    return obj;
}
//maps a list of nodes to an array of objects
function getProcessObjects(nodeList) {    
    var processes = new Array();
    
    for (var i = 0; i < nodeList.length; i++) {       
        processes.push(getProcessObject(nodeList[i]));        
    }
    return processes;
}

function getProcessesHierarchical() {
    //get all of the base nodes
    //debugger;
    var baseProcesses = getLevel1Processes();
    for (var i = 0; i < baseProcesses.length; i++) {
        //addChildProcesses(baseProcesses[i], baseProcesses[i].sequence);
        addChildProcesses(baseProcesses[i]);
    }
    return baseProcesses;

}

function getProcessHierarchical(ProcessId) {
    //get all of the base nodes
    //debugger;
    var process = getProcess(ProcessId);
    addChildProcesses(process);
    
    return process;

}

function getLevel1Processes()
{
    // Do we need to look at ones that dont have a parent?  may need to.
    return getProcessObjects(_processXml.selectNodes("//z:row[@ows_Level = '1: Platform']"));
    
}

function getProcessAndChildren(ProcessID, iDepth) {
    if ((iDepth == null) || (iDepth <= 0))
    {
        iDepth = 20;
    }
    var process = getProcess(ProcessID);
    addChildProcesses(process);
    if (iDepth > 0) {
        if ((process.children != null) && (process.children.length > 0)) {
            for (var i; i < process.children.length; i++) {
                iDepth = iDepth - 1;
                getProcessAndChildren(process.children[i], iDepth)
            }
        }
    }

    return process;
}
function getProcessAndDirectChildren(ProcessID) {
    //return one process
    var process = getProcess(ProcessID);
    //only get the child processes for this process
    addChildProcesses(process);
}

function addChildProcesses(oParent) {
    //debugger;
    var childProcesses = getProcessObjects(_processXml.selectNodes("//z:row[@ows_Parent_x003a_ID_x003a_ID='" + oParent.getLookupId() + "']"));
    for (var i = 0; i < childProcesses.length; i++) {
        childProcesses[i].addToIndexPath(oParent.getFullIndex());
        addChildProcesses(childProcesses[i]);
        //alert(childProcesses[i].getFullIndex());
    }

    oParent.children = childProcesses;
}

function addChildProcessesNonRecursive(oParent) {
    var childProcesses = getProcessObjects(_processXml.selectNodes("//z:row[@ows_Parent_x003a_ID_x003a_ID='" + oParent.getLookupId() + "']"));
    for (var i = 0; i < childProcesses.length; i++) {
        childProcesses[i].addToIndexPath(oParent.getFullIndex());        
    }

    oParent.children = childProcesses;
}

function addChildProcessesRecursive(oParent, iLevel) {
    var childProcesses = getProcessObjects(_processXml.selectNodes("//z:row[@ows_Parent_x003a_ID_x003a_ID='" + oParent.getLookupId() + "']"));
    for (var i = 0; i < childProcesses.length; i++) {        
        childProcesses[i].addToIndexPath(oParent.getFullIndex());

        if (iLevel > 0) {
            iLevel = iLevel = 1;
            addChildProcessesRecursive(childProcesses[i],iLevel);
        }
    }

    oParent.children = childProcesses;
}

function getAllProcessesAsArray(oParent, ary) {
    
    var childProcesses = getProcessObjects(_processXml.selectNodes("//z:row[@ows_Parent_x003a_ID_x003a_ID='" + oParent.getLookupId() + "']"));
    for (var i = 0; i < childProcesses.length; i++) {
        childProcesses[i].addToIndexPath(oParent.getFullIndex());
        ary.push(childProcesses[i]);        
        getAllProcessesAsArray(childProcesses[i], ary);                      
    }    
}


//returns all processes in an array
function getAllProcesses() {
    return getProcessObjects(_processXml.selectNodes("//z:row"));
}
//returns all child processes of a given processid
function getChildProcesses(sProcessId) {
    //debugger;
    var sLookupId = sProcessId + ";#" + sProcessId;
    return getProcessObjects(_processXml.selectNodes("//z:row[@ows_Parent_x003a_ID_x003a_ID='" + sLookupId + "']"));
}
//returns all processes of a given level
//depracated no longer using levels
function getProcessesForLevel(sLevel) {
    return getProcessObjects(_processXml.selectNodes("//z:row[@ows_Level='" + sLevel + "']"));
}
//returns a process with the given process id
function getProcess(sProcessId) {
    return getProcessObject(_processXml.selectSingleNode("//z:row[@ows_ID='" + sProcessId + "']"));
}

function getCatalogedProcess(sId) {
    return _catalog[sId];
}










