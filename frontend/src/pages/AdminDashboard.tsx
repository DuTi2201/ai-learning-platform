import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Paper,
  Alert
} from '@mui/material';
import {
  TrendingUp,
  People,
  School,
  LibraryBooks,
  PlayCircleOutline,
  Folder,
  ManageAccounts as UserManagementIcon,
  ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';
import { moduleService } from '../services/moduleService';
import { lessonService } from '../services/lessonService';
import { resourceService } from '../services/resourceService';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { Course, Module, Lesson, Resource, User } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Fetch data for statistics
  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getAllCourses()
  });
  const courses = coursesData?.data || [];

  const { data: modules = [], isLoading: modulesLoading } = useQuery<Module[]>({
    queryKey: ['modules'],
    queryFn: moduleService.getAllModules
  });

  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ['lessons'],
    queryFn: lessonService.getAllLessons
  });

  const { data: resources = [], isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: resourceService.getAllResources
  });

  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: userService.getAllUsers
  });

  const managementCards = [
    {
      title: 'Quản lý khóa học',
      description: 'Tạo, chỉnh sửa và quản lý các khóa học',
      icon: <School />,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      route: '/admin/courses',
      count: (courses as Course[])?.length || 0
    },
    {
      title: 'Quản lý module',
      description: 'Tổ chức và quản lý các module học tập',
      icon: <LibraryBooks />,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      route: '/admin/modules',
      count: (modules as Module[])?.length || 0
    },
    {
      title: 'Quản lý bài học',
      description: 'Tạo và quản lý nội dung bài học',
      icon: <PlayCircleOutline />,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      route: '/admin/lessons',
      count: lessons.length
    },
    {
      title: 'Quản lý tài liệu',
      description: 'Quản lý tài liệu và tệp đính kèm',
      icon: <Folder />,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      route: '/admin/resources',
      count: resources.length
    },
    {
      title: 'Quản lý người dùng',
      description: 'Quản lý tài khoản và phân quyền người dùng',
      icon: <UserManagementIcon />,
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      route: '/admin/users',
      count: users.length
    }
  ];

  const statisticsCards = [
    {
      title: 'Tổng số khóa học',
      value: (courses as Course[])?.length || 0,
      icon: <School />,
      color: '#667eea',
      loading: coursesLoading
    },
    {
      title: 'Tổng số module',
      value: (modules as Module[])?.length || 0,
      icon: <LibraryBooks />,
      color: '#f5576c',
      loading: modulesLoading
    },
    {
      title: 'Tổng số bài học',
      value: (lessons as Lesson[])?.length || 0,
      icon: <PlayCircleOutline />,
      color: '#4facfe',
      loading: lessonsLoading
    },
    {
      title: 'Tổng số tài liệu',
      value: (resources as Resource[])?.length || 0,
      icon: <Folder />,
      color: '#43e97b',
      loading: resourcesLoading
    },
    {
      title: 'Tổng số người dùng',
      value: (users as User[])?.length || 0,
      icon: <People />,
      color: '#fa709a',
      loading: usersLoading
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý toàn bộ hệ thống học tập AI
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Thống kê tổng quan
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statisticsCards.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                border: `1px solid ${stat.color}30`,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${stat.color}40`
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    width: 56,
                    height: 56,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {stat.loading ? '...' : stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Management Cards */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Chức năng quản lý
      </Typography>
      <Grid container spacing={3}>
        {managementCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)'
                }
              }}
              onClick={() => navigate(card.route)}
            >
              <Box
                sx={{
                  height: 200,
                  background: card.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
                  {card.icon}
                </Avatar>
                <Chip
                  label={card.count}
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    fontWeight: 'bold'
                  }}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowIcon />}
                  fullWidth
                  sx={{
                    background: card.color,
                    '&:hover': {
                      background: card.color,
                      filter: 'brightness(1.1)'
                    }
                  }}
                >
                  Quản lý
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Thao tác nhanh
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<School />}
              onClick={() => navigate('/admin/courses')}
              sx={{ py: 1.5 }}
            >
              Quản lý khóa học
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<LibraryBooks />}
              onClick={() => navigate('/admin/modules')}
              sx={{ py: 1.5 }}
            >
              Quản lý module
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<PlayCircleOutline />}
              onClick={() => navigate('/admin/lessons')}
              sx={{ py: 1.5 }}
            >
              Quản lý bài học
            </Button>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<UserManagementIcon />}
              onClick={() => navigate('/admin/users')}
              sx={{ py: 1.5 }}
            >
              Quản lý người dùng
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;