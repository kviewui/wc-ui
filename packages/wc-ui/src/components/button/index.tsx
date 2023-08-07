import { Component, Prop, State, h, Event, EventEmitter, Element, Fragment } from '@stencil/core';
import { getPresetColor, getThemeColor, getActiveColor, getHoverColor } from '../../_utils/colors';
import type { ThemeType } from '../../types';
import { colorBuilder } from '@kviewui/color-builder';

@Component({
    tag: 'wc-button',
    shadow: true,
})
export class Button {
    /**
     * 是否有图标插槽，默认为 `false`
     */
    hasIconSlot: boolean;

    /**
     * 组件根元素
     */
    @Element() el: HTMLElement;

    /**
     * 按钮变体，可选值为 `base` `outline` `dashed` `text` `contained`，默认为 `base`
     */
    @Prop() variant: 'base' | 'outline' | 'dashed' | 'text' | 'contained' = 'base';

    /**
     * 按钮类型，可选值为 `submit` `reset` `button`，默认为 `button`
     */
    @Prop() type: 'submit' | 'reset' | 'button' = 'button';

    /**
     * 按钮形状，可选值为 `rectangle` `square` `round` `circle`，默认为 `rectangle`
     */
    @Prop() shape: 'rectangle' | 'square' | 'round' | 'circle' = 'rectangle';

    /**
     * 按钮风格，可选值为 `default` `primary` `success` `warning` `danger`，默认为 `default`
     */
    @Prop() theme: ThemeType = 'default';

    /**
     * 是否为暗黑模式，默认为 `false`
     */
    @Prop() dark: boolean = false;

    /**
     * 主题色阶号，可选值为 `1` `2` `3` `4` `5` `6` `7` `8` `9` `10`
     */
    @Prop() level: number = 6;

    /**
     * 按钮文本，也可通过默认插槽设置文本
     */
    @Prop() text: string = '默认按钮';

    /**
     * 按钮是否可见，默认为 `true`
     */
    @Prop() visible: boolean = true;

    /**
     * 按钮是否禁用，默认为 `false`
     */
    @Prop() disabled: boolean = false;

    /**
     * 按钮是否加载中，默认为 `false`
     */
    @Prop() loading: boolean = false;

    /**
     * 按钮是否为块级元素，默认为 `false`
     */
    @Prop() block: boolean = false;

    /**
     * 矩形圆角大小，单位为 `px`，默认为 `4px`
     */
    @Prop() radius: number = 4;

    /**
     * 按钮尺寸，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `medium`
     */
    @Prop() size: 'mini' | 'small' | 'medium' | 'large' | number = 'medium';

    @State() backgroundColor: string = getPresetColor(getThemeColor(this.theme), this.level, this.dark);
    @State() color: string = '#fff';
    @State() boxShadow: string = this.variant === 'contained' ? '0 5px 10px 0 rgba(0, 0, 0, 0.1)' : '';
    @State() borderColor: string = '';
    @State() borderWidth: string = '0px';
    @State() borderStyle: string = 'solid';
    @State() borderRadius: string = '';
    @State() padding: string = '0 16px';
    @State() width: string = '';
    @State() height: string = '38px';
    @State() textAlign: string = 'center';
    @State() fontSize: string = '14px';

    /**
     * 点击事件
     */
    @Event({
        eventName: 'click',
        composed: true,
        cancelable: true,
        bubbles: true,
    }) click: EventEmitter<MouseEvent>;

    handleClick = (e: MouseEvent) => {
        if (this.disabled) {
            e.preventDefault();
            return;
        }
        this.click.emit(e);
    }

    /**
     * 获取按钮尺寸
     */
    getSize = () => {
        if (typeof this.size === 'number') {
            return `${this.size}px`;
        }
        switch (this.size) {
            case 'mini':
                return '20px';
            case 'small':
                return '26px';
            case 'medium':
                return '32px';
            case 'large':
                return '44px';
            default:
                return '40px';
        }
    }

    /**
     * 获取按钮圆角大小
     */
    getRadius = () => {
        if (this.shape === 'round') {
            return '100px';
        }
        if (this.shape === 'circle') {
            return '50%';
        }
        return `${this.radius}px`;
    }

    /**
     * 根据按钮变体设置按钮样式
     */
    setVariantStyle = (level: number = this.level) => {
        switch (this.variant) {
            case 'base':
                this.boxShadow = '';
                this.borderColor = '';
                this.borderWidth = '0px';
                this.borderStyle = 'solid';
                break;
            case 'outline':
                this.boxShadow = '';
                this.borderColor = this.color = getPresetColor(getThemeColor(this.theme), level, this.dark);
                this.borderWidth = '1px';
                this.borderStyle = 'solid';
                this.backgroundColor = 'transparent';
                // 判断是否为默认主题，如果是则设置默认主题的文字颜色和边框颜色
                if (this.theme === 'default') {
                    this.color = this.dark ? '#fff' : '#333';
                    this.borderColor = this.dark ? '#fff' : this.getDefaultThemeColor();
                }
                break;
            case 'dashed':
                this.boxShadow = '';
                this.borderColor = this.color = getPresetColor(getThemeColor(this.theme), level, this.dark);
                this.borderWidth = '1px';
                this.borderStyle = 'dashed';
                this.backgroundColor = 'transparent';
                break;
            case 'text':
                this.boxShadow = '';
                this.borderColor = '';
                this.borderWidth = '0px';
                this.borderStyle = 'solid';
                this.backgroundColor = 'transparent';
                this.color = getPresetColor(getThemeColor(this.theme), level, this.dark);
                break;
            case 'contained':
                this.boxShadow = '0 5px 10px 0 rgba(0, 0, 0, 0.1)';
                this.borderColor = '';
                this.borderWidth = '0px';
                this.borderStyle = 'solid';
                break;
            default:
                break;
        }
    }

    /**
     * 根据按钮形状设置按钮样式
     */
    setShapeStyle = () => {
        this.borderRadius = this.getRadius();
        switch (this.shape) {
            case 'rectangle':
                // this.padding = '0 18px';
                break;
            case 'square':
                this.padding = '';
                this.width = this.height = this.getSize();
                break;
            case 'round':
                // this.padding = '0 18px';
                break;
            case 'circle':
                this.padding = '';
                this.width = this.height = this.getSize();
            default:
                break;
        }
    }

    /**
     * 根据按钮尺寸设置文字大小
     */
    getFontSize = () => {
        if (typeof this.size === 'number') {
            return `${this.size / 2}px`;
        }
        switch (this.size) {
            case 'mini':
                return '12px';
            case 'small':
                return '14px';
            case 'medium':
                return '14px';
            case 'large':
                return '16px';
            default:
                return '14px';
        }
    }

    /**
     * 根据按钮尺寸设置按钮样式以及字体大小
     */
    setSizeStyle = () => {
        this.fontSize = this.getFontSize();
        this.height = this.getSize();
        switch (this.size) {
            case 'mini':
                this.padding = '0 5px';
                break;
            case 'small':
                this.padding = '0 10px';
                break;
            case 'medium':
                this.padding = '0 15px';
                break;
            case 'large':
                this.padding = '0 20px';
                break;
            default:
                break;
        }
    }

    /**
     * 根据是否使用图标设置按钮样式
     */
    setIconStyle = () => {
        if (this.hasIconSlot) {
            // switch (this.iconPosition) {
            //     case 'left':
            //         this.padding = '0 10px 0 5px';
            //         break;
            //     case 'right':
            //         this.padding = '0 5px 0 10px';
            //         break;
            //     default:
            //         break;
            // }
            this.padding = '';
        }
    }

    /**
     * 判断是否为块状按钮，如果是则设置按钮宽度为 100%
     */
    setBlockStyle = () => {
        if (this.block) {
            this.width = '100%';
        }
    }

    /**
     * 根据按钮变体设置按钮悬浮样式
     */
    setHoverStyle = () => {
        if (this.variant !== 'base' && this.variant !== 'contained' && this.variant !== 'text') {
            // 判断是否为默认主题，如果是则设置默认主题的文字颜色和边框颜色
            const theme = this.theme === 'default' ? 'primary' : this.theme;

            const level = this.dark ? this.level - 2 : this.level;

            this.backgroundColor = 'transparent';

            this.color = this.borderColor = getPresetColor(getHoverColor(getThemeColor(theme)), level, this.dark);
            return;
        } else if (this.variant === 'text') {
            this.backgroundColor = this.getDefaultThemeColor(2);
        }
    }

    /**
     * 根据按钮变体设置按钮激活样式
     */
    setActiveStyle = () => {
        if (this.variant !== 'text' && this.variant !== 'contained') {
            this.backgroundColor = this.getDefaultThemeColor(2);
        } else if (this.variant === 'text') {
            this.backgroundColor = this.getDefaultThemeColor(3);
        }
    }

    conponentDidLoad() {
        // console.log('wc-button conponentDidLoad');
    }

    componentWillLoad() {
        // 检测是否使用了图标插槽
        this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
        // console.log('wc-button componentWillLoad');
        // 设置默认按钮风格
        if (this.theme === 'default') {
            this.color = this.dark ? '#fff' : '#333';
            this.backgroundColor = colorBuilder.getPresetColors()['grey'][this.dark ? 'dark' : 'light'][2];
        }

        this.setVariantStyle();

        this.setBlockStyle();

        this.setSizeStyle();

        this.setShapeStyle();

        this.setBlockStyle();

        this.setIconStyle();
    }

    connectedCallback() {
        // console.log(this.buttonRef);

        // console.log('wc-button connectedCallback');
        // this.getBaseStyle();
        // console.log('wc-button connectedCallback');
        // console.log(colorBuilder.generate('red', {list: true}));
        // console.log(colorBuilder.getPresetColors()['grey']);
        // console.log(Object.keys(colorBuilder.getPresetColors()));
        // console.log(this.buttonRef);
        // console.log(getThemeColor('primary'));

        // console.log('backgroundColor', this.backgroundColor);

    }

    /**
     * 获取默认主题色
     */
    getDefaultThemeColor = (level: number = 4) => {
        return colorBuilder.getPresetColors()['grey'][this.dark ? 'dark' : 'light'][level]
    }

    /**
     * 鼠标进入
     */
    onMouseEnter = () => {
        // 判断按钮是否禁用
        if (this.disabled) {
            return;
        }
        if (this.theme === 'default' && this.variant === 'base') {
            this.backgroundColor = this.getDefaultThemeColor(3);
            return;
        }
        if (this.variant !== 'base' && this.variant !== 'contained') {
            this.setHoverStyle();
            return;
        }
        this.backgroundColor = getHoverColor(this.backgroundColor, this.dark);
    };

    /**
     * 鼠标离开
     */
    onMouseLeave = () => {
        // 判断按钮是否禁用
        if (this.disabled) {
            return;
        }
        if (this.theme === 'default' && this.variant === 'base') {
            this.backgroundColor = this.getDefaultThemeColor(2);
            return;
        }
        if (this.variant !== 'contained' && this.variant !== 'base') {
            this.setVariantStyle();
            return;
        }
        this.backgroundColor = getPresetColor(getThemeColor(this.theme), this.level, this.dark);
    };

    /**
     * 鼠标按下
     */
    onMouseDown = () => {
        // 判断按钮是否禁用
        if (this.disabled) {
            return;
        }
        if (this.theme === 'default' && this.variant === 'base') {
            this.backgroundColor = this.getDefaultThemeColor(4);
            return;
        }
        if (this.variant !== 'contained' && this.variant !== 'base') {
            this.setActiveStyle();
            return;
        }
        this.backgroundColor = getActiveColor(getPresetColor(getThemeColor(this.theme), 6, this.dark), this.level, this.dark);
    };

    /**
     * 鼠标抬起
     */
    onMouseUp = () => {
        // 判断按钮是否禁用
        if (this.disabled) {
            return;
        }
        if (this.theme === 'default' && this.variant === 'base') {
            this.backgroundColor = this.getDefaultThemeColor(2);
            return;
        }
        if (this.variant !== 'contained' && this.variant !== 'base') {
            this.setHoverStyle();
            return;
        }
        // this.backgroundColor = getPresetColor(getThemeColor(this.theme), this.level, this.dark);
        this.backgroundColor = getHoverColor(getPresetColor(getThemeColor(this.theme), 6, this.dark), this.dark);
    };

    /**
     * 触摸开始
     */
    onTouchStart = this.onMouseDown;

    /**
     * 触摸结束
     */
    onTouchEnd = this.onMouseUp;

    /**
     * 获取基础样式 
     * @returns  
     */
    getBaseStyle() {
        // this.boxShadow = '';
        return {
            boxSizing: 'border-box',
            borderWidth: this.borderWidth,
            color: this.color,
            backgroundColor: this.backgroundColor,
            cursor: this.disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
            borderColor: this.borderColor,
            padding: this.padding,
            height: this.height,
            fontSize: this.fontSize,
            borderRadius: this.borderRadius,
            boxShadow: this.boxShadow,
            borderStyle: this.borderStyle,
            opacity: this.disabled ? 0.5 : 1,
            transition: 'all 0.3s ease-in-out',
            display: this.block ? 'block' : 'flex',
            alignItems: 'center',
            width: this.width,
            textAlign: this.textAlign,
        }
    }

    render() {
        if (this.visible) {
            return (<Fragment>
                <button style={this.getBaseStyle() as any}
                    disabled={this.disabled}
                    type={this.type}
                    onClick={this.handleClick}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                    onMouseEnter={this.onMouseEnter}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseLeave={this.onMouseLeave}>
                    {/* <icon-add-circle></icon-add-circle> */}
                    {
                        this.hasIconSlot &&
                        <slot name='icon'>
                            <icon-add-circle></icon-add-circle>
                        </slot>
                    }

                    <slot>
                        {this.text}
                    </slot>
                </button>
            </Fragment>);
        }
    }
}