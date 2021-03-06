import { Component, lazy } from 'solid-js';
import { useLoading, useRoutes, Router } from 'solidjs-sense-router';
import './App.scss';
import { Nav } from './components/nav';
import { bases } from './constant';
import { IpadPointer } from '../../src';

const routes = [
  {
    path: '/',
    component: lazy(async () => import('./pages/home')),
  },
  {
    path: '/usage',
    component: lazy(() => import('./pages/usage')),
  },
];

const App: Component = () => {
  const Routes = useRoutes(routes);
  const loading = useLoading();

  return (
    <div class="app">
      <Nav />
      <div
        class="loading"
        classList={{
          start: loading(),
          done: !loading(),
        }}
      ></div>
      <Routes />
      <IpadPointer hideOriginCursor />
    </div>
  );
};

export default () => {
  const url = new URL(window.location.href);
  const currentBase =
    bases.find((p) => url.pathname.startsWith(p)) ||
    ((navigator.language || navigator.languages[0]).startsWith('zh') ? bases[0] : bases[1]);

  if (/\/solidjs-sense-ipad-pointer\/?$/.test(url.pathname)) {
    history.replaceState(history.state, document.title, currentBase);
  }

  return (
    <Router defaultBase={currentBase}>
      <App />
    </Router>
  );
};
