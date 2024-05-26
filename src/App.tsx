import React from 'react';
import { Routes, Route } from 'react-router-dom';

// layout
import { MainLayout } from './layouts/main-layout';
// import { TonyLayout } from './layouts/tony-layout';

// pages
import { Dashboard } from './pages/dashboard';
import { Product } from './pages/product';
import { ProductDetail } from './pages/product/product-detail';
import { Login } from './pages/login';

// guards
import { AuthGuard, GuestGuard } from './guards';

// configs
import { PAGE_URL } from './config/page-url';

const App: React.FC = () => {
  // dynamic layout
  // const me = 'tony@gmail.com'
  // let layout = null;
  // if(me.includes('gmail.com')) {
  //   layout = MainLayout
  // }
  
  const routes = [
    {
      title: 'dashboard',
      path: PAGE_URL.ROOT,
      layout: MainLayout,
      component: Dashboard,
      guard: AuthGuard
    },
    {
      title: 'product',
      path: PAGE_URL.PRODUCT,
      layout: MainLayout,
      component: Product,
      guard: AuthGuard
    },
    {
      title: 'product-detail',
      path: PAGE_URL.PRODUCT_DETAIL + '/:id',
      layout: MainLayout,
      component: ProductDetail,
      guard: AuthGuard
    },
    {
      title: 'login',
      path: PAGE_URL.LOGIN,
      layout: null,
      component: Login,
      guard: GuestGuard
    },
    
  ]
  return (
    <Routes>
      {routes.map(route => {
        const Layout = route?.layout || React.Fragment;
        const Component = route?.component || React.Fragment;
        const Guard = route?.guard || React.Fragment;
        return (
          <Route 
            key={route.path}
            path={route.path} 
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            } 
          />
        )
      })}
    </Routes>
  );
};

export default App;