 
 var data = {};
 var id=0;
 var totalTasks = 0;
 var pendingTaskNumbers = 0 ;
 var completedTaskNumbers = 0;

var addTask = function (taskName){

		data[++id] = {};
		data[id].name = taskName;
		data[id].status = 0;
		data[id].display = 1;
		
		++totalTasks;
		++pendingTaskNumbers;
		displayTasks();
		
};

function validate(){
	var name = document.getElementById("taskName").value;
  if(name.length < 4){
  	alert("Task name length should be greater than 4.")
    document.getElementById("taskName").focus();
  }
  else{
	document.getElementById("taskName").value="";  
  	addTask(name);
  }
}

function changeTask(id){
	var status = data[id].status;
	if(status == 1)
	{
		data[id].status = 0;
		--completedTaskNumbers;
		++pendingTaskNumbers;
	}
	else
	{
		data[id].status = 1;
		--pendingTaskNumbers;
		++completedTaskNumbers;	
	}
	displayTasks();
}


function deleteTask(id){
	data[id].display = 0;
	--totalTasks;
	if(data[id].status == 0){
		--pendingTaskNumbers;
	}
	else{
		--completedTaskNumbers;
	}
	displayTasks();
}


function displayTasks(){
	
	var myNode = document.getElementById("pendingtasks");
	while ((child = myNode.lastChild)) {
 		 myNode.removeChild(child);
	}
	
	myNode = document.getElementById("completedtasks");
	while ((child = myNode.lastChild)) {
 		 myNode.removeChild(child);
	}
	

	for ( var id in data) {	
	
		if(data[id].display != 0)
		{

   		 var cTag = document.createElement("div");

   		 cTag.setAttribute("id", id); 
   		 cTag.setAttribute("name", "pendingtask");
	
		  var checkTag = document.createElement("input");
		  checkTag.setAttribute("type","checkbox");
			checkTag.setAttribute("onclick","changeTask("+id+");");
			
	  
			var spanTag = document.createElement("span");
			spanTag.setAttribute("style", "width:100px;display:inline-block");
			spanTag.innerHTML = "&nbsp;"+data[id]["name"];
		
		  var deleteTag = document.createElement("a");
		  deleteTag.setAttribute("href","javascript:deleteTask("+id+");");
		  deleteTag.innerHTML = "Delete";
	  
	  	if(data[id]["status"] == 1){
				pTag = document.getElementById('completedtasks');
				checkTag.setAttribute("checked","checked");
			}
			else{
				pTag = document.getElementById('pendingtasks');
			}
		
	 	 pTag.appendChild(cTag);
	  
	 	 cTag.appendChild(checkTag);
		 cTag.appendChild(spanTag);
		 cTag.appendChild(deleteTag);

		}
		pt = (pendingTaskNumbers != 0) ? +(pendingTaskNumbers/totalTasks*100).toFixed(2) : 0
		ct = (completedTaskNumbers != 0) ? +(completedTaskNumbers/totalTasks*100).toFixed(2) : 0
		document.getElementById("pendingPercent").innerHTML = pt+"%";
		document.getElementById("completedPercent").innerHTML = ct+"%";
	}
	
}

