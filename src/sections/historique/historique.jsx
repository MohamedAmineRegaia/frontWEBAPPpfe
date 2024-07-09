import axios from 'axios';
import { format } from 'date-fns';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@mui/styles';
import {
    Paper,
    Table,
    Select,
    Avatar,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    TableHead,
    TextField,
    InputLabel,
    Typography,
    FormControl,
    TableContainer,
    
} from '@mui/material';

import { baseURL } from 'src/constant/apiConfig';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    table: {
        minWidth: 650,
    },
}));

const HistoriqueList = () => {
    const classes = useStyles();
    const { keycloak } = useKeycloak();
    const [historique, setHistorique] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showUserSearch, setShowUserSearch] = useState(false);
    const [userSearch, setUserSearch] = useState('');

    useEffect(() => {
        const fetchHistorique = async () => {
            try {
                const response = await axios.get(`${baseURL}/propale/historique`, {
                    headers: {
                        Authorization: `Bearer ${keycloak.token}`
                    }
                });
                setHistorique(response.data);
            } catch (error) {
                console.error('Error fetching historique:', error);
            }
        };

        fetchHistorique();
    }, [keycloak.token]);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleUserSearchChange = (event) => {
        setUserSearch(event.target.value);
    };

    const filteredHistorique = historique.filter((entry) => {
        const actionMatch = filter === 'all' || (filter === 'modification' && entry.action.includes('modifié')) || (filter === 'ajout' && entry.action.includes('ajouté'));
        const userMatch = entry.user.toLowerCase().includes(userSearch.toLowerCase());
        return actionMatch && userMatch;
    });

    return (
        <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
                Historique des Propales
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="filter-label">Action</InputLabel>
                <Select
                    labelId="filter-label"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="modification">Modification</MenuItem>
                    <MenuItem value="ajout">Ajout</MenuItem>
                </Select>
            </FormControl>
            {showUserSearch && (
                <TextField
                    label="Recherche Utilisateur"
                    value={userSearch}
                    onChange={handleUserSearchChange}
                    fullWidth
                />
            )}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={() => setShowUserSearch(!showUserSearch)} style={{ cursor: 'pointer' }}>
                                Utilisateur
                            </TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Propale</TableCell>
                            <TableCell>Date et Heure</TableCell>
                            <TableCell>Old Value</TableCell>
                            <TableCell>New Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredHistorique.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar>
                                        {entry.user.charAt(0)}
                                    </Avatar>
                                    {entry.user}
                                </TableCell>
                                <TableCell>{entry.action}</TableCell>
                                <TableCell>{entry.propaleName}</TableCell>
                                <TableCell>{format(new Date(entry.timestamp), 'dd/MM/yyyy à HH:mm')}</TableCell>
                                <TableCell>{entry.oldValue}</TableCell>
                                <TableCell>{entry.newValue}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default HistoriqueList;
