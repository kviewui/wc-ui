import { Component, h, Element, Host, Event, Listen, EventEmitter } from '@stencil/core';

@Component({
    tag: 'wc-space-item',
    shadow: true,
})

export class SpaceItem {
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

    render() {
        return (
            <Host>
                <slot></slot>
            </Host>
        );
    }
}