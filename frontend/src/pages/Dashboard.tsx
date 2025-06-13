import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  School,
  Assignment,
  TrendingUp,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import dashboardService, { UserStats, EnrolledCourse } from '../services/dashboardService';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

const WelcomeCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(3),
  '& .MuiTypography-root': {
    color: 'white',
  },
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.action.hover,
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const CourseProgress = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.action.hover,
  marginBottom: theme.spacing(2),
}));


export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await dashboardService.getDashboardData();
        setStats(data.stats);
        setEnrolledCourses(data.enrolledCourses);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!stats) {
    return (
      <Alert severity="warning">
        Không có dữ liệu thống kê.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Welcome Section */}
      <WelcomeCard>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={user.profilePictureUrl || undefined}
            sx={{ width: 80, height: 80 }}
          >
            {user.fullName.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Chào mừng trở lại, {user.fullName}!
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Hãy tiếp tục hành trình học tập của bạn
            </Typography>
          </Box>
        </Box>
      </WelcomeCard>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard>
            <StatIcon>
              <School />
            </StatIcon>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {stats.totalEnrollments}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Khóa học đã đăng ký
            </Typography>
          </StatCard>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard>
            <StatIcon>
              <CheckCircle />
            </StatIcon>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
              {stats.completedLessons}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bài học hoàn thành
            </Typography>
          </StatCard>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard>
            <StatIcon>
              <AccessTime />
            </StatIcon>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main' }}>
              {stats.totalProgress}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tiến độ tổng thể
            </Typography>
          </StatCard>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard>
            <StatIcon>
              <TrendingUp />
            </StatIcon>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'info.main' }}>
              {enrolledCourses.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Khóa học đang học
            </Typography>
          </StatCard>
        </Grid>
      </Grid>

      {/* Course Progress */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Card>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Khóa học đang theo học
            </Typography>
            
            {enrolledCourses.length > 0 ? enrolledCourses.map((course) => (
              <CourseProgress key={course.id}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {course.course.title}
                    </Typography>
                    <Chip
                      label={`${course.progress}%`}
                      size="small"
                      color={course.progress >= 70 ? 'success' : course.progress >= 40 ? 'warning' : 'default'}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Mã khóa học: {course.course.courseCode}
                  </Typography>
                  
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mb: 1,
                      backgroundColor: 'action.hover',
                    }}
                  />
                  
                  <Typography variant="body2" color="text.secondary">
                    {course.completedLessons}/{course.totalLessons} bài học • Đăng ký: {new Date(course.enrollmentDate).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
                
                <Button variant="primary" size="small">
                  Tiếp tục
                </Button>
              </CourseProgress>
            )) : (
              <Box textAlign="center" py={4}>
                <Typography variant="body1" color="text.secondary">
                  Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học có sẵn!
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Hoạt động gần đây
            </Typography>
            
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <CheckCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Hoàn thành bài học: Introduction to React"
                  secondary="2 giờ trước"
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Assignment />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nộp bài tập: React Components"
                  secondary="1 ngày trước"
                />
              </ListItem>
              
              <Divider variant="inset" component="li" />
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <School />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Đăng ký khóa học: Advanced JavaScript"
                  secondary="3 ngày trước"
                />
              </ListItem>
            </List>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Thao tác nhanh
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="primary" fullWidth>
                Khám phá khóa học mới
              </Button>
              
              <Button variant="outline" fullWidth>
                Xem lịch học
              </Button>
              
              <Button variant="outline" fullWidth>
                Kiểm tra tiến độ
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
