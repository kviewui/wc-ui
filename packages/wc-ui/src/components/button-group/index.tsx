import { Component, h, Fragment, Element } from '@stencil/core';
// import { getPresetColor } from '../../_utils/colors';

@Component({
    tag: 'wc-button-group',
    shadow: true
})
export class ButtonGroup {

    /**
     * 获取跟元素
     */
    @Element() el: HTMLElement;

    /**
     * 设置默认样式
     */
    private setDefaultStyle() {
        this.el.style.display = 'flex';
    }

    /**
     * 获取子元素，并根据按钮索引设置样式
     */
    private getChildren() {
        const firstChild = this.el.firstElementChild;
        // 第一个按钮需要删除右边圆角
        if (firstChild) {
            firstChild.shadowRoot.querySelector('button').style.borderTopRightRadius = '0';
            firstChild.shadowRoot.querySelector('button').style.borderBottomRightRadius = '0';
        }

        // 获取最后一个按钮
        const lastChild = this.el.lastElementChild;
        // 最后一个按钮需要删除左边圆角
        if (lastChild) {
            lastChild.shadowRoot.querySelector('button').style.borderTopLeftRadius = '0';
            lastChild.shadowRoot.querySelector('button').style.borderBottomLeftRadius = '0';
        }
        // 根据按钮个数设置中间按钮左边和右边的边框
        const children = this.el.children;
        if (children) {
            // 如果只有一个按钮，不需要设置边框
            if (children.length === 1) {
                return;
            }
            // 如果有两个按钮，第一个按钮需要设置右边框，第二个按钮需要设置左边框
            if (children.length === 2) {
                const firstChild = children[0];
                // const lastChild = children[1];
                // 判断当前按钮的主题
                const theme = firstChild.getAttribute('theme');
                // 判断是否有 dark 属性
                const dark = firstChild.getAttribute('dark');
                // 如果当前按钮的主题是默认主题
                if (theme === null) {
                    //  如果当前不是暗黑模式，设置边框颜色为灰色
                    if (dark === null) {
                        firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(0, 0, 0, 0.05)`;
                        return;
                    }
                    // 如果当前是暗黑模式，设置边框颜色为白色
                    firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(255, 255, 255, 0.2)`;
                    return;
                }
                
                if (dark === null) {
                    firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(255, 255, 255, 0.2)`;
                    return;
                }
                firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(0, 0, 0, 0.2)`;
                return;
            }
            //  如果有三个按钮，第一个按钮需要设置右边框，第三个按钮需要设置左边框，中间按钮需要删除左右圆角
            if (children.length === 3) {
                const firstChild = children[0];
                const secondChild = children[1];
                const lastChild = children[2];
                // 中间按钮需要删除左右圆角
                secondChild.shadowRoot.querySelector('button').style.borderTopLeftRadius = '0';
                secondChild.shadowRoot.querySelector('button').style.borderBottomLeftRadius = '0';
                secondChild.shadowRoot.querySelector('button').style.borderTopRightRadius = '0';
                secondChild.shadowRoot.querySelector('button').style.borderBottomRightRadius = '0';
                // 判断当前按钮的主题
                const theme = firstChild.getAttribute('theme');
                // 判断是否有 dark 属性
                const dark = firstChild.getAttribute('dark');
                // 如果当前按钮的主题是默认主题
                if (theme === null) {
                    //  如果当前不是暗黑模式，设置边框颜色为灰色
                    if (dark === null) {
                        firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(0, 0, 0, 0.05)`;
                        lastChild.shadowRoot.querySelector('button').style.borderLeft = `1px solid rgba(0, 0, 0, 0.1)`;
                        return;
                    }
                    // 如果当前是暗黑模式，设置边框颜色为白色
                    firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(255, 255, 255, 0.2)`;
                    lastChild.shadowRoot.querySelector('button').style.borderLeft = `1px solid rgba(255, 255, 255, 0.2)`;
                    return;
                }
                if (dark === null) {
                    firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(255, 255, 255, 0.2)`;
                    lastChild.shadowRoot.querySelector('button').style.borderLeft = `1px solid rgba(255, 255, 255, 0.2)`;
                    return;
                }
                firstChild.shadowRoot.querySelector('button').style.borderRight = `1px solid rgba(0, 0, 0, 0.2)`;
                lastChild.shadowRoot.querySelector('button').style.borderLeft = `1px solid rgba(0, 0, 0, 0.2)`;
                return;
            }
        }
    }

    componentDidLoad() {
        this.setDefaultStyle();

        this.getChildren();
    }

    componentWillLoad() {
        console.log('wc-button-group');

    }

    render() {
        return (
            <Fragment>
               <slot />
            </Fragment>
        );
    }
}