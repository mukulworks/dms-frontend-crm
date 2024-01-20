import React from 'react'
import StarRatingComponent from 'react-star-rating-component';

const Star = ({ratingValue, starCount}) => {

    return (
        <div>
            <StarRatingComponent 
                name="rate2" 
                editing={false}
                starCount={starCount}
                value={ratingValue} 
                starColor={'red'}
            />
        </div>
    )
}

export default Star
