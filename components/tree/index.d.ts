import React from 'react'
export type TreeNode = {
  id: string | number
  title: string | JSX.Element
  disabled?: boolean
  children?: TreeNode[]
  isLeaf?: boolean
  selectable?: boolean
}
export type LoadTreeNode = {
  method?: 'get' | 'post'
  url: string
  headers?: object
  data?: object
  params?: object
  transformResponse: (response: object) => TreeNode[]
}
export type TreeContextMenuOption = {
  type?: 'editNode' | 'addChildNode' | 'addSiblingNode' | 'deleteNode'
  title?: string | JSX.Element
  onClick?: (item: TreeNode, node: TreeNode) => void
}
const LoadTreeNodeFun: (id: stsring) => TreeNode
const ContextMenuOptionFun: (item: TreeNode) => TreeContextMenuOption[]

export type TreeDataStatus = {
  before: TreeNode[]
  after: TreeNode[]
}
export interface TreeProps {
  data: TreeNode[]
  checkable?: boolean
  editable?: boolean
  draggable?: boolean
  searchable?: boolean
  selectable?: boolean
  defaultExpandAll?: boolean
  defaultHighlightId?: boolean
  loadTreeNode?: LoadTreeNode | LoadTreeNodeFun
  checkedIds?: string[] | number[]
  defaultExpandedIds?: string[] | number[]
  expandedIds?: string[] | number[]
  openIcon?: string
  closeIcon?: string
  apperance?: 'default' | 'line' | 'folder'
  style?: React.CSSProperties
  className?: string
  defaultSelectedId?: string | number
  selectedId?: string | number
  defaultCheckedIds?: string[] | number[]
  contextMenu?: TreeContextMenuOption[] | ContextMenuOptionFun
  onChange?: (data: TreeNode[]) => void
  onExpand?: (expanded: boolean, expandIds: string[], expandedNode: TreeNode) => void
  onCheck?: (checked: boolean, checkedIds: string[], checkedNode: TreeNode) => void
  onClick?: (clickNode: TreeNode) => void
  onDragStart?: (dragNode: TreeNode) => void
  onDrop?: (dragNode: TreeNode, dropNode: TreeNode) => boolean
  onDropEnd?: (dragNode: TreeNode, dropNode: TreeNode) => void
  onBeforeDelete?: (deletedNode: TreeNode, data: TreeDataStatus, level: number) => boolean
  onDelete?: (deletedNode: TreeNode, data: TreeNode[]) => void
  onBeforeSave?: (savedNode: TreeNode, data: TreeDataStatus, level: number) => boolean
  onSave?: (savedNode: TreeNode, data: TreeNode[]) => void
  onSelect?: (selectedNode: TreeNode) => void
  onLoadChildren?: (selectedNode: TreeNode) => LoadTreeNode
}
declare const Tree: React.ComponentType<TreeProps>
export default Tree
