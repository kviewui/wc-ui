import { Component, h, State, Prop, Host } from '@stencil/core';
import { state, set } from '../_store';
import type { GridGutterType } from '../../types';

@Component({
    tag: 'wc-row',
    shadow: true
})
export class WcGridRow {
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
    @Prop() gutter: GridGutterType | GridGutterType[] = 0;

    /**
     * 纵向排列，可选值为 `start` `end` `center` `stretch`
     * @zh 纵向排列，可选值为 `start` `end` `center` `stretch`
     * @en Vertical arrangement, optional values are `start` `end` `center` `stretch`
     */
    @Prop() align: 'start' | 'end' | 'center' | 'stretch' = 'start';

    /**
     * flex 布局下的垂直对齐方式，可选值为 `start` `end` `center` `space-around` `space-between`
     * @zh flex 布局下的垂直对齐方式，可选值为 `start` `end` `center` `space-around` `space-between`
     * @en Vertical alignment in flex layout, optional values are `start` `end` `center` `space-around` `space-between`
     */
    @Prop() justify: 'start' | 'end' | 'center' | 'space-around' | 'space-between' = 'start';

    /**
     * 是否启用 flex 布局
     * @zh 是否启用 flex 布局
     * @en Whether to enable flex layout
     */
    @Prop() flex: boolean = false;

    /**
     * `Col` 是否自动换行
     * @zh `Col` 是否自动换行
     * @en Whether `Col` wraps automatically
     */
    @Prop() wrap: boolean = false;
    
    /**
     *  基本样式
     * @zh 基本样式
     * @en Basic style
     */
    @State() styles: any = {
        'display': 'flex',
        'flex-wrap': 'wrap'
    };

    /**
     * 根据 flex 布局设置样式
     */
    @State() setFlexStyles() {
        if (this.flex) {
            this.styles = {
                ...this.styles,
                'flex-direction': 'row',
                'align-items': this.align,
                'justify-content': this.justify
            };
        }
    }

    componentWillLoad() {
        console.log('row gutter: ', this.gutter);
        // state.gutter = this.gutter;
        console.log('state.gutter: ', state.gutter);
        
        console.log('row styles: ', state.gutter);
    }

    render() {
        set('gutter', this.gutter as any);

        return (
            <Host class="wc-grid-row" style={this.styles}>
                <slot></slot>
            </Host>
        );
    }
}
