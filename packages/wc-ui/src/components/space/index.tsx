import { Component, h, Element, Prop, Fragment } from '@stencil/core';
import { isArray, parseStyle, convertHTMLCollectionToArray } from '../../_utils';
import type * as CSS from 'csstype';

export type SpaceSize = 'mini' | 'small' | 'medium' | 'large' | number;

const getMargin = (size: SpaceSize) => {
    const numberSize = Number(size);

    if (typeof numberSize === 'number' && !isNaN(numberSize)) {
        return size;
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
export class WcSpace {
    /**
     * 是否有分隔符
     */
    hasSplitSlot: boolean;

    /**
     * 组件根元素
     */
    @Element() el: HTMLElement;

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
     * 间距样式 
     * @param isLast - 是否为最后一个元素 
     * @returns 
     * @memberof WcSpace
     */
    getMarginStyle = (isLast: boolean): any => {
        const style: CSS.Properties = {};

        const marginRight = `${getMargin(
            isArray(this.size) ? this.size[0] : this.size 
        )}px`;

        const marginBottom = `${getMargin(
            isArray(this.size) ? this.size[1] : this.size
        )}px`;

        if (isLast) {
           return this.wrap ? { marginBottom } : { };
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

        console.log(this.customStyle)

        return {
            ...style,
            ...parseStyle(this.customStyle as string),
            // ...this.customStyle
        };
    }

    componentWillLoad() {
        // 检查是否有分隔符
        this.hasSplitSlot = !!this.el.querySelector('[slot="split"]');

        console.log(this.hasSplitSlot)
        console.log(this.customStyle)

        // console.log(convertHTMLCollectionToArray(this.el.children));
        // console.log(this.el.querySelectorAll('wc-space-item'));
    }

    componentDidLoad() {
        
    }

    render() {
        return (
            <div style={this.getHostStyle() as any} class="wc-space">
                {
                    Array.prototype.map.call(convertHTMLCollectionToArray(this.el.children), (child: { innerHTML: string; length: number; }, index: number) => {
                        const shouldAddSplit = this.hasSplitSlot && index > 0;
                        console.log(shouldAddSplit, 'shouldAddSplit');
                        console.log(child);
                        return (<Fragment>
                            {shouldAddSplit && (
                                <span style={this.getMarginStyle(false)} class="wc-space__split" innerHTML={this.el.querySelector('[slot="split"]').innerHTML} />
                            )}
                            <span style={this.getMarginStyle(index === child.length - 1)} innerHTML={child.innerHTML} />
                        </Fragment>);
                    })
                }
            </div>
        );
    }
}