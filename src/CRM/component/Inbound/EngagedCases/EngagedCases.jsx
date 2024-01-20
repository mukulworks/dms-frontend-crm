import React, { useEffect, useState} from 'react'
import {useSelector, useDispatch } from "react-redux";
import InboundHeader from '../InboundHeader/InboundHeader'
import { fetchEngagedCases } from '../../../store/actions/inboundActions'
import EngagedListing from './EngagedListing/EngagedListing'
import useWindowSize from '../../../../Hooks/useWindowSize';

const EngagedCases = ({chooseComponent}) => {

    const size = useWindowSize();
    const dispatch = useDispatch()
    const [isRecordSaved, setRecordSaved] = useState(false);
    const { engagedCases } = useSelector(state => {
        let engagedCases = state.inboundReducer.inboundModel?.engagedCases;
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
            <div className='section without-criteria' style={{height: size.height !== undefined ? size.height - 95 : 0}}>
                <InboundHeader 
                    listType={'LIST OF ALL ENGAGED CASES'} 
                    chooseComponent={chooseComponent}
                />
                <div className="mt-1">
                    <div className="row mx-1">
                        <div className="col-12 p-0">
                            {engagedCases?.length > 0 && <EngagedListing engagedCases={engagedCases} setRecordSaved={setRecordSaved} isRecordSaved={isRecordSaved}/>}
                            {/* <ServiceInboundListing /> */}
                            {/* <Pagination /> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default EngagedCases