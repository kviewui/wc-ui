// global-style.tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'wc-global-style',
    // styleUrl: 'index.css',
    shadow: true
})
export class WcGlobalStyle {
    /**
     * @zh 全局样式表路径
     * @en the path of the global stylesheet
     */
    @Prop() src: string;

    render() {
        return (
            <div>
                <link rel="stylesheet" slot='style' href={this.src}></link>
                <slot name='style'></slot>
                <slot></slot>
            </div>
        )
    }
}