import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const UpdateReassignDealer = ({ states, dealers,assignedState, assignedDealer, assignedOutlet, screenData, inboundCaseModel }) => {

    const { register, errors } = useFormContext()
    
    const hasError = inputName => Boolean(errors && errors["caseInfo"] && errors["caseInfo"][inputName])
    const reassignHasError = inputName => Boolean(errors && errors['reassign'] && errors['reassign'][inputName])
    let { caseSources, caseTypes, categories, complaintTypes } = screenData
    let { caseSource, complainType, caseType, caseCategory, caseSubCategory } = inboundCaseModel
    
    const [subCategoryList, setSubCategoryList] = useState(categories.find(x => x.categoryID === caseCategory?.categoryID)?.subCategories)

    const [dealerList, setDealerList] = useState(dealers.filter(x => x.stateCode === assignedState))
    const [outletList, setOutletList] = useState(dealers.find(dealer=>dealer.dealerCode === assignedDealer)?.outets)
    const handleOutlet = (e) => {
        let outlet=[]
        if(e.target.value !== ""){
            let dealerCode = e.target.value
            if(dealers.length > 0){
                outlet = dealers.find(dealer => {
                    return dealer.dealerCode === dealerCode
                })
            }
            outlet = outlet.outets
            setOutletList(outlet)
        }else{
            setOutletList([])
        }
    }

    const handleDealer = (e) => {
        let dealer=[]
        if(e.target.value !== ""){
            let stateCode = e.target.value
            if(dealers.length > 0){
                dealer = dealers.filter(dealer => {
                    return dealer.stateCode === stateCode
                })
            }
            setDealerList(dealer)
            setOutletList([])
        }else{
            setDealerList([])
            setOutletList([])
        }
    }

    const handleSubCategory = (e) => {
        let subCategoryId=[]
        if(e.target.value !== ""){
            let categoryId = parseInt(e.target.value)
            subCategoryId = categories && categories.find(x => x.categoryID === categoryId)?.subCategories
            setSubCategoryList(subCategoryId)
        }else{
            setSubCategoryList([])
        }
    }

    const validate = {
        caseInfo: {
            caseSource: {
                required: true
            },
            complaintType: {
                required: true
            },
            caseType: {
                required: true
            },
            categoryId: {
                required: true
            },
            subCategoryId: {
                required: true
            },
        },
        reassign: {
            allotedDealerCode: {
                required: true
            },
            allotedOutletCode: {
                required: true
            },
        }
    }

    return (
        <div className="col-6">
            <div className="card">
                <div className="card-header">
                    Re-Assign Dealer
                </div>
                <div className="card-body p-1">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Dealer State<span className="star">*</span></label>
                        <div >
                            <select 
                                ref={register} 
                                name='reassign.state'  id="reassign.state" 
                                className={"form-control" + (reassignHasError('state') ? " is-invalid" : '')} 
                                defaultValue={assignedState}
                                onChange={handleDealer}
                            >
                                <option value=''>Select State</option>
                                {
                                    states && states.map((state, key) => (
                                        <option value={state.code} key={key}>{state.description}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Assigned To Dealer<span className="star">*</span></label>
                        <div >
                            <select 
                                ref={register(validate.reassign.allotedDealerCode)} 
                                name='reassign.allotedDealerCode'  id="reassign.allotedDealerCode" 
                                className={"form-control" + (reassignHasError('allotedDealerCode') ? " is-invalid" : '')} 
                                onChange={handleOutlet}
                                defaultValue={assignedDealer}
                                // value={outlet}
                            >
                                <option value=''>Select Dealer</option>
                                {
                                    dealerList && dealerList.map((dealer, key) => (
                                        <option value={dealer.dealerCode} key={key}>{dealer.dealerName}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Assigned To Outlet<span className="star">*</span></label>
                        <div >
                            <select 
                                ref={register(validate.reassign.allotedOutletCode)} 
                                name='reassign.allotedOutletCode'  id="reassign.allotedOutletCode" 
                                className={"form-control" + (reassignHasError('allotedOutletCode') ? " is-invalid" : '')} 
                                defaultValue ={assignedOutlet}
                            >
                                <option value=''>Select Outlet</option>
                                {
                                    outletList && outletList.map((outlet, key) => {
                                        return <option value ={outlet.branchCode} key={key} >{outlet.branchName}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateReassignDealer
