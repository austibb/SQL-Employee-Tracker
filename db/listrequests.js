// File of functions to use for inquirer question choices
// Will check the database for appropriate choices for 'choice:' key in question object

// import { connection } from './connection.js';
const mysql = require('mysql2');
// const Query = require('mysql2/typings/mysql/lib/protocol/sequences/Query');

require('dotenv').config();
const connection = mysql.createConnection({
   host: 'localhost',
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: 'employeeDB',
}).promise();

const queries = [
   `SELECT id AS value, name FROM department`,

   `SELECT id AS value, title AS name FROM role`,

   `SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id IS NULL`,

   `SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee`
];

updatedList = [];

const updateChoices = async () => {
   for (query of queries) {
      let choiceList = {};
      let choices = (await connection.query(query))[0];
      for (choice of choices) {
         choiceList[choice.value] = choice.name;
      }
      updatedList.push(choiceList);
   }
   return updatedList;
}

const departmentChoices = async () => {
   let choiceList = {};
   let choices = (await connection.query(`SELECT id AS value, name FROM department`))[0];
   for (choice of choices) {
      choiceList[choice.value] = choice.name;
   }
   return choiceList;
};

const rolesChoices = async () => {
   let choiceList = {};
   let choices = (await connection.query(`SELECT id AS value, title AS name FROM role`))[0];
   for (choice of choices) {
      choiceList[choice.value] = choice.name;
   }
   return choiceList;
};

const managerChoices = async () => {
   let choiceList = {};
   let choices = (await connection.query(`SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE manager_id IS NULL`))[0];
   for (choice of choices) {
      choiceList[choice.value] = choice.name;
   }
   return choiceList;
};

const employeeChoices = async () => {
   let choiceList = {};
   let choices = (await connection.query(`SELECT id AS value, CONCAT(first_name, ' ', last_name) AS name FROM employee`))[0];
   for (choice of choices) {
      choiceList[choice.value] = choice.name;
   }
   return choiceList;
};


module.exports = { updateChoices };