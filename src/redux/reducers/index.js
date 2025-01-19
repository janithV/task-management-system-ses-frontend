import { combineReducers } from "redux";
import backdropReducer from "./backdrop/backdrop.reducer";
import notificationReducer from "./notification/notification.reducer";
import authReducer from "./auth/auth.reducer";


const rootReducer = combineReducers({
    backdrop: backdropReducer,
    notification: notificationReducer,
    auth: authReducer,
});

export default rootReducer;