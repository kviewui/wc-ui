// store.ts
import { createStore } from '@stencil/store';

// 创建一个状态对象
const { state, set } = createStore({
  gutter: 0
});

// 导出状态对象
export { state, set };
