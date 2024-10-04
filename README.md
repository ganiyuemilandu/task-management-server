# Task Management Server

A task management backend server that facilitates the creation, update, and deletion of tasks by authenticated users, as well as fetching and filtering tasks by specific attributes.

Powered by NodeJS, ExpressJS, and MongoDB, it defines API endpoints to create and manage user registration and login, and task creation.

## Dependencies

The following dependencies are required for this app.

- bcryptjs (For hashing user's password before storage)
- dotenv (for loading environment variables from .env file)
- express (For managing the server)
- express-async-handler (for clean handling of errors)
- jsonwebtoken (For generating user tokens)
- Mongoose (For managing data storage and access in MongoDB)

## Running Locally

To run the program locally, the following actions must be taken:
1. Clone the repository.
2. Create a file named .env in the root directory of the project.
3. Create 3 environment variables in the .env file
    - JWT_SECRET (A random string for signing and verifying JWT Tokens)
    - MONGO_URI (A valid URI to a MongoDB database)
    - PORT (A port number from which the server will listen for request)
4. Install all dependencies.
5. Run the app.

So, to begin, open your terminal, navigate to the directory you want to clone the project, and run the following commands.

1. `git clone https://github.com/ganiyuemilandu/task-management-server.git`
2. `npm install`
3. `npm run dev`

Note: before running the third command, you must have created the .env file, and defined said environment variables in it.

## Sending requests to server

The following API endpoint roots are defined:
- `/api/users` (For user registration and login)
- `/api/tasks` (for task creation and management)

### Users endpoints

To sign a user up, send a post request to `/api/users/register`, providing a JSON object with the following keys:
- `name` (User's full name)
- `email` (User's email address)
- `password` (User's password)

---

To sign a user in, send a post request to `/api/users/login`, providing a JSON object with the following keys:
- `email` (User's email address)
- `password` (User's password)

### Tasks Endpoints

All task operations require user authentication. Therefore, user should do the following before proceeding with task creation and management.
1. Log in to your account. (register if you don't have an account)
2. Copy the token sent in the response if login successful.
3. Paste this token in the auth header of your request.

---

To create a task, send a post request to `/api/tasks`, providing a JSON object with the following keys:
- `text` (The task to create)

---

To update a task, send a put request to `/api/tasks/:id` where `id` is a MongoDB unique identifier of one of user's tasks, providing a JSON object with the following keys:
- `text` (The task to update)

---

To get all tasks created by user, send a get request to `/api/tasks`.

---

To delete a given task by user, send a delete request to `/api/tasks/:id` where `id` is a MongoDB unique identifier of one of user's tasks.