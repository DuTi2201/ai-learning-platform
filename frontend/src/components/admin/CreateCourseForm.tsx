import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { courseService } from '../../services/courseService';
import { Course } from '../../types';

interface CreateCourseFormProps {
  open: boolean;
  onClose: () => void;
  onCourseCreated: (course: Course) => void;
}

interface CourseFormData {
  title: string;
  description: string;
}

const CreateCourseForm: React.FC<CreateCourseFormProps> = ({
  open,
  onClose,
  onCourseCreated
}) => {
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const course = await courseService.createCourse(formData);
      onCourseCreated(course);
      setFormData({
        title: '',
        description: ''
      });
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi tạo khóa học');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: ''
    });
    setError(null);
    onClose();
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
              name="title"
              label="Tiêu đề khóa học"
              value={formData.title}
              onChange={handleInputChange}
              required
              fullWidth
            />
            
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Mô tả"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              margin="normal"
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
          >
            {loading ? 'Đang tạo...' : 'Tạo khóa học'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateCourseForm;