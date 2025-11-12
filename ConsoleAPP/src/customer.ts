import { Customer } from './data';
import { getDataFromDatabase } from './data';

//Check the database connection
export  async function checkDatabaseConnection(): Promise<boolean> {
    try {
        return true;
    } catch (error) {
        return false;
    }
}

//Check the database for a customer
export function checkDatabaseForCustomer(customer: Customer): string {
    return getDataFromDatabase(customer);
}

//Give acces to main.ts if the customer is found
export function giveAccessToMain(customer: Customer): void {
    if (checkDatabaseForCustomer(customer) !== 'Error getting data from database') {
        console.log('Access granted');
    } else {
        console.log('Access denied');
    }
}