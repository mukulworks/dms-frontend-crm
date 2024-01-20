import React from 'react'
import Document1Image from '../../../../../../images/document-1.png'
import Image1 from '../../../../../../images/image-1.png'
import Video1Image from '../../../../../../images/video-1.png'
import Technical1Image from '../../../../../../images/technical-img-1.png'
import func from '../../../../../../utils/common.functions'
import * as constants from '../../../../../../utils/constant'

const ListView = ({ toggleView, setToggleView, uploadDocuments }) => {

    const calculateTotal = (type) => {
        let total=0
        if(uploadDocuments && uploadDocuments !== undefined){
            uploadDocuments.map(uploadDocument => {
                switch (type) {
                    case constants.ALLOWED_COUNTS:
                        total += uploadDocument.allowedCount
                        break;
                    case constants.ALLOWED_SIZE:
                        total += uploadDocument.allowedSize
                        break;
                    case constants.UPLOADED_COUNTS:
                        total += uploadDocument.uploadCount
                        break;
                    case constants.UPLOADED_SIZE:
                        total += uploadDocument.uploadSize
                        break;
                    case constants.BALANCE_COUNTS:
                        total += uploadDocument.balanceCount
                        break;
                    case constants.BALANCE_SIZE:
                        total += uploadDocument.balanceSize
                        break;
                    default:
                        break;
                }
            })
        }
        return total
    }
    
    return (
        <div className={"card h-100 chart-view" + (toggleView ? ' d-none' : ' ')}>
            <div className="card-header">
                <table className='w-100 text-center'>
                    <tr>
                        <td style={{width:200}}></td>
                        <td colSpan={2}>Allowed</td>
                        <td colSpan={2}>Upload</td>
                        <td colSpan={2}>Balance
                            <div className="text-right text-position">
                                <div className="type-menu chart-view-icon" onClick={() => setToggleView(!toggleView)}>
                                    <span className="mdi mdi-chart-arc"></span>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div className="card-body border h-100 bg-white p-2">
                <table className="table text-center custom-chart-table">
                    <thead>
                        <tr>
                            <th className="text-left" style={{"width": "200px"}}>Document Type</th>
                            <th>Count</th>
                            <th>Size</th>
                            <th>Count</th>
                            <th>Size</th>
                            <th>Count</th>
                            <th>Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            uploadDocuments && uploadDocuments.map((uploadDocument, key) => (
                                <tr key={key}>
                                    <td className="text-left" style={{"width": "200px"}}>
                                        {
                                            uploadDocument.documentType === constants.IMAGE ? <img src={Image1} alt=""/> :
                                            uploadDocument.documentType === constants.DOCUMENT ? <img src={Document1Image} alt=""/> :
                                            uploadDocument.documentType === constants.VIDEO ? <img src={Video1Image} alt=""/> :
                                            uploadDocument.documentType === constants.TECHNICAL ? <img src={Technical1Image} alt=""/> : null
                                        }
                                        <div>
                                            <strong>{uploadDocument.documentType}</strong>
                                            <p className="mb-0 font-12">
                                                {
                                                    uploadDocument.validExtensions.map(validExtension => (
                                                       '.' + validExtension + ', '
                                                    ))
                                                }
                                            </p>
                                        </div>
                                    </td>
                                    <td>{uploadDocument.allowedCount}</td>
                                    <td>{func.dataSizeFormatter(uploadDocument.allowedSize)}</td>
                                    <td>{func.emptyStringFormatter(uploadDocument.uploadCount)}</td>
                                    <td>{func.dataSizeFormatter(uploadDocument.uploadSize)}</td>
                                    <td>{func.emptyStringFormatter(uploadDocument.balanceCount)}</td>
                                    <td>{func.dataSizeFormatter(uploadDocument.balanceSize)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tbody>
                        <tr>
                            <th className="text-right">Total</th>
                            <th>{calculateTotal(constants.ALLOWED_COUNTS)}</th>
                            <th>{func.dataSizeFormatter(calculateTotal(constants.ALLOWED_SIZE))}</th>
                            <th>{func.emptyStringFormatter(calculateTotal(constants.UPLOADED_COUNTS))}</th>
                            <th>{func.dataSizeFormatter(calculateTotal(constants.UPLOADED_SIZE))}</th>
                            <th>{func.emptyStringFormatter(calculateTotal(constants.BALANCE_COUNTS))}</th>
                            <th>{func.dataSizeFormatter(calculateTotal(constants.BALANCE_SIZE))}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListView
