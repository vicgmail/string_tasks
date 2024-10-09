export function task1(inputText: string): string[] {
    const result: string[] = [];
    while (inputText) {
        const len = parseInt(inputText.substring(0, 3), 10);
        result.push(inputText.substring(3, 3+len));
        inputText = inputText.substring(3 + len);
    }
    return result;
}

const text1 = '001a002bc0041234';
console.log(task1(text1));

export function task2(inputText: string): string {
    let result = '';
    while (inputText) {
        const payloadLength = inputText.substring(0, 3);
        const len = parseInt(payloadLength, 10);
        if (result) {
            result += ' ';
        }
        result += payloadLength + ' ' + inputText.substring(3, 3 + len);
        
        inputText = inputText.substring(3 + len);
    }
    return result;
}

const text2 = '015100HKD400:USD51021300ZWD700000:HKD17064';
console.log(task2(text2));