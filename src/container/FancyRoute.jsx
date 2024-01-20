import React from 'react'
import PrivateRoute from './privateRoute';
import { NProgress } from '@tanem/react-nprogress'
import 'nprogress/nprogress.css'
import './FancyRoute.css'

class FancyRoute extends React.Component {
    componentWillMount() {
        nprogress.start()
    }

    componentDidMount() {
        nprogress.done()
    }

    render() {
        return (
            <PrivateRoute {...this.props} />
        )
    }
}

export default FancyRoute