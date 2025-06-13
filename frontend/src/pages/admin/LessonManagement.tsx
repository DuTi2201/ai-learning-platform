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
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  PlayCircleOutline as LessonIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  LibraryBooks as ModuleIcon,
  AccessTime as TimeIcon,
  VideoLibrary as VideoIcon,
  Article as ArticleIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { lessonService } from '../../services/lessonService';
import { moduleService } from '../../services/moduleService';
import { Lesson, Module } from '../../types';

interface CreateLessonData {
  title: string;
  description: string;
  content: string;
  type: 'VIDEO' | 'ARTICLE' | 'QUIZ';
  duration: number;
  moduleId: string;
  orderIndex: number;
}

const LessonManagement: React.FC = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [formData, setFormData] = useState<CreateLessonData>({
    title: '',
    description: '',
    content: '',
    type: 'VIDEO',
    duration: 0,
    moduleId: '',
    orderIndex: 0
  });

  useEffect(() => {
    fetchLessons();
    fetchModules();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const data = await lessonService.getAllLessons();
      setLessons(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách bài học');
      console.error('Error fetching lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      const data = await moduleService.getAllModules();
      setModules(data);
    } catch (err) {
      console.error('Error fetching modules:', err);
    }
  };

  const handleCreateLesson = async () => {
    try {
      await lessonService.createLesson(formData);
      setCreateModalOpen(false);
      resetForm();
      fetchLessons();
    } catch (err) {
      setError('Không thể tạo bài học mới');
      console.error('Error creating lesson:', err);
    }
  };

  const handleEditLesson = async () => {
    if (!selectedLesson) return;
    
    try {
      await lessonService.updateLesson(selectedLesson.id, formData);
      setEditModalOpen(false);
      setSelectedLesson(null);
      resetForm();
      fetchLessons();
    } catch (err) {
      setError('Không thể cập nhật bài học');
      console.error('Error updating lesson:', err);
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bài học này?')) return;
    
    try {
      await lessonService.deleteLesson(lessonId);
      fetchLessons();
    } catch (err) {
      setError('Không thể xóa bài học');
      console.error('Error deleting lesson:', err);
    }
  };

  const openEditModal = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      type: lesson.type,
      duration: lesson.duration,
      moduleId: lesson.moduleId,
      orderIndex: lesson.orderIndex
    });
    setEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      type: 'VIDEO',
      duration: 0,
      moduleId: '',
      orderIndex: 0
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIDEO': return 'primary';
      case 'ARTICLE': return 'success';
      case 'QUIZ': return 'warning';
      default: return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'VIDEO': return 'Video';
      case 'ARTICLE': return 'Bài viết';
      case 'QUIZ': return 'Bài kiểm tra';
      default: return type;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return <VideoIcon />;
      case 'ARTICLE': return <ArticleIcon />;
      case 'QUIZ': return <QuizIcon />;
      default: return <LessonIcon />;
    }
  };

  const getModuleTitle = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    return module ? module.title : 'Không xác định';
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
          <LessonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quản lý bài học
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý bài học
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)',
            boxShadow: '0 3px 5px 2px rgba(156, 39, 176, .3)'
          }}
        >
          Tạo bài học mới
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Lesson Grid */}
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
        ) : lessons.length === 0 ? (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                background: 'linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)',
                borderRadius: 2
              }}
            >
              <LessonIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Chưa có bài học nào
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Hãy tạo bài học đầu tiên để bắt đầu
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
              >
                Tạo bài học mới
              </Button>
            </Box>
          </Grid>
        ) : (
          lessons.map((lesson) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={lesson.id}>
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
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    {getTypeIcon(lesson.type)}
                  </Avatar>
                  <Chip
                    label={getTypeText(lesson.type)}
                    color={getTypeColor(lesson.type) as any}
                    size="small"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                  <Chip
                    label={`#${lesson.orderIndex}`}
                    variant="outlined"
                    size="small"
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      left: 16,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {lesson.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {lesson.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      icon={<ModuleIcon />}
                      label={getModuleTitle(lesson.moduleId)} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TimeIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {lesson.duration} phút
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {lesson.resources?.length || 0} tài liệu
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/lessons/${lesson.id}`)}
                      sx={{ color: 'primary.main' }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(lesson)}
                      sx={{ color: 'warning.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteLesson(lesson.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create Lesson Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo bài học mới</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề bài học"
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
            <TextField
              fullWidth
              label="Nội dung"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <FormControl fullWidth>
                  <InputLabel>Loại bài học</InputLabel>
                  <Select
                    value={formData.type}
                    label="Loại bài học"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="ARTICLE">Bài viết</MenuItem>
                    <MenuItem value="QUIZ">Bài kiểm tra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  fullWidth
                  label="Thời lượng (phút)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                />
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Module</InputLabel>
              <Select
                value={formData.moduleId}
                label="Module"
                onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
              >
                {modules.map((module) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateLesson} variant="contained">Tạo bài học</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Lesson Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa bài học</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề bài học"
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
            <TextField
              fullWidth
              label="Nội dung"
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Loại bài học</InputLabel>
                  <Select
                    value={formData.type}
                    label="Loại bài học"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="ARTICLE">Bài viết</MenuItem>
                    <MenuItem value="QUIZ">Bài kiểm tra</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Thời lượng (phút)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Thứ tự"
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Module</InputLabel>
              <Select
                value={formData.moduleId}
                label="Module"
                onChange={(e) => setFormData({ ...formData, moduleId: e.target.value })}
              >
                {modules.map((module) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
          <Button onClick={handleEditLesson} variant="contained">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LessonManagement;