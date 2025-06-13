import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress,
  Typography,
  Chip,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { lessonService } from '../../services/lessonService';
import { resourceService } from '../../services/resourceService';
import { Lesson, CreateResourceRequest } from '../../types';

interface ResourceFormProps {
  open: boolean;
  onClose: () => void;
  onResourceCreated: () => void;
  lessonId?: string | null;
}

interface ResourceData {
  title: string;
  type: 'VIDEO' | 'DOCUMENT' | 'LINK' | 'EXERCISE' | 'QUIZ';
  url: string;
  description: string;
  lesson_id: string;
}

const ResourceForm: React.FC<ResourceFormProps> = ({
  open,
  onClose,
  onResourceCreated,
  lessonId
}) => {
  const [formData, setFormData] = useState<ResourceData>({
    title: '',
    type: 'DOCUMENT',
    url: '',
    description: '',
    lesson_id: lessonId || ''
  });
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkResources, setBulkResources] = useState<Omit<ResourceData, 'lesson_id'>[]>([{
    title: '',
    type: 'DOCUMENT',
    url: '',
    description: ''
  }]);

  useEffect(() => {
    if (open) {
      loadLessons();
      if (lessonId) {
        setFormData(prev => ({ ...prev, lesson_id: lessonId }));
      }
    }
  }, [open, lessonId]);

  const loadLessons = async () => {
    try {
      const lessons = await lessonService.getRecentLessons();
      setLessons(lessons);
    } catch (error) {
      console.error('Error loading lessons:', error);
      setError('Không thể tải danh sách bài học');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBulkInputChange = (index: number, field: keyof Omit<ResourceData, 'lesson_id'>, value: string) => {
    setBulkResources(prev => prev.map((resource, i) => 
      i === index ? { ...resource, [field]: value } : resource
    ));
  };

  const addBulkResource = () => {
    setBulkResources(prev => [...prev, {
      title: '',
      type: 'DOCUMENT',
      url: '',
      description: ''
    }]);
  };

  const removeBulkResource = (index: number) => {
    if (bulkResources.length > 1) {
      setBulkResources(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (bulkMode) {
        // Bulk create resources
        const validResources = bulkResources.filter(resource => 
          resource.title && resource.url && formData.lesson_id
        );
        
        if (validResources.length === 0) {
          setError('Vui lòng điền ít nhất một tài nguyên hợp lệ');
          return;
        }

        const resourcesData = validResources.map(resource => ({
          ...resource,
          lesson_id: formData.lesson_id
        }));

        await resourceService.bulkCreateResources(formData.lesson_id, resourcesData);
        setSuccess(true);
        
        // Reset bulk form
        setBulkResources([{
          title: '',
          type: 'DOCUMENT',
          url: '',
          description: ''
        }]);
      } else {
        // Single resource create
        const resourceData: CreateResourceRequest = {
          title: formData.title,
          resourceType: formData.type,
          url: formData.url,
          description: formData.description,
          lessonId: formData.lesson_id
        };

        await resourceService.createResource(resourceData);
        setSuccess(true);
        
        // Reset single form
        setFormData({
          title: '',
          type: 'DOCUMENT',
          url: '',
          description: '',
          lesson_id: lessonId || ''
        });
      }
      
      // Show success message for 2 seconds then close
      setTimeout(() => {
        setSuccess(false);
        onResourceCreated();
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error creating resource:', error);
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi tạo tài nguyên');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        type: 'DOCUMENT',
        url: '',
        description: '',
        lesson_id: lessonId || ''
      });
      setBulkResources([{
        title: '',
        type: 'DOCUMENT',
        url: '',
        description: ''
      }]);
      setError(null);
      setSuccess(false);
      setBulkMode(false);
      onClose();
    }
  };

  const isFormValid = bulkMode 
    ? bulkResources.some(resource => resource.title && resource.url) && formData.lesson_id
    : formData.title && formData.url && formData.lesson_id;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {bulkMode ? 'Thêm nhiều tài nguyên' : 'Thêm tài nguyên mới'}
          </Typography>
          <Box>
            <Chip 
              label={bulkMode ? 'Chế độ nhiều' : 'Chế độ đơn'} 
              color={bulkMode ? 'secondary' : 'primary'}
              onClick={() => setBulkMode(!bulkMode)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Tạo tài nguyên thành công! Đang đóng form...
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Lesson Selection */}
            <FormControl fullWidth required>
              <InputLabel>Bài học</InputLabel>
              <Select
                name="lesson_id"
                value={formData.lesson_id}
                onChange={handleSelectChange}
                label="Bài học"
                disabled={loading || !!lessonId}
              >
                {lessons.map((lesson) => (
                  <MenuItem key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {bulkMode ? (
              // Bulk Mode
              <Box>
                <Typography variant="h6" gutterBottom>
                  Danh sách tài nguyên
                </Typography>
                {bulkResources.map((resource, index) => (
                  <Box key={index} sx={{ border: 1, borderColor: 'divider', p: 2, mb: 2, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1">
                        Tài nguyên {index + 1}
                      </Typography>
                      {bulkResources.length > 1 && (
                        <IconButton 
                          onClick={() => removeBulkResource(index)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        label="Tiêu đề"
                        value={resource.title}
                        onChange={(e) => handleBulkInputChange(index, 'title', e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                      />
                      
                      <FormControl fullWidth required>
                        <InputLabel>Loại tài nguyên</InputLabel>
                        <Select
                          value={resource.type}
                          onChange={(e) => handleBulkInputChange(index, 'type', e.target.value)}
                          label="Loại tài nguyên"
                          disabled={loading}
                        >
                          <MenuItem value="VIDEO">Video</MenuItem>
                          <MenuItem value="DOCUMENT">Tài liệu</MenuItem>
                          <MenuItem value="LINK">Liên kết</MenuItem>
                          <MenuItem value="EXERCISE">Bài tập</MenuItem>
                          <MenuItem value="QUIZ">Bài kiểm tra</MenuItem>
                        </Select>
                      </FormControl>
                      
                      <TextField
                        label="URL"
                        value={resource.url}
                        onChange={(e) => handleBulkInputChange(index, 'url', e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                        placeholder="https://..."
                      />
                      
                      <TextField
                        label="Mô tả"
                        value={resource.description}
                        onChange={(e) => handleBulkInputChange(index, 'description', e.target.value)}
                        fullWidth
                        multiline
                        rows={2}
                        disabled={loading}
                      />
                    </Box>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={addBulkResource}
                  variant="outlined"
                  disabled={loading}
                >
                  Thêm tài nguyên
                </Button>
              </Box>
            ) : (
              // Single Mode
              <>
                <TextField
                  name="title"
                  label="Tiêu đề tài nguyên"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={loading}
                  placeholder="Nhập tiêu đề tài nguyên"
                />

                <FormControl fullWidth required>
                  <InputLabel>Loại tài nguyên</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleSelectChange}
                    label="Loại tài nguyên"
                    disabled={loading}
                  >
                    <MenuItem value="VIDEO">Video</MenuItem>
                    <MenuItem value="DOCUMENT">Tài liệu</MenuItem>
                    <MenuItem value="LINK">Liên kết</MenuItem>
                    <MenuItem value="EXERCISE">Bài tập</MenuItem>
                    <MenuItem value="QUIZ">Bài kiểm tra</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  name="url"
                  label="URL tài nguyên"
                  value={formData.url}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={loading}
                  placeholder="https://..."
                />

                <TextField
                  name="description"
                  label="Mô tả"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={loading}
                  placeholder="Mô tả chi tiết về tài nguyên"
                />
              </>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button 
            onClick={handleClose} 
            disabled={loading}
          >
            Hủy
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!isFormValid || loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Đang tạo...' : (bulkMode ? 'Tạo tất cả' : 'Tạo tài nguyên')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ResourceForm;