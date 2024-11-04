const sq = require("sequelize");

// Connect to SQLite database

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./db/employee_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };


// const employees = [
//     { name: "Rahul", salary: 45000, department: "IT", designation: "Software Engineer" },
//     { name: "Priya", salary: 80000, department: "HR", designation: "Recruiter" },
//     { name: "Kiran", salary: 65000, department: "Finance", designation: "Accountant" },
//     { name: "Neha", salary: 55000, department: "Marketing", designation: "Marketing Manager" },
//     { name: "Suresh", salary: 75000, department: "Operations", designation: "Team Lead" },
//     { name: "Rajesh", salary: 35000, department: "IT", designation: "Junior Developer" },
//     { name: "Shruti", salary: 70000, department: "HR", designation: "HR Manager" },
//     { name: "Vijay", salary: 60000, department: "Finance", designation: "Financial Analyst" },
//     { name: "Riya", salary: 40000, department: "Marketing", designation: "Content Writer" },
//     { name: "Ajay", salary: 55000, department: "Operations", designation: "Project Coordinator" },
//     { name: "Priyanka", salary: 75000, department: "IT", designation: "Senior Developer" },
//     { name: "Sunil", salary: 65000, department: "HR", designation: "Recruitment Consultant" },
//     { name: "Leela", salary: 45000, department: "Finance", designation: "Accountant" },
//     { name: "Gopal", salary: 80000, department: "Marketing", designation: "Brand Manager" },
//     { name: "Mala", salary: 35000, department: "Operations", designation: "Operations Assistant" },
//     { name: "Krishna", salary: 70000, department: "IT", designation: "DevOps Engineer" },
//     { name: "Sonal", salary: 60000, department: "HR", designation: "HR Generalist" },
//     { name: "Rajiv", salary: 55000, department: "Finance", designation: "Tax Consultant" },
//     { name: "Nalini", salary: 75000, department: "Marketing", designation: "Digital Marketing Specialist" }
//   ];