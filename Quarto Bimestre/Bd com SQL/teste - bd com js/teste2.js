import { createConnection } from 'mysql'; 

const con = createConnection({
  host: "127.0.0.1:3306",
  user: "aluno",
  database: 'BD_ToDoList',
  password: "aluno"
});
function cone(){ con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
})};