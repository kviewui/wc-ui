import { Component, Host, Prop, Element, State, h } from '@stencil/core';
import { getThemeColor } from '../../_utils';

@Component({
    tag: 'wc-link',
    shadow: true
})
export class WcLink {
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


    @Element() el: HTMLElement;

    @State() hrefValue: string;

    @State() style: { [ket: string]: string } = {
        color: getThemeColor(this.status === 'default' ? 'primary' : this.status),
        textDecoration: 'none',
        cursor: this.disabled ? 'not-allowed' : 'pointer',
        opacity: this.disabled ? '0.5' : '1'
    };

    @State() spanStyle: { [ket: string]: string } = {
        display: 'inline-block',
        padding: '1px 4px',
        borderRadius: '3px',
        backgroundColor: 'transparent'
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
        if (this.disabled) {
            return;
        }

        console.log(this.spanStyle);
        
        this.spanStyle.backgroundColor = 'red';
    }

    componentWillLoad() {
        if (this.disabled) {
            this.hrefValue = 'javascript:void(0);';
        }

        this.hrefValue = this.href;
    }

    render() {
        return (
            <Host>
                <a href={this.hrefValue} target={this.blank ? '_blank' : '_self'} style={this.style} onMouseEnter={this.onMouseEnter}>
                    <span style={this.spanStyle}>
                        <slot></slot>
                    </span>
                </a>
            </Host>
        );
    }
}
