
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-arrow-left-outlined')

export const ArrowLeftOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7783"  ><path d="M392.832 268.501333a42.666667 42.666667 0 0 1 2.496 57.621334l-2.496 2.709333L252.309333 469.333333H874.666667a42.666667 42.666667 0 1 1 0 85.333334H252.352l140.48 140.501333a42.666667 42.666667 0 0 1 2.496 57.621333l-2.496 2.709334a42.666667 42.666667 0 0 1-57.621333 2.496l-2.709334-2.496-213.333333-213.333334-2.026667-2.176a42.922667 42.922667 0 0 1-0.32-0.341333l2.346667 2.517333a43.157333 43.157333 0 0 1-6.826667-8.874666A42.496 42.496 0 0 1 106.666667 512v-0.64l0.064-1.856L106.666667 512a43.178667 43.178667 0 0 1 0.938666-8.938667 42.261333 42.261333 0 0 1 9.066667-18.517333l0.149333-0.192c0.746667-0.853333 1.536-1.706667 2.346667-2.517333l213.333333-213.333334a42.666667 42.666667 0 0 1 60.330667 0z" p-id="7784"></path></svg>
    )
  }
)

if (__DEV__) {
  ArrowLeftOutlined.displayName = 'ArrowLeftOutlined'
}
  