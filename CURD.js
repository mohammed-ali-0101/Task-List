
let tasks=[
    {
        "title":"قراءة كتاب",
        "date":"1/4/2022",
        "isDon":false
    },

    {
        "title":"انهاء كورس الجافاسكريبت",
        "date":"1/4/2022",
        "isDon":false
    },

    {
        "title":"انهاء المشروع النهائي",
        "date":"1/4/2022",
        "isDon":true
    }
]
 function getItemFromStorage(){
    let retrivedTask=JSON.parse(localStorage.getItem("MyTasks"));
    if(retrivedTask==null){
       tasks=[]  
      }else{
        tasks=retrivedTask
      }
      
 }
 getItemFromStorage();

 function fillTaskOnThePage(){
    document.getElementById("list-task").innerHTML="";
    let index=0;
    for(task of tasks){
       let content=
       `
               <div class="task ${task.isDon? "done" : ""} " >
                       <div class="task-info">
                           <h2>${task.title}</h2>
                           <span>
                               <span class="material-symbols-outlined history">
                               calendar_month
                               </span>
                               ${task.date}
                           </span>
                       </div>
   
                       <div class="action">
                               <button onclick="deleteTask(${index})" class="delet">
                                   <span  class="material-symbols-outlined">
                                   delete
                                   </span>
                               </button>

                               ${task.isDon? `
                                <button onclick="ToggleTaskDone(${index})" class="cancel">
                                <span class="material-symbols-outlined">
                                cancel
                                </span>
                                </button>
                               ` : `
                               <button onclick="ToggleTaskDone(${index})" class="check">
                                   <span class="material-symbols-outlined">
                                   done
                                   </span>
                               </button>
                               `
                               }
                               
                               <button onclick="changeTaskTitle(${index})" class="edit">
                                   <span class="material-symbols-outlined">
                                   edit
                                   </span>
                               </button>
                       </div>
               </div>
    `
    document.getElementById("list-task").innerHTML+=content; 
    index++;
    }
 }


 fillTaskOnThePage()
document.getElementsByClassName("add")[0].addEventListener("click" , function(){
    let now=new Date();
    let date=`${now.getDate()}/${now.getMonth() + 1} /${now.getFullYear()}`
    let taskName=prompt("الرجاء ادخال عنوان المهمة");
    if(taskName){
        let taskOjcName={
            "title":`${taskName}`,
            "date":date,
             "isDone":false
         }
        tasks.push(taskOjcName);
        storTasks();
        fillTaskOnThePage()
    }
    
})


 
function deleteTask(index){
   let idexTitle=tasks[index];
    let checkMessag= confirm("هل انت متأكد من حذف مهمة: "+ idexTitle.title);
    if(checkMessag){
        tasks.splice(index , 1);
        storTasks();
        fillTaskOnThePage()
    }

}

function changeTaskTitle(index){
  let newTaskTitle=prompt("الرجاء ادخال عنوان المهمة الجديد" ,tasks[index].title )
 if(newTaskTitle){
    tasks[index].title=newTaskTitle;
    storTasks();
       fillTaskOnThePage()
 }
}

function ToggleTaskDone(index){
    tasks[index].isDon=!tasks[index].isDon; 
    storTasks();
    fillTaskOnThePage()
}


 function storTasks(){
    let stringArray=JSON.stringify(tasks);
    localStorage.setItem("MyTasks" , stringArray);
 }