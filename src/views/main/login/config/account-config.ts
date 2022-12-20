// 编写好规则
export const rules = {
  // name: [
  //   {
  //     required: true,
  //     message: '用户名是必传内容~',
  //     trigger: 'blur'
  //   },
  //   {
  //     pattern: /^[a-zA-Z0-9_-]{4,16}$/,
  //     message: '用户名必须是4到16位(字母，数字，下划线，减号)~',
  //     trigger: 'blur'
  //   }
  // ],
  // password: [
  //   {
  //     required: true,
  //     message: '密码是必传内容~',
  //     trigger: 'blur'
  //   },
  //   {
  //     pattern:
  //       /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
  //     message:
  //       '用户名必须最少6位,包括至少1个大写字母,1个小写字母,1个数字,1个特殊字符~',
  //     trigger: 'blur'
  //   }
  // ]
  username: [
    {
      required: true,
      message: '用户名是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{2,10}$/,
      message: '用户名必须是5~10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码是必传内容~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '用户名必须是3位以上的字母或者数字~',
      trigger: 'blur'
    }
  ]
}
