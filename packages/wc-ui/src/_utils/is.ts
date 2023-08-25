/**
 * 判断是否为字符串格式的数组
 * @param value 待判断的值
 * @returns 是否为字符串格式的数组
 */
export function isStringArray(value: any): value is string | number[] {
    try {
        return typeof value === 'string' && Array.isArray(JSON.parse(value));
    } catch {
        return false;
    }
}

/**
 * 判断是否为数组
 * @param value 待判断的值
 * @returns 是否为数组
 */
export function isArray(value: any): value is any[] {
    return Array.isArray(value);
}

/**
 * 判断是否为数字
 */
export function isNumber(value: any): value is number {
    return typeof value === 'number' || (typeof Number(value) === 'number' && !isNaN(Number(value)));
}