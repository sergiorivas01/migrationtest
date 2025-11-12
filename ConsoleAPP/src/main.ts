//My new console app to sum two variables numbers
import * as readline from 'readline';
import { Add, AddAsync } from './math';
import { checkDatabaseConnection, giveAccessToMain, checkDatabaseForCustomer } from './customer';
import { Customer } from './data';

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
    // Step 1: Check database connection
    console.log('Checking database connection...');
    const isConnected = await checkDatabaseConnection();
    
    if (!isConnected) {
        console.log('Database connection failed. Exiting...');
        rl.close();
        process.exit(1);
    }
    
    console.log('Database connection successful!\n');
    
    // Step 2: Get customer information
    console.log('Please provide your information to access the application:');
    const firstName: string = await askQuestion("Enter your first name: ");
    const lastName: string = await askQuestion("Enter your last name: ");
    const role: string = await askQuestion("Enter your role: ");
    
    const customer = new Customer(firstName, lastName, role);
    
    // Step 3: Check access
    console.log('\nVerifying access...');
    giveAccessToMain(customer);
    
    // Step 4: Only proceed if access is granted
    const hasAccess = checkDatabaseForCustomer(customer) !== 'Error getting data from database';
    
    if (!hasAccess) {
        console.log('Access denied. Exiting...');
        rl.close();
        process.exit(1);
    }
    
    console.log('\n--- Calculator Application ---\n');
    
    // Step 5: Main application logic (sum two numbers)
    let num1Input: string = await askQuestion("Enter the first number: ");
    let num2Input: string = await askQuestion("Enter the second number: ");
    const asyncResultPromise = AddAsync(Number(num1Input), Number(num2Input));
    console.log(`\n Result Sync: ${Add(Number(num1Input), Number(num2Input))}`);
    console.log(`\n Result Async: ${await asyncResultPromise}`);
    
    rl.close();
}

void main();


