import React, { Component, useState } from 'react';

const CustomHeader = (props) => {
 
  const [checked, setChecked] = useState(false)

  const handleClick = ()  => {}

  
  const handleCheckboxSelection = (event) =>  {
    setChecked(!checked)
  }

    return(
        <React.Fragment>
            {
                props.displayName === 'Case Id' ? 
                <div role="presentation" className="ag-header-select-all ag-labeled ag-label-align-right ag-checkbox ag-input-field">
                    {/* <input  type="checkbox" checked={true} onChange={() => handleCheckboxSelection}/> */}
                    <input type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <div className="customHeaderLabel" onClick={handleClick}>{props.displayName}</div>
                </div> 
                :
                <div className="ag-theme-alpine">
                    <div className="customHeaderLabel" onClick={handleClick}>{props.displayName}</div>
                </div>
            }
        </React.Fragment>
    )
    
}

export default CustomHeader
