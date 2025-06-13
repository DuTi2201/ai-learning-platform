import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  School,
  Psychology,
  TrendingUp,
  Groups,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  borderRadius: '24px',
  padding: theme.spacing(8, 4),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
  border: `1px solid ${theme.palette.divider}`,
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: 'white',
  marginBottom: theme.spacing(2),
  margin: '0 auto 16px auto',
}));

const features = [
  {
    icon: <School fontSize="large" />,
    title: 'Khóa học AI chất lượng cao',
    description: 'Học từ các chuyên gia hàng đầu với nội dung được cập nhật liên tục theo xu hướng công nghệ mới nhất.',
  },
  {
    icon: <Psychology fontSize="large" />,
    title: 'Học tập thông minh',
    description: 'Hệ thống AI cá nhân hóa lộ trình học tập phù hợp với khả năng và mục tiêu của từng học viên.',
  },
  {
    icon: <TrendingUp fontSize="large" />,
    title: 'Theo dõi tiến độ',
    description: 'Báo cáo chi tiết về quá trình học tập giúp bạn nắm bắt được điểm mạnh và cần cải thiện.',
  },
  {
    icon: <Groups fontSize="large" />,
    title: 'Cộng đồng học tập',
    description: 'Kết nối với cộng đồng học viên, chia sẻ kinh nghiệm và cùng nhau phát triển.',
  },
];

export const Home: React.FC = () => {
  const { user, login } = useAuth();
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <HeroSection>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Nền tảng học AI hàng đầu
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
        >
          Khám phá thế giới trí tuệ nhân tạo với các khóa học chất lượng cao, 
          được thiết kế bởi các chuyên gia hàng đầu trong ngành.
        </Typography>
        {!user && (
          <Button
            variant="primary"
            size="large"
            onClick={login}
            sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Bắt đầu học ngay
          </Button>
        )}
      </HeroSection>

      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Tại sao chọn chúng tôi?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card hover padding="large" sx={{ height: '100%', textAlign: 'center' }}>
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {user && (
        <Card padding="large" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Chào mừng trở lại, {user.fullName}!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Tiếp tục hành trình học tập của bạn với các khóa học AI hấp dẫn.
          </Typography>
          <Button variant="primary" size="large">
            Xem khóa học của tôi
          </Button>
        </Card>
      )}
    </Container>
  );
};