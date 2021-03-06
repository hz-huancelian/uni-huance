
let tabUser = [
	{
		iconPath: "http://www.huancelian.com/wxStatic/icon-task.png",
		selectedIconPath: "http://www.huancelian.com/wxStatic/icon-task-active.png",
		text: '任务',
		count: 0,
		customIcon: false,
		// 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
		pagePath: '/pages/task/index', // 1.5.6新增，路径需要以"/"开头
	},
	{
		// 非凸起按钮未激活的图标，可以是uView内置图标名或自定义扩展图标库的图标
		// 或者png图标的【绝对路径】，建议尺寸为80px * 80px
		// 如果是中间凸起的按钮，只能使用图片，且建议为120px * 120px的png图片
		
		iconPath: "http://www.huancelian.com/wxStatic/scan.svg",
		selectedIconPath: "http://www.huancelian.com/wxStatic/scan-selected.svg",
		// 显示的提示文字
		text: '',
		// 如果使用自定义扩展的图标库字体，需配置此值为true
		// 自定义字体图标库教程：https://www.uviewui.com/guide/customIcon.html
		customIcon: false,
		// 如果是凸起按钮项，需配置此值为true
		midButton: true,
		// 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
		pagePath: '/pages/scanCode/index', // 1.5.6新增，路径需要以"/"开头
	},
	{
		// 未点击图标
		iconPath: "http://www.huancelian.com/wxStatic/wode.svg",
		selectedIconPath: "http://www.huancelian.com/wxStatic/wode-selected.svg",
		// 显示文字
		text: '我的',
		// 是否使用自定义图标
		customIcon: false,
		// 页面路径
		pagePath: "/pages/mine/index"
	}
]
const tabMaster = [
	// 首页
	{
		iconPath: "http://www.huancelian.com/wxStatic/icon-task.png",
		selectedIconPath: "http://www.huancelian.com/wxStatic/icon-task-active.png",
		text: '任务',
		count: 0,
		customIcon: false,
		// 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
		pagePath: '/pages/task/index', // 1.5.6新增，路径需要以"/"开头
	},
	{
		// 非凸起按钮未激活的图标，可以是uView内置图标名或自定义扩展图标库的图标
		// 或者png图标的【绝对路径】，建议尺寸为80px * 80px
		// 如果是中间凸起的按钮，只能使用图片，且建议为120px * 120px的png图片
		
		iconPath: "http://www.huancelian.com/wxStatic/icon-todo.png",
		selectedIconPath: "http://www.huancelian.com/wxStatic/icon-todo-active.png",
		// 显示的提示文字
		text: '待办',
		// 如果使用自定义扩展的图标库字体，需配置此值为true
		// 自定义字体图标库教程：https://www.uviewui.com/guide/customIcon.html
		customIcon: false,
		// 如果是凸起按钮项，需配置此值为true
		midButton: false,
		// 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
		pagePath: '/pages/todo/index', // 1.5.6新增，路径需要以"/"开头
	},
	{
		// 未点击图标
		iconPath: "http://www.huancelian.com/wxStatic/wode.svg",
		selectedIconPath: "http://www.huancelian.com/wxStatic/wode-selected.svg",
		// 显示文字
		text: '我的',
		// 是否使用自定义图标
		customIcon: false,
		// 页面路径
		pagePath: "/pages/mine/index"
	}
	// 省略
]

export default {
	tabUser,
	tabMaster
}