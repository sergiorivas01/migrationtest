export class Customer {
    firstName: string;
    lastName: string;
    role: string;
    constructor(firstName: string, lastName: string, role: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }
}

export function getDataFromDatabase(customer: Customer): string {
    try {
        return `first name: ${customer.firstName}, last name: ${customer.lastName}`;
    }
    catch (error) {
        console.error(error);
        return 'Error getting data from database';
    }
}
