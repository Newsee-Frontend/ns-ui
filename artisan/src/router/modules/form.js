const Layout = resolve => require(['@/layout/layout.vue'], resolve);
export const formRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/input',
    name: '表单',
    children: [
      {
        path: 'input',
        component: () => import('../../pages/Form/Input/Input'),
        meta: { auth: true, key: 'input' },
        name: '输入框',
      },
      {
        path: 'input-tag',
        component: () => import('../../pages/Form/Input-tag/Input-tag'),
        meta: { auth: true, key: 'input-tag' },
        name: 'input-tag选择器',
      },
      {
        path: 'inputNumber',
        component: () => import('../../pages/Form/InputNumber/InputNumber'),
        meta: { auth: true, key: 'inputNumber' },
        name: '计数器',
      },
      {
        path: 'date-picker',
        component: () => import('../../pages/Form/datepicker'),
        meta: { auth: true, key: 'date-picker' },
        name: '日期控件',
      },
      {
        path: 'time-picker',
        component: () => import('../../pages/Form/timepicker'),
        meta: { auth: true, key: 'time-picker' },
        name: '时间控件',
      },
      {
        path: 'only-mmdd-picker',
        component: () => import('../../pages/Form/Only-MMDD-picker/Only-MMDD-picker'),
        meta: { auth: true, key: 'only-mmdd-picker' },
        name: 'MMDD日期控件',
      },
      {
        path: 'time-interval',
        component: () => import('../../pages/Form/Time-interval/Time-interval'),
        meta: { auth: true, key: 'time-interval' },
        name: '时间频率控件',
      },
      {
        path: 'select',
        component: () => import('../../pages/Form/Select/Select'),
        meta: { auth: true, key: 'select' },
        name: '选择器',
      },
      {
        path: 'cascader',
        component: () => import('../../pages/Form/Cascader/Cascader'),
        meta: { auth: true, key: 'cascader' },
        name: '级联选择器',
      },
      {
        path: 'checkbox',
        component: () => import('../../pages/Form/Checkbox/Checkbox'),
        meta: { auth: true, key: 'checkbox' },
        name: '多选框',
      },
      {
        path: 'radio',
        component: () => import('../../pages/Form/Radio/Radio'),
        meta: { auth: true, key: 'radio' },
        name: '单选框',
      },
      {
        path: 'switch',
        component: () => import('../../pages/Form/Switch/Switch'),
        meta: { auth: true, key: 'switch' },
        name: '开关',
      },
      {
        path: 'slider',
        component: () => import('../../pages/Form/Slider/Slider'),
        meta: { auth: true, key: 'slider' },
        name: '滑块',
      },
      {
        path: 'upload',
        component: () => import('../../pages/Form/Upload/Upload'),
        meta: { auth: true, key: 'upload' },
        name: '头像上传',
      },
      {
        path: 'select-tree',
        component: () => import('../../pages/Form/Select-tree/Select-tree'),
        meta: { auth: true, key: 'select-tree' },
        name: '下拉选择树',
      },
      {
        path: 'color-picker',
        component: () => import('../../pages/Form/ColorPicker/ColorPicker'),
        meta: { auth: true, key: 'color-picker' },
        name: '颜色选择器',
      },
      {
        path: 'avatar',
        component: () => import('../../pages/Form/Avatar/Avatar'),
        meta: { auth: true, key: 'avatar' },
        name: '头像',
      },
      {
        path: 'form',
        component: () => import('../../pages/Form/Form/Form'),
        meta: { auth: true, key: 'form' },
        name: '表单',
      },

    ],
  },
];
