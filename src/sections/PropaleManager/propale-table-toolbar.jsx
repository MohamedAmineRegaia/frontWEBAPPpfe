import React from 'react';
import PropTypes from 'prop-types';

import { Box, TextField } from '@mui/material';

function UserTableToolbar(props) {
    const { filterName, onFilterName } = props;

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" padding={2}>
            <TextField
                variant="outlined"
                label="Filter by name"
                value={filterName}
                onChange={onFilterName}
                fullWidth
            />
        </Box>
    );
}

UserTableToolbar.propTypes = {
    filterName: PropTypes.string.isRequired,
    onFilterName: PropTypes.func.isRequired,
};

export default UserTableToolbar;
