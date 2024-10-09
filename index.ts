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

export function get_courses(textWithCourses: string): any[] {
    let result = [];

    while (textWithCourses) {
        const payloadLength = textWithCourses.substring(0, 3);
        const len = parseInt(payloadLength, 10);

        const courseText = textWithCourses.substring(3, 3 + len);
        const findReg = /[0-9]+([A-Z]{3})([0-9]+):([A-Z]{3})([0-9]+)/;
        const found = courseText.match(findReg);

        if (found) {
            result.push({
                fromC: found[1],
                fromA: parseInt(found[2], 10),
                toC: found[3],
                toA: parseInt(found[4], 10),
            });
        }        
        textWithCourses = textWithCourses.substring(3 + len);
    }
    return result;
}

export function task3(textWithCourses: string, textHowMuch: string): number | null {
    const findReg = /.*?([0-9]+) ([A-Z]{3}).*in ([A-Z]{3})/;
    const found = textHowMuch.match(findReg);
    
    if (!found || !found[1] || !found[2] || !found[3]) {
        return null;
    }

    const fromAmount = parseInt(found[1], 10);
    const fromCurrency = found[2];
    const toCurrency = found[3];

    const courses = get_courses(textWithCourses);

    let result = null;

    courses.forEach((course) => {
        // console.log(course);
        if (course.fromC === fromCurrency && course.toC === toCurrency) {
            result = course.toA / course.fromA * fromAmount;
        }
        else if (course.fromC === toCurrency && course.toC === fromCurrency) {
            result = course.fromA / course.toA * fromAmount;
        }
    });

    return result;
}

const textWithCourses = '015100HKD400:USD50021300ZWD700000:HKD17064';
const textHowMuch = 'How much is 20 USD worth in HKD';
console.log(textHowMuch);
console.log(task3(textWithCourses, textHowMuch));
const textHowMuch2 = 'How much is 200 HKD worth in USD';
console.log(textHowMuch2);
console.log(task3(textWithCourses, textHowMuch2));
