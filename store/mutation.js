import tabBar from '../util/tabBer.js'

const mutations = {
    // 保存当前角色对象
	// 1: 采样组长，2：采样员，3：样品管理员，4：检测员
    'SAVE_CUR_ROLE'(state, roleObj) {
      state.CUR_ROLE_ID = roleObj.roleId;
	  state.CUR_ROLE_NAME = roleObj.roleName;
	  if(roleObj.roleId == 2) {
		  state.TAB_BAR_LIST = tabBar['tabUser'];
		  state.TAB_MID_BTN = true;
		  state.CUR_USER_TYPE = 2
	  } else if (roleObj.roleId == 1){
		  state.TAB_BAR_LIST = tabBar['tabMaster'];
		  state.TAB_MID_BTN = false;
		  state.CUR_USER_TYPE = 1
	  } else {
		  state.TAB_BAR_LIST = [];
		  state.TAB_MID_BTN = false;
		  state.CUR_USER_TYPE = roleObj.roleId
	  }
    },
    // 保存当前角色对象
    'SAVE_ROLE_LISTS'(state, roles) {
      state.CUR_ROLE_LISTS = roles;
    },
    // 保存当前角色对象
    'SAVE_CUR_USER'(state, userInfo) {
      state.CUR_USER_INFO = userInfo;
    },
    // 保存扫码状态
    'SAVE_SCAN'(state, type) {
      state.SHOW_SCAN = type;
    }
  }

export default mutations;
