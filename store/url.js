const URL = {
  // 获取用户信息
  "FIND_USERINFO" : "/board/board/getUserInfo",

  // 查询文字库信息
  "FIND_WORDS": "/board/word/findWords",  // 查询文字库信息
  "ADD_WORD": "/board/word/addWord",  // 添加文字库信息
  "DEL_WORDS": "/board/word/deleteWord",  // 批量删除文字库信息

  // 地图左侧板块调用
  "FIND_BOARDS": "/board/board/queryBoards", // 查询情报板数据
  "FIND_HIS_BOARDS": "/board/task/queryBoardTaskHistory", // 查询情报板发布历史列表
  "CANCEL_BOARDS": "/board/task/cancelTask", // 一键撤销情报板优先发布数据
  "RELEASE_BOARDS": "/board/task/addTask", // 情报板批量发布接口

  // 运维板块
  "UPDATE_BOARDS": "/board/board/updateStatus", // 板块启动/停止控制
  "FIND_CONTRO_BOARDS": "/board/board/listStatus", // 查询情报板启停状态信息列表

  // 故障上报
  "UPLOAD_FAULT": "/board/fault/reportFault", // 故障上报

  // 图形库管理
  "FIND_GRAPHS": "/board/graph/findGraphs", // 查询图形数据
  "ADD_GRAPHS": "/board/graph/addGraph", // 添加图形数据
  "DEL_GRAPHS": "/board/graph/deleteGraph", // 批量删除图形数据

  // 模板库管理
  "ADD_TEMP_BOARD": "/board/template/addTemplate", // 添加模板库
  "DEL_TEMP_BOARDS": "/board/template/deleteTemplate", // 批量删除模板库
  "FIND_TEMP_BOARDS": "/board/template/findTemplates", // 查询模板库

  // 统计版面
  "FIND_BOARD_STATIS":"/board/taskStatistics/list",       // 统计

  // 外服务调用-获取收费站坐标信息
  "FIND_TOLL_GATES":"/board/board/getStations",

  // 获取路公司、管理处
  "FIND_COM_MANAGES":"/board/board/getLevelData",

  // 获取路公司/路公司+管理处 可查看路段信息
  "FIND_COM_ROADS":"/board/board/getRoads",

  // 删除发布内容
  "DELETE_TASK":"/board/task/deleteTask",
}
export default URL;
