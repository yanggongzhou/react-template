import React from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from "antd";
import reportWebVitals from './reportWebVitals';
import RouterView from "./routes";
import { store } from '@/store';
import { Provider } from "react-redux";
import 'normalize.css'; // 是一种CSS reset的替代方案
import './index.css';

const root = createRoot(document.getElementById('root') as HTMLElement);
// React.StrictMode 严格模式; 在严格模式下会执行两次render以帮忙检查额外的副作用。
// 这仅适用于开发模式。生产模式下生命周期不会被调用两次。
// Learn more: https://zh-hans.reactjs.org/docs/strict-mode.html
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <RouterView/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
