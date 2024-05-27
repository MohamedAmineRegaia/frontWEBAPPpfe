import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  email,
  realmRole,
  autreAttribut,
  disponibilite,
  handleDeleteUser,
  handleUpdateRole,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [newRole, setNewRole] = useState(realmRole);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
    handleCloseMenu();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenRoleDialog = () => {
    setOpenRoleDialog(true);
    handleCloseMenu();
  };

  const handleCloseRoleDialog = () => {
    setOpenRoleDialog(false);
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleSubmitRoleChange = () => {
    handleUpdateRole(newRole);
    handleCloseRoleDialog();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{realmRole}</TableCell>

        <TableCell align="center">{autreAttribut}</TableCell>

        <TableCell>
          <Label color={(disponibilite === 'banned' && 'error') || 'success'}>{disponibilite}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleOpenDeleteDialog}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
            <MenuItem onClick={handleOpenRoleDialog}>
              <Iconify icon="eva:edit-outline" sx={{ mr: 2 }} />
              Role
            </MenuItem>
          </Popover>
        </TableCell>
      </TableRow>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={() => { handleDeleteUser(); handleCloseDeleteDialog(); }} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRoleDialog} onClose={handleCloseRoleDialog}>
        <DialogTitle>Update Role</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={newRole} onChange={handleRoleChange}>
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="MANAGER">Manager</MenuItem>
              <MenuItem value="COMMERCIAL">Commercial</MenuItem>
              <MenuItem value="STAFF">Staff</MenuItem>

            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRoleDialog}>Cancel</Button>
          <Button onClick={handleSubmitRoleChange} autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleDeleteUser: PropTypes.func,
  disponibilite: PropTypes.any,
  name: PropTypes.any,
  realmRole: PropTypes.any,
  selected: PropTypes.any,
  autreAttribut: PropTypes.string,
  handleUpdateRole: PropTypes.func,
};
