import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify/iconify';

export default function VisaCard({ visaa, index, onDelete }) {
    const { visa } = visaa;

    const currentDate = new Date();

    let visaDate = null;
    let isExpired = false;
    let cardBgColor = 'info.main';
    let formattedVisaDate = 'You don\'t have a visa yet';

    if (visa && visa.trim() !== '') {
        visaDate = new Date(visa);
        isExpired = visaDate < currentDate;
        cardBgColor = isExpired ? 'error.main' : 'success.main';
        formattedVisaDate = fDate(visaDate);
    }

    const renderVisa = (
        <Box>
            <Typography variant="subtitle2" align="center">
                {formattedVisaDate}
            </Typography>
        </Box>
    );

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 3, marginLeft: 3, marginRight: 3 }}>
            <Card sx={{ backgroundColor: cardBgColor }}>
                <Box sx={{ p: 3, position: 'relative' }}>
                    {renderVisa}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>

                        <Iconify icon="eva:trash-2-outline" 
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => onDelete(visaa.id)}
                            aria-label="delete" />
                    </Stack>
                       
                    
                </Box>
            </Card>
        </Grid>
    );
}

VisaCard.propTypes = {
    visaa: PropTypes.shape({
        visa: PropTypes.string,
        id: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number,
    onDelete: PropTypes.func.isRequired,
};
