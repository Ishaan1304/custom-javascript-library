//This will finally be part of TMJRock Javascript Library

function $$$(cid){
let element=document.getElementById(cid);
if(!element) throw "Invalid id:" +cid;
return new TMJRockElement(element);
}

$$$.model={
"onStartup":[],
"accordians":[],
"modals":[]
};

//modal specific code starts here
$$$.modals={};

$$$.modals.show=function(mid)
{
var modal=null;
for(var i=0;i<$$$.model.modals.length;i++)
{
if($$$.model.modals[i].getContentId()==mid)
{
modal=$$$.model.modals[i];
break;
}
}
if(modal==null) return;
modal.show();
}

//following is a class
function Modal(cref)
{
var objectAddress=this;
this.aferOpening=null;
this.beforeOpening=null;
this.beforeClosing=null
this.afterClosing=null;
var contentReference=cref;
this.getContentId=function(){
return contentReference.id;
}
var contentParentReference=contentReference.parentElement;
var contentIndex=0;
while(contentIndex<contentParentReference.children.length)
{
if(contentReference==contentParentReference.children[contentIndex])
{
break;
}
contentIndex++;
}

var modalMaskDivision=document.createElement("div");
modalMaskDivision.style.display="none";
modalMaskDivision.classList.add("tmjrock_modalMask");
var modalDivision=document.createElement("div");
modalDivision.style.display="none";
modalDivision.classList.add("tmjrock_modal");
document.body.appendChild(modalMaskDivision);
document.body.appendChild(modalDivision);
var headerDivision=document.createElement("div");
headerDivision.style.background="#D5F3FE";
headerDivision.style.right="0";
headerDivision.style.height="25px";
headerDivision.style.padding="5px";
headerDivision.style.borderRadius="24px 24px 0px 0px";
modalDivision.appendChild(headerDivision);

if(contentReference.hasAttribute("size"))
{
var sz=contentReference.getAttribute("size");
let xpos=sz.indexOf("x");
if(xpos==-1) xpos=sz.indexOf("X");
if(xpos==-1) throw "In case of modal size should be specified as widthxheight";
if(xpos==0 || xpos==sz.length-1) throw "In case of modal size should be specified as widthxheight";
let width=sz.substring(0,xpos);
let height=sz.substring(xpos+1);
modalDivision.style.width=width+"px";
modalDivision.style.height=height+"px";
}
else
{
modalDivision.style.width="300px";
modalDivision.style.height="300px";
}


if(contentReference.hasAttribute("header"))
{
var hd=contentReference.getAttribute("header");
headerDivision.innerHTML=hd;
}


if(contentReference.hasAttribute("maskColor"))
{
var mkc=contentReference.getAttribute("maskColor");
modalMaskDivision.style.background=mkc;
}

if(contentReference.hasAttribute("modalBackgroundColor"))
{
var mbc=contentReference.getAttribute("modalBackgroundColor");
modalDivision.style.background=mbc;
}


var contentDivision=document.createElement("div");
//contentDivision.style.border="1px Solid Black";
contentDivision.style.height=(modalDivision.style.height.substring(0,modalDivision.style.height.length-2)-100)+"px";
contentDivision.style.width="98%";
contentDivision.style.overflow="auto";
contentDivision.style.padding="5px";

contentReference.remove();
contentDivision.appendChild(contentReference);
contentReference.style.display='block';
contentReference.style.visibility='visible';
modalDivision.appendChild(contentDivision);


var footerDivision=document.createElement("div");
footerDivision.style.background="pink";
footerDivision.style.left="0";	
footerDivision.style.right="0";
footerDivision.style.height="25px";
footerDivision.style.position="absolute";
footerDivision.style.bottom="0";
footerDivision.style.padding="5px";
footerDivision.style.borderRadius="0px 0px 24px 24px";
modalDivision.appendChild(footerDivision);


if(contentReference.hasAttribute("footer"))
{
var ft=contentReference.getAttribute("footer");
footerDivision.innerHTML=ft;
}


var closeButtonSpan=null;
if(contentReference.hasAttribute("closeButton"))
{
var cb=contentReference.getAttribute("closeButton");
if(cb.toUpperCase()=="TRUE")
{
closeButtonSpan=document.createElement("span");
closeButtonSpan.classList.add("tmjrock_closeButton");
var closeButtonMarker=document.createTextNode("x");
closeButtonSpan.appendChild(closeButtonMarker);
headerDivision.appendChild(closeButtonSpan);
}
}

if(contentReference.hasAttribute("beforeOpening"))
{
var oo=contentReference.getAttribute("beforeOpening");
this.beforeOpening=oo;
}

if(contentReference.hasAttribute("afterOpening"))
{
var oo=contentReference.getAttribute("afterOpening");
this.afterOpening=oo;
}

if(contentReference.hasAttribute("beforeClosing"))
{
var oc=contentReference.getAttribute("beforeClosing");
this.beforeClosing=oc;
}

if(contentReference.hasAttribute("afterClosing"))
{
var oc=contentReference.getAttribute("afterClosing");
this.afterClosing=oc;
}


this.show=function(){
let openModal=true;
if(objectAddress.beforeOpening) 
{
openModal=eval(objectAddress.beforeOpening);
}
if(openModal)
{
modalMaskDivision.style.display="block";
modalDivision.style.display="block";
if(this.afterOpening) setTimeout(function(){eval(objectAddress.afterOpening);},100);
}
};

if(closeButtonSpan!=null)
{
closeButtonSpan.onclick=function(){
let closeModal=true;
if(objectAddress.beforeClosing)
{
closeModal=eval(objectAddress.beforeClosing);
}
if(closeModal)
{
modalDivision.style.display="none";
modalMaskDivision.style.display="none";
if(objectAddress.afterClosing) setTimeout(function(){eval(objectAddress.afterClosing);},100);
}
};
}
}




//modal specific code ends here




$$$.accordianHeadingClicked=function(accordianIndex,panelIndex){
//alert(accordianIndex+","+panelIndex);
if($$$.model.accordians[accordianIndex].expandedIndex!=-1) $$$.model.accordians[accordianIndex].panels[$$$.model.accordians[accordianIndex].expandedIndex].style.display='none';
$$$.model.accordians[accordianIndex].panels[panelIndex+1].style.display=$$$.model.accordians[accordianIndex].panels[panelIndex+1].oldDisplay;
$$$.model.accordians[accordianIndex].expandedIndex=panelIndex+1;
}

$$$.toAccordian=function(accord){
let panels=[];
let expandedIndex=-1;
let children=accord.childNodes;
let x;
for(x=0;x<children.length;x++)
{
//alert(children[x].nodeName);
if(children[x].nodeName=="H3")
{
panels[panels.length]=children[x];
}
if(children[x].nodeName=="DIV")
{
panels[panels.length]=children[x];
}
}
if(panels.length%2!=0) throw "Headings and Division malformed to create accordian";
for(x=0;x<panels.length;x+=2)
{
if(panels[x].nodeName!="H3") throw "Headings and Division malformed to create accordian";
if(panels[x+1].nodeName!="DIV") throw "Headings and Division malformed to create accordian";
}
function createClickHandler(accordianIndex,panelIndex)
{
return function(){
$$$.accordianHeadingClicked(accordianIndex,panelIndex);
};
}
let accordianIndex=$$$.model.accordians.length;
for(x=0;x<panels.length;x+=2)
{
panels[x].onclick=createClickHandler(accordianIndex,x);
panels[x+1].oldDisplay=panels[x+1].style.display;
panels[x+1].style.display="none";
}

$$$.model.accordians[accordianIndex]={
"panels":panels,
"expandedIndex":-1
};
}

$$$.onDocumentLoaded=function(func){
if((typeof func)!="function") throw "Expected function, found"+(typeof func)+" is call to onDocumentLoaded";
$$$.model.onStartup[$$$.model.onStartup.length]=func;
}

$$$.initFramework=function(){
let allTags=document.getElementsByTagName("*");
let t=null;
let i=0;
let a=null;
for(i=0;i<allTags.length;i++)
{
t=allTags[i];
if(t.hasAttribute("accordian"))
{
a=t.getAttribute("accordian");
if(a=="true")
{
$$$.toAccordian(t);
}
}
}

let x=0;
while(x<$$$.model.onStartup.length)
{
$$$.model.onStartup[x]();
x++;
}

//setting up modal part starts here
var all=document.getElementsByTagName("*");
for(i=0;i<all.length;i++)
{
if(all[i].hasAttribute("forModal"))
{
if(all[i].getAttribute("forModal").toUpperCase()=="TRUE")
{
all[i].setAttribute("forModal","false");
$$$.model.modals[$$$.model.modals.length]=new Modal(all[i]);
i--;
}
}
} 
//setting up modal part ends here

}

 
 


function TMJRockElement(element)
{
this.element=element;

this.html=function(content){
if(typeof this.element.innerHTML=="string")
{
if((typeof content)=="string")
{
this.element.innerHTML=content;
}
return this.element.innerHTML;
}
return null;
}//html function ends here

this.value=function(content){
if(typeof this.element.value)
{
if((typeof content)=="string")
{
this.element.value=content;
}
return this.element.value;
}
return null;
}//value function ends here




this.fillComboBox=function(jsonObject)
{
if(this.element.nodeName!="SELECT") throw "fillComboBox can be called on a SELECT type object only";

let dataSource=jsonObject["dataSource"];
if(!dataSource) throw "dataSorce property should exist in call to ajax";
if(!(dataSource instanceof Array)) throw "Value of dataSource property should be of collection type";
if(dataSource.length==0) throw "Length of collection against dataSource property can not be 0";

let text=jsonObject["text"];
if(!text) throw "text property should exist in call to ajax";
if((typeof text)!="string") throw "text property should be string of type in call to ajax";
if(!dataSource[0][text]) throw "value of text property should exist as a property in elements of collection against dataSource property";

let value=jsonObject["value"]; 
if(!value) throw "value propety should exist in call to ajax";
if((typeof value)!="string") throw "value property should be of string type in call to ajax";
if(!dataSource[0][value]) throw "value of value property should exist as a property in elements of collection against dataSource property";

let length=this.element.length;
for(let i=length;i>=0;i--)
{
this.element.remove(i);
}

let firstOption=jsonObject["firstOption"];
if(firstOption)
{
let firstOptionText=firstOption["text"];
if(!firstOptionText) throw "text property should exist in json against firstOption property in call to ajax";
if((typeof firstOptionText)!="string") throw "text property in json object against firstOption property should be of string type in call to ajax";

let firstOptionValue=firstOption["value"];
if(!firstOptionValue) throw "Value property should exist in json against firstOption property in call to ajax";
if((typeof firstOptionValue)!="string") throw "Value property in json object against firstOption property should be of string type in call to ajax";

let obj=document.createElement('option');
obj.text=firstOptionText;
obj.value=firstOptionValue;
this.element.appendChild(obj)
}

length=dataSource.length;
for(let i=0;i<length;i++)
{
obj=document.createElement('option');
obj.text=dataSource[i][text];
obj.value=dataSource[i][value];
this.element.appendChild(obj);
}

}//fillComboBox function ends


}//class TMJRockElement ends

$$$.ajax=function(jsonObject)
{

if(!jsonObject["url"]) throw "url property is missing in call to ajax";
let url=jsonObject["url"];
if(typeof url!="string") throw "url property should be of string type in call to ajax";

let methodType="GET";
if(jsonObject["methodType"])
{
methodType=jsonObject["methodType"];
if(typeof methodType!="string") throw "method property should be of string type in call to ajax";
methodType=methodType.toUpperCase();
if(["GET","POST"].includes(methodType)==false) throw "methodType should be GET/POST in call to ajax";
}

let onSuccess=null;
if(jsonObject["success"])
{
onSuccess=jsonObject["success"];
if(typeof onSuccess!="function") throw "success property should be a function in call to ajax";
}

let onFailure=null;
if(jsonObject["failure"])
{
onFailure=jsonObject["failure"];
if(typeof onFailure!="function") throw "failure property should be a function in call to ajax";
}

if(methodType=="GET")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
};

if(jsonObject["data"])
{
let jsonData=jsonObject["data"];
let queryString="";
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
url=url+queryString;
}

xmlHttpRequest.open(methodType,url,true);
xmlHttpRequest.send();
}//get part ends here

if(methodType=="POST")
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText;
if(onSuccess) onSuccess(responseData);
}
else
{
if(onFailure) onFailure();
}
}
}; 

let jsonData={};
let sendJSON=jsonObject["sendJSON"];
if(!sendJSON) sendJSON=false;
if((typeof sendJSON)!="boolean") throw "sendJSON property must be of type boolean in ajax call";
let queryString="";
if(jsonObject["data"])
{
if(sendJSON)
{
jsonData=jsonObject["data"];
}
else
{
queryString;
let qsName;
let qsValue;
let xx=0;
for(k in jsonData)
{
//if(xx==0) queryString="?";
if(xx>0) queryString+="&";
xx++;
qsName=encodeURI(k);
qsValue=encodeURI(jsonData[k]);
queryString=queryString+qsName+"="+qsValue;
}
}
}
xmlHttpRequest.open(methodType,url,true);
if(sendJSON)
{
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(jsonData));
}
else
{
xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xmlHttpRequest.send(queryString);
}
}
}

window.addEventListener('load',function(){
$$$.initFramework();
});

$$$.validate=function(parameter){
var element=document.getElementById(parameter);
if(element.nodeName=="FORM")
{
return {
"isValid": function(dict){
var valid=true;
var firstInvalidInput=null;
var keys=Object.keys(dict);
var form=element;
var formElement;
var dictElement;
var dictElementKeys;
//alert(form.elements.namedItem("gender").type);
//alert(form.ml.type);
//alert(form.elements.namedItem("gender").type);
formElements=form.elements;
for(var i=0;i<keys.length;i++)
{
formElement=form.elements.namedItem(keys[i]);
//alert(form.elements.namedItem(keys[i]).value);
dictElement=dict[keys[i]];
dictElementKeys=Object.keys(dictElement);
//alert(formElement.type);
if(formElement.type=="text")
{
document.getElementById(dictElement["error-pane"]).innerHTML="";
if(dictElementKeys.includes("required") && dictElement["required"] && formElement.value.trim().length==0)
{
document.getElementById(dictElement["error-pane"]).innerHTML=dictElement.error["required"];
valid=false;
if(firstInvalidInput==null) firstInvalidInput=formElement;
}
if(dictElementKeys.includes("max-length") && formElement.value.trim().length>dictElement["max-length"] )
{
document.getElementById(dictElement["error-pane"]).innerHTML=dictElement.error["max-length"];
valid=false;
if(firstInvalidInput==null) firstInvalidInput=formElement;
}
}

if(formElement.type=="textarea")
{
document.getElementById(dictElement["error-pane"]).innerHTML="";
if(dictElementKeys.includes("required") && dictElement["required"] && formElement.value.trim().length==0)
{
document.getElementById(dictElement["error-pane"]).innerHTML=dictElement.error["required"];
valid=false;
if(firstInvalidInput==null) firstInvalidInput=formElement;
}
}


if(formElement.type=="select-one")
{
document.getElementById(dictElement["error-pane"]).innerHTML="";
if(dictElementKeys.includes("invalid") && formElement.value==dictElement["invalid"])
{
//alert(dictElement["error-pane"]);
//alert(dictElement.error["required"]);
document.getElementById(dictElement["error-pane"]).innerHTML=dictElement.error["invalid"];
valid=false;
if(firstInvalidInput==null) firstInvalidInput=formElement;
}
}
if(formElement instanceof RadioNodeList)
{
document.getElementById(dictElement["error-pane"]).innerHTML="";
if(dictElementKeys.includes("required")  && formElement.value=="")
{
document.getElementById(dictElement["error-pane"]).innerHTML=dictElement.error["required"];
valid=false;
}
}
if(formElement.type=="checkbox")
{
if(dictElementKeys.includes("required-state") && dictElement["required-state"]!=formElement.checked && dictElement["display-alert"])
{
alert(dictElement.error["required-state"]);
}
}
}
if(!valid) firstInvalidInput.focus();
return valid;
}
};
}
}

//TMJRock part ends here

