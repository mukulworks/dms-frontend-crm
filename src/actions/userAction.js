import * as types from './index';

export const fetchUserDetail = () => {
    return {
      type: types.FETCH_USER_DETAIL
    }
};

export const setModuleNavBar =data =>{
  return {
    type: types.SET_MODULE_NAV_BAR,
    data
  }
}

export const setUserOptionNavBar =data =>{
  return {
    type: types.SET_USER_OPTION_NAV_BAR,
    data
  }
}

export const fetchUserMenuRights =data =>{
  return {
    type: types.FETCH_USER_MENU_RIGHTS,
    data
  }
}

export const getMenuSubGroups =data =>{
  return {
    type: types.GET_USER_MENU_SUB_GROUPS,
    data
  }
}

export const setOptionsOnBreadcrumb = data => {
  return {
    type: types.SET_MENU_OPTION_ON_BREADCRUMB, 
    data
  }
}
