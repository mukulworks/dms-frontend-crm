import React from 'react'

const Navbar = ({ id1, id2, firstHeading, secondHeading, isActive, setIsActive, img1, img2, isFirstFormValidationPassed, isSecondFormValidationPassed}) => {
    return (
        <>
            <nav className="nav process-flow-section connected d-inline-flex">
                <a className={"nav-link" + (isActive ? ' active' : '')} href="#" id={id1} onClick={() => setIsActive(!isActive)}>
                    <div className="process-section">
                        <span className={"mdi " + (isFirstFormValidationPassed === null ? '' : (isFirstFormValidationPassed === true ? 'pass' : 'fail'))} ><img className='nav-link-img' src={img1} alt=""/></span>
                        <p>{firstHeading}</p>
                    </div>
                </a>
                <a className={"nav-link" + (isActive ? '' : ' active')} href="#" id={id2} onClick={() => setIsActive(!isActive)}>
                    <div className="process-section">
                        <span className={"mdi " + (isSecondFormValidationPassed === null ? '' : (isSecondFormValidationPassed === true ? 'pass' : 'fail'))} ><img className='nav-link-img' src={img2} alt=""/></span>
                        <p>{secondHeading}</p>
                    </div>
                </a>
            </nav>
            <a href="javascript:void(0)" className={`btn btn-success rounded-pill ml-5 ${ !isActive ? ' d-none':''}`}  onClick={() => setIsActive()}>Next <span className="mdi mdi-arrow-right-thick"></span></a>
            <a href="javascript:void(0)" className={`btn btn-success rounded-pill ml-5 ${ isActive ? ' d-none':''}`}  onClick={() => setIsActive(!isActive)}><span className="mdi mdi-arrow-left-thick"></span> Previous</a>
        </>
    )
}

export default Navbar
