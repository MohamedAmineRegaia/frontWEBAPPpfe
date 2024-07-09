import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Paper, Table, TableRow, TableCell,
     TableContainer, Typography, CircularProgress, 
     TableHead, TableBody, Button, TextField, MenuItem, Dialog, 
     DialogActions, DialogContent, DialogContentText, 
     DialogTitle, useMediaQuery, useTheme,Grid
} from '@mui/material';
import { baseURL } from 'src/constant/apiConfig';

function StaffingPage() {
    const { id } = useParams();
    const { keycloak } = useKeycloak();
    const [propale, setPropale] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [userToUnassign, setUserToUnassign] = useState(null);
    const [staffCertifications, setStaffCertifications] = useState([]);
    const [StaffVisa, setStaffVisa] = useState([]);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));



    useEffect(() => {
        const fetchPropale = async () => {
            try {
                const response = await axios.get(`${baseURL}/propale/${id}`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setPropale(response.data);

            } catch (error) {
                console.error('Error fetching propale:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${baseURL}/users/all`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchPropale();
        fetchUsers();
    }, [id, keycloak.token]);

    const handleAssignUser = async () => {

        const userId = selectedUser;
        const projectTitle = propale.propaleName;
        const projectStartDate = new Date(propale.submissionDate);
        const projectEndDate = new Date(propale.submissionDate) ; // Vous pouvez remplacer cette valeur par la date réelle

        const body = {
            userId,
            projectTitle,
            projectStartDate,
            projectEndDate
        };
        try {
            await axios.post(`${baseURL}/propale/${id}/assign-user/${selectedUser}`, {}, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
       
            const response2 = await axios.post(`${baseURL}/Staff-Projet/affecter`, body, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }

                });
                console.log(response2.data)
            const response = await axios.get(`${baseURL}/propale/${id}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setPropale(response.data);
            setSelectedUser('');
        } catch (error) {
            console.error('Error assigning user:', error);
        }
    };

    const handleUnassignUser = (userId) => {
        setUserToUnassign(userId);
        setConfirmOpen(true);
    };

    const confirmUnassignUser = async () => {
        try {
            await axios.delete(`${baseURL}/propale/${id}/unassign-user/${userToUnassign}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            // Re-fetch propale to update the list of assigned users
            const response = await axios.get(`${baseURL}/propale/${id}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setPropale(response.data);
            setConfirmOpen(false);
        } catch (error) {
            console.error('Error unassigning user:', error);
        }
    };

    const handleUserSelect = async (userId) => {
        setSelectedUser(userId);
        try {
            const response = await axios.get(`${baseURL}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setUserDetails(response.data)


            const response2 = await axios.get(`${baseURL}/Staff-Certification/affichage/${userId}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setStaffCertifications(response2.data);
            

            const response3 = await axios.get(`${baseURL}/visa/affichage-visa/${userId}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            console.log(response3.data)
            console.log(userId)
            if (Array.isArray(response3.data)) {
                setStaffVisa(response3.data);
            } else {
                setStaffVisa([]); // Si la réponse n'est pas un tableau, initialisez avec un tableau vide
            }

           
            setOpen(true);





        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setConfirmOpen(false);
    };

    if (!propale) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </div>
        );
    }
     
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const dateParts = dateString.split(' ');
        const day = dateParts[2];
        const month = dateParts[1]; // Les mois en JS sont de 0 à 11
        const year = dateParts[5];
        return `${day}-${month}-${year}`;
    };
    const availableUsers = users.filter(user => !propale.projectAssignments.some(assignment => assignment.userId === user.id));

    return (
        <Paper style={{ padding: 20, margin: 20 }}>
            <Typography variant="h4" gutterBottom>
                Project details
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Field</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                            <TableCell><strong>Field</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                            <TableCell><strong>Field</strong></TableCell>
                            <TableCell><strong>Value</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Nom de Propale</TableCell>
                            <TableCell>{propale.propaleName}</TableCell>
                            <TableCell>Organisation</TableCell>
                            <TableCell>{propale.companyOrg}</TableCell>
                            <TableCell>Type de Compte</TableCell>
                            <TableCell>{propale.accountType}</TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>Statut</TableCell>
                            <TableCell>{propale.status}</TableCell>
                            <TableCell>Bid Manager</TableCell>
                            <TableCell>{propale.bidManager}</TableCell>
                            <TableCell>Practice</TableCell>
                            <TableCell>{propale.practice}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date de Soumission</TableCell>
                            <TableCell>{new Date(propale.submissionDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                        {/* Ajoutez d'autres Fields ici si nécessaire */}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
                Affected users
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Assignment date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {propale.projectAssignments && propale.projectAssignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                                <TableCell>{assignment.username}</TableCell>
                                <TableCell>{new Date(assignment.assignmentDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="warning" onClick={() => handleUnassignUser(assignment.userId)}>
                                        Désassigner
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant="h5" gutterBottom style={{ marginTop: 20 }}>
                Assigner un utilisateur
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    select
                    label="Utilisateur"
                    value={selectedUser}
                    onChange={(e) => handleUserSelect(e.target.value)}
                    style={{ marginRight: '10px' }}
                    fullWidth
                >
                    {availableUsers.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.username}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="primary" onClick={handleAssignUser}>
                    Assigner
                </Button>
            </div>

            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} maxWidth="sm" fullWidth >
                <DialogTitle>User Details</DialogTitle>
                <DialogContent>
                    {userDetails ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                               
                                <DialogContentText color="black"> <strong>First Name: </strong>{userDetails.firstName}</DialogContentText>
                             </Grid>

                            <Grid item xs={12} sm={6}>
                                <DialogContentText color="black"> <strong> Last Name:</strong>  {userDetails.lastName}</DialogContentText>
                             </Grid>
                              <Grid item xs={12} sm={6}>
                                <DialogContentText color="black"> <strong>Email:</strong> {userDetails.email}</DialogContentText>
                             </Grid>
                            <Grid item xs={12} sm={6}>
                                <DialogContentText color="black">  <strong> Job: </strong>  {userDetails.attributes?.profession?.[0]}</DialogContentText>
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <DialogContentText color="black"> <strong>Certifications:</strong>  {staffCertifications.map(cert => cert.certification).join(', ')}</DialogContentText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DialogContentText color="black"> <strong>Visa end date:</strong>  {StaffVisa.map(visa => visa.visa).join(', ')}</DialogContentText>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <DialogContentText color="black">  <strong> availability:</strong>  {userDetails.attributes?.disponibilite?.[0]}</DialogContentText>
                            </Grid>
                             <Grid item xs={12} sm={6}>
                                <DialogContentText color="black">  <strong>Project end date:</strong>   {formatDate(userDetails.attributes?.date_fin_projet?.[0])}</DialogContentText>
                            </Grid>
                        </Grid>
                        
                    ) : (
                        <CircularProgress />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={confirmOpen}
                onClose={handleClose}
            >
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to unassign this user?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="error">
                        Cancel
                    </Button>
                    <Button onClick={confirmUnassignUser} color="info">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default StaffingPage;
