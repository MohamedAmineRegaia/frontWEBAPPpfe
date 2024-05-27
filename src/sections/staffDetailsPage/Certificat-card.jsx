// staffDetails-card.jsx
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export default function CertifCard({ certif, index }) {
    const { certification } = certif;
    const cover = `/assets/images/certifications/googleCloudEng.png`;
    
    const renderCertifications = (
        <Box>
            <Typography variant="subtitle2" align='center'>
                {certification}
            </Typography>
            
        </Box>
    );
   
    
    const renderCover = (
        <Box
            component="img"
            alt={certification}
            src={cover}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'contain',
                position: 'absolute',
            }}
        />
    );

   
    return (
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 3, marginLeft: 3, marginRight: 3 }}>

            <Card sx={{  maxHeight:250, minHeight:250 ,maxWidth: 200 , minWidth: 200}}>
                <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
                    
                    {renderCover}
                   
                </Box>
                <Box sx={{ p: 3 }}>

                    {renderCertifications}

                </Box>
            </Card>

        </Grid>
    );
}

CertifCard.propTypes = {
    certif: PropTypes.object.isRequired,
    index: PropTypes.number,
};
