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
          'span': 8,
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': 'bad48bb0-bf06-4213-94d7-308568c99928',
          'subtype': 'text'
        },
        {
          'type': 'input',
          'label': '登录账号',
          'disable': false,
          'readonly': false,
          'value': '',
          'placeholder': '请输入员工登录账号',
          'span': 8,
          'rules': [
            {
              'required': true,
              'message': '不能为空',
              'trigger': 'blur'
            }
          ],
          'key': '4481c5af-3f32-4745-b9bc-425b89ecc61d',
          'subtype': 'text'
        },
        {
          'type': 'radio',
          'label': '性别',
          'span': 8,
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
          'key': 'e3b6d4ac-6119-41c3-abe1-dd5aaf95800a',
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
          'span': 8,
          'key': 'birthday',
          'subtype': 'date',
          'label': '出生日期',
          'valueFormat': 'yyyy-MM-dd'
        },
        {
          'type': 'input',
          'label': '地址',
          'span': 16,
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
          'span': 8,
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
          'span': 16,
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
    }]
}
