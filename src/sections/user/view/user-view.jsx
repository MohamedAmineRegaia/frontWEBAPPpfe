import axios from 'axios';
import { useState , useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import { baseURL } from 'src/constant/apiConfig';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [userData, setUserData] = useState([]);

  const { keycloak } = useKeycloak();
  const router = useRouter();


  async function fetchData1() {

    try {
      const response = await axios.get(`${baseURL}/users/all`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });
      console.log('Data:', response.data);
      setUserData(response.data);
      // Utilisez les données de la réponse pour mettre à jour votre état ou effectuer d'autres actions nécessaires.
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleClickAddUser = () => {
    router.push('/adduser');
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${baseURL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });
      // Rechargez les données après la suppression de l'utilisateur
      fetchData1();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const handleUpdateRole = async (userId, newRole) => {
    try {
      await axios.put(
        `${baseURL}/roles/assign-role/user/${userId}`,
        null,
        {
          params: { roleName: newRole },
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
          },
        }
      );
      fetchData1();
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };
  

  useEffect( () => {
    
    async function fetchData() {

      try {
        const response = await axios.get(`${baseURL}/users/all`, {
          headers: {
            Authorization: `Bearer ${keycloak.token}`
          }
        });
        console.log('Data:', response.data);
        

        setUserData(response.data);
        // Utilisez les données de la réponse pour mettre à jour votre état ou effectuer d'autres actions nécessaires.
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
   
  }, [keycloak.token]); 
  



  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users
        
        
        </Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleClickAddUser}>
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'email' },
                  { id: 'realmRole', label: 'role' },
                  { id: 'autreAttribut', label: 'autreAttribut', align: 'center' },
                  { id: 'disponibilite', label: 'disponibilite' },

                  { id: '' },
                ]}
              />
              <TableBody>
                {userData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <UserTableRow
                      key={user.id}
                      name={`${user.firstName} ${user.lastName}`}
                      
                      email={user.email}
                      disponibilite={user.attributes && user.attributes.disponibilite}
                      autreAttribut={user.attributes && user.attributes.autreAttribut}
                      realmRole={user.realmRoles && user.realmRoles.join(', ')}
                      selected={selected.indexOf(user.username) !== -1}
                      handleClick={(event) => handleClick(event, user.username)}
                      handleDeleteUser={() => handleDeleteUser(user.id)} 
                      handleUpdateRole={(newRole) => handleUpdateRole(user.id, newRole)}
                      
                      />
                    
                    
                  ))}


                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
