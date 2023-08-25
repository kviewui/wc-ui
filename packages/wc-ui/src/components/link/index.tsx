import { Component, Host, Prop, Element, State, h } from '@stencil/core';
import { getThemeColor } from '../../_utils';

@Component({
    tag: 'wc-link',
    shadow: true
})
export class WcLink {
    /**
     * 是否使用了图标插槽
     */
    hasIconSlot: boolean;

    /**
     * 是否为暗黑模式，默认为 `false`
     */
    @Prop() dark: false;

    /**
     * 链接地址 
     */
    @Prop() href: string;

    /**
     * 链接的状态
     */
    @Prop() status: 'default' | 'success' | 'warning' | 'danger' = 'default';

    /**
     * 链接是否禁用
     */
    @Prop() disabled: boolean = false;

    /**
     * 是否在新窗口打开
     */
    @Prop() blank: boolean = false;

    /**
     * 鼠标悬浮时是否存在底色，默认为 `true`
     */
    @Prop() hoverable: boolean = true;

    /**
     * 是否使用图标，默认为 `false`
     */
    @Prop() icon: boolean = false;

    /**
     * 是否在加载中，默认为 `false`
     */
    @Prop() loading: boolean = false;


    @Element() el: HTMLElement;

    @State() hrefValue: string;

    @State() clickable: boolean = this.disabled;

    @State() style: { [ket: string]: string } = {
        display: 'inline-flex',
        color: getThemeColor(this.status === 'default' ? 'primary' : this.status),
        textDecoration: 'none',
        cursor: this.clickable ? 'not-allowed' : 'pointer',
        opacity: this.clickable ? '0.5' : '1',
        backgroundColor: 'transparent',
        padding: '8px 6px',
        borderRadius: '3px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        lineHeight: '0.8'
    };

    @State() iconStyle: { [ket: string]: string } = {
        marginRight: '4px',
        verticalAlign: 'middle'
    };

    /**
     * 设置组件基本样式
     */
    setStyle() {
        return {

        }
    }

    /**
     * 设置鼠标移入时的样式
     */
    onMouseEnter = () => {
        if (this.clickable || !this.hoverable) {
            return;
        }
        
        this.style = {
            ...this.style,
            backgroundColor: this.dark ? '#2e2e30' : '#f2f3f5'
        }
    }

    onMouseLeave = () => {
        if (this.clickable || !this.hoverable) {
            return;
        }

        this.style = {
            ...this.style,
            backgroundColor: 'transparent'
        }
    }

    setDisabledStyle() {
        return {
            ...this.style,
            cursor: 'not-allowed',
            opacity: '0.5'
        }
    }

    setEnableStyle() {
        return {
            ...this.style,
            cursor: 'pointer',
            opacity: '1'
        }
    }

    componentWillLoad() {
        this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');

        if (this.loading) {
            this.clickable = true;
            this.style = this.setDisabledStyle();
        }
        
        if (this.disabled) {
            this.hrefValue = 'javascript:void(0);';
        }

        this.hrefValue = this.href;
    }

    renderIcon() {
        if (!this.hasIconSlot && !this.icon && !this.loading) {
            return null;
        }
        return (
            <span style={this.iconStyle}>
                <slot name='icon'>
                    {this.loading 
                        ? <icon-loading spin color={getThemeColor(this.status === 'default' ? 'primary' : this.status)}></icon-loading> 
                        : <icon-link color={getThemeColor(this.status === 'default' ? 'primary' : this.status)}></icon-link>
                    }
                </slot>
            </span>
        );
    };

    render() {
        return (
            <Host>
                <a href={this.hrefValue} target={this.blank ? '_blank' : '_self'} style={this.style} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    {this.renderIcon()}
                    <slot></slot>
                </a>
            </Host>
        );
    }
}
