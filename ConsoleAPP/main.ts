//My new console app to sum two variables numbers
import * as readline from 'readline';
import { Add, AddAsync } from './math';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main(): Promise<void> {
    let num1Input:string = await askQuestion("Enter the first number: ");
    let num2Input:string = await askQuestion("Enter the second number: ");
    const asyncResultPromise = AddAsync(Number(num1Input), Number(num2Input));
    console.log(`\n Result Sync: ${Add(Number(num1Input), Number(num2Input))}`);
    console.log(`\n Result Async: ${await asyncResultPromise}`);
}

void main();


