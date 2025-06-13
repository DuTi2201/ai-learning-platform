import React from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
}

const MainContent = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)', // Subtract header height
  backgroundColor: theme.palette.background.default,
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const Layout: React.FC<LayoutProps> = ({
  children,
  maxWidth = 'lg',
  fullWidth = false,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <MainContent>
        {fullWidth ? (
          <Box sx={{ px: 2 }}>
            {children}
          </Box>
        ) : (
          <StyledContainer maxWidth={maxWidth}>
            {children}
          </StyledContainer>
        )}
      </MainContent>
    </Box>
  );
};