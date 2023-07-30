import { Component, h, Element } from '@stencil/core';

@Component({
    tag: 'wc-space-item',
    shadow: true,
})

export class WcSpaceItem {
    /**
     * 组件根元素
     */
    @Element() el: HTMLElement;

    render() {
        return (
            <span>
                <slot></slot>
            </span>
        );
    }
}