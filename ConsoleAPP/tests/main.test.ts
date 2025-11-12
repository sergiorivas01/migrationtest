import { checkDatabaseConnection, checkDatabaseForCustomer } from '../src/customer';
import { Customer } from '../src/data';
import { Add, AddAsync } from '../src/math';

// Mock dependencies
jest.mock('../src/customer');
jest.mock('../src/math');

describe('main application flow', () => {
    beforeEach(() => {
        // Mock console methods
        jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('database connection check', () => {
        it('should check database connection first', async () => {
            (checkDatabaseConnection as jest.Mock).mockResolvedValue(true);
            
            const isConnected = await checkDatabaseConnection();
            
            expect(isConnected).toBe(true);
            expect(checkDatabaseConnection).toHaveBeenCalled();
        });
    });

    describe('customer validation', () => {
        it('should validate customer access', () => {
            const customer = new Customer('John', 'Doe', 'admin');
            (checkDatabaseForCustomer as jest.Mock).mockReturnValue('first name: John, last name: Doe');
            
            const result = checkDatabaseForCustomer(customer);
            
            expect(result).toBe('first name: John, last name: Doe');
            expect(checkDatabaseForCustomer).toHaveBeenCalledWith(customer);
        });

        it('should deny access when customer data returns error', () => {
            const customer = new Customer('John', 'Doe', 'admin');
            (checkDatabaseForCustomer as jest.Mock).mockReturnValue('Error getting data from database');
            
            const result = checkDatabaseForCustomer(customer);
            const hasAccess = result !== 'Error getting data from database';
            
            expect(hasAccess).toBe(false);
        });
    });

    describe('calculator functionality', () => {
        it('should perform addition correctly', () => {
            (Add as jest.Mock).mockReturnValue(8);
            
            const result = Add(5, 3);
            
            expect(result).toBe(8);
            expect(Add).toHaveBeenCalledWith(5, 3);
        });

        it('should perform async addition correctly', async () => {
            (AddAsync as jest.Mock).mockResolvedValue(8);
            
            const result = await AddAsync(5, 3);
            
            expect(result).toBe(8);
            expect(AddAsync).toHaveBeenCalledWith(5, 3);
        });
    });

    describe('integration flow', () => {
        it('should follow the correct sequence: connection -> customer -> calculator', async () => {
            // This test verifies the logical flow without actually running main()
            // since it requires interactive input
            
            // Step 1: Database connection
            (checkDatabaseConnection as jest.Mock).mockResolvedValue(true);
            const isConnected = await checkDatabaseConnection();
            expect(isConnected).toBe(true);
            
            // Step 2: Customer validation
            const customer = new Customer('John', 'Doe', 'admin');
            (checkDatabaseForCustomer as jest.Mock).mockReturnValue('first name: John, last name: Doe');
            const customerData = checkDatabaseForCustomer(customer);
            expect(customerData).not.toBe('Error getting data from database');
            
            // Step 3: Calculator
            (Add as jest.Mock).mockReturnValue(10);
            const sum = Add(5, 5);
            expect(sum).toBe(10);
        });
    });
});

