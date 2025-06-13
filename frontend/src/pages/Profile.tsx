import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[8],
}));

export const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h4" align="center">
            Vui lòng đăng nhập để xem thông tin cá nhân
          </Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <StyledPaper>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <ProfileAvatar
              src={user.profilePictureUrl || undefined}
              alt={user.fullName}
            >
              {!user.profilePictureUrl && user.fullName.charAt(0).toUpperCase()}
            </ProfileAvatar>
            <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
              {user.fullName}
            </Typography>
            <Chip
              label={user.role === 'ADMIN' ? 'Quản trị viên' : user.role === 'INSTRUCTOR' ? 'Giảng viên' : 'Học viên'}
              color={user.role === 'ADMIN' ? 'error' : user.role === 'INSTRUCTOR' ? 'warning' : 'primary'}
              variant="outlined"
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Thông tin cá nhân
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Họ và tên
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.fullName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Vai trò
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.role === 'ADMIN' ? 'Quản trị viên' : user.role === 'INSTRUCTOR' ? 'Giảng viên' : 'Học viên'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Thống kê học tập
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Trạng thái tài khoản
                  </Typography>
                  <Chip
                    label="Đang hoạt động"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Ngày tham gia
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date().toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </Layout>
  );
};