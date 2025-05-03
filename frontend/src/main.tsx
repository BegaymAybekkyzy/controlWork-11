import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./app/store.ts";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);
