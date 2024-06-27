// staffDetails-card.jsx
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import SvgColor from 'src/components/svg-color';

export default function StaffCard({ staff, index }) {
    const { projectTitle, projectStartDate, projectEndDate } = staff;
    const cover = `/assets/images/covers/cover_${index + 1}.jpg`;
    const author = {
        name: 'John Doe',
        avatarUrl: '/path/to/static/avatar.jpg',
    };

    const renderProjectDetails = (
        <Box>
            <Typography variant="subtitle1">  
                {projectTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Start Date: {fDate(projectStartDate)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
                End Date: {fDate(projectEndDate)}
            </Typography>
        </Box>
    );

    const renderAvatar = (
        <Avatar
            alt={author.name}
            src={author.avatarUrl}
            sx={{
                zIndex: 9,
                width: 32,
                height: 32,
                position: 'absolute',
                left: (theme) => theme.spacing(3),
                bottom: (theme) => theme.spacing(-2),
            }}
        />
    );

    const renderCover = (
        <Box
            component="img"
            alt={projectTitle}
            src={cover}
            sx={{
                top: 0,
                width: 1,
                height: 1,
                objectFit: 'cover',
                position: 'absolute',
            }}
        />
    );

    return (
        <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 ,marginLeft :3 , marginRight : 3}}> 
            
            <Card>
                <Box sx={{ position: 'relative', pt: 'calc(100% * 3 / 4)' }}>
                    <SvgColor
                        color="paper"
                        src="/assets/icons/shape-avatar.svg"
                        sx={{
                            width: 80,
                            height: 36,
                            zIndex: 9,
                            bottom: -15,
                            position: 'absolute',
                            color: 'background.paper',
                        }}
                    />
                    {renderAvatar}
                    {renderCover}
                </Box>
                <Box sx={{ p: 3 }}>
                   
                        {renderProjectDetails}
                    
                </Box>
            </Card>
          
        </Grid>
    );
}

StaffCard.propTypes = {
    staff: PropTypes.object.isRequired,
    index: PropTypes.number,
};
