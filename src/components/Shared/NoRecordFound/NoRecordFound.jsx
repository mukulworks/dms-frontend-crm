import React from 'react'
import NoDataFoundImage from '../../../images/no-data.jpg'

const NoRecordFound = ({ message }) => {
    return (
        <div className="col-12">
            <div className="row border-bottom text-uppercase bg-light justify-content-between font-10  h-100">
                <div className="col-12 px-0">
                    <div className="card border-0 h-100">
                        <div className="card-body p-0">
                            <div className="row  grid-section"/* style={{ height: "390px"}}*/>
                                <div className="col-12 no-data no-record-found">
                                    <img src={NoDataFoundImage} alt="" />
                                        <p>{message}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default NoRecordFound
