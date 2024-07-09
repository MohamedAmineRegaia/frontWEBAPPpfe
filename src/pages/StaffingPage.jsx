import { Helmet } from 'react-helmet-async';

import { StaffingPage } from 'src/sections/PropaleDetailsStaffing';
// ----------------------------------------------------------------------

export default function StaffingViewPage() {
    return (
        <>
            <Helmet>
                <title> Staffing | Devoteam </title>
            </Helmet>

            <StaffingPage />
        </>
    );
}
