/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { ThemeType } from "./types";
import { SpaceSize } from "./components/space/index";
export { ThemeType } from "./types";
export { SpaceSize } from "./components/space/index";
export namespace Components {
    interface WcButton {
        /**
          * 按钮是否为块级元素，默认为 `false`
         */
        "block": boolean;
        /**
          * 是否为暗黑模式，默认为 `false`
         */
        "dark": boolean;
        /**
          * 按钮是否禁用，默认为 `false`
         */
        "disabled": boolean;
        /**
          * 主题色阶号，可选值为 `1` `2` `3` `4` `5` `6` `7` `8` `9` `10`
         */
        "level": number;
        /**
          * 按钮是否加载中，默认为 `false`
         */
        "loading": boolean;
        /**
          * 矩形圆角大小，单位为 `px`，默认为 `4px`
         */
        "radius": number;
        /**
          * 按钮形状，可选值为 `rectangle` `square` `round` `circle`，默认为 `rectangle`
         */
        "shape": 'rectangle' | 'square' | 'round' | 'circle';
        /**
          * 按钮尺寸，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `medium`
         */
        "size": 'mini' | 'small' | 'medium' | 'large' | number;
        /**
          * 按钮文本，也可通过默认插槽设置文本
         */
        "text": string;
        /**
          * 按钮风格，可选值为 `default` `primary` `success` `warning` `danger`，默认为 `default`
         */
        "theme": ThemeType;
        /**
          * 按钮类型，可选值为 `submit` `reset` `button`，默认为 `button`
         */
        "type": 'submit' | 'reset' | 'button';
        /**
          * 按钮变体，可选值为 `base` `outline` `dashed` `text` `contained`，默认为 `base`
         */
        "variant": 'base' | 'outline' | 'dashed' | 'text' | 'contained';
        /**
          * 按钮是否可见，默认为 `true`
         */
        "visible": boolean;
    }
    interface WcButtonGroup {
        /**
          * 按钮主题
         */
        "theme": any;
    }
    interface WcIcon {
        /**
          * 自定义类名
         */
        "customClass": string;
        /**
          * 自定义样式
         */
        "customStyle": string | object;
        /**
          * 是否旋转
         */
        "spin": boolean;
        /**
          * 图标类型
         */
        "type": string;
    }
    interface WcIconFont {
    }
    interface WcSpace {
        /**
          * 对齐方式，可选值为 `start` `end` `center` `baseline` `stretch`，默认为 `start`
         */
        "align": 'start' | 'end' | 'center' | 'baseline' | 'stretch';
        /**
          * 子元素是否为块级元素
         */
        "block": boolean;
        /**
          * 节点类名
         */
        "customClass": string | string[];
        /**
          * 节点样式
         */
        "customStyle": {
        [key: string]: string
    } | string;
        /**
          * 间距方向，可选值为 `horizontal` `vertical`，默认为 `horizontal`
         */
        "direction": 'horizontal' | 'vertical';
        /**
          * 间距大小，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `small`
         */
        "size": SpaceSize | SpaceSize[];
        /**
          * 是否为环绕排列，默认为 `false`
         */
        "wrap": boolean;
    }
    interface WcSpaceItem {
    }
}
export interface WcButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLWcButtonElement;
}
export interface WcButtonGroupCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLWcButtonGroupElement;
}
export interface WcSpaceCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLWcSpaceElement;
}
export interface WcSpaceItemCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLWcSpaceItemElement;
}
declare global {
    interface HTMLWcButtonElement extends Components.WcButton, HTMLStencilElement {
    }
    var HTMLWcButtonElement: {
        prototype: HTMLWcButtonElement;
        new (): HTMLWcButtonElement;
    };
    interface HTMLWcButtonGroupElement extends Components.WcButtonGroup, HTMLStencilElement {
    }
    var HTMLWcButtonGroupElement: {
        prototype: HTMLWcButtonGroupElement;
        new (): HTMLWcButtonGroupElement;
    };
    interface HTMLWcIconElement extends Components.WcIcon, HTMLStencilElement {
    }
    var HTMLWcIconElement: {
        prototype: HTMLWcIconElement;
        new (): HTMLWcIconElement;
    };
    interface HTMLWcIconFontElement extends Components.WcIconFont, HTMLStencilElement {
    }
    var HTMLWcIconFontElement: {
        prototype: HTMLWcIconFontElement;
        new (): HTMLWcIconFontElement;
    };
    interface HTMLWcSpaceElement extends Components.WcSpace, HTMLStencilElement {
    }
    var HTMLWcSpaceElement: {
        prototype: HTMLWcSpaceElement;
        new (): HTMLWcSpaceElement;
    };
    interface HTMLWcSpaceItemElement extends Components.WcSpaceItem, HTMLStencilElement {
    }
    var HTMLWcSpaceItemElement: {
        prototype: HTMLWcSpaceItemElement;
        new (): HTMLWcSpaceItemElement;
    };
    interface HTMLElementTagNameMap {
        "wc-button": HTMLWcButtonElement;
        "wc-button-group": HTMLWcButtonGroupElement;
        "wc-icon": HTMLWcIconElement;
        "wc-icon-font": HTMLWcIconFontElement;
        "wc-space": HTMLWcSpaceElement;
        "wc-space-item": HTMLWcSpaceItemElement;
    }
}
declare namespace LocalJSX {
    interface WcButton {
        /**
          * 按钮是否为块级元素，默认为 `false`
         */
        "block"?: boolean;
        /**
          * 是否为暗黑模式，默认为 `false`
         */
        "dark"?: boolean;
        /**
          * 按钮是否禁用，默认为 `false`
         */
        "disabled"?: boolean;
        /**
          * 主题色阶号，可选值为 `1` `2` `3` `4` `5` `6` `7` `8` `9` `10`
         */
        "level"?: number;
        /**
          * 按钮是否加载中，默认为 `false`
         */
        "loading"?: boolean;
        /**
          * 点击事件
         */
        "onClick"?: (event: WcButtonCustomEvent<MouseEvent>) => void;
        /**
          * 矩形圆角大小，单位为 `px`，默认为 `4px`
         */
        "radius"?: number;
        /**
          * 按钮形状，可选值为 `rectangle` `square` `round` `circle`，默认为 `rectangle`
         */
        "shape"?: 'rectangle' | 'square' | 'round' | 'circle';
        /**
          * 按钮尺寸，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `medium`
         */
        "size"?: 'mini' | 'small' | 'medium' | 'large' | number;
        /**
          * 按钮文本，也可通过默认插槽设置文本
         */
        "text"?: string;
        /**
          * 按钮风格，可选值为 `default` `primary` `success` `warning` `danger`，默认为 `default`
         */
        "theme"?: ThemeType;
        /**
          * 按钮类型，可选值为 `submit` `reset` `button`，默认为 `button`
         */
        "type"?: 'submit' | 'reset' | 'button';
        /**
          * 按钮变体，可选值为 `base` `outline` `dashed` `text` `contained`，默认为 `base`
         */
        "variant"?: 'base' | 'outline' | 'dashed' | 'text' | 'contained';
        /**
          * 按钮是否可见，默认为 `true`
         */
        "visible"?: boolean;
    }
    interface WcButtonGroup {
        "onWcClick"?: (event: WcButtonGroupCustomEvent<any>) => void;
        /**
          * 按钮主题
         */
        "theme"?: any;
    }
    interface WcIcon {
        /**
          * 自定义类名
         */
        "customClass"?: string;
        /**
          * 自定义样式
         */
        "customStyle"?: string | object;
        /**
          * 是否旋转
         */
        "spin"?: boolean;
        /**
          * 图标类型
         */
        "type"?: string;
    }
    interface WcIconFont {
    }
    interface WcSpace {
        /**
          * 对齐方式，可选值为 `start` `end` `center` `baseline` `stretch`，默认为 `start`
         */
        "align"?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
        /**
          * 子元素是否为块级元素
         */
        "block"?: boolean;
        /**
          * 节点类名
         */
        "customClass"?: string | string[];
        /**
          * 节点样式
         */
        "customStyle"?: {
        [key: string]: string
    } | string;
        /**
          * 间距方向，可选值为 `horizontal` `vertical`，默认为 `horizontal`
         */
        "direction"?: 'horizontal' | 'vertical';
        "onWcClick"?: (event: WcSpaceCustomEvent<any>) => void;
        /**
          * 间距大小，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `small`
         */
        "size"?: SpaceSize | SpaceSize[];
        /**
          * 是否为环绕排列，默认为 `false`
         */
        "wrap"?: boolean;
    }
    interface WcSpaceItem {
        "onWcClick"?: (event: WcSpaceItemCustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "wc-button": WcButton;
        "wc-button-group": WcButtonGroup;
        "wc-icon": WcIcon;
        "wc-icon-font": WcIconFont;
        "wc-space": WcSpace;
        "wc-space-item": WcSpaceItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "wc-button": LocalJSX.WcButton & JSXBase.HTMLAttributes<HTMLWcButtonElement>;
            "wc-button-group": LocalJSX.WcButtonGroup & JSXBase.HTMLAttributes<HTMLWcButtonGroupElement>;
            "wc-icon": LocalJSX.WcIcon & JSXBase.HTMLAttributes<HTMLWcIconElement>;
            "wc-icon-font": LocalJSX.WcIconFont & JSXBase.HTMLAttributes<HTMLWcIconFontElement>;
            "wc-space": LocalJSX.WcSpace & JSXBase.HTMLAttributes<HTMLWcSpaceElement>;
            "wc-space-item": LocalJSX.WcSpaceItem & JSXBase.HTMLAttributes<HTMLWcSpaceItemElement>;
        }
    }
}
