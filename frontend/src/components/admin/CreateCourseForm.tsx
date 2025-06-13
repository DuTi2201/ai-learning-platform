import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { courseService } from '../../services/courseService';
import { Course, CreateCourseRequest } from '../../types';

interface CreateCourseFormProps {
  open: boolean;
  onClose: () => void;
  onCourseCreated: (course: Course) => void;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  open,
  onClose,
  onCourseCreated
}) => {
  const [formData, setFormData] = useState<CreateCourseRequest>({
    title: '',
    description: '',
    level: 'BEGINNER',
    duration_hours: 0,
    price: 0,
    thumbnail_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CreateCourseRequest) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'duration_hours' || field === 'price' ? Number(value) : value
    }));
  };

  const handleLevelChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      level: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      setLoading(false);
      return;
    }

    if (formData.duration_hours <= 0 || formData.price < 0) {
      setError('Thời lượng phải lớn hơn 0 và giá phải không âm');
      setLoading(false);
      return;
    }

    try {
      const course = await courseService.createCourse(formData);
      onCourseCreated(course);
      setFormData({
        title: '',
        description: '',
        level: 'BEGINNER',
        duration_hours: 0,
        price: 0,
        thumbnail_url: ''
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        description: '',
        level: 'BEGINNER',
        duration_hours: 0,
        price: 0,
        thumbnail_url: ''
      });
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tạo khóa học mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Tiêu đề khóa học"
              value={formData.title}
              onChange={handleInputChange('title')}
              required
              fullWidth
              disabled={loading}
            />
            
            <TextField
              label="Mô tả"
              value={formData.description}
              onChange={handleInputChange('description')}
              required
              fullWidth
              multiline
              rows={4}
              disabled={loading}
            />
            
            <FormControl fullWidth disabled={loading}>
              <InputLabel>Cấp độ</InputLabel>
              <Select
                value={formData.level}
                onChange={handleLevelChange}
                label="Cấp độ"
              >
                <MenuItem value="BEGINNER">Cơ bản</MenuItem>
                <MenuItem value="INTERMEDIATE">Trung cấp</MenuItem>
                <MenuItem value="ADVANCED">Nâng cao</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Thời lượng (giờ)"
              type="number"
              value={formData.duration_hours}
              onChange={handleInputChange('duration_hours')}
              required
              fullWidth
              disabled={loading}
              inputProps={{ min: 1 }}
            />
            
            <TextField
              label="Giá (VND)"
              type="number"
              value={formData.price}
              onChange={handleInputChange('price')}
              required
              fullWidth
              disabled={loading}
              inputProps={{ min: 0 }}
            />
            
            <TextField
              label="URL hình ảnh (tùy chọn)"
              value={formData.thumbnail_url}
              onChange={handleInputChange('thumbnail_url')}
              fullWidth
              disabled={loading}
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Đang tạo...' : 'Tạo khóa học'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCourseForm;