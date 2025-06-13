import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Fade,
  Grow,
  CardActions,
  Tooltip,
  Chip,
  IconButton,
  Skeleton
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CreateCourseForm from '../../components/admin/CreateCourseForm';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';

const CourseManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFormOpen, setCourseFormOpen] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const response = await courseService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleCourseCreated = (course: Course) => {
    setCourseFormOpen(false);
    loadCourses();
  };

  const handleRefresh = () => {
    loadCourses(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Header */}
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
          <IconButton 
            component={Link} 
            to="/admin" 
            sx={{ color: 'white', mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <SchoolIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Quản lý Khóa học
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Tạo và quản lý các khóa học trong hệ thống
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm khóa học..."
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
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCourseFormOpen(true)}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Tạo khóa học mới
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Tổng khóa học
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {courses.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Khóa học hiển thị
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {filteredCourses.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Course List */}
      <Card>
        <CardContent sx={{ p: 3 }}>
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
                <Grid size = {{xs:12, sm:6, md:4, lg:3}}  key={item}>
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
                {searchTerm ? 'Không tìm thấy khóa học nào' : 'Chưa có khóa học nào'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Hãy tạo khóa học đầu tiên để bắt đầu'}
              </Typography>
              {!searchTerm && (
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => setCourseFormOpen(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)'
                    }
                  }}
                >
                  Tạo khóa học đầu tiên
                </Button>
              )}
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredCourses.map((course, index) => (
                <Grid size = {{xs:12, sm:6, md:4, lg:3}}  key={course.id}>
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
                          component={Link}
                          to={`/admin/modules?courseId=${course.id}`}
                          sx={{
                            borderColor: '#667eea',
                            color: '#667eea',
                            '&:hover': {
                              borderColor: '#5a6fd8',
                              backgroundColor: 'rgba(102, 126, 234, 0.04)'
                            }
                          }}
                        >
                          Quản lý Module
                        </Button>
                      </CardActions>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Create Course Modal */}
      <CreateCourseForm
        open={courseFormOpen}
        onClose={() => setCourseFormOpen(false)}
        onCourseCreated={handleCourseCreated}
      />
    </Container>
  );
};

export default CourseManagementPage;