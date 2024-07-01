import axios from 'axios'; // Import axios
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import { Button, Select, MenuItem , TableRow, TableCell, TextField  } from '@mui/material';

import { baseURL } from 'src/constant/apiConfig';


function UserTableRow(props) {
    const { propale } = props;
    const [editable, setEditable] = useState(false);
    const [editedPropale, setEditedPropale] = useState(propale);
    const { keycloak } = useKeycloak(); 

    const handleEditClick = () => {
        setEditable(!editable);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedPropale({ ...editedPropale, [name]: value });
    };

    

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`${baseURL}/propale/update/${editedPropale.id}`, editedPropale, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${keycloak.token}` 
                }
            });
            console.log('Data updated:', response.data);
            setEditable(false);
        } catch (error) {
            console.error('Error updating data:', error);
        }
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
                    <Select name="account_Type" value={editedPropale.account_Type} onChange={handleChange} fullWidth>
                        {['🏆Gold', '🐟Big Fish', '🥈Silver', '✨New'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.account_Type
                )}
            </TableCell>
            <TableCell sx={getStatusStyle(propale.status)}>
                {editable ? (
                    <Select name="status" value={editedPropale.status} onChange={handleChange} fullWidth>
                        {['Submitted', 'Accepted', 'Dropped', 'HOLD', 'Won', 'Rebid', 'Lost (Financially)', 'Rejected (Tech. Disq)', 'WIP', 'Go/NoGo'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.status
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Select name="bid_manager" value={editedPropale.bid_manager} onChange={handleChange} fullWidth>
                        {['Amr Ramadan', 'Akram AlHossainy', 'Ahmad Kamel', 'Waleed AlAbbas', 'Tariq Khasawneh', 'Osama Alraeey', 'Osama AbdelJaber', 'Omar El Matri', 'Mohamed Taha', 'Mohamed Ragab', 'Ibrahim Abdulkareem', 'TBD', 'Tariq Khasawaneh'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.bid_manager
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Select name="typeOfRequest" value={editedPropale.typeOfRequest} onChange={handleChange} fullWidth>
                        {['RFP', 'RFI', 'RFQ', 'CR', 'Direct', 'Invitation'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.typeOfRequest
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Select name="practice" value={editedPropale.practice} onChange={handleChange} fullWidth>
                        {['Data Consulting', 'Data Engineering'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.practice
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Select name="practice" value={editedPropale.practice} onChange={handleChange} fullWidth>
                        {['Data Strategy', 'D4B', 'Data Foundation', 'All'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
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
                     <TextField
                        select
                        name="noGoReason"
                        value={editedPropale.noGoReason}
                        onChange={handleChange}
                        fullWidth
                    >
                        {['Lack of Insights', 'Technical Partner insights', 'CRP Insights', 'Insufficient Budget', 'Not Aligned With VPs', 'D&I Insights (Competetors, Budget)'].map((reason) => (
                            <MenuItem key={reason} value={reason}>
                                {reason}
                            </MenuItem>
                        ))}
                    </TextField>
                ) : (
                    propale.noGoReason
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <Select name="crp_CRD" value={editedPropale.crp_CRD} onChange={handleChange} fullWidth>
                        {['TBD', 'Saif Almari', 'Amr Wassef', 'Aymen Qammaz', 'Osama Ghoul', 'Mohammad Aldahleh', 'Mohammed Obaldat', 'Haithem Elkhairi', 'Ahmed Al Shaikh', 'Deya AlKhatib', 'Fadi Hajar', 'Ashref Alkharouf', 'Anas AlAshraf', 'Bilal Mousa'].map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    propale.crp_CRD
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField type="date" name="submissionDate" value={editedPropale.submissionDate} onChange={handleChange} fullWidth />
                ) : (
                    propale.submissionDate
                )}
            </TableCell>
            <TableCell>
                {editable ? (
                    <TextField type="date" name="qa_deadline" value={editedPropale.qa_deadline} onChange={handleChange} fullWidth />
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
