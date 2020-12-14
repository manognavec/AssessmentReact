import { USER_DETAILS, PROJECT_DETAILS, PROJECT_DATA, TASK_DETAILS } from '../Actions';

const initialState = {
    userData: [],
    projectData: [],
    project: [],
    taskData: []
}
const Reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_DETAILS: 
            return {...state, userData: action.data};
        case PROJECT_DETAILS: 
            return {...state, projectData: action.data};
        case PROJECT_DATA:
            return {...state, project: action.data};
        case TASK_DETAILS:
            return {...state, taskData: action.data};
        default:
            return state;
    }
}

export default Reducer;