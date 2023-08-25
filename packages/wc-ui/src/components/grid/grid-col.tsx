import { Component, h, State, Prop, Element, Host } from '@stencil/core';
import { state } from '../../store/grid';
import type { GridGutterType } from '../../types';

@Component({
    tag: 'wc-col',
    shadow: true
})
export class WcGridCol {
    /**
     * 栅格占据的列数
     * @zh 栅格占据的列数，24 栅格系统中的栅格占位格数，为 0 时相当于 display: none
     * @en The number of columns occupied by the grid
     */
    @Prop() span: number = 24;

    /**
     * 栅格左侧的间隔格数，间隔内不可以有栅格
     * @zh 栅格左侧的间隔格数，间隔内不可以有栅格
     * @en The number of interval columns on the left side of the grid, and there can be no grid in the interval
     */
    @Prop() offset: number = 0;

    /**
     * 栅格向右移动格数
     * @zh 栅格向右移动格数
     * @en The number of grid moves to the right
     */
    @Prop() push: number = 0;

    /**
     * 栅格向左移动格数
     * @zh 栅格向左移动格数
     * @en The number of grid moves to the left
     */
    @Prop() pull: number = 0;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh < 576px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en < 576px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() xs: number | object;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh >= 576px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en >= 576px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() sm: number | object;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh >= 768px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en >= 768px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() md: number | object;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh >= 992px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en >= 992px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() lg: number | object;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh >= 1200px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en >= 1200px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() xl: number | object;

    /**
     * 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @zh >= 1600px 栅格占据的列数，响应式栅格，可为栅格数或一个包含其他属性的对象
     * @en >= 1600px The number of columns occupied by the grid, responsive grid, can be the number of columns or an object containing other attributes
     */
    @Prop() xxl: number | object;

    @Prop() id: string;

    @Prop() gutter: GridGutterType | GridGutterType[] = 0;

    /**
     * 栅格间隔，单位 px，左右平分
     * @zh 栅格间隔，单位 px，左右平分
     * @en Grid spacing, unit px, left and right average
     */
    // @State() gutter: GridGutterType = 0;

    /**
     * 元素根节点
     * @zh 元素根节点
     * @en Element root node
     */
    @Element() el: HTMLElement;

    /**
     * 初始化样式
     * @zh 初始化样式
     * @en Initialize style
     */
    @State() styles: any = {
        flex: '0 0 auto',
        width: `calc(100% / 24 * ${this.span})`,
        // paddingRight: `${this.gutter / 2}px`,
        // paddingLeft: `${this.gutter / 2}px`
    };

    /**
     * 根据响应式栅格属性生成样式
     * @zh 根据响应式栅格属性生成样式
     * @en Generate styles based on responsive grid properties
     */
    @State() generateStyle() {
        const styles = {};
        const props = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
        props.forEach(prop => {
            if (typeof this[prop] === 'number') {
                styles[`width`] = `calc(100% / 24 * ${this[prop]})`;
            } else if (typeof this[prop] === 'object') {
                const props = Object.keys(this[prop]);
                props.forEach(prop => {
                    styles[prop] = this[prop];
                });
            }
        });
        return styles;
    }

    /**
     * 根据栅格间隔生成样式
     * @zh 根据栅格间隔生成样式
     * @en Generate styles based on grid spacing
     */
    @State() generateGutterStyle() {
        const styles = {};
        // styles[`padding-right`] = `${this.gutter / 2}px`;
        // styles[`padding-left`] = `${this.gutter / 2}px`;
        return styles;
    }

    /**
     * 根据栅格列数生成样式
     * @zh 根据栅格列数生成样式
     * @en Generate styles based on the number of grid columns
     */
    @State() generateSpanStyle() {
        const styles = {};
        styles[`width`] = `calc(100% / 24 * ${this.span})`;
        return styles;
    }

    /**
     * 根据栅格左侧间隔格数生成样式
     * @zh 根据栅格左侧间隔格数生成样式
     * @en Generate styles based on the number of grid left interval columns
     */
    @State() generateOffsetStyle() {
        const styles = {};
        styles[`margin-left`] = `calc(100% / 24 * ${this.offset})`;
        return styles;
    }

    /**
     * 根据栅格向右移动格数生成样式
     * @zh 根据栅格向右移动格数生成样式
     * @en Generate styles based on the number of grid moves to the right
     */
    @State() generatePushStyle() {
        const styles = {};
        styles[`left`] = `calc(100% / 24 * ${this.push})`;
        return styles;
    }

    /**
     * 根据栅格向左移动格数生成样式
     * @zh 根据栅格向左移动格数生成样式
     * @en Generate styles based on the number of grid moves to the left
     */
    @State() generatePullStyle() {
        const styles = {};
        styles[`right`] = `calc(100% / 24 * ${this.pull})`;
        return styles;
    }

    /**
     * 合并样式
     * @zh 合并样式
     * @en Merge style
     */
    @State() mergeStyle() {
        console.log('mergeStyle Gutter', this.gutter);
        this.styles = {
            ...this.styles,
            ...this.generateStyle(),
            ...this.generateSpanStyle(),
            ...this.generateOffsetStyle(),
            ...this.generatePushStyle(),
            ...this.generatePullStyle()
        };
    }

    componentWillLoad() {
        console.log('col gutter: ', this.gutter);
        console.log(`state ${this.id}: `, state);
        // 获取栅格间隔
        this.gutter = Number(state.gutter);
        this.mergeStyle();
        // this.el.style.width = `calc(100% / 24 * ${12} - ${this.gutter}px)`;
        console.log('col -row styles: ', Number(state.gutter));
        // state.styles['flex'] = '0 0 auto';
        // state.styles['padding-right'] = state.gutter + 'px';
        // state.styles['padding-left'] = state.gutter + 'px';
    }

    render() {
        return (
            <Host style={this.styles}>
                {/* <div class="wc-grid-col" style={this.styles}>
                </div> */}
                <slot></slot>
            </Host>
        );
    }
}