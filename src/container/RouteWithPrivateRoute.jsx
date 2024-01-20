import React from 'react'
import PrivateRoute from './privateRoute'

const RouteWithPrivateRoute = ({ route, routeKey, isAnimating }) => {
    return (
        <PrivateRoute 
            exact
            routeKey={routeKey}
            isAnimating={isAnimating}
            path={route.path}
            component={route.component}
        />
    )
}

export default RouteWithPrivateRoute
