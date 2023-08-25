/**
 * 主题类型
 * + `default`: 默认
 * + `primary`: 主要
 * + `success`: 成功
 * + `warning`: 警告
 * + `danger`: 危险
 * 
 * @zh 主题类型
 * @en Theme type
 * 
 * @value default 默认
 * @value primary 主要
 * @value success 成功
 * @value warning 警告
 * @value danger 危险
 * @defaultValue default
 */
export type ThemeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

/**
 * 栅格间隔
 * + 数字：间隔为 0 时相当于 display: none
 * + 数组：[水平间隔, 垂直间隔]，如：[8, 16]
 * + 对象：{ xs: 数字, sm: 数字, md: 数字 }，如：{ xs: 8, sm: 16, md: 24 }
 * + 响应式：{ xs: 数字 | 数组, sm: 数字 | 数组, md: 数字 | 数组 }
 * 
 * @zh 栅格间隔
 * @en Grid gutter
 */
export type GridGutterType = number | string | { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string; xl?: number | string; xxl?: number | string; };