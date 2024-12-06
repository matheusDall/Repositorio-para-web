drop database BD_ToDo;
create database BD_ToDo;
use BD_ToDo;

GRANT ALL PRIVILEGES ON BD_ToDoList.* TO 'aluno'@'localhost';
FLUSH PRIVILEGES;

create table tarefas(
	
  id INT AUTO_INCREMENT PRIMARY KEY,
  tarefa VARCHAR(255) NOT NULL,
  prioridade VARCHAR(50) NOT NULL
);

select * from tarefas;