import { combineReducers } from "redux";
import backdropReducer from "./backdrop/backdrop.reducer";
import notificationReducer from "./notification/notification.reducer";


const rootReducer = combineReducers({
    backdrop: backdropReducer,
    notification: notificationReducer,
});

export default rootReducer;