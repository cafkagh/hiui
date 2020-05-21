type DataItem = {
  content: string
  id: string | number
  disabled?: boolean
}
type FieldNames = {
  label?: string
  value?: string
  children?: string
}
interface Props {
  fieldNames?: FieldNames
  data: DataItem
  value: string[] | number[]
  searchable?: boolean
  filterOption?: (keyword: string, item: DataItem) => boolean
  clearable?: boolean
  disabled?: boolean
  changeOnSelect?: boolean
  placeholder?: string
  emptyContent?: string | JSX.Element
  displayRender?: (value: string[] | number[]) => string
  style?: object
  onChange?: (value: string[] | number[]) => void
}
declare const Card: React.ComponentType<Props>
export default Card
