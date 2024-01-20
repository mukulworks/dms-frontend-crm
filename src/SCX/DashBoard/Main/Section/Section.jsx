import React, { useState } from 'react'
import SectionControl from './SectionControl/SectionControl'

const Section = ({ section, data }) => {
    let orderNum=0;

    const createId = () => {
        if(section && section.sectionHeader && section.sectionHeader.leftHeading !== undefined){
            return section.sectionHeader.leftHeading
        }
        return '_'
    }
    
    const [Expand, setExpand] = useState(false)
       const handleExpand = () => {
        setExpand(!Expand)
    }
    return (
        <div className="row ">
            {
                section && section.isHeaderEnable && 
                <div className="col-12">
                    <h6 className="bg-light p-2 mt-2">{section.sectionHeader !== null ? section.sectionHeader.leftHeading : null} 
                        <a href="#" className="float-right icon-font-size" onClick={handleExpand}>
                            <span data-toggle="collapse" data-target={"#section_heading_" + (createId())} aria-expanded="false" aria-controls={"#section_heading_" + (createId())} className={"mdi mdi-menu-"+(Expand? "up":"down")}></span>
                        </a>
                    </h6>
                </div>
            }
            {
                
            <div className={section.isHeaderEnable ?"col-12 collapse":"col-12 collapse show"} id={'section_heading_' + (createId())}>
                <div className="row">
                    {
                        section && section.sectionControls && section.sectionControls.map((sectionControl, key) => {
                            
                            if(sectionControl.control.description !== 'MULTIPLE_DOUGHNUT' && sectionControl.control.description !== 'LINE_CHART' && sectionControl.control.description !== 'WORLD_COUNTRY_MAP' && orderNum === 0){
                                return(
                                    <SectionControl sectionControl={sectionControl} data={data} key={key} classWidth="col-4 col-4-spc"/>
                                )
                            } else if(sectionControl.control.description === 'WORLD_COUNTRY_MAP'){
                                return(
                                    <div className="col" key={key}>
                                        <div className="row">
                                            <SectionControl sectionControl={sectionControl} data={data} key={key} classWidth="col-9 pr-2"/>
                                            <div className="col-3 pl-2">
                                                <div className="card shadow-sm alert cus-height" role="alert">
                                                    <div className="card-header px-2 py-1">
                                                        <div className="row">
                                                            <div className="col-8">
                                                                <div>Top Browsers</div>
                                                                <div className="font-10 font-weight-normal text-muted">For the month of Dec 2020</div>
                                                            </div>
                                                            <div className="col-4 py-1 btn-align"><ul className="nav align-items-center justify-content-end"><li className="nav-item"><a className="nav-link" href="#"><span className="mdi mdi-refresh"></span></a></li><li className="nav-item"><a className="nav-link" href="#"><span className="mdi mdi-arrow-expand"></span></a></li></ul></div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body p-1">
                                                        <div className="row my-3">
                                                            <div className="col-7">
                                                                <div className="row">
                                                                    <div className="col-3 pr-0 text-right"><span className="broswer-box chrome"></span> </div>
                                                                    <div className="col-auto pr-0 pl-2"><span>Chrome</span></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pr-0">
                                                                <span>4,436 Requests</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-7">
                                                                <div className="row">
                                                                    <div className="col-3 pr-0 text-right"><span className="broswer-box samsung-browser"></span> </div>
                                                                    <div className="col-auto pr-0 pl-2"><span>Samsung Browser</span></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pr-0">
                                                                <span>620 Requests</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-7">
                                                                <div className="row">
                                                                    <div className="col-3 pr-0 text-right"><span className="broswer-box mobile-safari"></span> </div>
                                                                    <div className="col-auto pr-0 pl-2"><span>Mobile Safari</span></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pr-0">
                                                                <span>606 Requests</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-7">
                                                                <div className="row">
                                                                    <div className="col-3 pr-0 text-right"><span className="broswer-box chrome-webview"></span> </div>
                                                                    <div className="col-auto pr-0 pl-2"><span>Chrome WebView</span></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pr-0">
                                                                <span>390 Requests</span>
                                                            </div>
                                                        </div>
                                                        <div className="row my-3">
                                                            <div className="col-7">
                                                                <div className="row">
                                                                    <div className="col-3 pr-0 text-right"><span className="broswer-box miui-browser"></span> </div>
                                                                    <div className="col-auto pr-0 pl-2"><span>MIUI Browser</span></div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pr-0">
                                                                <span>315 Requests</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else if(sectionControl.control.description === 'MULTIPLE_DOUGHNUT' || sectionControl.control.description === 'LINE_CHART'){
                                orderNum = key + 1
                                return(
                                    <SectionControl sectionControl={sectionControl} data={data} key={key} classWidth="col-7 pr-2"/>
                                )
                            } else {
                                orderNum=0
                                return(
                                    <SectionControl sectionControl={sectionControl} data={data} key={key} classWidth="col-5 pl-2"/>
                                )
                            }
                        })
                    }
                </div>
            </div>
}
        </div>
    )
}

export default Section
