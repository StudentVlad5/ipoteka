import './index.scss'
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { StrictMode } from 'react';
import { router } from "./routing";
import {Provider} from "react-redux";
import {store} from "./store/ReduxStore";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router}/>
      </Provider>
  </StrictMode>
);
