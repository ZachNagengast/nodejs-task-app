const fs = require('fs');
const prompt = require('prompt');
const path = require('path');

const databasePath = path.resolve('./database.json');
const database = require(databasePath);

function addTask(task) {

  prompt.start();

  prompt.get(['Task'], function(err, result) {

    if (!database) {
      let database;
    }
    database.tasks.push(result.Task);
    fs.writeFile(databasePath, JSON.stringify(database), 'utf8', function(err) {
      if (err) throw err;
      listTasks();

    });

  });

}

function listTasks() {
  let i = 1;
  database.tasks.forEach(element => {
    console.log(`${i}. ${element}`);
    i++;
  });
}

function editTasks() {

  console.log('Which index would you like to edit?');

  listTasks();

  prompt.start();

  prompt.get(['index', 'newtask'], function(err, result) {

    database.tasks[result.index - 1] = result.newtask;

    save();

  });

}

function deleteTasks() {

  console.log('Which index would you like to edit?');

  listTasks();

  prompt.start();

  prompt.get(['index'], function(err, result) {

    database.tasks.splice(result.index - 1, 1);

    save();

  });

}

function save() {
  fs.writeFile(databasePath, JSON.stringify(database), 'utf8', function(err) {
    if (err) throw err;
    listTasks();

  });
}

prompt.start();

console.log('Would you like to create, read, update, or delete');

prompt.get(['command'], function(err, result) {

  switch (result.command) {
    case 'read':
      listTasks();
      break;

    case 'update':
      editTasks();
      break;

    case 'delete':
      deleteTasks();
      break;

    case 'create':
      addTask();
      break;

    default:
      listTasks();
  }

});



// console.log('Welcome');
