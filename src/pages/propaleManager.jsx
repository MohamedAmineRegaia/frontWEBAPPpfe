import { Helmet } from 'react-helmet-async';

import { PropaleView } from 'src/sections/PropaleManager/view'

// ----------------------------------------------------------------------

export default function propalManagerPage() {
    return (
        <>
            <Helmet>
                <title> Propales | DevoTeam </title>
            </Helmet>

            <PropaleView />
        </>
    );
}
