import { Component, Prop, Element, Watch, h } from '@stencil/core';

@Component({
    tag: 'wc-teleport',
    shadow: true
})
export class Teleport {
    /**
     * 组件实例的引用
     */
    @Element() el: HTMLElement;

    /**
     * 传送的目标元素的选择器
     */
    @Prop() to: string;

    /**
     * 目标元素
     */
    target: Element;

    @Watch('to')
    updateTarget(newValue: string) {
        // 目标元素发生变化时，将元素移动到新的位置
        this.target = document.querySelector(newValue);
        if (!this.target) {
            throw new Error(`Target element "${newValue}" not found.`);
        }
    }

    componentWillLoad() {
        this.teleport();
    }

    disconnectedCallback() {
        // 组件销毁时，将元素移回原来的位置
        if (this.target) {
            this.el.append(...Array.from(this.target.childNodes));
        }
    }

    teleport() {
        // 将元素移动到目标位置
        this.updateTarget(this.to);
        if (this.target) {
            this.target.append(...Array.from(this.el.childNodes));
        }
    }

    render() {
        return <slot></slot>;
    }
}