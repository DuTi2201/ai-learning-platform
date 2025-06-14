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
  Grow,
  Tooltip,
  Chip,
  IconButton,
  Skeleton,
  FormControl,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import {
  Add as AddIcon,
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Refresh as RefreshIcon,
  Preview as PreviewIcon,
  AttachFile as AttachFileIcon,
  PlayArrow as PlayIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CreateLessonForm from '../../components/admin/CreateLessonForm';
import ResourceForm from '../../components/admin/ResourceForm';
import { lessonService } from '../../services/lessonService';
import { moduleService } from '../../services/moduleService';
import { courseService } from '../../services/courseService';
import { resourceService } from '../../services/resourceService';
import { Lesson, Module, Course } from '../../types';

const LessonManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>(searchParams.get('moduleId') || 'all');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>(searchParams.get('courseId') || 'all');
  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [resourceFormOpen, setResourceFormOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(searchParams.get('moduleId'));
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState<Lesson | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewingLesson, setPreviewingLesson] = useState<Lesson | null>(null);
  const [lessonResources, setLessonResources] = useState<any[]>([]);

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
      
      // Load lessons, modules, and courses
      const [lessonsResponse, modulesResponse, coursesResponse] = await Promise.all([
        lessonService.getAllLessons(),
        moduleService.getAllModules(),
        courseService.getAllCourses()
      ]);
      
      console.log('Lessons response:', lessonsResponse);
      console.log('Modules response:', modulesResponse);
      console.log('Courses response:', coursesResponse);
      
      // Debug individual items
      if (modulesResponse.data && modulesResponse.data.length > 0) {
        console.log('First module structure:', modulesResponse.data[0]);
      }
      if (coursesResponse.data && coursesResponse.data.length > 0) {
        console.log('First course structure:', coursesResponse.data[0]);
      }
      if (lessonsResponse && lessonsResponse.length > 0) {
        console.log('First lesson structure:', lessonsResponse[0]);
      }
      
      setLessons(lessonsResponse);
      setModules(modulesResponse.data);
      setCourses(coursesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLessonCreated = () => {
    setLessonFormOpen(false);
    setSelectedModuleId(null);
    loadData();
  };

  const handleResourceAdded = () => {
    setResourceFormOpen(false);
    setSelectedLessonId(null);
    loadData();
  };

  const handleRefresh = () => {
    loadData(true);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleModuleFilterChange = (event: any) => {
    setSelectedModuleFilter(event.target.value);
  };

  const handleCourseFilterChange = (event: any) => {
    setSelectedCourseFilter(event.target.value);
    setSelectedModuleFilter('all'); // Reset module filter when course changes
  };

  const handleAddLesson = (moduleId?: string) => {
    setSelectedModuleId(moduleId || null);
    setLessonFormOpen(true);
  };

  const handleAddResource = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setResourceFormOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setSelectedModuleId(lesson.module_id);
    setLessonFormOpen(true);
  };

  const handlePreviewLesson = async (lesson: Lesson) => {
    try {
      setPreviewingLesson(lesson);
      // Load resources for this lesson
      const resources = await resourceService.getResourcesByLessonId(lesson.id);
      setLessonResources(resources);
      setPreviewDialogOpen(true);
    } catch (error) {
      console.error('Error loading lesson resources:', error);
      setLessonResources([]);
      setPreviewDialogOpen(true);
    }
  };

  const handleClosePreviewDialog = () => {
    setPreviewDialogOpen(false);
    setPreviewingLesson(null);
    setLessonResources([]);
  };

  const handleResourceUpdated = async () => {
    if (previewingLesson) {
      try {
        const resources = await resourceService.getResourcesByLessonId(previewingLesson.id);
        setLessonResources(resources);
      } catch (error) {
        console.error('Error reloading lesson resources:', error);
      }
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    try {
      await resourceService.deleteResource(resourceId);
      await handleResourceUpdated();
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setLessonToDelete(lesson);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteLesson = async () => {
    if (!lessonToDelete) return;
    
    try {
      await lessonService.deleteLesson(lessonToDelete.id);
      setDeleteConfirmOpen(false);
      setLessonToDelete(null);
      loadData();
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const cancelDeleteLesson = () => {
    setDeleteConfirmOpen(false);
    setLessonToDelete(null);
  };

  const filteredModules = selectedCourseFilter === 'all' 
    ? modules 
    : modules.filter(module => module.courseId === selectedCourseFilter);

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModuleFilter === 'all' || lesson.module_id === selectedModuleFilter;
    const matchesCourse = selectedCourseFilter === 'all' ||
      modules.find(m => m.id === lesson.module_id)?.courseId === selectedCourseFilter;
    return matchesSearch && matchesModule && matchesCourse;
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
        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
          <MenuBookIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Quản lý Bài học
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Tạo và quản lý nội dung bài học
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm bài học..."
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
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedModuleFilter}
              onChange={handleModuleFilterChange}
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
              <MenuItem value="all">Tất cả module</MenuItem>
              {filteredModules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.title}
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
            onClick={() => handleAddLesson()}
            sx={{
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.3)'
              }
            }}
          >
            Tạo bài học mới
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Tổng bài học
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {lessons.length}
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
                Bài học hiển thị
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {filteredLessons.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
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
        <Grid size = {{xs:12, sm:6, md:3}}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
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

      {/* Lesson List */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#2c3e50' }}>
              Danh sách bài học
            </Typography>
            <Chip 
              label={`${filteredLessons.length} bài học`} 
              color="secondary" 
              variant="outlined"
            />
          </Box>
          
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
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
          ) : filteredLessons.length === 0 ? (
            <Card sx={{ 
              textAlign: 'center', 
              py: 8,
              background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
            }}>
              <MenuBookIcon sx={{ fontSize: 64, color: '#e67e22', mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {searchTerm || selectedModuleFilter !== 'all' || selectedCourseFilter !== 'all' ? 'Không tìm thấy bài học nào' : 'Chưa có bài học nào'}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                {searchTerm || selectedModuleFilter !== 'all' || selectedCourseFilter !== 'all' ? 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm' : 'Tạo bài học để bắt đầu xây dựng nội dung'}
              </Typography>
              {!searchTerm && selectedModuleFilter === 'all' && selectedCourseFilter === 'all' && (
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={() => handleAddLesson()}
                  sx={{
                    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3dd470 0%, #32e6c5 100%)'
                    }
                  }}
                >
                  Tạo bài học đầu tiên
                </Button>
              )}
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredLessons.map((lesson: any, index) => {
                // Try to get module and course from lesson data first (if included)
                const lessonModule = lesson.module;
                const lessonCourse = lessonModule?.course;
                
                // Fallback to finding in separate arrays
                const module = lessonModule || modules.find(m => m.id === lesson.moduleId || m.id === lesson.module_id);
                const course = lessonCourse || courses.find(c => {
                  if (module && 'courseId' in module) {
                    return c.id === module.courseId;
                  }
                  return false;
                });
                
                // Debug logs for first lesson
                if (index === 0) {
                  console.log('Debug lesson mapping:');
                  console.log('Lesson:', lesson);
                  console.log('Lesson module:', lessonModule);
                  console.log('Lesson course:', lessonCourse);
                  console.log('Found module:', module);
                  console.log('Found course:', course);
                }
                
                return (
                  <Grid size={{xs:12, sm:6, md:4}} key={lesson.id}>
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
                            '#43e97b, #38f9d7',
                            '#4facfe, #00f2fe',
                            '#f093fb, #f5576c',
                            '#fa709a, #fee140',
                            '#667eea, #764ba2'
                          ][index % 5]})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}>
                          <MenuBookIcon sx={{ fontSize: 40, color: 'white' }} />
                          {(lesson.lessonType || 'TEXT') === 'VIDEO' && (
                            <PlayIcon sx={{ 
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              color: 'white',
                              fontSize: 20
                            }} />
                          )}
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
                            {lesson.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            Module: {lesson.module?.title || module?.title || 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                            Khóa học: {lesson.module?.course?.title || course?.title || 'N/A'}
                          </Typography>
                          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Chip 
                              label={lesson.lessonType || 'TEXT'} 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                            <Chip 
                              label={`Thứ tự: ${lesson.order_index || 1}`} 
                              size="small" 
                              color="secondary" 
                              variant="outlined"
                            />
                          </Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box display="flex" gap={1}>
                              <Tooltip title="Chỉnh sửa">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={() => handleEditLesson(lesson)}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xem trước">
                                <IconButton 
                                  size="small" 
                                  color="info"
                                  onClick={() => handlePreviewLesson(lesson)}
                                >
                                  <PreviewIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Thêm tài nguyên">
                                <IconButton 
                                  size="small" 
                                  color="success"
                                  onClick={() => handleAddResource(lesson.id)}
                                >
                                  <AttachFileIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <IconButton 
                                  size="small" 
                                  color="error"
                                  onClick={() => handleDeleteLesson(lesson)}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grow>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Create Lesson Modal */}
      <CreateLessonForm
        open={lessonFormOpen}
        onClose={() => {
          setLessonFormOpen(false);
          setEditingLesson(null);
        }}
        onLessonCreated={handleLessonCreated}
        modules={modules}
        selectedModuleId={selectedModuleId}
        editingLesson={editingLesson}
      />

      {/* Resource Form Modal */}
      <ResourceForm
        open={resourceFormOpen}
        onClose={() => setResourceFormOpen(false)}
        onResourceCreated={() => {
          handleResourceAdded();
          if (previewDialogOpen) {
            handleResourceUpdated();
          }
        }}
        lessonId={selectedLessonId}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={cancelDeleteLesson}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Xác nhận xóa bài học
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Bạn có chắc chắn muốn xóa bài học "{lessonToDelete?.title}"? 
            Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteLesson} color="primary">
            Hủy
          </Button>
          <Button onClick={confirmDeleteLesson} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Lesson Preview Dialog */}
      <Dialog
        open={previewDialogOpen}
        onClose={handleClosePreviewDialog}
        maxWidth="lg"
        fullWidth
        aria-labelledby="preview-dialog-title"
      >
        <DialogTitle id="preview-dialog-title">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Xem trước bài học: {previewingLesson?.title}
            </Typography>
            <IconButton onClick={handleClosePreviewDialog}>
               <CloseIcon />
             </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {previewingLesson && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Lesson Information */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin bài học
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size = {{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Tiêu đề:
                      </Typography>
                      <Typography variant="body1">
                        {previewingLesson.title}
                      </Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Loại:
                      </Typography>
                      <Chip 
                        label={previewingLesson.lessonType || 'TEXT'} 
                        size="small" 
                        color={previewingLesson.lessonType === 'VIDEO' ? 'primary' : 'secondary'}
                      />
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Thứ tự:
                      </Typography>
                      <Typography variant="body1">
                        {previewingLesson.order_index}
                      </Typography>
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Module:
                      </Typography>
                      <Typography variant="body1">
                        {modules.find(m => m.id === previewingLesson.module_id)?.title || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid size={{xs: 12}}>
                      <Typography variant="body2" color="text.secondary">
                        Nội dung:
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                        {previewingLesson.content}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Resources Section */}
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                      Tài nguyên đính kèm ({lessonResources.length})
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        setSelectedLessonId(previewingLesson.id);
                        setResourceFormOpen(true);
                      }}
                    >
                      Thêm tài nguyên
                    </Button>
                  </Box>
                  
                  {lessonResources.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                      Chưa có tài nguyên nào được thêm vào bài học này.
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {lessonResources.map((resource) => (
                        <Grid size={{xs: 12, md: 6}} key={resource.id}>
                          <Card variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" gutterBottom>
                                    {resource.title}
                                  </Typography>
                                  <Chip 
                                    label={resource.type} 
                                    size="small" 
                                    color="primary" 
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography variant="body2" color="text.secondary">
                                    {resource.url}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                  <Tooltip title="Chỉnh sửa">
                                    <IconButton 
                                      size="small"
                                      onClick={() => {
                                        // TODO: Implement edit resource
                                        console.log('Edit resource:', resource.id);
                                      }}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Xóa">
                                    <IconButton 
                                      size="small" 
                                      color="error"
                                      onClick={() => handleDeleteResource(resource.id)}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </Card>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreviewDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LessonManagementPage;