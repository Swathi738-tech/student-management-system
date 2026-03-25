let students = JSON.parse(localStorage.getItem("students")) || [];

document.addEventListener("DOMContentLoaded", displayStudents);

document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;

    if(!email.includes("@")){
        alert("Invalid Email");
        return;
    }

    if(id === ""){
        students.push({
            id: Date.now(),
            name,
            department,
            email
        });
    } else {
        students = students.map(s =>
            s.id == id ? {id:Number(id), name, department, email} : s
        );
    }

    localStorage.setItem("students", JSON.stringify(students));
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value="";
    displayStudents();
});

function displayStudents(){
    const table = document.getElementById("studentTableBody");
    table.innerHTML="";

    students.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.department}</td>
            <td>${s.email}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${s.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function editStudent(id){
    const s = students.find(st => st.id === id);
    document.getElementById("studentId").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("department").value = s.department;
    document.getElementById("email").value = s.email;
}

function deleteStudent(id){
    students = students.filter(s => s.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

function searchStudent(){
    const val = document.getElementById("search").value.toLowerCase();
    const filtered = students.filter(s => s.name.toLowerCase().includes(val));

    const table = document.getElementById("studentTableBody");
    table.innerHTML="";

    filtered.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.department}</td>
            <td>${s.email}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${s.id})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${s.id})">Delete</button>
            </td>
        </tr>`;
    });
}
