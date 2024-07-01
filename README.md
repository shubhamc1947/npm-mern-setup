
---

# MERN PROJECT Stepup

This npm package automates the setup process for a MERN (MongoDB, Express.js, React.js, Node.js) stack project. It creates directories, installs necessary dependencies, and sets up basic configurations for both frontend and backend.

## Prerequisites

Before running the setup script, ensure you have the following installed:

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (if you plan to use a local MongoDB database)

## Setup Instructions



1. **Run the Setup Script**

   You can run the setup script using the `npx` command:

   ```bash
   npx mernstepup
   ```

2. **Follow the Prompts**

   - Enter the names for the frontend and backend directories when prompted.
   - The script will create the directories, initialize them with necessary dependencies, and set up a basic Express server with MongoDB connectivity.

3. **Start the Servers**

   Once the setup is complete, you can start the frontend and backend servers:

   - **Frontend**: Navigate to the frontend directory and run:

     ```bash
     cd frontend
     npm run dev
     ```

     This will start the frontend development server.

   - **Backend**: Navigate to the backend directory and run:

     ```bash
     cd backend
     nodemon server.js
     ```

     This will start the backend server using nodemon for automatic server restarts on file changes.

5. **Access the Application**

   - Open your browser and go to `http://localhost:5173` to access the frontend application.
   - The backend API will be accessible at `http://localhost:5000`.

## Project Structure

- **frontend/**: Contains the React.js frontend application.
- **backend/**:
  - **server.js**: Entry point for the Express.js backend server.
  - **Other backend files and folders**: Contains other backend files and configurations.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests on [GitHub](https://github.com/shubhamc1947/npm-mern-setup/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to copy and paste this into your README file on GitHub. Adjust the links and details as necessary to fit your specific project structure and preferences.
