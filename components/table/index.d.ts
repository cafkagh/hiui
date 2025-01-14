import React from "react"
import {PaginationProps} from '../pagination'
import { SelectProps } from '../select'

export type TableColumnItem = {
  title: string | JSX.Element
  dataKey: string
  align?: 'left' | 'right' | 'center'
  sorter?: (a: any, b: any) => number
  avg?: boolean
  total?: boolean
  width?: number
  children?: TableColumnItem[]
  selectFilters?: SelectProps
  defaultSortOrder?: 'ascend' | 'descend'
  filterIcon?: JSX.Element
  filterDropdown?: (props: {ColumnItem: ColumnItem, setFilterDropdownVisible: Function}) => ReactNode
  filterDropdownWidth?: number
  filterDropdownClassName?: string
  onFilterDropdownVisibleChange?: (filterDropdownVisible: boolean, ColumnItem: ColumnItem) => void
  render?: (text: any, record: object, index: number, dataKey: string) => JSX.Element
}

export type TableDataSource = {
  url: string
  currentPageName?: string
  auto?: boolean
  autoDelayTime?: number
  headers?: object
  data?: object
  success?: (response: object) => any
  error?: (err: object) => void
  type?: 'GET' | 'POST'
  withCredentials?: boolean
  transformResponse?: (response: object) => object[]
}
export type TableFixedOption = {
  left?: string
  right?: string
}

export type TableCheckAllOptions = {
  filterIcon?: React.ReactNode
}

export type TableRowSelection = {
  selectedRowKeys?: React.ReactText[]
  getCheckboxConfig?: (rowData: object) => object
  onChange?: (selectedRowKeys: React.ReactText[], targetRow?: object | object[], shouldChecked?: boolean) => void
  checkboxColWidth?: number
  checkAllOptions?: TableCheckAllOptions
}

export type TableHeaderRowReturn = {
  onClick?: (event: React.MouseEvent) => void
  onDoubleClick?: (event: React.MouseEvent) => void
  onContextMenu?: (event: React.MouseEvent) => void
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
}

export type HeaderRowFunc = (colums: TableColumnItem[], index: number) => TableHeaderRowReturn

export type RowFunc = () => TableHeaderRowReturn

export interface TableProps {
  size?: 'small' | 'large' | 'default' | 'mini'
  fieldKey?: string
  bordered?: boolean
  striped?: boolean
  loading?: boolean
  sticky?: boolean
  draggable?: boolean
  stickyTop?: number
  fixedColumnTrigger?: 'auto' | 'always'
  expandRowKeys?: React.ReactText[]
  highlightedColKeys?: string[]
  expandedRender?: (record: object, index: number) => JSX.Element | Promise
  onLoadChildren?: (record: object) => object[] | Promise
  onExpand?: (expanded: boolean, rowData: object) => void
  rowExpandable?: (record: object ) => JSX.Element | Boolean
  maxHeight?: number
  scrollWidth?: number
  fixedToColumn?: string | TableFixedOption
  pagination?: PaginationProps
  errorRowKeys?: React.ReactText[]
  highlightedRowKeys?: React.ReactText[]
  rowSelection?: TableRowSelection
  dataSource?: (current: number) => TableDataSource
  showColMenu?: boolean
  showColHighlight?: boolean
  striped?: boolean
  setting?: boolean
  resizable?: boolean
  disabledResizableColKeys?: string[]
  standard?: boolean
  emptyContent?: string | JSX.Element
  onHeaderRow?: HeaderRowFunc
  onRow?: RowFunc
  columns: TableColumnItem[]
  data: object[]
  style?: React.CSSProperties
  className?: string
  scrollWidth?: React.ReactText
  onDragStart?: (rowData: object) => void
  onDrop?: (dragRowData: object, dropRowData: object, data: object, level: Level) => boolean | Promise
  onDropEnd?: (dragRowData: object, dropRowData: object, data: object) => void
  hiddenColKeys?: string[]
  onHiddenColKeysChange?: (hiddenColKeys: string[]) => void
  cellRender?: (text: any) => React.ReactNode
  highlightRowOnDoubleClick?: boolean
}

declare const Table: React.ComponentType<TableProps>
export default Table
