import React from 'react'

const FollowCategory = ({followUpCategories, changeFollowUpCategory, followUpCategory}) => {

    return (
        <div>
            {/* <li>FollowUp Categories
                <select 
                    value={followUpCategory}
                    onChange={(e) => changeFollowUpCategory(e)}
                >
                    <option>--Choose Description--</option>
                    {followUpCategories.map((category)=>
                        <option key={category.code}>{category.filterCategories}</option>
                    )}
                </select>   
            </li> */}

            <li>FollowUp Categories
                <div className="filter-content">
                    <ul className="nav flex-column">
                        {followUpCategories.map((category)=>
                            <li key={category.code}>{category.filterCategories}</li>
                        )}
                    </ul>
                </div>
            </li>
        </div>

        
    )
}

export default FollowCategory
