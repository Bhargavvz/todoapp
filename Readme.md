# Todo Application 📝

## Overview
This is a Todo application built with **Spring Boot** for the backend and **React** for the frontend. It allows users to create, read, update, and delete todos while managing their tasks efficiently.

## Features 🌟
- User registration and login
- Create, read, update, and delete todos
- Filter todos by category and priority
- Set due dates and reminders for todos
- Dark mode support 🌙
- Responsive design 📱

## Technologies Used 🛠️
- **Backend**: 
  - Spring Boot
  - Spring Data MongoDB
  - Spring Security
  - JWT for authentication
- **Frontend**: 
  - React
  - Tailwind CSS for styling
  - Axios for API calls
  - Framer Motion for animations
  - React Hot Toast for notifications

## Project Structure 📁
### Backend
- **`src/main/java/com/example/todobackend`**: Contains the main application code.
  - **`TodoBackendApplication.java`**: Main entry point for the Spring Boot application.
  - **`model`**: Contains the data models (e.g., `User`, `Todo`, `Priority`).
  - **`repository`**: Interfaces for MongoDB data access (e.g., `UserRepository`, `TodoRepository`).
  - **`service`**: Business logic for handling todos (e.g., `TodoService`).
  - **`controller`**: REST controllers for handling HTTP requests (e.g., `TodoController`).
  - **`security`**: Security configurations and JWT handling (e.g., `JwtService`, `JwtAuthenticationFilter`, `UserPrincipal`).
  - **`config`**: Configuration classes for MongoDB and Spring Security (e.g., `MongoConfig`, `SecurityConfig`, `ApplicationConfig`).
  - **`exception`**: Global exception handling (e.g., `GlobalExceptionHandler`).
  - **`dto`**: Data Transfer Objects for requests and responses (e.g., `AuthenticationRequest`, `AuthenticationResponse`, `RegisterRequest`).

### Frontend
- **`src`**: Contains the React application code.
  - **`components`**: Reusable components (e.g., `Header`, `Footer`, `TodoList`, `TodoForm`, `Login`, `Register`).
  - **`services`**: API service files for handling HTTP requests (e.g., `AuthService`, `TodoService`).
  - **`hooks`**: Custom hooks (e.g., `useTheme` for theme management).
  - **`types`**: TypeScript interfaces for type safety (e.g., `User`, `AuthState`).
  - **`index.css`**: Global CSS styles using Tailwind CSS.
  - **`tailwind.config.js`**: Configuration file for Tailwind CSS.

## Setup Instructions ⚙️

### Backend
1. **Clone the repository**:
   ```bash
   git clone https://github.com/bhargavvz/todoapp.git
   cd Backend
   ```

2. **Configure MongoDB**:
   - Update the `application.properties` file with your MongoDB connection string.

3. **Build the project**:
   ```bash
   mvn clean install
   ```

4. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

### Frontend
1. **Navigate to the frontend directory**:
   ```bash
   cd Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

## Usage 🚀
- **Manage Todos**: After logging in, you can create, view, update, and delete your todos.

## License 📜
This project is licensed under the MIT License.

## Acknowledgments 🙏
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)