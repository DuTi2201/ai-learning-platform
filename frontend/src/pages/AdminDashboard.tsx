import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Fade,
  Grow,
  CardActions,
  LinearProgress,
  Tooltip,
  Badge,
  Stack,
  Alert,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  ViewModule as ViewModuleIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  Speed as SpeedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  LibraryBooks as LibraryBooksIcon,
  AccessTime as AccessTimeIcon,
  ExpandMore as ExpandMoreIcon,
  BarChart as BarChartIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import { courseService } from '../services/courseService';
import { moduleService } from '../services/moduleService';
import { Course, Lesson, Module } from '../types';

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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [recentLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalModules: 0,
    totalLessons: 0,
    totalStudents: 0,
    totalResources: 0
  });
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  
  // New states for enhanced UI
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Load courses
      const coursesResponse = await courseService.getAllCourses();
      setCourses(coursesResponse.data);
      
      // Load modules
      const modulesResponse = await moduleService.getAllModules();
      setModules(modulesResponse.data);
      
      // Load recent lessons (mock for now)
      // const lessonsResponse = await lessonService.getRecentLessons();
      // setRecentLessons(lessonsResponse.data);
      
      // Update stats
      setStats({
        totalCourses: coursesResponse.data.length,
        totalModules: modulesResponse.data.length,
        totalLessons: 0, // Will be updated when lesson API is available
        totalStudents: 0, // Will be updated when user stats API is available
        totalResources: 0 // Will be updated when resource stats API is available
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };



  const handleRefresh = () => {
    loadDashboardData(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddModule = (courseId: string) => {
    setSelectedCourseId(courseId);
    // Navigate to module management page
    window.location.href = '/admin/modules';
  };

  const handleAddResource = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    // Navigate to lesson management page
    window.location.href = '/admin/lessons';
  };

  const setModuleFormOpen = (open: boolean) => {
    // This function is kept for compatibility but redirects to module management
    if (open) {
      window.location.href = '/admin/modules';
    }
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (user?.role !== 'ADMIN') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" color="error">
          Truy cập bị từ chối
        </Typography>
        <Typography variant="body1">
          Bạn không có quyền truy cập vào trang quản trị.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Modern Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        p: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            mr: 2, 
            width: 56, 
            height: 56 
          }}>
            <DashboardIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Bảng điều khiển Quản trị
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Chào mừng trở lại, {user.fullName || 'Admin'}!
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                '& input::placeholder': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }
            }}
            sx={{ minWidth: 250 }}
          />
          
          <Tooltip title="Làm mới dữ liệu">
            <IconButton 
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <RefreshIcon sx={{ 
                animation: refreshing ? 'spin 1s linear infinite' : 'none',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }} />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Thông báo">
            <IconButton sx={{ 
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Cài đặt">
            <IconButton sx={{ 
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.1)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
            }}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      {/* Enhanced Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Grow in={!loading} timeout={500}>
            <Card 
              component={Link}
              to="/admin/courses"
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)'
                }
              }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      Tổng khóa học
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {loading ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : stats.totalCourses}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">+12% từ tháng trước</Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <SchoolIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={75} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grow>
        </Grid>
        
        <Grid size={{xs:12, sm:6, md:3}}>
          <Grow in={!loading} timeout={700}>
            <Card 
              component={Link}
              to="/admin/modules"
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(240, 147, 251, 0.3)'
                }
              }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      Tổng module
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {loading ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : stats.totalModules}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">+8% từ tháng trước</Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <ViewModuleIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={60} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grow>
        </Grid>
        
        <Grid size={{xs:12, sm:6, md:3}}>
          <Grow in={!loading} timeout={900}>
            <Card 
              component={Link}
              to="/admin/lessons"
              sx={{ 
                height: '100%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(79, 172, 254, 0.3)'
                }
              }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      Tổng bài học
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {loading ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : stats.totalLessons}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">+15% từ tháng trước</Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <MenuBookIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={45} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grow>
        </Grid>
        
        <Grid size={{xs:12, sm:6, md:3}}>
          <Grow in={!loading} timeout={1100}>
            <Card sx={{ 
              height: '100%',
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(67, 233, 123, 0.3)'
              }
            }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                      Tổng học viên
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      {loading ? <Skeleton width={60} sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} /> : stats.totalStudents}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="body2">+25% từ tháng trước</Typography>
                    </Box>
                  </Box>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                    <PeopleIcon sx={{ fontSize: 28 }} />
                  </Avatar>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={80} 
                  sx={{ 
                    mt: 2, 
                    bgcolor: 'rgba(255,255,255,0.2)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'rgba(255,255,255,0.8)'
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grow>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Card sx={{ mb: 4, p: 3, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#2c3e50' }}>
          <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Thao tác nhanh
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6, md:3}}>
            <Button
              component={Link}
              to="/admin/courses"
              variant="contained"
              fullWidth
              startIcon={<SchoolIcon />}
              sx={{ 
                py: 1.5,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Quản lý khóa học
            </Button>
          </Grid>
          <Grid size={{xs:12, sm:6, md:3}}>
            <Button
              component={Link}
              to="/admin/modules"
              variant="contained"
              fullWidth
              startIcon={<ViewModuleIcon />}
              sx={{ 
                py: 1.5,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e084e9 0%, #e3485a 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(240, 147, 251, 0.3)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Quản lý module
            </Button>
          </Grid>
          <Grid size={{xs:12, sm:6, md:3}}>
            <Button
              component={Link}
              to="/admin/lessons"
              variant="contained"
              fullWidth
              startIcon={<MenuBookIcon />}
              sx={{ 
                py: 1.5,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3d9bec 0%, #00d9ec 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(79, 172, 254, 0.3)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Quản lý bài học
            </Button>
          </Grid>
          <Grid size={{xs:12, sm:6, md:3}}>
            <Button
              component={Link}
              to="/admin/users"
              variant="contained"
              fullWidth
              startIcon={<PeopleIcon />}
              sx={{ 
                py: 1.5,
                textDecoration: 'none',
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3bd069 0%, #2ee7c5 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(67, 233, 123, 0.3)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Quản lý người dùng
            </Button>
          </Grid>
          <Grid size={{xs:12, sm:6, md:3}}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<BarChartIcon />}
              onClick={() => setTabValue(4)}
              sx={{ 
                py: 1.5,
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e8618a 0%, #ecd02e 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(250, 112, 154, 0.3)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Xem báo cáo
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Enhanced Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px 12px 0 0'
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                minHeight: 64,
                '&.Mui-selected': {
                  color: 'white'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              icon={<SchoolIcon />} 
              iconPosition="start" 
              label="Khóa học" 
              sx={{ minWidth: 'auto' }}
              {...a11yProps(0)}
            />
            <Tab 
              icon={<ViewModuleIcon />} 
              iconPosition="start" 
              label="Quản lý Module" 
              sx={{ minWidth: 'auto' }}
              {...a11yProps(1)}
            />
            <Tab 
              icon={<MenuBookIcon />} 
              iconPosition="start" 
              label="Bài học gần đây" 
              sx={{ minWidth: 'auto' }}
              {...a11yProps(2)}
            />
            <Tab 
              icon={<AnalyticsIcon />} 
              iconPosition="start" 
              label="Thống kê" 
              sx={{ minWidth: 'auto' }}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <Paper sx={{ width: '100%' }}>
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Danh sách khóa học
              </Typography>
              <Chip 
                label={`${filteredCourses.length} khóa học`} 
                color="primary" 
                variant="outlined"
              />
            </Box>
            
            {loading ? (
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid size={{xs:12, sm:6, md:4, lg:3}} key={item}>
                    <Card>
                      <Skeleton variant="rectangular" height={140} />
                      <CardContent>
                        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : filteredCourses.length === 0 ? (
              <Card sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              }}>
                <SchoolIcon sx={{ fontSize: 64, color: '#bdc3c7', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Chưa có khóa học nào
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Hãy tạo khóa học đầu tiên để bắt đầu
                </Typography>
                <Button 
                  component={Link}
                  to="/admin/courses"
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                    }
                  }}
                >
                  Quản lý khóa học
                </Button>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {filteredCourses.map((course, index) => (
                  <Grid size={{xs:12, sm:6, md:4, lg:3}} key={course.id}>
                    <Grow in={true} timeout={300 + index * 100}>
                      <Card sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                        }
                      }}>
                        <Box sx={{ 
                          height: 140, 
                          background: `linear-gradient(135deg, ${[
                            '#667eea, #764ba2',
                            '#f093fb, #f5576c',
                            '#4facfe, #00f2fe',
                            '#43e97b, #38f9d7'
                          ][index % 4]})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <SchoolIcon sx={{ fontSize: 48, color: 'white' }} />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {course.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ 
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {course.description}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Chip 
                              label={course.level || 'Cơ bản'} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                            <Box display="flex" gap={1}>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            fullWidth
                            onClick={() => handleAddModule(course.id)}
                            sx={{
                              borderColor: '#667eea',
                              color: '#667eea',
                              '&:hover': {
                                borderColor: '#5a6fd8',
                                backgroundColor: 'rgba(102, 126, 234, 0.04)'
                              }
                            }}
                          >
                            Thêm module
                          </Button>
                        </CardActions>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Quản lý Module
              </Typography>
              <Chip 
                label={`${filteredModules.length} module`} 
                color="secondary" 
                variant="outlined"
              />
            </Box>
            
            {loading ? (
              <Grid container spacing={3}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid size={{xs:12, sm:6, md:4}} key={item}>
                    <Card>
                      <Skeleton variant="rectangular" height={120} />
                      <CardContent>
                        <Skeleton variant="text" sx={{ fontSize: '1.25rem' }} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="40%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : filteredModules.length === 0 ? (
              <Card sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
              }}>
                <ViewModuleIcon sx={{ fontSize: 64, color: '#e67e22', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Chưa có module nào
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Tạo module để tổ chức nội dung khóa học
                </Typography>
                <Button 
                  component={Link}
                  to="/admin/modules"
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e084e9 0%, #e3485a 100%)'
                    }
                  }}
                >
                  Quản lý module
                </Button>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {filteredModules.map((module, index) => (
                  <Grid size={{xs:12, sm:6, md:4}} key={module.id}>
                    <Grow in={true} timeout={300 + index * 100}>
                      <Card sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                        }
                      }}>
                        <Box sx={{ 
                          height: 120, 
                          background: `linear-gradient(135deg, ${[
                            '#f093fb, #f5576c',
                            '#4facfe, #00f2fe',
                            '#43e97b, #38f9d7',
                            '#fa709a, #fee140'
                          ][index % 4]})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <ViewModuleIcon sx={{ fontSize: 40, color: 'white' }} />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600, 
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {module.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Khóa học: {courses.find(c => c.id === module.courseId)?.title || 'N/A'}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Chip 
                              label={`Thứ tự: ${module.moduleOrder || 1}`} 
                              size="small" 
                              color="secondary" 
                              variant="outlined"
                            />
                            <Box display="flex" gap={1}>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={() => {
                                    setSelectedCourseId(module.courseId);
                                    setModuleFormOpen(true);
                                  }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            fullWidth
                            sx={{
                              borderColor: '#f093fb',
                              color: '#f093fb',
                              '&:hover': {
                                borderColor: '#e084e9',
                                backgroundColor: 'rgba(240, 147, 251, 0.04)'
                              }
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </CardActions>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Bài học gần đây
              </Typography>
              <Chip 
                label={`${recentLessons.length} bài học`} 
                color="info" 
                variant="outlined"
              />
            </Box>
            
            {loading ? (
              <Box>
                {[1, 2, 3, 4, 5].map((item) => (
                  <Card key={item} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box display="flex" alignItems="center">
                        <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Skeleton variant="text" sx={{ fontSize: '1.25rem', width: '60%' }} />
                          <Skeleton variant="text" sx={{ width: '40%' }} />
                        </Box>
                        <Skeleton variant="rectangular" width={80} height={32} />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : recentLessons.length === 0 ? (
              <Card sx={{ 
                textAlign: 'center', 
                py: 8,
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
              }}>
                <MenuBookIcon sx={{ fontSize: 64, color: '#2196f3', mb: 2 }} />
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Chưa có bài học nào
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Tạo bài học để bắt đầu chia sẻ kiến thức
                </Typography>
                <Button 
                  component={Link}
                  to="/admin/lessons"
                  variant="contained" 
                  startIcon={<AddIcon />}
                  sx={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3d9bec 0%, #00d9ec 100%)'
                    }
                  }}
                >
                  Quản lý bài học
                </Button>
              </Card>
            ) : (
              <Box>
                {recentLessons.slice(0, 10).map((lesson, index) => (
                  <Grow in={true} timeout={200 + index * 100} key={lesson.id}>
                    <Card sx={{ 
                      mb: 2,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateX(8px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }}>
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ 
                            mr: 2, 
                            width: 48, 
                            height: 48,
                            background: `linear-gradient(135deg, ${[
                              '#4facfe, #00f2fe',
                              '#43e97b, #38f9d7',
                              '#fa709a, #fee140',
                              '#667eea, #764ba2'
                            ][index % 4]})`
                          }}>
                            <MenuBookIcon />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 600,
                              mb: 0.5,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {lesson.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Module: {lesson.module_id || 'N/A'}
                            </Typography>
                            <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                30 phút
                              </Typography>
                              <Box sx={{ mx: 1, width: 4, height: 4, borderRadius: '50%', bgcolor: '#ddd' }} />
                              <Typography variant="caption" color="textSecondary">
                                Thứ tự: {index + 1}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
                            <Chip 
                              label="Video" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                            <Box display="flex" gap={1}>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton size="small" color="primary">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xem trước">
                                <IconButton size="small" color="info">
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Thêm tài nguyên">
                                <IconButton 
                                  size="small" 
                                  color="success"
                                  onClick={() => handleAddResource(lesson.id)}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton size="small" color="error">
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </Box>
            )}
          </Box>
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Thống kê tổng quan
              </Typography>
              <Box display="flex" gap={1}>
                <Chip label="Tuần này" variant="outlined" color="primary" />
                <Chip label="Tháng này" color="primary" />
                <Chip label="Năm này" variant="outlined" color="primary" />
              </Box>
            </Box>
            
            {/* Advanced Stats Grid */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{xs:12, sm:6, md:3}}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Tổng khóa học
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                          {courses.length}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="caption">
                            +12% so với tháng trước
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                        <SchoolIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -20, 
                      right: -20, 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.1)' 
                    }} />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, sm:6, md:3}}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Tổng module
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                          {modules.length}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="caption">
                            +8% so với tháng trước
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                        <ViewModuleIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -20, 
                      right: -20, 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.1)' 
                    }} />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, sm:6, md:3}}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Tổng bài học
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                          {recentLessons.length}
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="caption">
                            +15% so với tháng trước
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                        <MenuBookIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -20, 
                      right: -20, 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.1)' 
                    }} />
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, sm:6, md:3}}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                          Hoạt động hôm nay
                        </Typography>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                          24
                        </Typography>
                        <Box display="flex" alignItems="center">
                          <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="caption">
                            +5% so với hôm qua
                          </Typography>
                        </Box>
                      </Box>
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                        <TrendingUpIcon sx={{ fontSize: 28 }} />
                      </Avatar>
                    </Box>
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -20, 
                      right: -20, 
                      width: 80, 
                      height: 80, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.1)' 
                    }} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            {/* Charts Section */}
            <Grid container spacing={3}>
              <Grid size={{xs:12, md:8}}>
                <Card sx={{ height: 400 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Xu hướng tạo nội dung
                    </Typography>
                    <Box sx={{ 
                      height: 300, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      borderRadius: 2,
                      border: '2px dashed #ddd'
                    }}>
                      <Box textAlign="center">
                        <AnalyticsIcon sx={{ fontSize: 64, color: '#666', mb: 2 }} />
                        <Typography variant="h6" color="textSecondary">
                          Biểu đồ xu hướng
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Tích hợp Chart.js hoặc Recharts để hiển thị dữ liệu
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid size={{xs:12, md:4}}>
                <Card sx={{ height: 400 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Phân bố nội dung
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2">Khóa học</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {((courses.length / (courses.length + modules.length + recentLessons.length)) * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(courses.length / (courses.length + modules.length + recentLessons.length)) * 100}
                        sx={{ height: 8, borderRadius: 4, bgcolor: '#f0f0f0' }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2">Module</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {((modules.length / (courses.length + modules.length + recentLessons.length)) * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(modules.length / (courses.length + modules.length + recentLessons.length)) * 100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4, 
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': { bgcolor: '#4facfe' }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="body2">Bài học</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {((recentLessons.length / (courses.length + modules.length + recentLessons.length)) * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={(recentLessons.length / (courses.length + modules.length + recentLessons.length)) * 100}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4, 
                          bgcolor: '#f0f0f0',
                          '& .MuiLinearProgress-bar': { bgcolor: '#43e97b' }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ 
                      mt: 4, 
                      p: 2, 
                      bgcolor: '#f8f9fa', 
                      borderRadius: 2,
                      textAlign: 'center'
                    }}>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Tổng nội dung
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                        {courses.length + modules.length + recentLessons.length}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
      </Card>


    </Container>
  );
};

export default AdminDashboard;