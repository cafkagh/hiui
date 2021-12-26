import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
// import { Column, RowSelection } from './Table'
// import { Checkbox } from '@hi-ui/checkbox'
import { useTableContext } from './context'
import { times } from '@hi-ui/times'
import { TableColumnItem, TableRowEventData } from './types'
import { IconButton } from '@hi-ui/icon-button'
import {
  defaultCollapseIcon,
  defaultExpandIcon,
  defaultLeafIcon,
  defaultLoadingIcon,
} from './icons'
import { isObject, isFunction } from '@hi-ui/type-assertion'

const _prefix = getPrefixCls('table-cell')

/**
 * TODO: What is TableCell
 */
export const TableCell = forwardRef<HTMLDivElement | null, TableCellProps>(
  (
    {
      prefixCls = _prefix,
      className,
      data,
      columns,
      firstRowRef,
      fixedColWidth,
      rowSelection,
      column,
      rowIndex,
      depth,
      columnIndex,
      expandedTree,
      expandedTreeRows,
      setExpandedTreeRows,
      isTree,
      // icons
      expandIcon = defaultExpandIcon,
      collapseIcon = defaultCollapseIcon,
      leafIcon = defaultLeafIcon,
      rowData,
    },
    ref
  ) => {
    const {
      // onHighlightedColChange,
      isHighlightedCol,
      alignRightColumns,
      // prefixCls,
      onLoadChildren,
      loadChildren,
      // isHoveredCol,
      // onHoveredColChange,
      showColHighlight,
      isHoveredCol,
      onHoveredColChange,
      onExpandTreeRowsChange,
      isExpandTreeRows,
      onTreeNodeSwitch,
      getStickyColProps,
    } = useTableContext()

    const [loading, setLoading] = React.useState(false)

    const { raw: rawColumn, leftStickyWidth, rightStickyWidth } = column
    const {
      render: rawRender,
      dataKey,

      align = 'left',
    } = rawColumn

    /**
     * normalize 单元格渲染内容，支持自定义 render
     */
    const cellContent = React.useMemo(() => {
      let content = rowData.raw[dataKey]

      if (isFunction(rawRender)) {
        content = rawRender(content, rowData, rowIndex, dataKey)
      }

      //  处理单元格内容，重载支持配置式合并单元格
      const isMergedCell = isObject(content) && !React.isValidElement(content)

      if (isMergedCell) {
        return content
      }

      return {
        children: content,
        props: {
          colSpan: '',
          rowSpan: '',
        },
      }
    }, [rawRender, dataKey, rowData, rowIndex])

    if (cellContent.props.colSpan === 0 || cellContent.props.rowSpan === 0) {
      return null
    }

    // const cellTextAlign = alignRightColumns.includes(dataKey) ? 'right' : align

    /**
     * 点击展开节点时触发
     */
    const onNodeExpand = (shouldExpanded: boolean) => {
      // console.log(shouldExpanded)

      onTreeNodeSwitch(rowData, shouldExpanded)
    }

    const sticky = typeof rightStickyWidth !== 'undefined' || typeof leftStickyWidth !== 'undefined'

    const cls = cx(
      prefixCls,
      className,
      isHighlightedCol(dataKey) && `${prefixCls}__col--highlight`,
      // isHoveredCol(dataKey) && `${prefixCls}__col--hovered-highlight`,
      sticky && `${prefixCls}__col--sticky`
    )

    // 交互：第一列为操作节点列
    const isSwitcherCol = columnIndex === 0

    return (
      <td
        key={dataKey}
        className={cls}
        // style={{
        //   position: sticky ? 'sticky' : undefined,
        //   // 从 column 中读取
        //   textAlign: 'left',
        //   right: rightStickyWidth + 'px',
        //   left: leftStickyWidth + 'px',
        //   backgroundColor: '#fff',
        // }}
        {...getStickyColProps(column)}
        colSpan={cellContent.props.colSpan}
        rowSpan={cellContent.props.rowSpan}
        // 按需绑定函数，避免频繁的 setState 特别消耗性能
        onMouseEnter={showColHighlight ? () => onHoveredColChange(rawColumn, true) : undefined}
        onMouseLeave={showColHighlight ? () => onHoveredColChange(rawColumn, false) : undefined}
      >
        {/* 渲染缩进 */}
        {isSwitcherCol && depth > 0 ? renderIndent({ depth, prefixCls }) : null}
        {/* 渲染切换器 */}
        {isSwitcherCol
          ? renderSwitcher({
              prefixCls,
              node: rowData,
              loading,
              expanded: expandedTree,
              expandIcon,
              collapseIcon,
              leafIcon,
              onLoadChildren,
              isTree,
              onNodeExpand,
            })
          : null}
        {cellContent.children}
      </td>
    )
  }
)

export interface TableCellProps {
  /**
   * 组件默认的选择器类
   */
  prefixCls?: string
  /**
   * 列配置项
   */
  column: { raw: TableColumnItem }
  fixedColWidth: number[]
  rowSelection?: RowSelection
}

if (__DEV__) {
  TableCell.displayName = 'TableCell'
}

/**
 * 渲染空白占位
 */
const renderIndent = ({ prefixCls, depth }: any) => {
  return times(depth, (index: number) => {
    return <span className={`${prefixCls}__indent`} key={index} />
  })
}

/**
 * 渲染子树折叠切换器
 */
const renderSwitcher = ({
  prefixCls,
  node,
  loading,
  expanded,
  expandIcon,
  collapseIcon,
  leafIcon,
  onNodeExpand,
  onLoadChildren,
  isTree,
}: {
  node: TableRowEventData
  prefixCls: string
  loading: boolean
  expanded: boolean
  expandIcon: React.ReactNode
  collapseIcon: React.ReactNode
  leafIcon: React.ReactNode
  onNodeExpand: (shouldExpanded: boolean) => void
  onLoadChildren?: (node: TableRowEventData) => void | Promise<any>
  isTree?: boolean
}) => {
  if (loading) {
    return (
      <IconButton
        className={cx(`${prefixCls}__switcher`, `${prefixCls}__switcher--loading`)}
        icon={defaultLoadingIcon}
      />
    )
  }

  const hasChildren = node.children && node.children.length > 0
  const canLoadChildren = onLoadChildren && !node.children && !node.isLeaf

  if (hasChildren || canLoadChildren) {
    return (
      <IconButton
        tabIndex={-1}
        className={cx(
          `${prefixCls}__switcher`,
          expanded ? `${prefixCls}__switcher--expanded` : `${prefixCls}__switcher--collapse`
        )}
        icon={expanded ? expandIcon : collapseIcon}
        onClick={() => onNodeExpand(!expanded)}
      />
    )
  }

  if (isTree) {
    return (
      <IconButton
        tabIndex={-1}
        icon={leafIcon}
        className={cx(`${prefixCls}__switcher`, `${prefixCls}__switcher--noop`)}
      />
    )
  }

  return null
}