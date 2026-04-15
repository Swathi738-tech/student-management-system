let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("form").addEventListener("submit", function(e){
    e.preventDefault();

    let id = document.getElementById("id").value;
    let data = {
        id: id || Date.now(),
        name: name.value,
        age: age.value,
        marks: marks.value,
        email: email.value
    };

    if(id){
        students = students.map(s => s.id==id ? data : s);
    } else {
        students.push(data);
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    display();
});

function display(){
    table.innerHTML="";
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

    document.getElementById("count").innerText = students.length;

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

function edit(id){
    let s = students.find(x=>x.id==id);
    name.value=s.name;
    age.value=s.age;
    marks.value=s.marks;
    email.value=s.email;
    document.getElementById("id").value=id;
}

function del(id){
    students = students.filter(s=>s.id!=id);
    localStorage.setItem("students", JSON.stringify(students));
    display();
}

function searchStudent(){
    let val = search.value.toLowerCase();
    let filtered = students.filter(s=>s.name.toLowerCase().includes(val));

    table.innerHTML="";
    filtered.forEach(s=>{
        table.innerHTML += `<tr>
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.marks}</td>
        <td>${s.email}</td>
        <td>-</td>
        </tr>`;
    });
}

function show(x){
    dash.style.display="none";
    stu.style.display="none";
    alert.style.display="none";

    document.getElementById(x).style.display="block";
}

function logout(){
    localStorage.removeItem("login");
    window.location.href="index.html";
}

function toggleDark(){
    document.body.classList.toggle("dark");
}

display();
