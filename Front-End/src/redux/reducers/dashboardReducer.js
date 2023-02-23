const initialState = {
    dashboardData: []
};

const DashboardReducer = (state = initialState, action) => {
    const { type, payload, token } = action;

    switch (type) {
        case 'DASHBOARD_DATA':
            return {
                ...state,
                dashboardData: payload
            };
        default:
            return state;
    }
};

export default DashboardReducer;
