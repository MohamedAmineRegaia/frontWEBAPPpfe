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

const AddPropaleView = () => {
    const [propaleData, setPropaleData] = useState({
        propaleName: '',
        company_org: '',
        account_Type: '',
        status: '',
        bid_manager: '',
        typeOfRequest: '',
        practice: '',
        primaryVp: '',
        principalVendor: '',
        secondaryVendor: '',
        budget_no_vat: '',
        estimated_value: '',
        lgAmount: '',
        noGoReason: '',
        crp_CRD: '',
        submissionDate: '',
        qa_deadline: ''
    });

    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [resultMessage, setResultMessage] = useState('');
    const { keycloak } = useKeycloak();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropaleData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setConfirmationDialogOpen(true);
    };

    const handleConfirmAddPropale = async () => {
        setConfirmationDialogOpen(false);
        try {
            const response = await axios.post(`${baseURL}/propale/ajouter`, propaleData, {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`
                }
            });
            if (response.status === 201) {
                setResultMessage('Propale added successfully');
            } else {
                setResultMessage('Error adding propale');
            }
            setResultDialogOpen(true);
        } catch (error) {
            setResultMessage('Error adding propale');
            setResultDialogOpen(true);
        }
    };

    const handleCloseResultDialog = () => {
        setResultDialogOpen(false);
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h4" mb={3}>
                Add Propale
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField name="propaleName" label="Propale Name" value={propaleData.propaleName} onChange={handleChange} fullWidth />
                    <TextField name="company_org" label="Company Organization" value={propaleData.company_org} onChange={handleChange} fullWidth />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            name="account_Type"
                            label="Account Type"
                            value={propaleData.account_Type}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['🏆Gold', '🐟Big Fish', '🥈Silver', '✨New'].map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="status"
                            label="Status"
                            value={propaleData.status}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Submitted', 'Accepted', 'Dropped', 'HOLD', 'Won', 'Rebid', 'Lost (Financially)', 'Rejected (Tech. Disq)', 'WIP', 'Go/NoGo'].map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            name="bid_manager"
                            label="Bid Manager"
                            value={propaleData.bid_manager}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Amr Ramadan', 'Akram AlHossainy', 'Ahmad Kamel', 'Waleed AlAbbas', 'Tariq Khasawneh', 'Osama Alraeey', 'Osama AbdelJaber', 'Omar El Matri', 'Mohamed Taha', 'Mohamed Ragab', 'Ibrahim Abdulkareem', 'TBD', 'Tariq Khasawaneh'].map((manager) => (
                                <MenuItem key={manager} value={manager}>
                                    {manager}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="typeOfRequest"
                            label="Type of Request"
                            value={propaleData.typeOfRequest}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['RFP', 'RFI', 'RFQ', 'CR', 'Direct', 'Invitation'].map((requestType) => (
                                <MenuItem key={requestType} value={requestType}>
                                    {requestType}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            name="practice"
                            label="Practice"
                            value={propaleData.practice}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Data Consulting', 'Data Engineering'].map((practice) => (
                                <MenuItem key={practice} value={practice}>
                                    {practice}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="primaryVp"
                            label="Primary VP"
                            value={propaleData.primaryVp}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['Data Strategy', 'D4B', 'Data Foundation', 'All'].map((vp) => (
                                <MenuItem key={vp} value={vp}>
                                    {vp}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <TextField name="principalVendor" label="Principal Vendor" value={propaleData.principalVendor} onChange={handleChange} fullWidth />
                    <TextField name="secondaryVendor" label="Secondary Vendor" value={propaleData.secondaryVendor} onChange={handleChange} fullWidth />
                    <TextField name="budget_no_vat" label="Budget (No VAT)" value={propaleData.budget_no_vat} onChange={handleChange} fullWidth />
                    <TextField name="estimated_value" label="Estimated Value" value={propaleData.estimated_value} onChange={handleChange} fullWidth />
                    <TextField name="lgAmount" label="LG Amount" value={propaleData.lgAmount} onChange={handleChange} fullWidth />
                    <TextField
                        select
                        name="noGoReason"
                        label="No Go Reason"
                        value={propaleData.noGoReason}
                        onChange={handleChange}
                        fullWidth
                    >
                        {['Lack of Insights', 'Technical Partner insights', 'CRP Insights', 'Insufficient Budget', 'Not Aligned With VPs', 'D&I Insights (Competetors, Budget)'].map((reason) => (
                            <MenuItem key={reason} value={reason}>
                                {reason}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField name="noGoDescription" label="no Go Description" value={propaleData.noGoDescription} onChange={handleChange} multiline rows={3}  fullWidth />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <TextField
                            select
                            name="crp_CRD"
                            label="CRP/CRD"
                            value={propaleData.crp_CRD}
                            onChange={handleChange}
                            fullWidth
                        >
                            {['TBD', 'Saif Almari', 'Amr Wassef', 'Aymen Qammaz', 'Osama Ghoul', 'Mohammad Aldahleh', 'Mohammed Obaldat', 'Haithem Elkhairi', 'Ahmed Al Shaikh', 'Deya AlKhatib', 'Fadi Hajar', 'Ashref Alkharouf', 'Anas AlAshraf', 'Bilal Mousa'].map((crp) => (
                                <MenuItem key={crp} value={crp}>
                                    {crp}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField type="date" name="submissionDate" label="Submission Date" value={propaleData.submissionDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
                        <TextField type="date" name="qa_deadline" label="QA Deadline" value={propaleData.qa_deadline} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />
                        <TextField type="date" name="ReviewDate" label="ReviewDate" value={propaleData.ReviewDate} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth />

                    </Stack>
                </Stack>

                <Divider sx={{ my: 3 }} />
                <Button type="submit" variant="contained" color="primary">
                    Add Propale
                </Button>
            </form>

            {/* Confirmation Dialog */}
            <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure to add this propale?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmAddPropale}>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Result Dialog */}
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

export default AddPropaleView;
