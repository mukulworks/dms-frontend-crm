import React from 'react'

const NotificationPopUp = ({image ,message,isPopUpActive,setIsPopUpActive}) => {

    const customStyle = {
        show: {
            'display': 'block',
            'paddingRight': '17px'
        },
        hide: {
            'display': 'none'
        }
    }
    return (
        <React.Fragment>
        <div 
            className={"modal modal-margin  " + (isPopUpActive ? 'show' : '')}       
            aria-labelledby="exampleModalLabel"   
            style={(isPopUpActive ? customStyle.show : customStyle.hide)}
        >
            
            <div className="modal-dialog">
                <div className="modal-content border-0">
                    <div className="modal-body text-center p-5">
                        {
                            image && <img src={image} alt="Image Not Found"/> 
                        }
                        <button type="button" 
                         className="close" 
                         data-dismiss="modal" 
                         aria-label="Close" 
                         onClick={()=>setIsPopUpActive(!isPopUpActive)}
                        >
                            <span aria-hidden="true">×</span></button>
                        <h5 className="mb-3">{message}</h5>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default NotificationPopUp
