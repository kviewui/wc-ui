import { Component, Prop, State, h, Event, EventEmitter } from '@stencil/core';
import { getPresetColor, getThemeColor, getActiveColor, getHoverColor } from '../../_utils/colors';
import config from '../../config';
import type { ThemeType } from '../../types';
import { colorBuilder } from '@kviewui/color-builder';

@Component({
    tag: 'wc-button',
    shadow: true,
})
export class WcButton {
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

    @State() backgroundColor: string = getPresetColor(getThemeColor(this.theme), this.level, this.dark);
    @State() color: string = '#fff';
    @State() boxShadow: string = this.variant === 'contained' ? '0 5px 10px 0 rgba(0, 0, 0, 0.1)' : '';
    @State() borderColor: string = '';
    @State() borderWidth: string = '0px';
    @State() borderStyle: string = 'solid';

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
        this.click.emit(e);
    }

    buttonRef!: HTMLButtonElement;

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
        console.log('wc-button conponentDidLoad');
    }

    componentWillLoad() {
        console.log('wc-button componentWillLoad');
        // 设置默认按钮风格
        if (this.theme === 'default') {
            this.color = this.dark ? '#fff' : '#333';
            this.backgroundColor = colorBuilder.getPresetColors()['grey'][this.dark ? 'dark' : 'light'][2];
        }

        this.setVariantStyle();
    }

    connectedCallback() {
        
        console.log('wc-button connectedCallback');
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
            cursor: 'pointer',
            userSelect: 'none',
            borderColor: this.borderColor,
            padding: '0 18px',
            height: '38px',
            fontSize: '16px',
            borderRadius: '38px',
            boxShadow: this.boxShadow,
            borderStyle: this.borderStyle
        }
    }

    render() {
        if (this.visible) {
            return (
                <button style={this.getBaseStyle()}
                    type={this.type}
                    onClick={this.handleClick}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}
                    onMouseEnter={this.onMouseEnter}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseLeave={this.onMouseLeave}>
                    <slot>
                        {this.text}
                    </slot>
                </button>
            );
        }
    }
}