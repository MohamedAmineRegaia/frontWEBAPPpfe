import { Helmet } from 'react-helmet-async';

import { AddUserView } from 'src/sections/addUser';

// ----------------------------------------------------------------------

export default function AddUserPage() {
    return (
        <>
            <Helmet>
                <title> User | Devoteam </title>
            </Helmet>

            <AddUserView />
        </>
    );
}
