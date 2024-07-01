import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import { Paper, Table, TableRow, TableBody,TableCell, TableContainer,  TablePagination } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { baseURL } from 'src/constant/apiConfig';

import Iconify from 'src/components/iconify';

import UserTableRow from '../propale-table-row';
import UserTableHead from '../propale-table-head';
import { applyFilter, getComparator } from '../utils';
import UserTableToolbar from '../propale-table-toolbar';

function UserView() {
    const [propales, setPropales] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('propaleName');
    const [filterName, setFilterName] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { keycloak } = useKeycloak();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseURL}/propale/all`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setPropales(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [keycloak.token]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredPropales = applyFilter({
        inputData: propales,
        comparator: getComparator(order, orderBy),
        filterName,
    });
    const handleClickAddUser = () => {
        router.push('/AddPropalePage');
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredPropales.length - page * rowsPerPage);

    return (
        <Paper>
            <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickAddUser}>
                New propal
            </Button>
            <UserTableToolbar filterName={filterName} onFilterName={handleFilterByName} />
            <TableContainer>
                <Table>
                    <UserTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {filteredPropales.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((propale) => (
                            <UserTableRow key={propale.id} propale={propale} />
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={20} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredPropales.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default UserView;
