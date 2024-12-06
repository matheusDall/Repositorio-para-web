drop database ToDoList;
create database ToDoList;
use ToDoList;

CREATE TABLE tarefas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tarefa VARCHAR(255) NOT NULL,
  prioridade ENUM('bx', 'alta') NOT NULL
);
select * from tarefas;