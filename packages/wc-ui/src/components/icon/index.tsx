import { Component, Prop, h } from '@stencil/core';
import * as CSS from 'csstype';
import { parseStyle } from '../../_utils';

@Component({
  tag: 'wc-icon',
  shadow: true
})
export class Icon {
  /**
   * 自定义类名
   */
  @Prop() className: string;

  /**
   * 自定义样式
   */
  // @Prop() style: string | object;

  /**
   * 是否旋转
   */
  @Prop() spin: boolean;

  /**
   * 图标类型
   */
  @Prop() type: string;

  /**
   * 获取默认svg 样式
   */
  getIconStyle() {
    // const { style, spin } = this;
    // // 判断 style 是否为字符串
    // if (typeof this.style === 'string') {
    //   this.style = parseStyle(this.style);
    // }
    const defaultStyle = {
      width: '1em',
      height: '1em',
      fill: 'currentColor'
    };
    // const spinStyle = {
    //   animation: 'rotate 2s linear infinite'
    // };
    return {
      ...defaultStyle,
      // ...(spin ? spinStyle : {}),
      // ...style as CSS.Properties
    };
  }

  render() {
    return <svg class={this.className} style={this.getIconStyle() as { [key: string]: string }} fill='currentColor'>
      <slot />
    </svg>;
  }
}