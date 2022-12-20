export const contentTableConfig = {
  title: 'BOT列表',
  propList: [
    { prop: 'id', label: 'Bot的Id', minWidth: '80' },
    { prop: 'description', label: '描述', minWidth: '80' },
    {
      prop: 'createtime',
      label: '创建时间',
      minWidth: '170',
      slotName: 'createtime'
    },
    {
      prop: 'modifytime',
      label: '修改时间',
      minWidth: '170',
      slotName: 'modifytime'
    },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: false
}
