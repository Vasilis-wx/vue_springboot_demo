export default {
  'inline': true,
  'labelPosition': 'right',
  'labelWidth': '80px',
  'size': 'small',
  'statusIcon': true,
  'rows': [
    {
      'index': 0,
      'formItemList': [
        {
          'type': 'input',
          'label': '姓名',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入员工姓名',
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': 'name',
          'subtype': 'text'
        },
        {
          'type': 'input',
          'label': '登录账号',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入员工登录账号',
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': 'username',
          'subtype': 'text'
        },
        {
          'type': 'radio',
          'label': '性别',
          'value': '1',
          'button': false,
          'border': false,
          'rules': [
            {
              'required': true,
              'message': '请选择一项',
              'trigger': 'blur'
            }
          ],
          'key': 'sex',
          'options': [
            {
              'value': '1',
              'label': '男',
              'disabled': false
            },
            {
              'value': '2',
              'label': '女',
              'disabled': false
            }
          ]
        }
      ]
    },
    {
      'index': 2,
      'formItemList': [
        {
          'type': 'date',
          'value': null,
          'disabled': false,
          'rules': [
            {
              'required': 'true',
              'message': '此项为必填项'
            }
          ],
          'placeholder': '请选择',
          'key': 'birthday',
          'subtype': 'date',
          'label': '出生日期',
          'valueFormat': 'yyyy-MM-dd'
        },
        {
          'type': 'input',
          'label': '地址',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入地址',
          'rules': [
            {
              'required': true,
              'message': '必填项',
              'trigger': 'blur'
            }
          ],
          'key': 'address',
          'subtype': 'text'
        }

      ]
    },
    {
      'index': 3,
      'formItemList': [
        {
          'type': 'input',
          'label': '电子邮箱',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入电子邮箱',
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': 'email',
          'subtype': 'text'
        },
        {
          'type': 'input',
          'label': '联系方式',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入联系方式',
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': 'phone',
          'subtype': 'text'
        }

      ]
    },
    {
      'index': 4,
      'formItemList': [
        {
          'type': 'image',
          'label': '头像',
          'value': '',
          'action': 'api/upload/singleFile',
          'show_file_list': false,
          'accept': 'image/png, image/jpeg',
          'key': 'userface'
        }
      ]
    }]
}
