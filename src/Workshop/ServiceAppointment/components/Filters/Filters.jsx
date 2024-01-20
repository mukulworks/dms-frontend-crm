import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import FollowCategory from './DerivedFilters/FollowCategory/FollowCategory'
import Bucket from './DerivedFilters/Bucket'
import Caller from './DerivedFilters/Caller'
import { selectedFollowUpCategory, selectedFollowUpEventBuckets } from '../../store/actions/serviceAppointmentAction'

const Filters = () => {

    const dispatch = useDispatch()
    const { followUpCategories } = useSelector(state => {
        let filterModel = state.serviceAppointment.serviceAppointmentModel["filterModel"];
        return {
            caller: filterModel.callers,
            followUpCategories: filterModel.followUpCategories,
            followUpEvents: filterModel.followUpEvents,
            followUpEventBucket: filterModel.followUpEventBuckets,
            
            monthYears: filterModel.monthYears
        }
    })
    const [isOpen, setIsOpen] = useState(false)

    const [followUpCategory, setFollowUpCategory] = useState('--Choose Description--')
    const [followUpEventBuckets, setFollowUpEventBuckets] = useState([])
    const [selectedBucket, setSelectedBucket] = useState()
    const [callers, setCallers] = useState([])

    const changeFollowUpCategory = (e) => {
        dispatch(selectedFollowUpCategory(e.target.value))
        setFollowUpCategory(e.target.value)
        setCallers([])
        const followUpEventBucket = followUpCategories.find(ctry => ctry.filterCategories === e.target.value).followUpEventBuckets
        setFollowUpEventBuckets(followUpEventBucket)    
    }

    const changeFollowUpEventBuckets = (e) => {
        dispatch(selectedFollowUpEventBuckets(e.target.value))
        setSelectedBucket(e.target.value)
        const caller = followUpEventBuckets.find(bucket => bucket.name === e.target.value).callers
        setCallers(caller)
    }

    
    return (
        //New Filter UI Code
        <div className={"col-12 col-sm-12 col-md-auto pt-1 font-22 filter-sort" + (isOpen ? ' show' : ' ')}>
            <a href="" onClick={() => setIsOpen(!isOpen)} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span className="mdi mdi-tune"></span></a>
                <div className={"dropdown-menu dropdown-menu-right item-style" + (isOpen ? ' show' : ' ')}>
                    <div className="" style={{width: "280px"}}>                        
                        <ul className="nav flex-column fliter-option">
                            <li>
                                <FollowCategory 
                                    changeFollowUpCategory={changeFollowUpCategory} 
                                    followUpCategories={followUpCategories} 
                                    value={followUpCategory}
                                />
                            </li>
                            <li>
                               <Bucket 
                                    followUpEventBuckets = {followUpEventBuckets} 
                                    changeFollowUpEventBuckets={changeFollowUpEventBuckets}
                                    value={selectedBucket}
                                />
                            </li>
                            <li>
                                <Caller callers={callers} />
                             </li>                            
                        </ul>
                    </div>
                </div>
            <a href=""><span className="mdi mdi-filter-outline"></span></a>
        </div>
    )
}

export default Filters
