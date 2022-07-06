#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who wants to be a millionaire?\n'
  );
  await sleep();
  rainbowTitle.stop();
  console.log(`${chalk.bgBlue('How to play')}
    I am a process on your computer.
    If you get any question wrong i will be ${chalk.bgRed('Killed')}
    So get all the question right...
    `);
}

async function askName() {
  const asnwers = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'Enter your name?',
    default() {
      return 'Player';
    },
  });

  playerName = asnwers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question_1',
    type: 'list',
    message: 'What is my age?\n',
    choices: [
      'I am not sure',
      'I am a little bit old',
      'I am a little bit young',
      '25 years old',
    ],
  });
  return handleAnswer(answers.question_1 == '25 years old');
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Correct answer! ${playerName}` });
  } else {
    spinner.error({ text: `☠️☠️☠️ Game over ${playerName}` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats ${playerName}`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await winner();
