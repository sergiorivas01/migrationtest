import { Add, AddAsync } from '../src/math';

describe('math', () => {
    describe('Add', () => {
        it('should add two positive numbers correctly', () => {
            const result = Add(5, 3);
            expect(result).toBe(8);
        });

        it('should add negative numbers correctly', () => {
            const result = Add(-5, -3);
            expect(result).toBe(-8);
        });

        it('should add positive and negative numbers correctly', () => {
            const result = Add(5, -3);
            expect(result).toBe(2);
        });

        it('should handle zero correctly', () => {
            const result = Add(5, 0);
            expect(result).toBe(5);
        });

        it('should handle decimal numbers correctly', () => {
            const result = Add(5.5, 3.2);
            expect(result).toBe(8.7);
        });

        it('should handle string numbers correctly', () => {
            const result = Add(Number('10'), Number('20'));
            expect(result).toBe(30);
        });

        it('should handle limit numbers correctly', () => {
            const result = Add(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            expect(result).toBe(Number.MAX_SAFE_INTEGER + Number.MAX_SAFE_INTEGER);
        });

        it('should handle positive and negative limit numbers correctly', () => {
            const result = Add(Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER);
            expect(result).toBe(0);
        });

        it('should handle two zeros correctly', () => {
            const result = Add(0, 0);
            expect(result).toBe(0);
        });

        it('should handle a zero and a negative number correctly', () => {
            const result = Add(0, -5);
            expect(result).toBe(-5);
        });

        it('should handle a zero and a positive number correctly', () => {
            const result = Add(0, 5);
            expect(result).toBe(5);
        });
    });

    describe('AddAsync', () => {
        it('should add two positive numbers correctly', async () => {
            const result = await AddAsync(5, 3);
            expect(result).toBe(8);
        });

        it('should add negative numbers correctly', async () => {
            const result = await AddAsync(-5, -3);
            expect(result).toBe(-8);
        });

        it('should add positive and negative numbers correctly', async () => {
            const result = await AddAsync(5, -3);
            expect(result).toBe(2);
        });

        it('should handle zero correctly', async () => {
            const result = await AddAsync(5, 0);
            expect(result).toBe(5);
        });

        it('should handle decimal numbers correctly', async () => {
            const result = await AddAsync(5.5, 3.2);
            expect(result).toBe(8.7);
        });

        it('should handle string numbers correctly', async () => {
            const result = await AddAsync(Number('10'), Number('20'));
            expect(result).toBe(30);
        });

        it('should complete after a delay', async () => {
            const startTime = Date.now();
            await AddAsync(1, 1);
            const endTime = Date.now();
            const elapsed = endTime - startTime;
            
            // Should take at least 1000ms due to the setTimeout
            expect(elapsed).toBeGreaterThanOrEqual(1000);
        });

        it('should add two zeros correctly', async () => {
            const result = await AddAsync(0, 0);
            expect(result).toBe(0);
        });

        it('should add a zero and a negative number correctly', async () => {
            const result = await AddAsync(0, -5);
            expect(result).toBe(-5);
        });

        it('should add two limit numbers correctly', async () => {
            const result = await AddAsync(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
            expect(result).toBe(Number.MAX_SAFE_INTEGER + Number.MAX_SAFE_INTEGER);
        });

        it('should add positive and negative limit numbers correctly', async () => {
            const result = await AddAsync(Number.MAX_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER);
            expect(result).toBe(0);
        });
    });
});

