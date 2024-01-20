import { useRouteMatch, useParams } from 'react-router-dom'

const useGetUrl = () => {
    const { url, path } = useRouteMatch()
    const { caseUniqueId } = useParams()

    return {
        url: url,
        caseUniqueId: caseUniqueId
    }
}

export default useGetUrl
