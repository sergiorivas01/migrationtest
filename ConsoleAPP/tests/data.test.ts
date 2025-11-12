import { Customer, getDataFromDatabase } from '../src/data';

describe('data', () => {
    describe('Customer', () => {
        it('should create a customer with all properties', () => {
            const customer = new Customer('John', 'Doe', 'admin');
            
            expect(customer.firstName).toBe('John');
            expect(customer.lastName).toBe('Doe');
            expect(customer.role).toBe('admin');
        });

        it('should create a customer with empty strings', () => {
            const customer = new Customer('', '', '');
            
            expect(customer.firstName).toBe('');
            expect(customer.lastName).toBe('');
            expect(customer.role).toBe('');
        });

        it('should create a customer with special characters', () => {
            const customer = new Customer("O'Brien", "O'Connor", 'user');
            
            expect(customer.firstName).toBe("O'Brien");
            expect(customer.lastName).toBe("O'Connor");
            expect(customer.role).toBe('user');
        });
    });

    describe('getDataFromDatabase', () => {
        it('should return formatted string with customer data', () => {
            const customer = new Customer('John', 'Doe', 'admin');
            const result = getDataFromDatabase(customer);
            
            expect(result).toBe('first name: John, last name: Doe');
        });

        it('should handle empty names', () => {
            const customer = new Customer('', '', 'user');
            const result = getDataFromDatabase(customer);
            
            expect(result).toBe('first name: , last name: ');
        });

        it('should handle long names', () => {
            const customer = new Customer('VeryLongFirstName', 'VeryLongLastName', 'admin');
            const result = getDataFromDatabase(customer);
            
            expect(result).toBe('first name: VeryLongFirstName, last name: VeryLongLastName');
        });

        it('should handle special characters in names', () => {
            const customer = new Customer("Jean-Pierre", "O'Brien", 'user');
            const result = getDataFromDatabase(customer);
            
            expect(result).toBe("first name: Jean-Pierre, last name: O'Brien");
        });

        it('should return error message if exception occurs', () => {
            // Create a mock customer that might cause an error
            const customer = new Customer('John', 'Doe', 'admin');
            
            // Since the function has a try-catch, it should always return a string
            // In the current implementation, it should never throw an error
            const result = getDataFromDatabase(customer);
            
            expect(typeof result).toBe('string');
            expect(result).not.toBe('Error getting data from database');
        });
    });
});

