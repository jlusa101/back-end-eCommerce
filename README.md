# E-commerce Back-End

## Purpose

Purpose of this assignment was to practice working with Express.js, sequelize, and a MySQL database.
The purpose of these source files is to start an Express server that connects to a MySQL database. Using sequelize, the user is able to perform CRUD (create, read, update, delete) operations on three different tables(Category, Product, Tag) within the ecommerce database.

## Installation

Ensure that Node.js and NPM are installed on your machine. If not, please navigate to www.phoenixnap.com/kb/install-node-js-npm-on-windows for a tutorial for Windows.
Ensure to install the required dependancies: "npm install sequelize mysql2 dotenv"

## Instructions

- Clone this project into your local machine.
- Open your terminal and navigate to the directory that you cloned the repository in.
- In ".env" file add the following data and if file not present, please create one in the root directory:

  - DB_NAME='DATABASE_NAME'
  - DB_USER='YOUR_USERNAME'
  - DB_PW='YOUR_PASSWORD'

- When on MySQL shell command prompt, please run command "SOURCE db/schema.sql" to create a database
- Then on Git Bash, run command "npm run seed" to populate the database tables with data.
- Then run command "npm start", which will start the Express server and you are able to test routes on Insomnia

### Note

At this time, there is no front-end set up but all the routes can be tested using Insomnia.

## Built With

- JavaScript
- Node.js
- MySql
- Express.js

## Video

https://watch.screencastify.com/v/AZOaSKgfiubOUz5w4CvE

## Contribution

Made by Joona Lusa
