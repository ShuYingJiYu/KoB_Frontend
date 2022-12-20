import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'title',
      type: 'textarea',
      label: 'Bot标题',
      placeholder: '请输入标题'
    },
    {
      field: 'description',
      type: 'textarea',
      label: 'Bot描述',
      placeholder: '请输入描述内容'
    },
    {
      field: 'content',
      type: 'code',
      label: 'Bot代码'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
