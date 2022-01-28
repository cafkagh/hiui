import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useCallback,
  forwardRef,
  useRef,
} from 'react'
import debounce from 'lodash/debounce'
import { CSSTransition } from 'react-transition-group'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import type { DebouncedFunc } from 'lodash'
import { Portal } from '@hi-ui/portal'
import { HiBaseHTMLProps, HiBaseSizeEnum } from '@hi-ui/core'

const _role = 'loading'
export const _prefix = getPrefixCls('loading')

export const Loading = forwardRef<null, LoadingProps>(
  (
    {
      prefixCls = _prefix,
      className,
      children,
      role = _role,
      container,
      content,
      visible = true,
      full = false,
      size = 'md',
      delay = -1,
      disabledPortal = false,
      innerRef,
      timeout = 300,
      ...restProps
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(false)

    // Real trigger loading update
    const updateLoadingStatus = useCallback(() => {
      if (internalVisible === visible) return
      setInternalVisible(visible)
    }, [internalVisible, visible])

    const prevDebouncedUpdateRef = useRef<null | DebouncedFunc<typeof updateLoadingStatus>>(null)

    const cancelWaitingLoading = () => {
      prevDebouncedUpdateRef.current?.cancel()
    }

    const shouldDelay = visible && delay >= 0

    const debouncedLoadingUpdater = useCallback(() => {
      cancelWaitingLoading()

      if (shouldDelay) {
        const debouncedUpdateLoading = debounce(updateLoadingStatus, delay)
        prevDebouncedUpdateRef.current = debouncedUpdateLoading

        debouncedUpdateLoading()
      } else {
        updateLoadingStatus()
        prevDebouncedUpdateRef.current = null
      }
    }, [delay, shouldDelay, updateLoadingStatus])

    useEffect(() => {
      debouncedLoadingUpdater()

      return () => {
        cancelWaitingLoading()
      }
    }, [debouncedLoadingUpdater])

    useImperativeHandle(innerRef, () => ({
      close: () => setInternalVisible(false),
    }))

    const maskCls = cx(
      `${prefixCls}__mask`,
      children && `${prefixCls}__mask--withchildren`,
      `${prefixCls}__mask--${full ? 'full' : 'part'}`,
      size && `${prefixCls}--size-${size}`
    )

    const loadingComponent = (
      <CSSTransition
        classNames={`${prefixCls}__mask`}
        in={internalVisible}
        unmountOnExit
        timeout={timeout}
      >
        <div className={maskCls} {...restProps}>
          <div ref={ref} role={role} className={cx(prefixCls, className)}>
            <div className={`${prefixCls}__icon-wrapper`}>
              <div className={`${prefixCls}__icon`}>
                <div />
                <div />
              </div>
            </div>
            {content ? <span className={`${prefixCls}__content`}>{content}</span> : null}
          </div>
        </div>
      </CSSTransition>
    )

    return (
      // @ts-ignore
      <Portal container={container} disabled={!container && !full}>
        {children ? (
          // 可以测量 children margin，实现按内容位置偏移，排除 margin 影响
          // 暂时不考虑，如果有需要，完全可以把 margin 设置到加到父节点
          <div className={`${prefixCls}__wrapper`}>
            {children}
            {loadingComponent}
          </div>
        ) : (
          loadingComponent
        )}
      </Portal>
    )
  }
)

export type LoadingSizeEnum = HiBaseSizeEnum

export interface LoadingProps extends HiBaseHTMLProps<'div'> {
  /**
   * 	自定义加载中状态的文案
   */
  content?: React.ReactNode
  /**
   * 是否开启显示
   */
  visible?: boolean
  /**
   * 是否全屏展示，开启节点将挂载到 body
   */
  full?: boolean
  /**
   * 延迟显示加载效果的时长（可用于防止闪烁）
   */
  delay?: number
  /**
   * 自定义尺寸
   */
  size?: LoadingSizeEnum
  /**
   * 禁用 portal
   * @private
   */
  disabledPortal?: boolean
  /**
   * @private
   */
  innerRef?: React.Ref<{ close: () => void }>
  /**
   * 指定 portal 的容器
   * @private
   */
  container?: HTMLElement | null
  /**
   * 自定义动画过渡时长
   * @private
   */
  timeout?: number
}

if (__DEV__) {
  Loading.displayName = 'Loading'
}
