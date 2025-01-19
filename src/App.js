import { Provider } from 'react-redux';
import store from './redux/store/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/router';
import { USER_SESSION_KEY } from './configs/definitions';
import { isEmptyObj } from './utils/functions';
import { setLoginData } from './redux/actions/auth/auth.actions';

function App() {

  let userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
  if (!isEmptyObj(userData)) {
    let loginData = { userData };
    store.dispatch(setLoginData(loginData, true));
  }

  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

  );
}

export default App;
