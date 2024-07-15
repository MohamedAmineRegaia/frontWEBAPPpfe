import axios from 'axios';
import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { baseURL } from 'src/constant/apiConfig';




const generateRandomPassword = (length = 12) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i+= 1) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};


const AddUserView = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: generateRandomPassword(),
        disponibilite: '',
        profession: ''
    });

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const { keycloak } = useKeycloak();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConfirmationDialogOpen(true);
    };

    const handleConfirmAddUser = async () => {
        setConfirmationDialogOpen(false);
        try {
            const response = await axios.post(`${baseURL}/users/add-user`, userData, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
             console.log (response.data)
            if (response.data === "user add successfully") {
                setResultMessage('User added successfully');
            } else {
                setResultMessage('Error adding user');
            }
            setResultDialogOpen(true);
        } catch (error) {
            setResultMessage('Error adding user');
            setResultDialogOpen(true);
        }
    };


    const handleCloseResultDialog = () => {
        setResultDialogOpen(false);
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h4" mb={3}>
                Add user
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField name="username" label="UserName" value={userData.username} onChange={handleChange} fullWidth />
                        <TextField name="firstName" label="FirstName" value={userData.firstName} onChange={handleChange} fullWidth />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField name="lastName" label="LastName" value={userData.lastName} onChange={handleChange} fullWidth />
                        <TextField name="email" label="Email" type="email" value={userData.email} onChange={handleChange} fullWidth />
                    </Stack>
                  
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            name="disponibilite"
                            label="Disponibilité"
                            value={userData.disponibilite}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Disponible', 'Non disponible'].map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="profession"
                            label="Job"
                            value={userData.profession}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Data Engineer ', 'data scientist','data consultant'].map((profession) => (
                                <MenuItem key={profession} value={profession}>
                                    {profession}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
              
                </Stack>
                
                <Divider sx={{ my: 3 }} />
                <Button type="submit" variant="contained" color="primary">
                    Ajouter le patient
                </Button>
            </form>

            {/* Dialog de confirmation */}
            <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure to add {userData.firstName} {userData.lastName}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmAddUser}>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de résultat */}
            <Dialog open={resultDialogOpen} onClose={handleCloseResultDialog}>
                <DialogTitle>{resultMessage}</DialogTitle>
                <DialogContent>
                    <Typography>{resultMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseResultDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};

export default AddUserView;
