import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const authStatus = searchParams.get('auth');
      const error = searchParams.get('error');

      if (error) {
        console.error('Authentication error:', error);
        navigate('/?error=' + error);
        return;
      }

      if (authStatus === 'success') {
        // Wait a moment for the cookie to be set
        setTimeout(async () => {
          try {
            const userData = await checkAuthStatus();
            // Navigate based on user role
            if (userData && userData.role === 'ADMIN') {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          } catch (error) {
            console.error('Failed to check auth status:', error);
            navigate('/?error=auth_failed');
          }
        }, 1000);
      } else {
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate, searchParams, checkAuthStatus]);

  return (
    <LoadingSpinner 
      fullScreen 
      message="Đang xử lý đăng nhập..." 
    />
  );
};