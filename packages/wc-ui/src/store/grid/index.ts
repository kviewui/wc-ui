import { createStore } from '@stencil/store';
import type { GridGutterType } from '../../types';

interface GridState {
    gutter: GridGutterType | GridGutterType[];
    wrap: boolean;
}

const { state, onChange, dispose, set, get } = createStore<GridState>({
    /**
     * 栅格间隔，支持响应式，可为栅格数或一个包含其他属性的对象，如：{ xs: 8, sm: 16, md: 24 }
     * + 数字：间隔为 0 时相当于 display: none
     * + 数组：[水平间隔, 垂直间隔]，如：[8, 16]
     * + 对象：{ xs: 数字, sm: 数字, md: 数字 }，如：{ xs: 8, sm: 16, md: 24 }
     * + 响应式：{ xs: 数字 | 数组, sm: 数字 | 数组, md: 数字 | 数组 }
     * 
     * @zh 栅格间隔，支持响应式，可为栅格数或一个包含其他属性的对象，如：{ xs: 8, sm: 16, md: 24 }
     * @en Grid interval, support responsive, can be the number of columns or an object containing other attributes, such as: { xs: 8, sm: 16, md: 24 }
     */
    gutter: 1,
    /**
     * `Col` 是否自动换行
     * @zh `Col` 是否自动换行
     * @en Whether `Col` wraps automatically
     */
    wrap: false
});

// 导出 store 相关方法
export {
    state,
    onChange as onGridChange,
    dispose as disposeGrid,
    set,
    get
}