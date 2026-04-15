let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("form");
const table = document.getElementById("table");

// ✅ FORM SUBMIT
form.addEventListener("submit", function(e){
    e.preventDefault();

    let id = document.getElementById("id").value;

    let data = {
        id: id || Date.now(),
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        marks: document.getElementById("marks").value,
        email: document.getElementById("email").value
    };

    if(id){
        students = students.map(s => s.id == id ? data : s);
    } else {
        students.push(data);
    }

    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    document.getElementById("id").value = "";

    display();
});


// ✅ DISPLAY STUDENTS
function display(){
    table.innerHTML = "";

    students.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.marks}</td>
            <td>${s.email}</td>
            <td>
                <button onclick="edit(${s.id})" class="btn btn-success btn-sm">Edit</button>
                <button onclick="del(${s.id})" class="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>`;
    });

    // update count
    document.getElementById("count").innerText = students.length;

    // chart
    if (students.length > 0) {
        new Chart(document.getElementById("chart"), {
            type: "bar",
            data: {
                labels: students.map(s=>s.name),
                datasets: [{
                    label: "Marks",
                    data: students.map(s=>s.marks)
                }]
            }
        });
    }
}


// ✅ EDIT
function edit(id){
    let s = students.find(x=>x.id == id);

    document.getElementById("id").value = s.id;
    document.getElementById("name").value = s.name;
    document.getElementById("age").value = s.age;
    document.getElementById("marks").value = s.marks;
    document.getElementById("email").value = s.email;
}


// ✅ DELETE
function del(id){
    students = students.filter(s=>s.id != id);
    localStorage.setItem("students", JSON.stringify(students));
    display();
}


// ✅ SEARCH
function searchStudent(){
    let val = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(val)
    );

    table.innerHTML = "";

    filtered.forEach(s=>{
        table.innerHTML += `
        <tr>
            <td>${s.name}</td>
            <td>${s.age}</td>
            <td>${s.marks}</td>
            <td>${s.email}</td>
            <td>-</td>
        </tr>`;
    });
}


// ✅ PAGE SWITCH (FIXED BUG HERE 🔥)
function show(section){
    document.getElementById("dash").style.display = "none";
    document.getElementById("stu").style.display = "none";
    document.getElementById("alert").style.display = "none";

    document.getElementById(section).style.display = "block";
}


// ✅ LOGOUT
function logout(){
    localStorage.removeItem("login");
    window.location.href = "index.html";
}


// ✅ DARK MODE
function toggleDark(){
    document.body.classList.toggle("dark");
}


// INIT
display();