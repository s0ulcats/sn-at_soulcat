import React from 'react';
import ReactDOM from 'react-dom/client';
import SoulJsApp from './App.tsx';
import './index.scss';
import store, { AppStateType } from './redux/reduxStore.ts';

let rerenderEntireTree = (state: AppStateType): void => {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
        <SoulJsApp />
    );
}

rerenderEntireTree(store.getState());
