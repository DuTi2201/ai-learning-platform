import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  TrendingUp,
  School,
  AccessTime,
  CheckCircle,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import dashboardService, { UserStats, EnrolledCourse } from '../services/dashboardService';

const WelcomeCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  border: `1px solid ${theme.palette.divider}`,
}));

const StatCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  height: '100%',
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px auto',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  color: theme.palette.primary.main,
}));

const CourseProgress = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 4px 20px rgba(0, 71, 171, 0.2)'
      : '0 4px 20px rgba(0, 71, 171, 0.1)',
  },
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
      <Box textAlign="center" py={8}>
        <Typography variant="h6" gutterBottom>
          Vui lòng đăng nhập để xem dashboard
        </Typography>
      </Box>
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
      <WelcomeCard padding="large">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar
            src={user.profilePictureUrl}
            alt={user.fullName}
            sx={{ width: 80, height: 80 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
              Chào mừng trở lại, {user.fullName}!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hôm nay là ngày tuyệt vời để tiếp tục hành trình học tập AI của bạn.
            </Typography>
          </Box>
        </Box>
      </WelcomeCard>

      <Grid container spacing={3} sx={{ mt: 2 }}>
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

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
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
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Hoạt động gần đây
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle color="success" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Hoàn thành bài học "Introduction to ML"
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 giờ trước
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <School color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Đăng ký khóa học "Computer Vision"
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 ngày trước
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUp color="info" fontSize="small" />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Đạt chuỗi học 7 ngày liên tiếp
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    3 ngày trước
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Button variant="outline" fullWidth sx={{ mt: 3 }}>
              Xem tất cả hoạt động
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};