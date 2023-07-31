import { colorBuilder } from '@kviewui/color-builder';
import type { ThemeType } from '../types';
// import config from '../config';

/**
 * 判断是否为预设主题色
 * @param color 颜色值
 * @returns 是否为预设主题色
 * @example
 * ```
 * isPresetColor('#fff') // false
 * isPresetColor('primary') // true
 * ```
 */
export function isPresetColor(color: string) {
    return Object.keys(colorBuilder.getPresetColors()).includes(color);
}

/**
 * 获取主题名称对应的颜色值
 * @param theme 主题名称
 * @returns 颜色值
 * @example
 * ```
 * getThemeColor('primary') // #0960bd
 * getThemeColor('success') // #00875a
 * getThemeColor('danger') // #d82c0d
 * getThemeColor('warning') // #d4820d
 * getThemeColor('info') // #1e88e5
 * ```
 */
export function getThemeColor(theme: ThemeType) {
    // console.log('theme', colorBuilder.getPresetColors());
    if (['success'].includes(theme)) {
        return colorBuilder.generate('#00BC79', {
            index: 6
        });
    }

    if (['danger'].includes(theme)) {
        return colorBuilder.generate('#F53F3F', {
            index: 6
        });
    }

    if (['warning'].includes(theme)) {
        return colorBuilder.generate('#FF7D00', {
            index: 6
        });
    }

    if (['primary'].includes(theme)) {
        return colorBuilder.generate('#165DFF', {
            index: 6
        });
    }

    if (['default'].includes(theme)) {
        return colorBuilder.generate('#f2f3f5', {
            index: 6
        });
    }

    console.warn(`[getThemeColor] theme: ${theme} is not a preset theme`);
    return '';
}

/**
 * 获取指定色阶号的主题色
 * @param color 颜色值
 * @param level 色阶号
 * @param dark 是否为暗色
 * @returns 主题色
 * @example
 * ```
 * getPresetColor('primary', 5) // #0960bd
 * getPresetColor('primary', 5, true) // #0960bd
 * getPresetColor('primary', 5, false) // #0960bd
 * ```
 */
export function getPresetColor(color: string, level: number = 5, dark: boolean = false) {
    try {
        return colorBuilder.generate(color, {
            index: level,
            dark
        });
    } catch {
        console.warn(`[getPresetColor] color: ${color} is not a preset color`);
        return color;
    }
}

/**
 * 获取点击态颜色
 * @param color 颜色值
 * @param level 色阶号
 * @param dark 是否为暗色
 */
export function getActiveColor(color: string, level: number = 6, dark: boolean = false) {
    return colorBuilder.generate(color, {
        index: dark ? (level + 1) : (level + 2),
        dark
    });
}

/**
 * 获取悬停态颜色
 * @param color 颜色值
 * @param level 色阶号
 * @param dark 是否为暗色
 */
export function getHoverColor(color: string, dark: boolean = false, level: number = 4) {
    return colorBuilder.generate(color, {
        index: level,
        dark
    });
}