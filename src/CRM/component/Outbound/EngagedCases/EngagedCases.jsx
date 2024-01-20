import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch } from "react-redux";
import OutboundHeader from '../OutboundHeader/OutboundHeader'
import { fetchEngagedCases } from '../../../store/actions/outboundActions/outboundActions'
import EngagedListing from './EngagedListing/EngagedListing'

const EngagedCases = ({chooseComponent,listType}) => {

    const dispatch = useDispatch()
    const [isRecordSaved, setRecordSaved] = useState(false);
    
    const { engagedCases } = useSelector(state => {
        let engagedCases = state.outboundReducer.outboundModel?.engagedCases;
        //let caseUniqueIds = state.inboundReducer.inboundModel?.caseUniqueIds;
        // engagedCases.map(obj=> ({ ...obj, isLock: true }))
        if (engagedCases?.length > 0) {
            for (let engagedCase of engagedCases) {
                engagedCase.isLock = true
            }
        }
       
        return {
            engagedCases: engagedCases
        }
    })

    useEffect(() => {
        dispatch((fetchEngagedCases()))
    }, [isRecordSaved])


    return(
        <React.Fragment>
            <div className='section without-criteria'>
                <OutboundHeader 
                    listType={'LIST OF ALL ENGAGED CASES'} 
                    chooseComponent={chooseComponent}
                    
                />
                <div className="mt-1">
                    <div className="row mx-1">
                        <div className="col-12 p-0">
                            {engagedCases?.length > 0 && <EngagedListing engagedCases={engagedCases} setRecordSaved={setRecordSaved} isRecordSaved={isRecordSaved}/>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default EngagedCases