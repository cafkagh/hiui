import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Form from '../../../components/form/index'
import Input from '../../../components/input'
import Button from '../../../components/button'
import Select from '../../../components/select'
import Counter from '../../../components/counter'
import Cascader from '../../../components/cascader'
import Radio from '../../../components/radio'
import Checkbox from '../../../components/checkbox'
import Switch from '../../../components/switch'
import DatePicker from '../../../components/date-picker'
import Rate from '../../../components/rate'
import Upload from '../../../components/upload'
import Grid from '../../../components/grid'

const prefix = 'form-schema'
const desc = '通过schema配置表单，现仅支持HiUI组件'
const code = `import React from 'react'

import { Form,Counter} from '@hi-ui/hiui'\n

class Demo extends React.Component {  
  constructor(props){
    super(props)
    this.state = {
      initialValues : {
        inputField: 'test schema',
        selectField: "3",
        radio:'show'
      },
      formData:{
        inputField: 'test schema',
        selectField: "3",
      },
      formSchema:[
          {
            label:'输入框',
            field:'inputField',
            rules:[{ min: 5, max: 16, message: '长度在 6 到 16 个字符', trigger: 'onBlur' }],
            component:'Input',
            componentProps:{
                placeholder:'schema',
                clearable:true,
                style:{ width: 300 } 
            }
          },
          {
            label:'下拉框',
            field:'selectField',
            component:'Select',
            required:true,
            componentProps:{
                placeholder:'schema',
                style:{ width: 300 },
                data:[
                  { title:'电视', id:'3', disabled: true },
                  { title:'手机', id:'2' },
                  { title:'笔记本', id:'4', disabled: true },
                  { title:'生活周边', id:'5' },
                  { title:'办公', id:'6' }
                ],
            }
          },
          {
            label:'控制日期',
            field:'radio',
            component:'Radio.Group',
            required:true,
            componentProps:{
                data:[{
                  content: '显示日期',
                  id: 'show'
                },{
                  content: '隐藏日期',
                  id: 'hide'
                }],
                onChange:(data) => console.log("Radio data",data)
            }
          },
          {
            label:'日期',
            field:'datePicker',
            component:'DatePicker',
            required:true,
            componentProps:{
              type:'daterange',
              format:'yyyy-MM-dd',
              onChange:(date, dateStr) => {console.log('onChange DatePicker', date, dateStr)}
            }
          }
      ]
    }
    this.initSchemaData = this.state.formSchema
    this.form = React.createRef()

  }
  render () {
    const {initialValues, formData, formSchema} = this.state
    const SchemaForm = Form.SchemaForm

    return (
      <SchemaForm 
        labelWidth='100' 
        labelPlacement='right' 
        initialValues={initialValues}
        schema={formSchema}
        ref={this.form}
        submit={{
          type:'primary',
          children:'提交',
          onClick:(value,errors) => {console.log('value,errors', value,errors)}
        }}
        reset={{
          type:'line',
          children:'重置',
          onClick:() => {console.log('reset form')}
        }}
        onValuesChange ={(changedValues,allValues) => {
        //  console.log("formdata",changedValues,allValues,this.form.current.validate())
         this.setState({
          formData: allValues
         })
         if(changedValues.radio && changedValues.radio === 'hide'){
          this.setState({
            formSchema: formSchema.filter((item)=>{
              return item.field !== 'datePicker'
            })
           })
         } else {
          this.setState({
            formSchema: this.initSchemaData
           })
         }
        }}
      />
    )
  }
}`

const DemoRow = () => (
  <DocViewer
    code={code}
    scope={{
      Form,
      Button,
      Input,
      Select,
      Counter,
      Cascader,
      Radio,
      Checkbox,
      Switch,
      DatePicker,
      Rate,
      Upload,
      Grid
    }}
    prefix={prefix}
    desc={desc}
  />
)
export default DemoRow
