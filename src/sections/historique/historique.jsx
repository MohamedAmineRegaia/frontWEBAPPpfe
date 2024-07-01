import axios from 'axios';
import { format } from 'date-fns';
import { useKeycloak } from '@react-keycloak/web';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import {
    List,
    Paper,
    Avatar,
    ListItem,
    Typography,
    ListItemText,
    ListItemAvatar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    timestamp: {
        marginTop: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const HistoriqueList = () => {
    const classes = useStyles();
    const { keycloak } = useKeycloak();
    const [historique, setHistorique] = useState([]);
    const [filter, setFilter] = useState('all');

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

    const filteredHistorique = historique.filter((entry) => {
        if (filter === 'all') return true;
        if (filter === 'modification' && entry.action.includes('modifié')) return true;
        if (filter === 'ajout' && entry.action.includes('ajouté')) return true;
        return false;
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
            <List className={classes.root}>
                {filteredHistorique.map((entry, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                {entry.user.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={`La case ${entry.action} de la propale ${entry.propaleName}`}
                            secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.timestamp}
                                    >
                                        {`Par: ${entry.user}`}
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {` - Le: ${format(new Date(entry.timestamp), 'dd/MM/yyyy à HH:mm')}`}
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List> 
        </Paper>
    );
};

export default HistoriqueList;
