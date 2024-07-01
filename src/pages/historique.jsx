import { Helmet } from 'react-helmet-async';

import { HistoriqueList } from 'src/sections/historique';

// ----------------------------------------------------------------------

export default function AddUserPage() {
    return (
        <>
            <Helmet>
                <title> Historique | Devoteam </title>
            </Helmet>

            <HistoriqueList />
        </>
    );
}
