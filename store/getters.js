
const getters = {
    // 是否是采样员
    isSampler(state) {
      return state.CUR_ROLE_NAME === '采样员';
    },
	tabBarList : state => state.TAB_BAR_LIST,
	midBtn : state => state.TAB_MID_BTN,
	roleList: state => state.CUR_ROLE_LISTS,
	userInfo: state => state.CUR_USER_INFO,
	userType: state => state.CUR_USER_TYPE,
	sign: state => state.SIGN,
	showScan: state => state.SHOW_SCAN
  };
export default getters;
