import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { useLatestCallback } from '@hi-ui/use-latest'
import { isArrayNonEmpty } from '@hi-ui/type-assertion'
import { EmptyState } from '@hi-ui/empty-state'
import { TableRow } from './TableRow'
import { TableRowRequiredProps } from './types'
import { useTableContext } from './context'

const _role = 'table'
const _prefix = getPrefixCls(_role)

/**
 * TODO: What is TableBody
 */
export const TableBody = forwardRef<HTMLDivElement | null, TableBodyProps>(
  ({ prefixCls = _prefix }, ref) => {
    const {
      columns,
      leafColumns,
      measureRowElementRef,
      isExpandTreeRows,
      transitionData,
      getColgroupProps,
      bodyTableRef,
      scrollBodyElementRef,
      onTableBodyScroll,
      maxHeight,
      canScroll,
      hasAvgColumn,
      avgRow,
      hasSumColumn,
      sumRow,
      // fixedColWidth,
    } = useTableContext()

    const cls = cx(`${prefixCls}-body`)

    const getRequiredProps = useLatestCallback(
      (id: React.ReactText): TableRowRequiredProps => {
        return {
          // @ts-ignore
          expandedTree: isExpandTreeRows(id),
          // checked: isCheckedId(id),
          // semiChecked: isSemiCheckedId(id),
          // selected: selectedId === id,
          // loading: isLoadingId(id),
          // focused: focusedId === id,
        }
      }
    )

    console.log('transitionData', transitionData, hasSumColumn)

    // 外层增加 div 作为滚动容器
    return (
      <div
        ref={scrollBodyElementRef}
        className={cls}
        onScroll={onTableBodyScroll}
        style={{
          maxHeight: maxHeight !== undefined ? maxHeight : undefined,
          // maxHeight 小于 table 实际高度才出现纵向滚动条
          overflowY:
            maxHeight !== undefined &&
            bodyTableRef.current &&
            bodyTableRef.current.clientHeight > maxHeight
              ? 'scroll'
              : undefined,
          // 表格宽度大于div宽度才出现横向滚动条
          overflowX: canScroll ? 'scroll' : undefined,
        }}
      >
        <table ref={bodyTableRef} style={{ width: '100%' }}>
          <colgroup>
            {leafColumns.map((col: any, idx) => {
              return (
                <col key={idx} className={`${prefixCls}-col`} {...getColgroupProps(col, idx)} />
              )
            })}
          </colgroup>
          <tbody>
            {isArrayNonEmpty(transitionData) ? (
              <>
                {transitionData.map((row, index) => {
                  return (
                    <TableRow
                      ref={index === 0 ? measureRowElementRef : null}
                      // key={depth + index}
                      key={row.id}
                      // @ts-ignore
                      rowIndex={index}
                      rowData={row}
                      // expandedTree={isExpandTreeRows(row.id)}
                      {...getRequiredProps(row.id)}
                    />
                  )
                })}
                {hasSumColumn ? (
                  <TableRow
                    key={transitionData.length}
                    // @ts-ignore
                    rowIndex={transitionData.length}
                    rowData={sumRow}
                    isSumRow
                  />
                ) : null}
                {hasAvgColumn ? (
                  <TableRow
                    key={transitionData.length + 1}
                    // @ts-ignore
                    rowIndex={transitionData.length + 1}
                    rowData={avgRow}
                    isAvgRow
                  />
                ) : null}
              </>
            ) : (
              // 空状态
              renderEmptyContent({
                className: `${prefixCls}-empty-content`,
                colSpan: columns.length,
              })
            )}
          </tbody>
        </table>
      </div>
    )
  }
)

export interface TableBodyProps {
  /**
   * 组件默认的选择器类
   */
  prefixCls?: string
}

if (__DEV__) {
  TableBody.displayName = 'TableBody'
}

/**
 * 负责空状态渲染
 */
const renderEmptyContent = ({ className, colSpan }: { colSpan?: number; className?: string }) => {
  return (
    <tr className={className}>
      <td colSpan={colSpan}>
        <EmptyState />
      </td>
    </tr>
  )
}
