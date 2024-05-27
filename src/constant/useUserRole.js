import axios from 'axios';
import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import { baseURL } from './apiConfig';

const useUserRole = () => {
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
                    console.log(response.data)
                    localStorage.setItem('userRole', response.data);
                })
                .catch((error) => {
                    console.error('Failed to fetch user role:', error);
                });
        }
    }, [keycloak]);

    return role;
};

export default useUserRole;
