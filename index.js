const fs = require('fs');
const prompt = require('prompt');
const csv = require('csvtojson');
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

function save() {
  fs.writeFile(databasePath, JSON.stringify(database), 'utf8', function(err) {
    if (err) throw err;
    listTasks();

  });
}

prompt.start();

console.log('Would you like to list, edit or add');

prompt.get(['command'], function(err, result) {

  switch (result.command) {
    case 'list':
      listTasks();
      break;

    case 'edit':
      editTasks();
      break;

    case 'add':
      addTask();
      break;

    default:
      listTasks();
  }

});



// console.log('Welcome');
