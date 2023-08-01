import CSS from 'csstype';

export interface IconProps {
    /**
     *  自定义类名
     */
    className?: string;
    /**
     * 图标类型
     */
    type?: string;
    /**
     *  图标样式
     */
    style?: CSS.Properties | string;
    /**
     * 是否有旋转动画
     */
    spin?: boolean;
}