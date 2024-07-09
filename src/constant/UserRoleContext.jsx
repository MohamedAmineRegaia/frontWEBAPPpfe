// src/constant/UserRoleContext.jsx
import axios from 'axios';
import PropTypes from 'prop-types';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect, useContext, createContext } from 'react';

import { baseURL } from './apiConfig';

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
    const { keycloak } = useKeycloak();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (keycloak?.token) {
            axios
                .get(`${baseURL}/users/user-role`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                })
                .then((response) => {
                    setRole(response.data);
                    console.log('User role:', response.data); 
                })
                .catch((error) => {
                    console.error('Failed to fetch user role:', error);
                });
        }
    }, [keycloak]);

    return (
        <UserRoleContext.Provider value={role}>
            {children}
        </UserRoleContext.Provider>
    );
};

UserRoleProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useUserRole = () => useContext(UserRoleContext);
