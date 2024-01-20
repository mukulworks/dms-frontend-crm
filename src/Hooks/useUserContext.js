import { useSelector } from 'react-redux';
const useUserContext = () => {
    
    const { userDetail, isuserOptionNavOpen } = useSelector((state) => {
        let userId
        if(state.user.userDetail && state.user.userDetail.userContext)
            userId = state.user.userDetail.userContext.userId

        return {
            userDetail: state.user.userDetail,
            userId: userId,
            isuserOptionNavOpen: state.user.isuserOptionNavOpen
        };
    });

    return { userDetail, isuserOptionNavOpen };
}

export default useUserContext;