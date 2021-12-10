import React, { useCallback } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { LeftOutlined, RightOutlined } from '@hi-ui/icons'
import { __DEV__ } from '@hi-ui/env'

const _role = 'pagination'
const _prefix = getPrefixCls(_role)

/**
 * TODO: What is PagerButton
 */
export const PagerButton: React.FC<PagerButtonProps> = ({
  prefixCls = _prefix,
  onClick,
  type = 'prev',
  current = 1,
  disabled = false,
}) => {
  const cls = cx(`${prefixCls}__btn`, {
    [`${prefixCls}__btn--disabled`]: disabled,
  })

  const handleClick = useCallback(() => {
    if (onClick && !disabled) {
      onClick(type === 'prev' ? current - 1 : current + 1)
    }
  }, [current, onClick, type, disabled])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter' && !disabled) {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick, disabled]
  )

  return (
    <li
      className={cls}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      <button disabled={disabled}>{type === 'prev' ? <LeftOutlined /> : <RightOutlined />}</button>
    </li>
  )
}

export interface PagerButtonProps {
  /**
   * 组件默认的选择器类
   */
  prefixCls?: string
  /**
   * 当前页码
   */
  current?: number
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 点击事件
   */
  onClick?: (page: number) => void
  /**
   * 类型
   */
  type: 'prev' | 'next'
}

if (__DEV__) {
  PagerButton.displayName = 'PagerButton'
}
