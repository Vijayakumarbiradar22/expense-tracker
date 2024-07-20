# Expense-Tracker Web App

This is an expense tracker app built using ReactJS, Firebase, and NodeJS. The app allows users to track their expenses and incomes by entering information such as the data, description,amount of each data and Category. The app includes a dashboard that allow the user's to Add the Expense and after that it will be addeed to Expense List where user can edit or delete from the ExpenseList and also user can view the Expense Summery where Total expense by category wise displayed and also here user have option to filter daily weeklt and monthly in that particular their expense on different category filtered and at the bottom on which category they spent most will be displayed.

## Installation

To install and run the app on your local machine, follow these steps:

1. Clone this repository to your local machine: `git clone https://github.com/Vijayakumarbiradar22/expense-tracker.git

2. Install the necessary dependencies by running `npm install` in the root directory of the project.

3. Run the app by running `npm start` in the root directory of the project. The app should now be running on `http://localhost:3000`.

## Firebase Datastore
Provided Firebase Authentication for Login and Expense details also stored in the Firebase
 https://console.firebase.google.com/u/0/project/expense-tracker-47094/overview

## System design and Architecture

OVERVIEW :
The Expense Tracker application is designed to allow users to manage their personal expenses effectively. It provides functionalities to add, view, edit, and delete expenses, as well as view summaries of spending over different time periods. The application is built using React.js for the frontend and Firebase for backend services, including authentication and data storage.

ARCHITECTURE
Frontend (Client-side)

React.js: The frontend framework used to build the user interface.
Material-UI: A library for React components that implements Google's Material Design.
React Router: Handles client-side routing.
Supports CRUD opertions for expenses.

Backend (Server-side)

Firebase Authentication: Manages user authentication and SignUp and Logout
Firebase Firestore: Provides a NoSQL database for storing and retrieving expenses and user data.


 ## Deployment of the Project

 This project is deployed on Github Pages and the Website is live at  
   https://vijayakumarbiradar22.github.io/expense-tracker/