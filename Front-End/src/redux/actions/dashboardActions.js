import ApiUtils from '../../helpers/APIUtils';

const api = new ApiUtils();

export const storeDashboardData = () => async (dispatch) => {
    try {

        const res = await api.getDashboard();

        dispatch({
            type: 'DASHBOARD_DATA',
            payload: res.data,
        });

        return true;
    } catch (err) {
        return false;
    }
};

