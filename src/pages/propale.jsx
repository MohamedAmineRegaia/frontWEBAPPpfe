import { Helmet } from 'react-helmet-async';

import { PropaleView } from 'src/sections/propal/view';

// ----------------------------------------------------------------------

export default function UserPage() {
    return (
        <>
            <Helmet>
                <title> Propales | DevoTeam </title>
            </Helmet>

            <PropaleView />
        </>
    );
}
