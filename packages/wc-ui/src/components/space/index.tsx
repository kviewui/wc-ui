import { Component, h, Element, Prop, Fragment, Event, EventEmitter, Listen } from '@stencil/core';
import { isArray, isStringArray, parseStyle, convertHTMLCollectionToArray, isNumber } from '../../_utils';
import type * as CSS from 'csstype';

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number;

const getMargin = (size: SpaceSize) => {
    // const numberSize = Number(size);

    if (isNumber(size)) {
        return Number(size) / 2;
    }
    switch (size) {
        case 'mini':
            return 4;
        case 'small':
            return 8;
        case 'medium':
            return 16;
        case 'large':
            return 24;
        default:
            return 8;
    }
}

@Component({
    tag: 'wc-space',
    shadow: true,
})

/**
 * 间距组件
 * @slot default - 默认插槽
 * @slot split - 分隔符
 */
export class Space {
    /**
     * 是否有分隔符
     */
    hasSplitSlot: boolean;

    /**
     * 组件根元素
     */
    @Element() el: HTMLElement;

    @Event({
        eventName: 'wcClick',
        composed: true,
        cancelable: true,
        bubbles: true
    }) wcClick: EventEmitter;

    @Listen('click', { capture: true })
    handleClick(e: MouseEvent) {
        this.wcClick.emit(e);
    }

    /**
     * 间距大小，可选值为 `mini` `small` `medium` `large` 或者具体的数值，默认为 `small`
     */
    @Prop() size: SpaceSize | SpaceSize[] = 'small';

    /**
     * 间距方向，可选值为 `horizontal` `vertical`，默认为 `horizontal`
     */
    @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

    /**
     * 是否为环绕排列，默认为 `false`
     */
    @Prop() wrap: boolean = false;

    /**
     * 对齐方式，可选值为 `start` `end` `center` `baseline` `stretch`，默认为 `start`
     */
    @Prop() align: 'start' | 'end' | 'center' | 'baseline' | 'stretch' = 'center';

    /**
     * 节点类名
     */
    @Prop() customClass: string | string[] = '';

    /**
     * 子元素是否为块级元素
     */
    @Prop() block: boolean = false;

    /**
     * 节点样式
     */
    @Prop() customStyle: {
        [key: string]: string
    } | string = {};

    /**
     * 全局样式表路径
     * @zh 全局样式表路径
     * @en the path of the global stylesheet
     */
    @Prop() globalStyleSrc: string;

    /**
     * 间距样式 
     * @param isLast - 是否为最后一个元素 
     * @returns 
     * @memberof WcSpace
     */
    getMarginStyle = (isLast: boolean): any => {
        const style: CSS.Properties = {};

        const _size = isArray(this.size) 
            ? this.size 
            : isStringArray(this.size) 
                ? JSON.parse(this.size) 
                : this.size;

        const marginRight = `${getMargin(
            isArray(_size) ? _size[0] : _size
        )}px`;

        const marginBottom = `${getMargin(
            isArray(_size) ? _size[1] : _size
        )}px`;

        if (isLast) {
            return this.wrap ? { marginBottom } : {};
        }

        if (this.direction === 'horizontal') {
            style['margin-right'] = marginRight;
        }

        if (this.direction === 'vertical' || this.wrap) {
            style['margin-bottom'] = marginBottom;
        }

        // 判断是否为块级元素
        style['width'] = this.block ? '100%' : 'auto';

        return style;
    }

    /**
     * 获取根元素样式 
     * @returns 
     * @memberof WcSpace
     */
    getHostStyle = () => {
        const style: CSS.Properties = {};

        // 设置 flex 布局
        style['display'] = 'flex';

        // 根据方向设置 flex-direction
        style.flexDirection = this.direction === 'horizontal' ? 'row' : 'column';

        style.flexWrap = 'wrap';

        if (this.align) {
            style.alignItems = this.align;
        }

        return {
            ...style,
            ...parseStyle(this.customStyle as string),
            // ...this.customStyle
        };
    }

    componentWillLoad() {
        // 检查是否有分隔符
        this.hasSplitSlot = !!this.el.querySelector('[slot="split"]');
    }

    componentDidLoad() {

    }

    render() {
        return (
            <div style={this.getHostStyle() as any} class="wc-space">
                <link rel="stylesheet" href={this.globalStyleSrc} />
                {
                    Array.prototype.map.call(convertHTMLCollectionToArray(this.el.children), (child, index: number) => {
                        const shouldAddSplit = this.hasSplitSlot && index > 0;

                        return (<Fragment>
                            {shouldAddSplit && (
                                <span style={this.getMarginStyle(false)} class="wc-space__split" innerHTML={this.el.querySelector('[slot="split"]').innerHTML} />
                            )}
                            <div style={this.getMarginStyle(index === child.length - 1)} ref={el => el.appendChild(child)}></div>
                        </Fragment>);
                    })
                }
            </div>
        );
    }
}