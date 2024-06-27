import axios from 'axios';
import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { baseURL } from 'src/constant/apiConfig';

import VisaCard from '../visa-card';
import CertifCard from '../Certificat-card';
import StaffCard from '../staffDetails-card';

export default function StaffDetailsView() {
    const [staffDetails, setStaffDetails] = useState([]);
    const [staffCertifications, setStaffCertifications] = useState([]);
    const [visa, setVisa] = useState([]);
    const [openVisaDialog, setOpenVisaDialog] = useState(false);
    const [openCertifDialog, setOpenCertifDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [visaDate, setVisaDate] = useState('');
    const [certifName, setCertifName] = useState('');

    const { keycloak } = useKeycloak();

    const fetchCertifForadd = async () => {
        try {
            const response = await axios.get(`${baseURL}/Staff-Certification/affichage`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setStaffCertifications(response.data);
        } catch (error) {
            console.error('Error fetching staff certifications:', error);
        }
    };

    const fetchVisaforadd = async () => {
        try {
            const response = await axios.get(`${baseURL}/visa/affichage`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setVisa(response.data);
            console.log("aza   ")
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching visas:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/Staff-Projet/affichage`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setStaffDetails(response.data);
            } catch (error) {
                console.error('Error fetching staff details:', error);
            }
        };

        const fetchData1 = async () => {
            try {
                const response = await axios.get(`${baseURL}/Staff-Certification/affichage`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setStaffCertifications(response.data);
            } catch (error) {
                console.error('Error fetching staff certifications:', error);
            }
        };

        const fetchVisa = async () => {
            try {
                const response = await axios.get(`${baseURL}/visa/affichage`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setVisa(response.data);
                console.log("aza   ")
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching visas:', error);
            }
        };

        fetchVisa();
        fetchData();
        fetchData1();
    }, [keycloak]);

    const handleAddVisa = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/visa/ajouter`,
                { visa: visaDate },
                {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setVisa([...visa, response.data]);
            setOpenVisaDialog(false);
            fetchVisaforadd();
        } catch (error) {
            console.error('Error adding visa:', error);
        }
    };

    const handleAddCertification = async () => {
        try {
            const response = await axios.post(
                `${baseURL}/Staff-Certification/ajouter`,
                { certification: certifName },
                {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            setStaffCertifications([...staffCertifications, response.data]);
            fetchCertifForadd();
            setOpenCertifDialog(false);
        } catch (error) {
            console.error('Error adding certification:', error);
        }
    };

    const handleDeleteVisa = async (visaId) => {
        try {
            await axios.delete(`${baseURL}/visa/delete/${visaId}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setVisa(visa.filter(v => v.id !== visaId));
            fetchVisaforadd();
        } catch (error) {
            console.error('Error deleting visa:', error);
        }
    };
    const handleDeleteCertif = async (certifId) => {
        try {
            await axios.delete(`${baseURL}/Staff-Certification/delete/${certifId}`, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            setStaffCertifications(staffCertifications.filter(c => c.id !== certifId));
            fetchCertifForadd();
        } catch (error) {
            console.error('Error deleting certif:', error);
        }
    };

    

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Visa</Typography>
                <Button variant="contained" color="info" onClick={() => setOpenVisaDialog(true)}>
                    Add VISA
                </Button>
            </Stack>

            <Grid container spacing={3}>
                {visa.length === 0 ? (
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" align='center'>
                            You don t have a visa yet
                        </Typography>
                    </Grid>
                ) : (
                    visa.map((v, index) => (
                        <VisaCard
                            key={v.id}
                            visaa={v}
                            index={index}
                            onDelete={handleDeleteVisa}
                        />
                    ))
                )}
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                <Typography variant="h4">Certifications</Typography>
                <Button variant="contained" color="info" onClick={() => setOpenCertifDialog(true)}>
                    Add Certification
                </Button>
            </Stack>

            <Grid container spacing={3}>
                {staffCertifications.map((certif, index) => (
                    <CertifCard
                     key={certif.id} 
                     certif={certif} 
                     index={index}
                    onDelete={handleDeleteCertif} /> 
                ))}
            </Grid>

            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                <Typography variant="h4">Projects</Typography>
            </Stack>

            <Grid container spacing={3}>
                {staffDetails.map((staff, index) => (
                    <StaffCard key={staff.id} staff={staff} index={index} />
                ))}
            </Grid>

            <Dialog open={openVisaDialog} onClose={() => setOpenVisaDialog(false)}>
                <DialogTitle>Add Visa</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Visa Date"
                        type="date"
                        fullWidth
                        value={visaDate}
                        onChange={(e) => setVisaDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenVisaDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddVisa}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openCertifDialog} onClose={() => setOpenCertifDialog(false)}>
                <DialogTitle>Add Certification</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Certification Name"
                        type="text"
                        fullWidth
                        value={certifName}
                        onChange={(e) => setCertifName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCertifDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddCertification}>Add</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Delete Visa</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this visa date?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteVisa}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
