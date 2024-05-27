import { Helmet } from 'react-helmet-async';

import { StaffDetailsView } from 'src/sections/staffDetailsPage/view';

// ----------------------------------------------------------------------

export default function StaffDetailsViewPage() {
    return (
        <>
            <Helmet>
                <title>  Project | Devoteam </title>
            </Helmet>

            <StaffDetailsView />
        </>
    );
}
