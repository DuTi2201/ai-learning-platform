import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Skeleton,
  Alert,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  LibraryBooks as ModuleIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  School as SchoolIcon,
  PlayCircleOutline as LessonIcon,
  AccessTime as TimeIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { moduleService } from '../../services/moduleService';
import { courseService } from '../../services/courseService';
import { Module, Course } from '../../types';

interface CreateModuleData {
  title: string;
  description: string;
  courseId: string;
  orderIndex: number;
}

const ModuleManagement: React.FC = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [formData, setFormData] = useState<CreateModuleData>({
    title: '',
    description: '',
    courseId: '',
    orderIndex: 0
  });

  useEffect(() => {
    fetchModules();
    fetchCourses();
  }, []);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const data = await moduleService.getAllModules();
      setModules(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách module');
      console.error('Error fetching modules:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleCreateModule = async () => {
    try {
      await moduleService.createModule(formData);
      setCreateModalOpen(false);
      setFormData({
        title: '',
        description: '',
        courseId: '',
        orderIndex: 0
      });
      fetchModules();
    } catch (err) {
      setError('Không thể tạo module mới');
      console.error('Error creating module:', err);
    }
  };

  const handleEditModule = async () => {
    if (!selectedModule) return;
    
    try {
      await moduleService.updateModule(selectedModule.id, formData);
      setEditModalOpen(false);
      setSelectedModule(null);
      setFormData({
        title: '',
        description: '',
        courseId: '',
        orderIndex: 0
      });
      fetchModules();
    } catch (err) {
      setError('Không thể cập nhật module');
      console.error('Error updating module:', err);
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa module này?')) return;
    
    try {
      await moduleService.deleteModule(moduleId);
      fetchModules();
    } catch (err) {
      setError('Không thể xóa module');
      console.error('Error deleting module:', err);
    }
  };

  const openEditModal = (module: Module) => {
    setSelectedModule(module);
    setFormData({
      title: module.title,
      description: module.description,
      courseId: module.courseId,
      orderIndex: module.orderIndex
    });
    setEditModalOpen(true);
  };

  const openDetailModal = (module: Module) => {
    setSelectedModule(module);
    setDetailModalOpen(true);
  };

  const getCourseTitle = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : 'Không xác định';
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/admin')}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AdminIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Admin Dashboard
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <ModuleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quản lý module
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý module
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
          }}
        >
          Tạo module mới
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Module Grid */}
      <Grid container spacing={3}>
        {loading ? (
          // Loading skeletons
          Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={20} />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : modules.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                borderRadius: 2
              }}
            >
              <ModuleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Chưa có module nào
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Hãy tạo module đầu tiên để bắt đầu
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
              >
                Tạo module mới
              </Button>
            </Box>
          </Grid>
        ) : (
          modules.map((module) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={module.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    <ModuleIcon sx={{ fontSize: 32, color: 'white' }} />
                  </Avatar>
                  <Chip
                    label={`#${module.orderIndex}`}
                    color="primary"
                    size="small"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {module.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {module.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      icon={<SchoolIcon />}
                      label={getCourseTitle(module.courseId)} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {module.lessons?.length || 0} bài học
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => openDetailModal(module)}
                        sx={{ color: 'primary.main' }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => openEditModal(module)}
                        sx={{ color: 'warning.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteModule(module.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create Module Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo module mới</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề module"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <FormControl fullWidth>
                  <InputLabel>Khóa học</InputLabel>
                  <Select
                    value={formData.courseId}
                    label="Khóa học"
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Thứ tự"
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateModule} variant="contained">Tạo module</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Module Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa module</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề module"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Mô tả"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <FormControl fullWidth>
                  <InputLabel>Khóa học</InputLabel>
                  <Select
                    value={formData.courseId}
                    label="Khóa học"
                    onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  >
                    {courses.map((course) => (
                      <MenuItem key={course.id} value={course.id}>
                        {course.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Thứ tự"
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
          <Button onClick={handleEditModule} variant="contained">Cập nhật</Button>
        </DialogActions>
      </Dialog>

      {/* Module Detail Modal */}
      <Dialog open={detailModalOpen} onClose={() => setDetailModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ModuleIcon />
          Chi tiết module
        </DialogTitle>
        <DialogContent>
          {selectedModule && (
            <Box sx={{ pt: 2 }}>
              <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
                  {selectedModule.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 2 }}>
                  {selectedModule.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<SchoolIcon />}
                    label={getCourseTitle(selectedModule.courseId)} 
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip 
                    label={`Thứ tự: ${selectedModule.orderIndex}`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                  <Chip 
                    icon={<LessonIcon />}
                    label={`${selectedModule.lessons?.length || 0} bài học`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                  />
                </Box>
              </Paper>

              {/* Lessons List */}
              <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LessonIcon />
                Danh sách bài học
              </Typography>
              
              {selectedModule.lessons && selectedModule.lessons.length > 0 ? (
                <List>
                  {selectedModule.lessons.map((lesson, index) => (
                    <React.Fragment key={lesson.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                            {index + 1}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={lesson.title}
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TimeIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  {lesson.duration || 0} phút
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AssignmentIcon fontSize="small" color="action" />
                                <Typography variant="caption">
                                  {lesson.resources?.length || 0} tài liệu
                                </Typography>
                              </Box>
                              <Chip 
                                label={lesson.type || 'VIDEO'} 
                                size="small" 
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < selectedModule.lessons.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <LessonIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Module này chưa có bài học nào
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailModalOpen(false)}>Đóng</Button>
          {selectedModule && (
            <Button 
              onClick={() => {
                setDetailModalOpen(false);
                openEditModal(selectedModule);
              }} 
              variant="contained"
            >
              Chỉnh sửa
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ModuleManagement;