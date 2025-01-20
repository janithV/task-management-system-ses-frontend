import { combineReducers } from "redux";
import backdropReducer from "./backdrop/backdrop.reducer";
import notificationReducer from "./notification/notification.reducer";
import authReducer from "./auth/auth.reducer";
import taskReducer from "./task/task.reducer";


const rootReducer = combineReducers({
    backdrop: backdropReducer,
    notification: notificationReducer,
    auth: authReducer,
    task: taskReducer
});

export default rootReducer;