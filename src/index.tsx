import React from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from "antd";
import reportWebVitals from './reportWebVitals';
import RouterView from "./routes";
import { store } from '@/store';
import { Provider } from "react-redux";
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterView/>
        {/*<App></App>*/}
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
