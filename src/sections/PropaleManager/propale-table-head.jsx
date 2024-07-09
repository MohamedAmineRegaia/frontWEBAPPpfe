import React from 'react';
import PropTypes from 'prop-types';

import { TableRow, TableHead, TableCell, TableSortLabel } from '@mui/material';

function UserTableHead(props) {
    const { order, orderBy, onRequestSort, editable } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ minWidth: 550, padding: '16px 24px' }} sortDirection={orderBy === 'propaleName' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'propaleName'}
                        direction={orderBy === 'propaleName' ? order : 'asc'}
                        onClick={createSortHandler('propaleName')}
                    >
                        Nom de Propale
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'company_org' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'company_org'}
                        direction={orderBy === 'company_org' ? order : 'asc'}
                        onClick={createSortHandler('company_org')}
                    >
                        Organisation
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'account_Type' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'account_Type'}
                        direction={orderBy === 'account_Type' ? order : 'asc'}
                        onClick={createSortHandler('account_Type')}
                    >
                        Type de Compte
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'status' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'status'}
                        direction={orderBy === 'status' ? order : 'asc'}
                        onClick={createSortHandler('status')}
                    >
                        Statut
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'bid_manager' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'bid_manager'}
                        direction={orderBy === 'bid_manager' ? order : 'asc'}
                        onClick={createSortHandler('bid_manager')}
                    >
                        Bid Manager
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'practice' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'practice'}
                        direction={orderBy === 'practice' ? order : 'asc'}
                        onClick={createSortHandler('practice')}
                    >
                        Practice
                    </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === 'submissionDate' ? order : false}>
                    <TableSortLabel
                        active={orderBy === 'submissionDate'}
                        direction={orderBy === 'submissionDate' ? order : 'asc'}
                        onClick={createSortHandler('submissionDate')}
                    >
                        Date de Soumission
                    </TableSortLabel>
                </TableCell>
                {editable && (
                    <>
                        <TableCell sortDirection={orderBy === 'typeOfRequest' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'typeOfRequest'}
                                direction={orderBy === 'typeOfRequest' ? order : 'asc'}
                                onClick={createSortHandler('typeOfRequest')}
                            >
                                Type de Demande
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'primaryVp' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'primaryVp'}
                                direction={orderBy === 'primaryVp' ? order : 'asc'}
                                onClick={createSortHandler('primaryVp')}
                            >
                                Primary VP
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'principalVendor' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'principalVendor'}
                                direction={orderBy === 'principalVendor' ? order : 'asc'}
                                onClick={createSortHandler('principalVendor')}
                            >
                                Principal Vendor
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'secondaryVendor' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'secondaryVendor'}
                                direction={orderBy === 'secondaryVendor' ? order : 'asc'}
                                onClick={createSortHandler('secondaryVendor')}
                            >
                                Secondary Vendor
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200, padding: '16px 24px' }} sortDirection={orderBy === 'budget_no_vat' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'budget_no_vat'}
                                direction={orderBy === 'budget_no_vat' ? order : 'asc'}
                                onClick={createSortHandler('budget_no_vat')}
                            >
                                Budget (HT)
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ minWidth: 200, padding: '16px 24px' }} sortDirection={orderBy === 'estimated_value' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'estimated_value'}
                                direction={orderBy === 'estimated_value' ? order : 'asc'}
                                onClick={createSortHandler('estimated_value')}
                            >
                                Valeur Estimée
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'lgAmount' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'lgAmount'}
                                direction={orderBy === 'lgAmount' ? order : 'asc'}
                                onClick={createSortHandler('lgAmount')}
                            >
                                LG Amount
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'noGoReason' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'noGoReason'}
                                direction={orderBy === 'noGoReason' ? order : 'asc'}
                                onClick={createSortHandler('noGoReason')}
                            >
                                No Go Reason
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ minWidth: 300, padding: '16px 24px' }} sortDirection={orderBy === 'noGoDescription' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'noGoDescription'}
                                direction={orderBy === 'noGoDescription' ? order : 'asc'}
                                onClick={createSortHandler('noGoDescription')}
                            >
                                No Go Description
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'crp_CRD' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'crp_CRD'}
                                direction={orderBy === 'crp_CRD' ? order : 'asc'}
                                onClick={createSortHandler('crp_CRD')}
                            >
                                CRP/CRD
                            </TableSortLabel>
                        </TableCell>

                        <TableCell sortDirection={orderBy === 'qa_deadline' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'qa_deadline'}
                                direction={orderBy === 'qa_deadline' ? order : 'asc'}
                                onClick={createSortHandler('qa_deadline')}
                            >
                                QA Deadline
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'ReviewDate' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'ReviewDate'}
                                direction={orderBy === 'ReviewDate' ? order : 'asc'}
                                onClick={createSortHandler('ReviewDate')}
                            >
                                Review Date
                            </TableSortLabel>
                        </TableCell>
                    </>
                )}
                <TableCell>
                    Actions
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

UserTableHead.propTypes = {
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    editable: PropTypes.bool.isRequired,
};

export default UserTableHead;
