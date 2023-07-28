import { Component, Prop, h } from '@stencil/core';
import { getPresetColor, getThemeColor } from '../../utils/colors';

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';

@Component({
    tag: 'wc-button',
    styleUrl: 'index.css',
    shadow: true,
})
export class WcButton {
    /**
     * 按钮类型， 可选值为 `primary` `success` `warning` `danger` `info` `text`
     */
    @Prop() type: ButtonType = 'primary';
    /**
     * 是否为暗黑模式，默认为 `false`
     */
    @Prop() dark: boolean = false;
    /**
     * 主题色阶号，可选值为 `1` `2` `3` `4` `5` `6` `7` `8` `9` `10`
     */
    @Prop() level: number = 5;

    buttonRef!: HTMLButtonElement;

    connectedCallback() {
        console.log('wc-button connectedCallback');
        // console.log(colorBuilder.generate('red', {list: true}));
        // console.log(colorBuilder.getPresetColors());
        // console.log(Object.keys(colorBuilder.getPresetColors()));
        // console.log(this.buttonRef);
        console.log(getPresetColor('#4F7239', 5));
        console.log(getThemeColor('primary'));
    }

    getBaseStyle() {
        return {
            color: '#fff',
            backgroundColor: '#20991C',
            borderColor: '#409eff',
        }
    }

    render() {
        return <button style={this.getBaseStyle()}>点击我</button>
    }
}