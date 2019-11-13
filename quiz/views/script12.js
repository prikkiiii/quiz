var http=new XMLHttpRequest();
var xhttp=new XMLHttpRequest();
var ahttp=new XMLHttpRequest();
var aAddNewQuestion=document.getElementById("aAddNewQuestion");
var divAddQuestion=document.getElementById("divAddQuestion");
var divListQuestions=document.getElementById("divListQuestions");
var activeuser=getActiveUser();
var start=0;
var limit=5;
var index=start+1;

function storeActiveUser(activeuser)
{
  localStorage.activeuser=JSON.stringify(activeuser);
}

function getActiveUser()
{
  if(!localStorage.activeuser)
  {
    localStorage.activeuser=JSON.stringify("");
  }
    return JSON.parse(localStorage.activeuser);
}



function getStoredQuestions()
{
  xhttp.open('GET','/questions?since='+start+'&per_page='+limit);
  xhttp.send();
  xhttp.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (xhttp.readyState == 4 && xhttp.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      let questions = JSON.parse(xhttp.responseText) ;
      if(Array.isArray(questions)  && questions.length )
      {
        questions.forEach(function(question)
                      {
                        addToDOM(question);
                      });
                      getQuestionCount();
      }
    }
    else
    {
        // An error occurred during the request.
       console.log(xhttp.status) ;
    }
  };
}

var divnextprev=document.getElementById("divnextprev");
var divnextprev1=document.getElementById("divnextprev1");

function getQuestionCount()
{
  var rxhr=new XMLHttpRequest();
  rxhr.open("GET",'/getQuestionCount');
  rxhr.send();
  rxhr.onreadystatechange=function()
{
    // readyState 4 means the request is done.
    // status 200 is a successful return.
    if (rxhr.readyState == 4 && rxhr.status == 200)
    {
      //document.getElementById("users").innerHTML = xhttp.responseText; // 'This is the output.'
      var count1 = JSON.parse(rxhr.responseText);
      var count=count1.count2;
      createButtons(count);
      createButtons1(count);
    }
    else
    {
        // An error occurred during the request.
       console.log(rxhr.status) ;
    }
  };
}

function createButtons(count)
{

var next=document.createElement("button");
next.innerHTML="Next";
next.setAttribute("style","width:100px;height:25px");
next.addEventListener("click",function(event){
  nextFunction();
});
if(start+limit>=count)
{
  next.disabled=true;
}


var prev=document.createElement("button");
prev.innerHTML="Previous";
prev.setAttribute("style","width:100px;height:25px");
prev.addEventListener("click",function(event){
  prevFunction();
});
if(start-limit<0)
{
  prev.disabled=true;
}
divnextprev.appendChild(prev);
divnextprev.appendChild(next);
}

function createButtons1(count)
{

var next1=document.createElement("button");
next1.innerHTML="Next";
next1.setAttribute("style","width:100px;height:25px");
next1.addEventListener("click",function(event){
  nextFunction();
});
if(start+limit>=count)
{
  next1.disabled=true;
}


var prev1=document.createElement("button");
prev1.innerHTML="Previous";
prev1.setAttribute("style","width:100px;height:25px");
prev1.addEventListener("click",function(event){
  prevFunction();
});
if(start-limit<0)
{
  prev1.disabled=true;
}
divnextprev1.appendChild(prev1);
divnextprev1.appendChild(next1);
}


function nextFunction()
{
start+=5;
divListQuestions.innerHTML="";
divnextprev.innerHTML="";
divnextprev1.innerHTML="";
index=start+1;

getStoredQuestions();

}

function prevFunction()
{
divListQuestions.innerHTML="";
divnextprev.innerHTML="";
divnextprev1.innerHTML="";
start-=5;
index=start+1;
getStoredQuestions();

}

aAddNewQuestion.addEventListener("click",function(event)
{  //unhideAddNewProductLink(divAddProduct);
  addNewQuestion();
});

function addNewQuestion(){

  hideAddNewQuestionLink(aAddNewQuestion);
  var formAddQuestion=document.createElement("form");
  formAddQuestion.setAttribute("name","formEditQuestion");
//  formAddProduct.setAttribute("onsubmit","addToObject()");
  formAddQuestion.setAttribute("action","/addQuestion");
  formAddQuestion.setAttribute("method","POST");

  var labelAddQuestion=document.createElement("label");
  labelAddQuestion.innerHTML="Enter element details";
  formAddQuestion.appendChild(labelAddQuestion);

  addSpace(formAddQuestion,2);

  var inputQuestionName=document.createElement("input");
  inputQuestionName.setAttribute("name","Name");
  inputQuestionName.setAttribute("type","text");
  inputQuestionName.setAttribute("placeholder","Enter question");
  inputQuestionName.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionName);

  addSpace(formAddQuestion,2);

  var labelQuestionDescp=document.createElement("label");
  labelQuestionDescp.innerHTML="Question details";
  formAddQuestion.appendChild(labelQuestionDescp);

  addSpace(formAddQuestion,2);

  var inputQuestionDescp=document.createElement("textarea");
  inputQuestionDescp.setAttribute("name","Descp");
  inputQuestionDescp.setAttribute("type","text");
  inputQuestionDescp.setAttribute("placeholder","Enter product description");
  inputQuestionDescp.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionDescp);

  addSpace(formAddQuestion,2);
  var labelQuestionOption1=document.createElement("INPUT");
  labelQuestionOption1.setAttribute("type","radio");
  formAddQuestion.appendChild(labelQuestionOption1);
  addSpace(formAddQuestion,2);


  var inputQuestionOption1=document.createElement("textarea");
  inputQuestionOption1.setAttribute("name","option1");
  inputQuestionOption1.setAttribute("type","text");
  inputQuestionOption1.setAttribute("placeholder","option 1");
  formAddQuestion.appendChild(inputQuestionOption1);
  addSpace(formAddQuestion,2);


  var labelQuestionOption2=document.createElement("INPUT");
  labelQuestionOption2.setAttribute("type","radio");
  labelQuestionOption2.setAttribute("placeholder","option 2");
  formAddQuestion.appendChild(labelQuestionOption2);
  addSpace(formAddQuestion,2);

  var inputQuestionOption2=document.createElement("textarea");
  inputQuestionOption2.setAttribute("name","option2");
  inputQuestionOption2.setAttribute("type","text");
  inputQuestionOption2.setAttribute("placeholder","option 3");
  formAddQuestion.appendChild(inputQuestionOption2);
  addSpace(formAddQuestion,2);

  var labelQuestionOption3=document.createElement("INPUT");
  labelQuestionOption3.setAttribute("type","radio");
  labelQuestionOption3.setAttribute("placeholder","option 3");
  formAddQuestion.appendChild(labelQuestionOption3);
  addSpace(formAddQuestion,2);

  var inputQuestionOption3=document.createElement("textarea");
  inputQuestionOption3.setAttribute("name","option3");
  inputQuestionOption3.setAttribute("type","text");
  inputQuestionOption3.setAttribute("placeholder","option 3");
  formAddQuestion.appendChild(inputQuestionOption3);
  addSpace(formAddQuestion,2);

  var labelQuestionOption4=document.createElement("INPUT");
  labelQuestionOption4.setAttribute("type","radio");
  labelQuestionOption4.setAttribute("placeholder","option 4");
  formAddQuestion.appendChild(labelQuestionOption4);
  addSpace(formAddQuestion,2);
  var inputQuestionOption4=document.createElement("textarea");
  inputQuestionOption4.setAttribute("name","option4");
  inputQuestionOption4.setAttribute("type","text");
  inputQuestionOption4.setAttribute("placeholder","option 4");
  formAddQuestion.appendChild(inputQuestionOption4);
  addSpace(formAddQuestion,2);

  var labelAddAnswer=document.createElement("label");
  labelAddAnswer.innerHTML="Answer";
  formAddQuestion.appendChild(labelAddAnswer);


  var inputQuestionanswer=document.createElement("textarea");
  inputQuestionanswer.setAttribute("name","answer");
  inputQuestionanswer.setAttribute("type","text");
  inputQuestionanswer.setAttribute("placeholder","option 4");
  inputQuestionanswer.setAttribute("style","width:40%");
  formAddQuestion.appendChild(inputQuestionanswer);
  addSpace(formAddQuestion,2);

  var btnSubmit=document.createElement("input");
  btnSubmit.setAttribute("type","submit");
  btnSubmit.setAttribute("name","btnSubmit");
  btnSubmit.setAttribute("style","width:20%;height:25px");
  btnSubmit.innerHTML="Submit";
  formAddQuestion.appendChild(btnSubmit);

//  addSpace(divAddProduct,2);

  var btnCancel=document.createElement("button");
  btnCancel.setAttribute("name","btnCancel");
  btnCancel.setAttribute("style","width:20%;height:25px");
  btnCancel.innerHTML="Cancel";
  formAddQuestion.appendChild(btnCancel);
  divAddQuestion.appendChild(formAddQuestion);

btnCancel.addEventListener("click",function(event)
{
  deleteQuestionForm();
  unhideAddNewQuestionLink(aAddNewQuestion);
});
}

function deleteQuestionForm(){
  var childNodes = divAddQuestion.childNodes;
  for (var i = 0; childNodes.length > 0;)
  {
    divAddQuestion.removeChild(childNodes[i]);
  }
}

function unhideAddNewQuestionLink(target)
{
  target.setAttribute("style","visibility:visible");
}

function addSpace(target,number){
  for(var i=0;i<number;i++)
  {
    var blankLine=document.createElement("br");
    target.appendChild(blankLine);
  }
}

function hideAddNewQuestionLink(target)
{
  target.setAttribute("style","visibility:hidden");
}

function addToDOM(objectQuestion){
  var divQuestionAdded=document.createElement("div");
    divQuestionAdded.setAttribute("id",objectQuestion._id);
  //  divProductAdded.setAttribute("style","background-color:#ffe6e6;padding:20px;width:100px");
    var txtQuestionName=document.createElement("p");
    txtQuestionName.innerHTML=index+".<br><br>"+objectQuestion.Name;
    index++;

    var txtQuestionDesc=document.createElement("p");
    txtQuestionDesc.innerHTML=objectQuestion.Description;

    var txtQuestionOption1=document.createElement("p");
    txtQuestionOption1.innerHTML=objectQuestion.option1;
    var txtQuestionOption2=document.createElement("p");
    txtQuestionOption2.innerHTML=objectQuestion.option2;
    var txtQuestionOption3=document.createElement("p");
    txtQuestionOption3.innerHTML=objectQuestion.option3;
    var txtQuestionOption4=document.createElement("p");
    txtQuestionOption4.innerHTML=objectQuestion.option4;
    var txtQuestionAnswer=document.createElement("p");
    txtQuestionAnswer.innerHTML=objectQuestion.answer;

    var btnEdit=document.createElement("button");
    btnEdit.setAttribute("id",objectQuestion._id);
    btnEdit.innerHTML="Edit";
    btnEdit.setAttribute("style","width:70px;height:25px");

    var btnDelete=document.createElement("button");
    btnDelete.setAttribute("id","btnDelete");
    btnDelete.innerHTML="Delete";
    btnDelete.setAttribute("style","width:70px;height:25px");

    divQuestionAdded.appendChild(txtQuestionName);
    divQuestionAdded.appendChild(txtQuestionDesc);
    divQuestionAdded.appendChild(txtQuestionOption1);
    divQuestionAdded.appendChild(txtQuestionOption2);
    divQuestionAdded.appendChild(txtQuestionOption3);
    divQuestionAdded.appendChild(txtQuestionOption4);
    divQuestionAdded.appendChild(txtQuestionAnswer);
    
    divQuestionAdded.appendChild(btnEdit);
    divQuestionAdded.appendChild(btnDelete);
    divListQuestions.appendChild(divQuestionAdded);


  btnEdit.addEventListener("click",function(event)
  {
    xhttp.open('GET','/getToBeEditedQuestion?number='+btnEdit.id);
  xhttp.send();
    xhttp.onreadystatechange=function()
  {
      // readyState 4 means the request is done.
      // status 200 is a successful return.
      if (xhttp.readyState == 4 && xhttp.status == 200)
      {
        let question = JSON.parse( xhttp.responseText) ;
          console.log(question);
          editQuestion(question);
      }
      else
      {
          // An error occurred during the request.
         console.log(xhttp.status) ;
      }
    };
  });
  btnDelete.addEventListener("click",function(event)
  {
    http.open("POST",'/deletequestion',true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      location.reload();
    }
}
http.send('number='+objectQuestion._id);
  });
  unhideAddNewQuestionLink(aAddNewQuestion);
  deleteQuestionForm();
}

function editQuestion(question){

  hideAddNewQuestionLink(aAddNewQuestion);
  var formEditQuestion=document.createElement("div");
/*  formEditProduct.setAttribute("name","formEditProduct");
//  formEditProduct.setAttribute("onsubmit","addToObject()");
  formEditProduct.setAttribute("action","/editProduct");
  formEditProduct.setAttribute("method","POST");*/

  var labelAddQuestion=document.createElement("label");
  labelAddQuestion.innerHTML="Enter element details";
  formEditQuestion.appendChild(labelAddQuestion);

  addSpace(formEditQuestion,2);

  var inputQuestionName=document.createElement("input");
  inputQuestionName.setAttribute("name","Name");
  inputQuestionName.setAttribute("type","text");
  inputQuestionName.setAttribute("value",question.Name);
  inputQuestionName.setAttribute("placeholder","Enter question name");
  inputQuestionName.setAttribute("style","wnameth:40%");
  formEditQuestion.appendChild(inputQuestionName);

  addSpace(formEditQuestion,2);

  var labelQuesDescp=document.createElement("label");
  labelQuesDescp.innerHTML="Question Description";
  formEditQuestion.appendChild(labelQuesDescp);

  addSpace(formEditQuestion,2);

  var inputQuestionDescp=document.createElement("textarea");
  inputQuestionDescp.setAttribute("name","Descp");
  inputQuestionDescp.setAttribute("type","text");
  inputQuestionDescp.innerHTML=question.Description;
  inputQuestionDescp.setAttribute("placeholder","Enter question description");
  inputQuestionDescp.setAttribute("style","width:40%");
  inputQuestionDescp.appendChild(inputQuestionDescp);



  addSpace(formEditQuestion,2);
  var inputQuestionOption1=document.createElement("input")
  inputQuestionOption1.setAttribute("type","radio");
  inputQuestionOption1.setAttribute("name","option1");
  inputQuestionOption1.setAttribute("value",question.option1);
  formEditQuestion.appendChild(inputQuestionOption1);

  addSpace(formEditQuestion,2);
  var inputQuestionOption2=document.createElement("input")
  inputQuestionOption2.setAttribute("type","radio");
  inputQuestionOption2.setAttribute("name","option2");
  inputQuestionOption2.setAttribute("value",question.option2);
  formEditQuestion.appendChild(inputQuestionOption2);

  addSpace(formEditQuestion,2);
  var inputQuestionOption3=document.createElement("input")
  inputQuestionOption3.setAttribute("type","radio");
  inputQuestionOption3.setAttribute("name","option3");
  inputQuestionOption3.setAttribute("value",question.option3);
  formEditQuestion.appendChild(inputQuestionOption3);

  addSpace(formEditQuestion,2);
  var inputQuestionOption4=document.createElement("input")
  inputQuestionOption4.setAttribute("type","radio");
  inputQuestionOption4.setAttribute("name","option4");
  inputQuestionOption4.setAttribute("value",question.option4);
  formEditQuestion.appendChild(inputQuestionOption4);
  addSpace(formEditQuestion,2);
  var inputQuestionAnswer=document.createElement("input")
  inputQuestionAnswer.setAttribute("type","text");
  inputQuestionAnswer.setAttribute("name","answer");
  inputQuestionAnswer.setAttribute("value",question.answer);
  formEditQuestion.appendChild(inputQuestionAnswer);
  addSpace(formEditQuestion,2);
  var btnEdit=document.createElement("button");
  //btnSubmit.setAttribute("type","submit");
  btnEdit.setAttribute("id:",question._id);
  btnEdit.setAttribute("name","btnEdit");
  btnEdit.setAttribute("style","width:20%;height:25px");
  btnEdit.innerHTML="Submit";
  formEditQuestion.appendChild(btnEdit);

//  addSpace(divAddProduct,2);

  var btnCancel=document.createElement("button");
  btnCancel.setAttribute("name","btnCancel");
  btnCancel.setAttribute("style","width:20%;height:25px");
  btnCancel.innerHTML="Cancel";
  formEditQuestion.appendChild(btnCancel);
  divAddQuestion.appendChild(formEditQuestion);

  btnEdit.addEventListener("click",function(event)
  {
    var num=question._id;
    var name=inputQuestionName.value;
    var descp=inputQuestionDescp.value;
    var option1=inputQuestionOption1.value;
    var option2=inputQuestionOption2.value;
    var option3=inputQuestionOption3.value;
    var option4=inputQuestionOption4.value;
    var answer=inputQuestionAnswer.value;

    ahttp.open("POST",'/editQuestion',true);
    ahttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ahttp.send('number='+num+'&name='+name+'&descp='+descp+'&option1='+option1+'&option2='+option2+'&option3='+option3+'&option4='+option4+'&answer='+answer);
    ahttp.onreadystatechange = function() {
  if (ahttp.readyState == 4 && ahttp.status == 200) {
      //console.log(ahttp.responseText);

    }
}
location.reload(true) ;
  });

btnCancel.addEventListener("click",function(event)
{
  deleteQuestiobForm();
  unhideAddNewQuestionLink(aAddNewQuestion);
});
}


function userLogout()
{
  activeuser="";
  storeActiveUser(activeuser);
  location.reload();
}

var aAddQuestion=document.getElementById("aAddQuestion");
if(activeuser!="admin")
{
  aAddQuestion.style.display="none";
  aAddQuestion.style.visibility="hidden";
}

var txtWelcome=document.getElementById("txtWelcome");
var aLogin=document.getElementById("aLogin");
var aLogout=document.getElementById("aLogout");
var aRegister=document.getElementById("aRegister");
if(activeuser=="")
{
  txtWelcome.innerHTML="Welcome, Guest!";
  aLogout.style.display="none";
}
else {
  txtWelcome.innerHTML="Welcome, "+activeuser+"!";
  aLogin.style.display="none";
  aRegister.style.display="none";
}
