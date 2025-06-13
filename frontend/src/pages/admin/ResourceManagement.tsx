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
  Download as DownloadIcon,
  Folder as ResourceIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  LibraryBooks as LessonIcon,
  InsertDriveFile as FileIcon,
  Link as LinkIcon,
  VideoLibrary as VideoIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { resourceService } from '../../services/resourceService';
import { lessonService } from '../../services/lessonService';
import { Resource, Lesson } from '../../types';

interface CreateResourceData {
  title: string;
  description: string;
  type: 'FILE' | 'LINK' | 'VIDEO';
  url: string;
  lessonId: string;
}

const ResourceManagement: React.FC = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState<CreateResourceData>({
    title: '',
    description: '',
    type: 'FILE',
    url: '',
    lessonId: ''
  });

  useEffect(() => {
    fetchResources();
    fetchLessons();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await resourceService.getAllResources();
      setResources(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách tài liệu');
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLessons = async () => {
    try {
      const data = await lessonService.getAllLessons();
      setLessons(data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const handleCreateResource = async () => {
    try {
      await resourceService.createResource(formData);
      setCreateModalOpen(false);
      resetForm();
      fetchResources();
    } catch (err) {
      setError('Không thể tạo tài liệu mới');
      console.error('Error creating resource:', err);
    }
  };

  const handleEditResource = async () => {
    if (!selectedResource) return;
    
    try {
      await resourceService.updateResource(selectedResource.id, formData);
      setEditModalOpen(false);
      setSelectedResource(null);
      resetForm();
      fetchResources();
    } catch (err) {
      setError('Không thể cập nhật tài liệu');
      console.error('Error updating resource:', err);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) return;
    
    try {
      await resourceService.deleteResource(resourceId);
      fetchResources();
    } catch (err) {
      setError('Không thể xóa tài liệu');
      console.error('Error deleting resource:', err);
    }
  };

  const openEditModal = (resource: Resource) => {
    setSelectedResource(resource);
    setFormData({
      title: resource.title,
      description: resource.description,
      type: resource.type,
      url: resource.url,
      lessonId: resource.lessonId
    });
    setEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'FILE',
      url: '',
      lessonId: ''
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'FILE': return 'primary';
      case 'LINK': return 'success';
      case 'VIDEO': return 'warning';
      default: return 'default';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'FILE': return 'Tệp tin';
      case 'LINK': return 'Liên kết';
      case 'VIDEO': return 'Video';
      default: return type;
    }
  };

  const getTypeIcon = (type: string, url?: string) => {
    switch (type) {
      case 'VIDEO': return <VideoIcon />;
      case 'LINK': return <LinkIcon />;
      case 'FILE':
        if (url?.includes('.pdf')) return <PdfIcon />;
        if (url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return <ImageIcon />;
        return <FileIcon />;
      default: return <ResourceIcon />;
    }
  };

  const getLessonTitle = (lessonId: string) => {
    const lesson = lessons.find(l => l.id === lessonId);
    return lesson ? lesson.title : 'Không xác định';
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <ResourceIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quản lý tài liệu
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý tài liệu
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 107, 107, .3)'
          }}
        >
          Tạo tài liệu mới
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Resource Grid */}
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
        ) : resources.length === 0 ? (
            <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                borderRadius: 2
              }}
            >
              <ResourceIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Chưa có tài liệu nào
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Hãy tạo tài liệu đầu tiên để bắt đầu
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
              >
                Tạo tài liệu mới
              </Button>
            </Box>
          </Grid>
        ) : (
            resources.map((resource) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={resource.id}>
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
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <Avatar sx={{ width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.2)' }}>
                    {getTypeIcon(resource.type, resource.url)}
                  </Avatar>
                  <Chip
                    label={getTypeText(resource.type)}
                    color={getTypeColor(resource.type) as any}
                    size="small"
                    sx={{ position: 'absolute', top: 16, right: 16 }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                    {resource.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      icon={<LessonIcon />}
                      label={getLessonTitle(resource.lessonId)} 
                      variant="outlined" 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                    URL: {resource.url.length > 30 ? `${resource.url.substring(0, 30)}...` : resource.url}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {resource.type === 'FILE' && (
                      <IconButton
                        size="small"
                        onClick={() => handleDownload(resource.url, resource.title)}
                        sx={{ color: 'success.main' }}
                      >
                        <DownloadIcon />
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => window.open(resource.url, '_blank')}
                      sx={{ color: 'primary.main' }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => openEditModal(resource)}
                      sx={{ color: 'warning.main' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteResource(resource.id)}
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

      {/* Create Resource Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Tạo tài liệu mới</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề tài liệu"
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
              label="URL/Đường dẫn"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              sx={{ mb: 2 }}
              helperText="Nhập URL cho liên kết/video hoặc đường dẫn file"
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Loại tài liệu</InputLabel>
                  <Select
                    value={formData.type}
                    label="Loại tài liệu"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    <MenuItem value="FILE">Tệp tin</MenuItem>
                    <MenuItem value="LINK">Liên kết</MenuItem>
                    <MenuItem value="VIDEO">Video</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Bài học</InputLabel>
                  <Select
                    value={formData.lessonId}
                    label="Bài học"
                    onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                  >
                    {lessons.map((lesson) => (
                      <MenuItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateResource} variant="contained">Tạo tài liệu</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Resource Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa tài liệu</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Tiêu đề tài liệu"
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
              label="URL/Đường dẫn"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              sx={{ mb: 2 }}
              helperText="Nhập URL cho liên kết/video hoặc đường dẫn file"
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Loại tài liệu</InputLabel>
                  <Select
                    value={formData.type}
                    label="Loại tài liệu"
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  >
                    <MenuItem value="FILE">Tệp tin</MenuItem>
                    <MenuItem value="LINK">Liên kết</MenuItem>
                    <MenuItem value="VIDEO">Video</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Bài học</InputLabel>
                  <Select
                    value={formData.lessonId}
                    label="Bài học"
                    onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                  >
                    {lessons.map((lesson) => (
                      <MenuItem key={lesson.id} value={lesson.id}>
                        {lesson.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
          <Button onClick={handleEditResource} variant="contained">Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ResourceManagement;