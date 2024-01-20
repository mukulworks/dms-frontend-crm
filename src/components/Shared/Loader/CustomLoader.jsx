import React from 'react';
import { useSelector } from 'react-redux';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import LoaderImage from '../../../images/simple_loading.gif'

const CustomLoader = ({ showHide }) => {
    const showLoader = useSelector((state) => { 
        // return state.user.isLoading
        return state.serviceAppointment.isLoading ? state.serviceAppointment.isLoading 
               : state.inboundReducer.isLoading ? state.inboundReducer.isLoading 
               : state.user.isLoading ? state.user.isLoading : false
    });

    const { isuserOptionNavOpen } = useSelector((state) => {
        return { isuserOptionNavOpen: state.user.isuserOptionNavOpen };
    });

    const userOptionNavClass = () => {
        if (isuserOptionNavOpen === 'COMPLETE_SHOW')
            return ' left-space';
        else if (isuserOptionNavOpen === 'PARTIAL_SHOW')
            return ' ';
        else
            return '';
    }

    return(
        //<Loader type="Puff" color="#00BFFF" height={100} width={80} visible={showLoader} />
        <>
            {showLoader &&
                <div className={'loader move-left' + userOptionNavClass()}>
                    <img className='loader-image' src={LoaderImage} alt=""/>
                </div>
            }
            {showHide &&
                <div className='loader move-left'>
                    <img className='loader-image' src={LoaderImage} alt=""/>
                </div>
            }
        </>
    )
}

export default CustomLoader;