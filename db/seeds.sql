INSERT INTO department (id, name) 
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Marketing');

INSERT INTO role (id, title, department_id, salary)
VALUES (1, 'Sales Lead', 1, 100000),
       (2, 'Salesperson', 1, 80000),
       (3, 'Lead Engineer', 2, 150000),
       (4, 'Software Engineer', 2, 120000),
       (5, 'Account Manager', 3, 160000),
       (6, 'Accountant', 3, 125000),
       (7, 'Marketing Team Lead', 4, 250000),
       (8, 'market', 4, 190000);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'John', 'Doe', 1, NULL),
       (2, 'Mike', 'Chan', 2, 1),
       (3, 'Ashley', 'Rodriguez', 3, NULL),
       (4, 'Kevin', 'Tupik', 4, 3),
       (5, 'Kunal', 'Singh', 5, NULL),
       (6, 'Malia', 'Brown', 6, 5),
       (7, 'Sarah', 'Lourd', 7, NULL),
       (8, 'Tom', 'Allen', 8, 7);