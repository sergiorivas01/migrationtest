import { Add, AddAsync } from './math';

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
    });
});

