import * as types from "../actions";

const initialLoginState = {
  userDetail: {
    userContext: null,
    userSetting: null,
    userModules: [],
    userMenuOption: {},
  },
  isLoading: true,
  isModuleNavOpen: false,
  isuserOptionNavOpen: "HIDE",
};

const user = (state = initialLoginState, action) => {
  let response = action.response;
  switch (action.type) {
    case types.FETCH_USER_DETAIL_SUCCESS:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          userModules: response.userDetail.userModules,
          userContext: response.userDetail.userContext,
          userSetting: response.userDetail.userSetting,
          brandCode: response.userDetail.brandCode,
          countryCode: response.userDetail.countryCode,
        },
        isLoading: false,
        isModuleNavOpen: false,
        isuserOptionNavOpen: "HIDE",
      };
    case types.FETCH_USER_DETAIL_FAIL:
      return { ...state, user: {} };
    case types.SET_MODULE_NAV_BAR:
      return { ...state, isModuleNavOpen: action.data };
    case types.SET_USER_OPTION_NAV_BAR:
      return {
        ...state,
        isuserOptionNavOpen:
          state.isuserOptionNavOpen === "COMPLETE_SHOW"
            ? "PARTIAL_SHOW"
            : "COMPLETE_SHOW",
      };
    case types.FETCH_USER_MENU_RIGHTS_SUCCESS:
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          userMenuOption: response.userOptionRights,
        },
        isLoading: false,
        isModuleNavOpen: false,
        isuserOptionNavOpen: "PARTIAL_SHOW",
      };
    case types.FETCH_USER_MENU_RIGHTS_FAIL:
      return {
        ...state,
        userDetail: { ...state.userDetail, userMenuOption: {} },
        isLoading: false,
        isModuleNavOpen: false,
        isuserOptionNavOpen: "PARTIAL_SHOW",
      };
    case types.GET_USER_MENU_SUB_GROUPS:
      const key = action.data;
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          userMenuOption: {
            ...state.userDetail.userMenuOption,
            menuGroupWithOptions:
              state.userDetail?.userMenuOption?.menuGroupWithOptions?.map(
                (menuOption, i) =>
                  menuOption.code === key
                    ? { ...menuOption, isActive: true }
                    : { ...menuOption, isActive: false }
              ),
          },
        },
      };
    case types.SHOW_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case types.HIDE_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case types.SET_MENU_OPTION_ON_BREADCRUMB:
      return { ...state };
    default:
      return state;
  }
};

export default user;
