import React from 'react'
import DocumentImage from '../../../../../../images/document.png'
import CountImage from '../../../../../../images/count.png'
import SizeImage from '../../../../../../images/size.png'
import Image from '../../../../../../images/image.png'
import VideoImage from '../../../../../../images/video.png'
import TechnicalImage from '../../../../../../images/technical-img.png'

const ChartView = ({ toggleView, setToggleView }) => {
    return (
        <div className={"card h-100 list-view" + (toggleView ? '' : ' d-none')}>
            <div className="card-header">
                <div className="row text-center">
                    <div className="col-4">Document Type</div>
                    <div className="col-3 pl-5">Count</div>
                    <div className="col-4">Size (in MBs)</div>
                </div>
                <div className="type-menu list-view-icon" onClick={() => setToggleView(!toggleView)}>
                    <span className="mdi mdi-menu"></span>
                </div>
            </div>
            <div className="card-body border h-100 bg-white p-2" style={{"height": "400px !important", "overflow": "auto"}}>
                <div className="card border shadow-sm mb-3">
                    <div className="card-body">
                        <div className="row text-center">
                            <div className="col-4">
                                <img src={DocumentImage} alt=""/>
                                <p className="mb-0"><strong>Document</strong></p>
                                <p className="mb-0 font-12">.pps, .ppts, .xls, .xlsx, .doc, .docx</p>
                            </div>
                            <div className="col-4">
                                <img src={CountImage} alt=""/>
                            </div>
                            <div className="col-4">
                                <img src={SizeImage} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border shadow-sm mb-3">
                    <div className="card-body py-3">
                        <div className="row text-center">
                            <div className="col-4">
                                <img src={Image} alt=""/>
                                <p className="mb-0"><strong>Document</strong></p>
                                <p className="mb-0 font-12">.jpg, .jpeg, .png, .gif</p>
                            </div>
                            <div className="col-4">
                                <img src={CountImage} alt=""/>
                            </div>
                            <div className="col-4">
                                <img src={SizeImage}alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border shadow-sm mb-3">
                    <div className="card-body py-3">
                        <div className="row text-center">
                            <div className="col-4">
                                <img src={VideoImage} alt=""/>
                                <p className="mb-0"><strong>Document</strong></p>
                                <p className="mb-0 font-12">.mp4, .mov, .wmv, .avi</p>
                            </div>
                            <div className="col-4">
                                <img src={CountImage}alt=""/>
                            </div>
                            <div className="col-4">
                                <img src={SizeImage} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card border shadow-sm mb-3">
                    <div className="card-body py-3">
                        <div className="row text-center">
                            <div className="col-4">
                                <img src={TechnicalImage} alt=""/>
                                <p className="mb-0"><strong>Document</strong></p>
                                <p className="mb-0 font-12">.eml, .msg</p>
                            </div>
                            <div className="col-4">
                                <img src={CountImage} alt=""/>
                            </div>
                            <div className="col-4">
                                <img src={SizeImage} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartView
