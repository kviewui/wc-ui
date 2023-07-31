export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

/**
 * 将字符串转换为对应的值 
 * @param value - 值
 * @returns 转换后的值
 * @example
 * parseValue('10px') // 10
 * parseValue('10') // 10
 * parseValue('true') // true
 * parseValue('false') // false
 * parseValue('#fff') // #fff
 * parseValue('rgb(255, 255, 255)') // rgb(255, 255, 255)
 * parseValue('abc') // abc
 */
export function parseValue(value: string) {
  // 如果值是一个数字或者包含数字和单位的字符串，比如 10px 或者 10
  if (/^-?\d+(\.\d+)?(px|em|rem|%)?$/.test(value)) {
    // 将其转换为数字
    let num = Number(value);
    // 如果转换成功，则返回这个数字，否则返回原始值
    return isNaN(num) ? value : num;
  }

  // 如果值是一个布尔值
  if (/^(true|false)$/.test(value)) {
    // 将其转换为布尔值
    return value === 'true';
  }

  // 如果值是一个颜色值的字符串，比如 #fff 或者 rgb(255, 255, 255)
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$|^rgb\(\d{1,3},\d{1,3},\d{1,3}\)$/.test(value)) {
    // 返回原始字符串类型
    return value;
  }

  // 其他情况，直接返回原始值
  return value;
}

/**
 * 将 style 字符串转换为对象 
 * @param style - style 字符串
 * @returns 转换后的对象
 * @example
 * parseStyle('font-size: 10px; color: #fff') // { fontSize: 10, color: '#fff' }
 */
export function parseStyle(style: string) {
  // 手动捕获异常，避免传入的 style 不是字符串类型
  try {
    // 如果 style 不是字符串类型，则直接返回空对象
    if (typeof style !== 'string') return {};
    // 将 style 字符串按照 ; 分割为数组
    return style.split(';').reduce((result, item) => {
      let [key, value] = item.split(':');
      // 如果 key 和 value 都存在
      if (key && value) {
        // 将 key 和 value 去除首尾空格后，分别作为对象的 key 和 value
        key = key.trim();
        value = value.trim();
        // 将属性名转换为驼峰形式，比如 font-size 转换为 fontSize
        let cssKey = key.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
        // 将属性值转换为对应的值
        let cssValue = parseValue(value);
        // 将属性名和属性值添加到对象中
        result[cssKey] = cssValue;
      }
      return result;
    }, {} as Record<string, any>);
  } catch (e) {
    return {};
  }
}

/**
 * 将对象转换为 style 字符串 
 * @param style - 对象
 * @returns 转换后的 style 字符串
 * @example
 * convertStyle({ fontSize: 10, color: '#fff' }) // 'font-size: 10px; color: #fff;'
 * convertStyle({ fontSize: 10 }) // 'font-size: 10px;'
 * convertStyle({}) // ''
 */
export function convertStyle(style: Record<string, any>) {
  // 如果 style 不是对象类型，则直接返回空字符串
  if (typeof style !== 'object') return '';
  // 将对象转换为 style 字符串
  return Object.entries(style).reduce((result, [key, value]) => {
    // 将驼峰形式的属性名转换为短横线形式，比如 fontSize 转换为 font-size
    let cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    // 将属性值转换为字符串
    let cssValue = String(value);
    // 将属性名和属性值添加到字符串中
    result += `${cssKey}:${cssValue};`;
    return result;
  }, '');
}
