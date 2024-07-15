import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';
import { baseURL } from 'src/constant/apiConfig';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import getNavConfig from './config-navigation';

import { NAV } from './config-layout';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
    const pathname = usePathname();
    const upLg = useResponsive('up', 'lg');
    const { keycloak } = useKeycloak();
    const [navConfig, setNavConfig] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(`${baseURL}/users`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            const response1 = axios.get(`${baseURL}/users/user-role`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                    },
                })
                .then((resp) => {
                   
                    console.log(resp.data)
                    const userRole = resp.data;
                    const newNavConfig = getNavConfig(userRole);
                    setNavConfig(newNavConfig);
                })
                .catch((error) => {
                    console.error('Failed to fetch user role:', error);
                }); 
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
             
            
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }, [keycloak.token]);

    useEffect(() => {
        if (keycloak.token) {
            fetchUserData();
        }

        if (openNav) {
            onCloseNav();
        }
    }, [pathname, openNav, onCloseNav, keycloak.token, fetchUserData]);

    const renderAccount = (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
        >
            <Avatar src={account.photoURL} alt="photoURL" />
            <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{firstName} {lastName}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {account.role}
                </Typography>
            </Box>
        </Box>
    );

    const renderMenu = (
        <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
            {navConfig.map((item) => (
                <NavItem key={item.title} item={item} />
            ))}
        </Stack>
    );

    const renderContent = (
        <Scrollbar
            sx={{
                height: 1,
                '& .simplebar-content': {
                    height: 1,
                    display: 'flex',
                    flexDirection: 'column',
                },
            }}
        >
            <Logo sx={{ mt: 3, ml: 4 }} />
            {renderAccount}
            {renderMenu}
            <Box sx={{ flexGrow: 1 }} />
        </Scrollbar>
    );

    return (
        <Box sx={{ flexShrink: { lg: 0 }, width: { lg: NAV.WIDTH } }}>
            {upLg ? (
                <Box
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.WIDTH,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Box>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.WIDTH,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}

Nav.propTypes = {
    openNav: PropTypes.bool,
    onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
    const pathname = usePathname();
    const active = item.path === pathname;

    return (
        <ListItemButton
            component={RouterLink}
            href={item.path}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...(active && {
                    color: 'primary.main',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
                {item.icon}
            </Box>
            <Box component="span">{item.title}</Box>
        </ListItemButton>
    );
}

NavItem.propTypes = {
    item: PropTypes.object,
};