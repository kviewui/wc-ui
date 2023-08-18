import { Component, h, Prop, State } from '@stencil/core';
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
        height: `${this.size}px`,
        margin: `${getMargin(this.space)} 0`,
        overflow: 'hidden',
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
        margin: `0 ${getMargin(this.space)}px`,
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

    componentWillLoad() {
        this.mergeStyle();
    }

    render() {
        return (
            <div role='separator' class="divider" style={this.style}>
               {/* 111 */}
            </div>
        );
    }
}