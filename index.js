#!/usr/bin/env node


import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';

function runCommand(command, options = {}) {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(chalk.red(`Error executing command: ${command}`), error);
    process.exit(1);
  }
}

export async function main() {
  console.log(chalk.green('Welcome to the MERN Stack Setup Script!'));

  // Prompt for project details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'frontendDir',
      message: 'Enter the name for the frontend directory:',
      default: 'frontend',
    },
    {
      type: 'input',
      name: 'backendDir',
      message: 'Enter the name for the backend directory:',
      default: 'backend',
    },
  ]);

  const { frontendDir, backendDir } = answers;

  // Step 1: Create the frontend directory and initialize with Vite
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir);
  }
  console.log(chalk.blue(`Creating frontend directory: ${frontendDir}`));
  runCommand(`npm create vite@latest ${frontendDir} -- --template react`);
  runCommand('npm install', { cwd: path.join(process.cwd(), frontendDir) });

  // Step 2: Install frontend dependencies
  const frontendDependencies = [
    'axios',
    'react-router-dom',
    'react-toastify'
  ].join(' ');

  console.log(chalk.blue('Installing frontend useful packages...'));
  runCommand(`npm install ${frontendDependencies}`, { cwd: path.join(process.cwd(), frontendDir) });

  // Step 3: Create the backend directory and initialize with npm
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir);
  }
  console.log(chalk.blue(`Creating backend directory: ${backendDir}`));
  runCommand('npm init -y', { cwd: path.join(process.cwd(), backendDir) });

  // Step 4: Install backend dependencies
  const backendDependencies = [
    'bcryptjs',
    'cookie-parser',
    'cors',
    'dotenv',
    'express',
    'jsonwebtoken',
    'mongoose',
    'multer'
  ].join(' ');

  const backendDevDependencies = [
    'nodemon'
  ].join(' ');

  console.log(chalk.blue('Installing backend dependencies...'));
  runCommand(`npm install ${backendDependencies}`, { cwd: path.join(process.cwd(), backendDir) });
  console.log(chalk.blue('Installing backend dev dependencies...'));
  runCommand(`npm install -D ${backendDevDependencies}`, { cwd: path.join(process.cwd(), backendDir) });

  // Step 5: Create server.js in the backend directory with standard Express setup
  const serverCode = `
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/db_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server is running on port: \${port}\`);
});
`;

  fs.writeFileSync(path.join(backendDir, 'server.js'), serverCode.trim());

  // Step 6: Provide instructions to the user
  console.log(chalk.green('Frontend and backend setup complete!'));
  console.log(chalk.yellow('To start the frontend server:'));
  console.log(chalk.cyan(`cd ${frontendDir}`));
  console.log(chalk.cyan('npm run dev'));
  console.log(chalk.yellow('To start the backend server:'));
  console.log(chalk.cyan(`cd ${backendDir}`));
  console.log(chalk.cyan('npx nodemon server.js'));
}

main();
