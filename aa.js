#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import * as child from 'child_process';

let projectTitle;

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

const runCommand = async (command) => {
  try {
    child.execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
  }
};

const rhine = async () => {
  const msg = `RHINE`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
  await sleep();
  console.clear();
};

const welcome = async () => {
  const projectSelection = chalkAnimation.rainbow(
    'Select one of the app boiler plate to install...\n'
  );
  await sleep();
  projectSelection.stop();
  console.log(`${chalk.bgBlue('How to use?')}
    1. Enter a project title.
    2. Select a boiler plate with arrow key and press enter.
    3. If any ${chalk.bgRed(
      'ERROR'
    )} is given the console will be ${chalk.bgRed('Killed')}
    4. Else the project will open in VS-Code and you can start coding.
    5. ${chalk.bgGreen('localhost:3000')} will be your project url.
    `);
};

const askProjectTitle = async () => {
  const asnwers = await inquirer.prompt({
    name: 'project_title',
    type: 'input',
    message: 'Enter your project title :- ',
    default() {
      return 'TEST';
    },
  });

  projectTitle = asnwers.project_title;
};

const projects = async () => {
  const options = await inquirer.prompt({
    name: 'project_selection',
    type: 'list',
    message: 'Select a project boiler plate',
    choices: ['Wagmi-NextJS', 'Wagmi-React-JS', 'Svelte-Web3'],
  });
  return handleSelection(options.project_selection);
};

const handleSelection = async (option) => {
  const spinner = createSpinner('Checking option...').start();
  await sleep();
  if (option === 'Wagmi-NextJS') {
    spinner.success({
      text: `Wagmi-NextJS Selected ${projectTitle}`,
    });
    gitClone('https://github.com/XPro-Gamer-Rhine/Wagmi-NextJS.git');
  } else if (option === 'Wagmi-React-JS') {
    spinner.success({
      text: `Wagmi-React-JS5 Selected ${projectTitle}`,
    });
    gitClone('https://github.com/XPro-Gamer-Rhine/Wagmi-ReactJS.git');
  } else if (option === 'Svelte-Web3') {
    spinner.success({
      text: `Svelte-Web3 Selected ${projectTitle}`,
    });
    gitClone('https://github.com/XPro-Gamer-Rhine/Svelte-Web3.git');
  } else {
    spinner.error({
      text: `☠️☠️☠️ Failed to create project ${projectTitle}`,
    });
    process.exit(1);
  }
};

const gitClone = async (url) => {
  const gitCheckoutCommand = `git clone --depth 1 ${url} ${projectTitle}`;
  const checkedOut = runCommand(gitCheckoutCommand);
  await sleep();
  await installDeps(checkedOut);
};

const installDeps = async (checkedOut) => {
  const installDependencyCommand = `cd ${projectTitle} && npm install --force || yarn install`;
  if (!checkedOut) {
    console.log(
      chalk.red(`Failed to create project ${projectTitle}`)
    );
    process.exit(1);
  } else {
    console.clear();
    await sleep();
    console.log(
      chalk.green(`Installing Dependecies at ${projectTitle}`)
    );
    const installDependencies = runCommand(installDependencyCommand);
    await sleep();
    if (!installDependencies) {
      console.log(
        chalk.red(`Failed to install dependencies at ${projectTitle}`)
      );
      process.exit(1);
    } else {
      console.clear();
      console.log(
        chalk.green(`Successfully created project ${projectTitle}`)
      );
      try {
        const code = `cd ${projectTitle} && code .`;
        const openCode = runCommand(code);
        await sleep();
        if (!openCode) {
          console.log(chalk.red(`Failed to open ${projectTitle}`));
          process.exit(1);
        } else {
          console.clear();
          const runProject = chalkAnimation.rainbow(
            'Your Porject is up and running. Check localhost:3000/\n'
          );
          await sleep();
          runProject.stop();
          const startProject = `cd ${projectTitle} && npm run dev || yarn dev || npm start || yarn start`;
          const startProjectCommand = runCommand(startProject);
          if (!startProjectCommand) {
            console.log(
              chalk.red(`Failed to start project ${projectTitle}`)
            );
            process.exit(1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};

await rhine();
await welcome();
await askProjectTitle();
await projects();
