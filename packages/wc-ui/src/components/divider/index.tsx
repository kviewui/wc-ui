import { Component, h, Prop, State, Element } from '@stencil/core';
import { isNumber } from '../../_utils/is';

const getMargin = (margin: number | string) => {
    return isNumber(margin) ? `${margin}px` : margin;
}

@Component({
    tag: 'wc-divider',
    shadow: true
})
export class WcDivider {
    /**
     * 是否使用了默认插槽
     */
    hasDefaultSlot: boolean = false;

    /**
     * 方向，可选值为 horizontal 或 vertical， 默认为 horizontal
     */
    @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

    /**
     * 分割线样式，可选值为 solid 或 dashed 或 dotted 或 double， 默认为 solid
     */
    @Prop() type: 'solid' | 'dashed' | 'dotted' | 'double' = 'solid';

    /**
     * 文字位置，可选值为 left 或 right 或 center， 默认为 center
     */
    @Prop() textPosition: 'left' | 'right' | 'center' = 'center';

    /**
     * 分割线宽度或者高度，单位 px
     */
    @Prop() size: number = 1;

    /**
     * 分割线间距，水平方向时是上下间距，垂直方向时是左右间距，单位 px
     */
    @Prop() space: number = 8;

    /**
     * 元素根节点
     */
    @Element() $el: HTMLElement;

    /**
     * 初始化样式
     */
    @State() style: any = {
        width: '100%',
        position: 'relative',
        clear: 'both'
    };

    /**
     * 水平分割线样式
     */
    @State() horizontalStyle: any = {
        // height: `${this.size}px`,
        margin: `${getMargin(this.space)} 0`,
        // overflow: 'hidden',
        background: 'transparent',
        border: 'none',
        borderBottomColor: '#e8e8e8',
        borderBottomStyle: this.type,
        borderBottomWidth: `${this.size}px`
    };

    /**
     * 垂直分割线样式
     */
    @State() verticalStyle: any = {
        width: `${this.size}px`,
        height: '100%',
        margin: `0 ${getMargin(this.space)}`,
        overflow: 'hidden',
        background: 'transparent',
        border: 'none',
        borderRightColor: '#e8e8e8',
        borderRightStyle: this.type,
        borderRightWidth: `${this.size}px`
    };

    /**
     * 合并样式
     */
    @State() mergeStyle: any = () => {
        if (this.direction === 'horizontal') {
            this.style = {
                ...this.style,
                ...this.horizontalStyle
            }
        } else {
            this.style = {
                ...this.style,
                ...this.verticalStyle
            }
        }
    };

    /**
     * 文字样式
     */
    @State() textStyle: any = {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '0 8px',
        background: '#fff',
        // color: '#999',
        fontSize: '12px',
        lineHeight: '1'
    };

    /**
     * 文本居左或者局右时的位置
     */
    textNotCenterPosition: number = 24;

    /**
     * 合并文字样式
     */
    @State() mergeTextStyle: any = () => {
        if (this.textPosition === 'left') {
            this.textStyle = {
                ...this.textStyle,
                left: `${this.textNotCenterPosition}px`
            }
        } else if (this.textPosition === 'right') {
            this.textStyle = {
                ...this.textStyle,
                right: `${this.textNotCenterPosition}px`
            }
        } else {
            this.textStyle = {
                ...this.textStyle,
                left: '50%',
                transform: 'translateX(-50%) translateY(-50%)'
            }
        }
    };

    /**
     * 渲染文字
     */
    @State() renderText: any = () => {
        // return (
        //     <span style={this.textStyle}>文本信息</span>
        // )
        if (this.hasDefaultSlot) {
            return (
                <span style={this.textStyle}><slot></slot></span>
            )
        }
    };

    componentWillLoad() {
        this.hasDefaultSlot = !!this.$el.childNodes.length;

        this.mergeStyle();

        this.mergeTextStyle();
    }

    render() {
        return (
            <div role='separator' class="divider" style={this.style}>
               {/* 111 */}
                {this.renderText()}
            </div>
        );
    }
}