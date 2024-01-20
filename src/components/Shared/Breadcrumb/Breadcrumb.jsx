import React from 'react'
import { useSelector } from 'react-redux'

const Breadcrumb = () => {

    
    const { activeModule, menuGroupItem, menuSubGroupItem, menuSubItem } = useSelector((state) => { 
        let moduleCode = state.user.userDetail.userMenuOption;
        let modules = state.user.userDetail.userModules;
        let menuGroupItem, menuSubGroupItem, menuSubItem;

        if(moduleCode?.menuGroupWithOptions !== undefined){
            if(modules !== null && modules !== undefined){
                // let des = modules.find(module => module.moduleCode === moduleCode).description
                moduleCode.menuGroupWithOptions.map(menuGroupWithOption => {
                    if(menuGroupWithOption.isActive){
                        menuGroupItem = menuGroupWithOption.description

                        menuGroupWithOption.menuSubGroups.map(menuSubGrp => {
                            if(menuSubGrp.isActive){
                                menuSubGroupItem = menuSubGrp.description

                                for (const menuOption of menuSubGrp.menuOptions) {
                                    if(menuOption.isActive){
                                        menuSubItem = menuOption.description
                                    }
                                }
                            }
                        })
                        
                    }
                })

                return { 
                    activeModule: moduleCode.moduleDescription,
                    menuGroupItem: menuGroupItem,
                    menuSubGroupItem: menuSubGroupItem,
                    menuSubItem:menuSubItem
                };
            }
        }
        return { activeModule: null, menuGroupItem: null, menuSubGroupItem: null, menuSubItem: null }
    });

    
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item"><a href="#">{activeModule}</a></li>
                    <li className="breadcrumb-item"><a href="#">{menuGroupItem}</a></li>
                    <li className="breadcrumb-item"><a href="#">{menuSubGroupItem}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{menuSubItem}</li>
                </ol>
            </nav>
        </React.Fragment>
    )
}

export default Breadcrumb
