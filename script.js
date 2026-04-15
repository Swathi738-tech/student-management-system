let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let dept = document.getElementById("dept").value;
    let email = document.getElementById("email").value;

    if(!email.includes("@")){
        alert("Invalid email");
        return;
    }

    if(id===""){
        students.push({
            id: Date.now(),
            name,
            dept,
            email
        });
    } else {
        students = students.map(s =>
            s.id == id ? {id:Number(id), name, dept, email} : s
        );
    }

    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("form").reset();
    document.getElementById("id").value="";
    display();
});

function display(){
    let table = document.getElementById("table");
    table.innerHTML="";

    students.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.email}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="edit(${s.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="del(${s.id})">Delete</button>
            </td>
        </tr>`;
    });

    document.getElementById("count").innerText = students.length;
}

function edit(id){
    let s = students.find(x=>x.id===id);

    document.getElementById("id").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("dept").value = s.dept;
    document.getElementById("email").value = s.email;
}

function del(id){
    students = students.filter(s=>s.id!==id);
    localStorage.setItem("students", JSON.stringify(students));
    display();
}

function searchStudent(){
    let val = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(val)
    );

    let table = document.getElementById("table");
    table.innerHTML="";

    filtered.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.email}</td>
            <td>
                <button class="btn btn-success btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    });
}

function showPage(page){
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("studentPage").style.display = "none";

    if(page === "dashboard"){
        document.getElementById("dashboardPage").style.display = "block";
    } else {
        document.getElementById("studentPage").style.display = "block";
    }
}

display();
