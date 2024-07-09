import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Route, Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const AppView = lazy(() => import('src/pages/app'));
export const AddUserPage = lazy(() => import('src/pages/Add-user'));
export const StaffDetailsViewPage = lazy(()=> import('src/pages/staffDetails'));
export const PropalePage = lazy(() => import('src/pages/propale'));
export const AddPropalePage = lazy(() => import('src/pages/addPropale'));
export const HistoriqueList = lazy(() => import('src/pages/historique'));
export const ManagerPropale = lazy(() => import('src/pages/propaleManager') )
export const StaffingViewPage = lazy(() => import('src/pages/StaffingPage'))






export const PrivateRoute = ({ element, ...rest }) => {
  const { keycloak } = useKeycloak();
  if (keycloak.authenticated) {
    
    return <Route {...rest} element={element} />;
  }
  return <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'dashboard', element: <AppView /> },
        { path: 'adduser', element: <AddUserPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'StaffDetailsViewPage', element: <StaffDetailsViewPage /> },
        { path: 'PropalePage', element: <PropalePage /> },
        { path: 'AddPropalePage', element: <AddPropalePage /> },
        { path: 'HistoriqueList', element: <HistoriqueList /> },
        { path: 'ManagerPropale', element: <ManagerPropale /> },
        { path: '/staffing/:id', element: <StaffingViewPage /> },






      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
