import React from "react";
import { Box, Typography, IconButton, Link, Avatar, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import profileImage from "../Images/images.jpg";

const Footer = () => {
  return (
    <Box component="footer" sx={{
      bgcolor: 'primary.main',
      color: 'white',
      py: 4,
      px: 2,
      mt: 8,
      textAlign: 'center',
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="center" mb={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={profileImage} alt="Finance Tracker" sx={{ width: 56, height: 56 }} />
          <Box textAlign="left">
            <Typography variant="h6" fontWeight={700}>Saud Ahmed Khawjabhai Kadapa</Typography>
            <Typography variant="body2">Java & .NET Developer | Full-Stack Engineer</Typography>
          </Box>
        </Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>Contact Info</Typography>
          <Typography variant="body2">saud@example.com</Typography>
          <Typography variant="body2">+91 98765 43210</Typography>
          <Typography variant="body2">India</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>Connect With Me</Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton color="inherit" component={Link} href="https://linkedin.com/in/saudahmedkadapa" target="_blank" rel="noopener">
              <LinkedInIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="https://github.com/saudahmedKadapa" target="_blank" rel="noopener">
              <GitHubIcon />
            </IconButton>
            <IconButton color="inherit" component={Link} href="https://twitter.com" target="_blank" rel="noopener">
              <TwitterIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
      <Typography variant="body2" color="#bbb">
        &copy; {new Date().getFullYear()} Saud Ahmed Kadapa | All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
