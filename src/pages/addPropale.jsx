import { Helmet } from 'react-helmet-async';

import { AddPropaleView } from 'src/sections/addPropale';
// ----------------------------------------------------------------------

export default function AddPropalePage() {
    return (
        <>
            <Helmet>
                <title> Propales | Devoteam </title>
            </Helmet>

            <AddPropaleView />
        </>
    );
}
