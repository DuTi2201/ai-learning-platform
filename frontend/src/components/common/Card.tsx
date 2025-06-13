import React from 'react';
import { Card as MuiCard, CardContent, CardActions, CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomCardProps extends CardProps {
  hover?: boolean;
  padding?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'hover' && prop !== 'padding',
})<{ hover?: boolean; padding?: string }>(({ theme, hover, padding }) => {
  const getPadding = () => {
    switch (padding) {
      case 'small':
        return '16px';
      case 'large':
        return '32px';
      default:
        return '24px';
    }
  };

  return {
    borderRadius: '16px',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(0, 0, 0, 0.3)'
      : '0 4px 20px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: theme.palette.background.paper,
    
    ...(hover && {
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 12px 40px rgba(0, 0, 0, 0.4)'
          : '0 12px 40px rgba(0, 0, 0, 0.15)',
        borderColor: theme.palette.primary.main,
      },
    }),
    
    '& .MuiCardContent-root': {
      padding: getPadding(),
      '&:last-child': {
        paddingBottom: getPadding(),
      },
    },
  };
});

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: '16px 24px',
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.02)'
    : 'rgba(0, 0, 0, 0.02)',
}));

export const Card: React.FC<CustomCardProps> = ({
  hover = false,
  padding = 'medium',
  children,
  actions,
  ...props
}) => {
  return (
    <StyledCard hover={hover} padding={padding} {...props}>
      <CardContent>
        {children}
      </CardContent>
      {actions && (
        <StyledCardActions>
          {actions}
        </StyledCardActions>
      )}
    </StyledCard>
  );
};