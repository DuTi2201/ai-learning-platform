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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { moduleService } from '../../services/moduleService';
import { Module, Course } from '../../types';

interface CreateModuleFormProps {
  open: boolean;
  onClose: () => void;
  onModuleCreated: (module: Module) => void;
  courses: Course[];
  selectedCourseId?: string | null;
}

interface ModuleFormData {
  title: string;
  description: string;
  courseId: string;
  moduleOrder: number;
}

const CreateModuleForm: React.FC<CreateModuleFormProps> = ({
  open,
  onClose,
  onModuleCreated,
  courses,
  selectedCourseId
}) => {
  const [formData, setFormData] = useState<ModuleFormData>({
    title: '',
    description: '',
    courseId: selectedCourseId || '',
    moduleOrder: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (selectedCourseId) {
      setFormData(prev => ({ ...prev, courseId: selectedCourseId }));
    }
  }, [selectedCourseId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'moduleOrder' ? parseInt(value) || 1 : value
    }));
  };

  const handleSelectChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      courseId: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const module = await moduleService.createModule(formData);
      onModuleCreated(module);
      setFormData({
        title: '',
        description: '',
        courseId: selectedCourseId || '',
        moduleOrder: 1
      });
      onClose();
    } catch (err: any) {
      console.error('Error creating module:', err);
      const errorMessage = err.response?.data?.message || 'Có lỗi xảy ra khi tạo module';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      courseId: selectedCourseId || '',
      moduleOrder: 1
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Tạo module mới</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth required>
              <InputLabel>Khóa học</InputLabel>
              <Select
                value={formData.courseId}
                onChange={handleSelectChange}
                label="Khóa học"
                disabled={!!selectedCourseId}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <TextField
              name="title"
              label="Tiêu đề module"
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
              margin="normal"
            />
            
            <TextField
              name="moduleOrder"
              label="Thứ tự"
              type="number"
              value={formData.moduleOrder}
              onChange={handleInputChange}
              required
              fullWidth
              inputProps={{ min: 1 }}
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
            disabled={loading || !formData.courseId}
          >
            {loading ? 'Đang tạo...' : 'Tạo module'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateModuleForm;