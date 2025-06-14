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
import { Lesson, CreateResourceRequest, ResourceType } from '../../types';

interface ResourceFormProps {
  open: boolean;
  onClose: () => void;
  onResourceCreated: () => void;
  lessonId?: string | null;
}

interface ResourceData {
  title: string;
  type: ResourceType;
  url: string;
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
    type: ResourceType.DOCUMENT,
    url: '',
    lesson_id: lessonId || ''
  });
  
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkResources, setBulkResources] = useState<Omit<ResourceData, 'lesson_id'>[]>([{
    title: '',
    type: ResourceType.DOCUMENT,
    url: ''
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
      type: ResourceType.DOCUMENT,
      url: ''
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
          title: resource.title,
          resourceType: resource.type,
          url: resource.url,
          lessonId: formData.lesson_id
        }));

        await resourceService.bulkCreateResources(formData.lesson_id, resourcesData);
        setSuccess(true);
        
        // Reset bulk form
        setBulkResources([{
          title: '',
          type: ResourceType.DOCUMENT,
          url: ''
        }]);
      } else {
        // Single resource create
        const resourceData: CreateResourceRequest = {
          title: formData.title,
          resourceType: formData.type,
          url: formData.url,
          lessonId: formData.lesson_id
        };

        await resourceService.createResource(resourceData);
        setSuccess(true);
        
        // Reset form
        setFormData({
          title: '',
          type: ResourceType.DOCUMENT,
          url: '',
         
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
        type: ResourceType.DOCUMENT,
        url: '',
        lesson_id: lessonId || ''
      });
      setBulkResources([{
        title: '',
        type: ResourceType.DOCUMENT,
        url: ''
      }]);
      setError(null);
      setSuccess(false);
      setBulkMode(false);
      onClose();
    }
  };

  const isFormValid = bulkMode 
    ? formData.lesson_id && bulkResources.some(r => r.title && r.url)
    : formData.title && formData.url && formData.lesson_id;

  const resourceTypes = [
    { value: 'VIDEO', label: 'Video' },
    { value: 'DOCUMENT', label: 'Tài liệu' },
    { value: 'LINK', label: 'Liên kết' },
    { value: 'FILE', label: 'Tệp tin' }
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {bulkMode ? 'Thêm nhiều tài nguyên' : 'Thêm tài nguyên'}
          </Typography>
          <Box>
            <Chip
              label={bulkMode ? 'Chế độ nhiều' : 'Chế độ đơn'}
              onClick={() => setBulkMode(!bulkMode)}
              color={bulkMode ? 'primary' : 'default'}
              variant={bulkMode ? 'filled' : 'outlined'}
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
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle2">
                        Tài nguyên #{index + 1}
                      </Typography>
                      {bulkResources.length > 1 && (
                        <IconButton 
                          onClick={() => removeBulkResource(index)}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        label="Tên tài nguyên"
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
                          {resourceTypes.map((type) => (
                            <MenuItem key={type.value} value={type.value}>
                              {type.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      
                      <TextField
                        label="URL/Đường dẫn"
                        value={resource.url}
                        onChange={(e) => handleBulkInputChange(index, 'url', e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                        placeholder="https://..."
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
                  label="Tên tài nguyên"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={loading}
                  placeholder="Nhập tên tài nguyên"
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
                    {resourceTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  name="url"
                  label="URL/Đường dẫn"
                  value={formData.url}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={loading}
                  placeholder="https://..."
                  helperText="Đường dẫn đến tài nguyên (video, tài liệu, link...)"
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
            {loading ? 'Đang tạo...' : (bulkMode ? 'Tạo tài nguyên' : 'Thêm tài nguyên')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ResourceForm;