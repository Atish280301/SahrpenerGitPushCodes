function application(event){
    event.preventDefault();
    let uname = event.target.Fullname.value;
    let umail = event.target.Mail.value;
    let ubranch = event.target.Branch.value;

    let object = {
        ExpenseAmount: uname,
        Description: umail,
        Category: ubranch
    }
    let objs = JSON.parse(localStorage.getItem(document.getElementById('ML').value) || '[]');
    objs.push(object);

    localStorage.setItem(document.getElementById('ML').value,JSON.stringify(objs));

    setTimeout(function(){
        document.getElementById('FN').value = "";
        document.getElementById('ML').value = "";
        document.getElementById('brc').value = "Option";
    }, 2000);
    display(umail);
}
function display(umail){
    let ul = document.getElementById('unls');
    let datafromlocalstorage = JSON.parse(localStorage.getItem(umail)||'[]');

    /*How To Add Data As A List */
    datafromlocalstorage.forEach((entry) => {
        let li = document.createElement("li");
        li.className = "LI";
        let pp = document.createElement("p");
        pp.className = "PLI";
        pp.textContent = `${entry.ExpenseAmount} ${entry.Description} ${entry.Category}`;

        /*Add Delete Button In List & Operation*/
        let deletebutton = document.createElement("button");
        deletebutton.textContent = "Delete";
        deletebutton.className = "dlt";
        deletebutton.addEventListener("click",()=>{
            let index = Array.from(ul.children).indexOf(li);
            datafromlocalstorage.splice(index, 1);
            localStorage.removeItem(umail, JSON.stringify(datafromlocalstorage));
            ul.removeChild(li);
        });

        /*Add Edit Button In List & Operation*/
        let editbtn = document.createElement("button");
        editbtn.className = "edt";
        editbtn.textContent = "Edit";
        editbtn.addEventListener("click",() =>{
            let index = Array.from(ul.children).indexOf(li);
            datafromlocalstorage.splice(index, 1);
            localStorage.removeItem(umail,JSON.stringify(datafromlocalstorage));

            let frname = document.getElementById('FN'); 
            frname.value = entry.ExpenseAmount;

            let usrmail = document.getElementById('ML');
            usrmail.value = entry.Description;

            let brch = document.getElementById('brc');
            brch.value = entry.Category;
            
            ul.removeChild(li);
        });

        li.appendChild(pp);
        li.appendChild(editbtn);
        li.appendChild(deletebutton);
        ul.appendChild(li);
    });
}