import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

export default function VisaCard({ visaa, index }) {
    const { visa } = visaa;
    console.log(visa);

    const currentDate = new Date();

    // Vérifier si une date de visa est fournie
    let visaDate = null;
    let isExpired = false;
    let cardBgColor = 'info.main'; // Couleur par défaut si pas de visa
    let formattedVisaDate = 'You don\'t have a visa yet';

    if (visa && visa.trim() !== '') {
        // Convertir la date de visa en objet Date
        visaDate = new Date(visa);

        // Déterminer si la date est expirée
        isExpired = visaDate < currentDate;
        cardBgColor = isExpired ? 'error.main' : 'success.main';

        // Formater la date du visa
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
                <Box sx={{ p: 3 }}>
                    {renderVisa}
                </Box>
            </Card>
        </Grid>
    );
}

VisaCard.propTypes = {
    visaa: PropTypes.shape({
        visa: PropTypes.string,
    }).isRequired,
    index: PropTypes.number,
};
