import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Button, TableRow, TableCell,  TextField } from '@mui/material';

function UserTableRow(props) {
    const { propale } = props;
    const [editable, setEditable] = useState(false);
    const [editedPropale, setEditedPropale] = useState(propale);

    const handleEditClick = () => {
        setEditable(!editable);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPropale({ ...editedPropale, [name]: value });
    };

    const handleSaveClick = () => {
        fetch(`/propale/update/${editedPropale.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedPropale),
        })
            .then(response => response.json())
            .then(data => {
                setEditable(false);
            })
            .catch(error => console.error('Error updating data:', error));
    };
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Won':
                return { backgroundColor: '#d4edda', color: '#155724', border: '1px solid #155724' };
            case 'Dropped':
                return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #721c24' };
            case 'HOLD':
                return { backgroundColor: '#939597', color: '#ECF8F6', border: '1px solid #721c24' };
            case 'Submitted':
                return { backgroundColor: '#137C8B', color: '#ECF8F6', border: '1px solid #721c24' };
            case 'Lost (Financially)':
                return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #721c24' };
            case 'Rejected (Tech. Disq)':
                return { backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #721c24' };
            case 'Accepted':
                return { backgroundColor: '#E3CD8B', color: '#392E2C', border: '1px solid #721c24' };
            default:
                return {};
        }
    };

    return (
        <TableRow>
            <TableCell>
                {editable ? (
                    <TextField name="propaleName" value={editedPropale.propaleName} onChange={handleChange} fullWidth />
                ) : (
                    propale.propaleName
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="company_org" value={editedPropale.company_org} onChange={handleChange} fullWidth />
                ) : (
                    propale.company_org
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="account_Type" value={editedPropale.account_Type} onChange={handleChange} fullWidth />
                ) : (
                    propale.account_Type
                )}
            </TableCell>
            <TableCell sx={getStatusStyle(propale.status)}>
                {editable ? (
                    <TextField name="status" value={editedPropale.status} onChange={handleChange} fullWidth />
                ) : (
                    propale.status
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="bid_manager" value={editedPropale.bid_manager} onChange={handleChange} fullWidth />
                ) : (
                    propale.bid_manager
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="typeOfRequest" value={editedPropale.typeOfRequest} onChange={handleChange} fullWidth />
                ) : (
                    propale.typeOfRequest
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="practice" value={editedPropale.practice} onChange={handleChange} fullWidth />
                ) : (
                    propale.practice
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="primaryVp" value={editedPropale.primaryVp} onChange={handleChange} fullWidth />
                ) : (
                    propale.primaryVp
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="principalVendor" value={editedPropale.principalVendor} onChange={handleChange} fullWidth />
                ) : (
                    propale.principalVendor
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="secondaryVendor" value={editedPropale.secondaryVendor} onChange={handleChange} fullWidth />
                ) : (
                    propale.secondaryVendor
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="budget_no_vat" value={editedPropale.budget_no_vat} onChange={handleChange} fullWidth />
                ) : (
                    propale.budget_no_vat
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="estimated_value" value={editedPropale.estimated_value} onChange={handleChange} fullWidth />
                ) : (
                    propale.estimated_value
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="lgAmount" value={editedPropale.lgAmount} onChange={handleChange} fullWidth />
                ) : (
                    propale.lgAmount
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="noGoReason" value={editedPropale.noGoReason} onChange={handleChange} fullWidth />
                ) : (
                    propale.noGoReason
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="crp_CRD" value={editedPropale.crp_CRD} onChange={handleChange} fullWidth />
                ) : (
                    propale.crp_CRD
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="submissionDate" value={editedPropale.submissionDate} onChange={handleChange} fullWidth />
                ) : (
                    propale.submissionDate
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField name="qa_deadline" value={editedPropale.qa_deadline} onChange={handleChange} fullWidth />
                ) : (
                    propale.qa_deadline
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
                ) : (
                    <Button variant="contained" color="secondary" onClick={handleEditClick}>Edit</Button>
                )}
            </TableCell>
        </TableRow>
    );
}

UserTableRow.propTypes = {
    propale: PropTypes.shape({
        id: PropTypes.number.isRequired,
        propaleName: PropTypes.string.isRequired,
        company_org: PropTypes.string.isRequired,
        account_Type: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        bid_manager: PropTypes.string.isRequired,
        typeOfRequest: PropTypes.string.isRequired,
        practice: PropTypes.string.isRequired,
        primaryVp: PropTypes.string,
        principalVendor: PropTypes.string.isRequired,
        secondaryVendor: PropTypes.string,
        budget_no_vat: PropTypes.string.isRequired,
        estimated_value: PropTypes.string.isRequired,
        lgAmount: PropTypes.string.isRequired,
        noGoReason: PropTypes.string,
        crp_CRD: PropTypes.string.isRequired,
        submissionDate: PropTypes.string.isRequired,
        qa_deadline: PropTypes.string,
    }).isRequired,
};

export default UserTableRow;
