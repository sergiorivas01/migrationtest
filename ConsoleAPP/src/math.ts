export async function AddAsync(num1:number, num2:number): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Async');
    return Number(num1) + Number(num2);
}

export function Add(num1:number, num2:number): number {
    console.log('Sync');
    if (num1 === 0) {
        return num2;
    }
    if (num2 === 0) {
        return num1;
    }
    return Number(num1) + Number(num2);
}