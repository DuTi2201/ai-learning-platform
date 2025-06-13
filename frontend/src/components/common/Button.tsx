import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CustomButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  fullWidth?: boolean;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'loading',
})<{ loading?: boolean }>(({ theme, loading }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  padding: '12px 24px',
  minHeight: '48px',
  position: 'relative',
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: 'none',
  
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 25px rgba(0, 71, 171, 0.3)'
      : '0 8px 25px rgba(0, 71, 171, 0.15)',
  },
  
  '&:active': {
    transform: 'translateY(0)',
  },
  
  '&.Mui-disabled': {
    opacity: 0.6,
    transform: 'none',
    boxShadow: 'none',
  },
  
  ...(loading && {
    color: 'transparent',
  }),
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: 'inherit',
}));

export const Button: React.FC<CustomButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  disabled,
  ...props
}) => {
  const getVariantProps = () => {
    switch (variant) {
      case 'primary':
        return {
          variant: 'contained' as const,
          color: 'primary' as const,
        };
      case 'secondary':
        return {
          variant: 'contained' as const,
          color: 'secondary' as const,
        };
      case 'outline':
        return {
          variant: 'outlined' as const,
          color: 'primary' as const,
        };
      case 'ghost':
        return {
          variant: 'text' as const,
          color: 'primary' as const,
        };
      default:
        return {
          variant: 'contained' as const,
          color: 'primary' as const,
        };
    }
  };

  return (
    <StyledButton
      {...getVariantProps()}
      disabled={disabled || loading}
      loading={loading}
      {...props}
    >
      {children}
      {loading && <LoadingSpinner size={20} />}
    </StyledButton>
  );
};