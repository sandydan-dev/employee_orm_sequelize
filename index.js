const express = require("express");
const app = express();
const port = 3000;
const { Op } = require("sequelize");
const { sequelize } = require("./lib/index");
const employee = require("./models/employee.model");

const employeesData = [
  {
    name: "Rahul",
    salary: 45000,
    department: "IT",
    designation: "Software Engineer",
  },
  { name: "Priya", salary: 80000, department: "HR", designation: "Recruiter" },
  {
    name: "Kiran",
    salary: 65000,
    department: "Finance",
    designation: "Accountant",
  },
  {
    name: "Neha",
    salary: 55000,
    department: "Marketing",
    designation: "Marketing Manager",
  },
  {
    name: "Suresh",
    salary: 75000,
    department: "Operations",
    designation: "Team Lead",
  },
  {
    name: "Rajesh",
    salary: 35000,
    department: "IT",
    designation: "Junior Developer",
  },
  {
    name: "Shruti",
    salary: 70000,
    department: "HR",
    designation: "HR Manager",
  },
  {
    name: "Vijay",
    salary: 60000,
    department: "Finance",
    designation: "Financial Analyst",
  },
  {
    name: "Riya",
    salary: 40000,
    department: "Marketing",
    designation: "Content Writer",
  },
  {
    name: "Ajay",
    salary: 55000,
    department: "Operations",
    designation: "Project Coordinator",
  },
  {
    name: "Priyanka",
    salary: 75000,
    department: "IT",
    designation: "Senior Developer",
  },
  {
    name: "Sunil",
    salary: 65000,
    department: "HR",
    designation: "Recruitment Consultant",
  },
  {
    name: "Leela",
    salary: 45000,
    department: "Finance",
    designation: "Accountant",
  },
  {
    name: "Gopal",
    salary: 80000,
    department: "Marketing",
    designation: "Brand Manager",
  },
  {
    name: "Mala",
    salary: 35000,
    department: "Operations",
    designation: "Operations Assistant",
  },
  {
    name: "Krishna",
    salary: 70000,
    department: "IT",
    designation: "DevOps Engineer",
  },
  {
    name: "Sonal",
    salary: 60000,
    department: "HR",
    designation: "HR Generalist",
  },
  {
    name: "Rajiv",
    salary: 55000,
    department: "Finance",
    designation: "Tax Consultant",
  },
  {
    name: "Nalini",
    salary: 75000,
    department: "Marketing",
    designation: "Digital Marketing Specialist",
  },
];

// seed data in this endpoint

app.get("/seed_employees_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await employee.bulkCreate(employeesData);
    res
      .status(200)
      .json({ message: "Employees data seeded successfully!", employeesData });
  } catch (error) {
    res.status(500).json({ message: "Failed to seed data" });
  }
});

// get all employees detail
async function getAllEmployeesDetail() {
  let query = await employee.findAll();
  if (!query) {
    return null;
  } else {
    return { employees: query };
  }
}
app.get("/employees", async (req, res) => {
  try {
    let result = await getAllEmployeesDetail();
    if (!result) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get employee data" });
  }
});

// get employees by specific id
async function findEmployeesBySpesificId(id) {
  let query = await employee.findByPk(id);
  if (!query) {
    return null;
  } else {
    return { employees: query };
  }
}
app.get("/employees/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await findEmployeesBySpesificId(id);
    if (!result) {
      return res.status(404).json({ message: "No employees found by id" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to get employee id" });
  }
});

// find employees by departement
async function findEmployeesByDepartment(department) {
  let query = await employee.findAll({ where: { department } });
  if (!query) {
    return null;
  } else {
    return { employees: query };
  }
}
app.get("/employees/department/:department", async (req, res) => {
  try {
    let department = req.params.department;
    let result = await findEmployeesByDepartment(department);
    if (!result) {
      return res
        .status(404)
        .json({ message: "No employees found by department" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ messge: error.message });
  }
});

// Sort all the employees by their salary
async function sortEmployeesBySalary(order) {
  let query = await employee.findAll({ order: [["salary", order]] });
  if (!query) {
    return null;
  } else {
    return { employees: query };
  }
}
app.get("/employees/sort/salary", async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortEmployeesBySalary(order);
    if (!result) {
      return res.status(404).json({ message: "No employees found" });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to sort employees" });
  }
});

// find employees by salary where salary grather than with given salary and order
// http://localhost:3000/employees/salary?salary=50000&order=DESC
async function findEmployeesBySalaryGreaterThan(salary, order) {
  let query = await employee.findAll({
    where: { salary: { [Op.gt]: salary } },
    order: [["salary", order]],
  });
  if (!query) {
    return "out of salary";
  } else {
    return { employees: query };
  }
}
app.get("/employees/salary", async (req, res) => {
  try {
    let salary = parseInt(req.query.salary);
    let order = req.query.order;
    let result = await findEmployeesBySalaryGreaterThan(salary, order);
    if (result.employees.length === 0) {
      return res.status(404).json({
        message: `No employees found with salary greater than ${salary}`,
      });
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listing incomming request
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
