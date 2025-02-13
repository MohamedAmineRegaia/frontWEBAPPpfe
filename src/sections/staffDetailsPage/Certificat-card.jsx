import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify/iconify';

export default function CertifCard({ certif, index, onDelete }) {
    const { certification, image } = certif;

    const renderCertifications = (
        <Box>
            <Typography variant="subtitle2" align='center'>
                {certification}
            </Typography>
        </Box>
    );

    const renderCover = image ? (
        <Box
            component="img"
            alt={certification}
            src={`data:image/jpeg;base64,${image}`}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'contain',
                position: 'absolute',
            }}
        />
    ) : (
        <Box
            component="img"
            alt={certification}
            src="/assets/images/certifications/certif.png"
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
            <Card sx={{ maxHeight: 250, minHeight: 250, maxWidth: 200, minWidth: 200 }}>
                <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
                    {renderCover}
                </Box>
                <Box sx={{ p: 3 }}>
                    {renderCertifications}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Iconify icon="eva:trash-2-outline"
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => onDelete(certif.id)}
                            aria-label="delete" />
                    </Stack>
                </Box>
            </Card>
        </Grid>
    );
}

CertifCard.propTypes = {
    certif: PropTypes.object.isRequired,
    index: PropTypes.number,
    onDelete: PropTypes.func.isRequired,
};
