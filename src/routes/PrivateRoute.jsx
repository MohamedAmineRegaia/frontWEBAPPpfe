import React from 'react';
import PropTypes from 'prop-types'; // Import de PropTypes avant react-router-dom
import { useKeycloak } from '@react-keycloak/web';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, roles, ...rest }) => {
    const { keycloak } = useKeycloak();

    const isAuthenticated = keycloak.authenticated;
    const userRoles = keycloak.tokenParsed?.realm_access?.roles || [];

    const isAuthorized = roles.every(role => userRoles.includes(role));

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!isAuthorized) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Route {...rest} element={element} />;
};

PrivateRoute.propTypes = {
    element: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivateRoute; // Exportez PrivateRoute en tant que défaut

