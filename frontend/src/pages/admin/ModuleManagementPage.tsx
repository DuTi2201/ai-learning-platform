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
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  ViewModule as ViewModuleIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CreateModuleForm from '../../components/admin/CreateModuleForm';
import { moduleService } from '../../services/moduleService';
import { courseService } from '../../services/courseService';
import { Module, Course } from '../../types';

const ModuleManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [modules, setModules] = useState<Module[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>(searchParams.get('courseId') || 'all');
  const [moduleFormOpen, setModuleFormOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(searchParams.get('courseId'));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Load modules and courses
      const [modulesResponse, coursesResponse] = await Promise.all([
        moduleService.getAllModules(),
        courseService.getAllCourses()
      ]);
      
      setModules(modulesResponse.data);
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleModuleCreated = () => {
    setModuleFormOpen(false);
    setSelectedCourseId(null);
    loadData();
  };

  const handleRefresh = () => {
    loadData(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCourseFilterChange = (event: any) => {
    setSelectedCourseFilter(event.target.value);
  };

  const handleAddModule = (courseId?: string) => {
    setSelectedCourseId(courseId || null);
    setModuleFormOpen(true);
  };

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourseFilter === 'all' || module.courseId === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

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
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
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
          <ViewModuleIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Quản lý Module
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Tạo và quản lý các module trong khóa học
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm module..."
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
            sx={{ minWidth: 200 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedCourseFilter}
              onChange={handleCourseFilterChange}
              displayEmpty
              sx={{
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
            >
              <MenuItem value="all">Tất cả khóa học</MenuItem>
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
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
            onClick={() => handleAddModule()}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Tạo module mới
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Tổng module
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {modules.length}
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
                Module hiển thị
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {filteredModules.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
      </Grid>

      {/* Module List */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Danh sách module
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
                {searchTerm || selectedCourseFilter !== 'all' ? 'Không tìm thấy module nào' : 'Chưa có module nào'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {searchTerm || selectedCourseFilter !== 'all' ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' : 'Tạo module để tổ chức nội dung khóa học'}
              </Typography>
              {!searchTerm && selectedCourseFilter === 'all' && (
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleAddModule()}
                  sx={{
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #e084e9 0%, #e3485a 100%)'
                    }
                  }}
                >
                  Tạo module đầu tiên
                </Button>
              )}
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredModules.map((module, index) => (
                <Grid size = {{xs:12, sm:6, md:4}} key={module.id}>
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
                          component={Link}
                          to={`/admin/lessons?moduleId=${module.id}`}
                          sx={{
                            borderColor: '#f093fb',
                            color: '#f093fb',
                            '&:hover': {
                              borderColor: '#e084e9',
                              backgroundColor: 'rgba(240, 147, 251, 0.04)'
                            }
                          }}
                        >
                          Quản lý Bài học
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

      {/* Create Module Modal */}
      <CreateModuleForm
        open={moduleFormOpen}
        onClose={() => setModuleFormOpen(false)}
        onModuleCreated={handleModuleCreated}
        courses={courses}
        selectedCourseId={selectedCourseId}
      />
    </Container>
  );
};

export default ModuleManagementPage;