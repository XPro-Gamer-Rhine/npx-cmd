#!/usr/bin/env node

import * as child from 'child_process';

const runCommand = (command) => {
  try {
    child.execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
  }
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/XPro-Gamer-Rhine/Wagmi-NextJS.git ${repoName}`;
const installDependencyCommand = `cd ${repoName} && npm install || yarn install`;

console.log(`Creating project ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);

if (!checkedOut) {
  console.log(`Failed to create project ${repoName}`);
  process.exit(1);
} else {
  console.log(`Installing Dependecies at ${repoName}`);
  const installDependencies = runCommand(installDependencyCommand);
  if (!installDependencies) {
    console.log(`Failed to install dependencies at ${repoName}`);
    process.exit(1);
  } else {
    console.log(`Successfully created project ${repoName}`);
    try {
      const code = `code .`;
      const openCode = runCommand(code);
      if (!openCode) {
        console.log(`Failed to open ${repoName}`);
        process.exit(1);
      } else {
        console.log(`Happy Coding 😊`);
        const startProject = `npm run dev || yarn dev`;
        const startProjectCommand = runCommand(startProject);
        if (!startProjectCommand) {
          console.log(`Failed to start project ${repoName}`);
          process.exit(1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
