let students = JSON.parse(localStorage.getItem("students")) || [];

document.addEventListener("DOMContentLoaded", displayStudents);

document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;

    if (studentId === "") {
        const student = {
            id: Date.now(),
            name,
            department,
            email
        };
        students.push(student);
    } else {
        students = students.map(student =>
            student.id == studentId ? { id: Number(studentId), name, department, email } : student
        );
    }

    localStorage.setItem("students", JSON.stringify(students));
    document.getElementById("studentForm").reset();
    document.getElementById("studentId").value = "";
    displayStudents();
});

function displayStudents() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.department}</td>
                <td>${student.email}</td>
                <td>
                    <button class="action-btn" onclick="editStudent(${student.id})">Edit</button>
                    <button class="action-btn" onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function editStudent(id) {
    const student = students.find(s => s.id === id);
    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("department").value = student.department;
    document.getElementById("email").value = student.email;
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}