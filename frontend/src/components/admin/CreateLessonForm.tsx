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
  Typography
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { courseService } from '../../services/courseService';
import { lessonService } from '../../services/lessonService';
import { Course, Module, CreateLessonRequest } from '../../types';

interface CreateLessonFormProps {
  open: boolean;
  onClose: () => void;
  onLessonCreated: () => void;
}

interface FormData {
  title: string;
  content: string;
  course_id: string;
  module_id: string;
  instructor_id: string;
  order_index: number;
}

const CreateLessonForm: React.FC<CreateLessonFormProps> = ({
  open,
  onClose,
  onLessonCreated
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    course_id: '',
    module_id: '',
    instructor_id: '',
    order_index: 1
  });
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      loadCourses();
      loadInstructors();
    }
  }, [open]);

  useEffect(() => {
    if (formData.course_id) {
      loadModules(formData.course_id);
    } else {
      setModules([]);
      setFormData(prev => ({ ...prev, module_id: '' }));
    }
  }, [formData.course_id]);

  const loadCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Error loading courses:', error);
      setError('Không thể tải danh sách khóa học');
    }
  };

  const loadModules = async (courseId: string) => {
    try {
      const modules = await courseService.getCourseModules(courseId);
      setModules(modules);
    } catch (error) {
      console.error('Error loading modules:', error);
      setError('Không thể tải danh sách module');
    }
  };

  const loadInstructors = async () => {
    try {
      // Mock instructors for now - replace with actual API call
      const mockInstructors = [
        { id: '1', name: 'Giảng viên A', email: 'instructor.a@example.com' },
        { id: '2', name: 'Giảng viên B', email: 'instructor.b@example.com' },
        { id: '3', name: 'Giảng viên C', email: 'instructor.c@example.com' }
      ];
      setInstructors(mockInstructors);
    } catch (error) {
      console.error('Error loading instructors:', error);
      setError('Không thể tải danh sách giảng viên');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order_index' ? parseInt(value) || 1 : value
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const lessonData: CreateLessonRequest = {
        title: formData.title,
        content: formData.content,
        module_id: formData.module_id,
        instructor_id: formData.instructor_id,
        order_index: formData.order_index
      };

      await lessonService.createLesson(lessonData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        course_id: '',
        module_id: '',
        instructor_id: '',
        order_index: 1
      });
      
      // Show success message for 2 seconds then close
      setTimeout(() => {
        setSuccess(false);
        onLessonCreated();
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error creating lesson:', error);
      setError(error.response?.data?.message || 'Có lỗi xảy ra khi tạo bài học');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        content: '',
        course_id: '',
        module_id: '',
        instructor_id: '',
        order_index: 1
      });
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  const isFormValid = formData.title && formData.content && formData.module_id && formData.instructor_id;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          Tạo bài học mới
        </Typography>
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
              Tạo bài học thành công! Đang đóng form...
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Course Selection */}
            <FormControl fullWidth required>
              <InputLabel>Khóa học</InputLabel>
              <Select
                name="course_id"
                value={formData.course_id}
                onChange={handleSelectChange}
                label="Khóa học"
                disabled={loading}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Module Selection */}
            <FormControl fullWidth required disabled={!formData.course_id}>
              <InputLabel>Module</InputLabel>
              <Select
                name="module_id"
                value={formData.module_id}
                onChange={handleSelectChange}
                label="Module"
                disabled={loading || !formData.course_id}
              >
                {modules.map((module) => (
                  <MenuItem key={module.id} value={module.id}>
                    {module.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Lesson Title */}
            <TextField
              name="title"
              label="Tên bài học"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              required
              disabled={loading}
              placeholder="Nhập tên bài học"
            />

            {/* Instructor Selection */}
            <FormControl fullWidth required>
              <InputLabel>Giảng viên</InputLabel>
              <Select
                name="instructor_id"
                value={formData.instructor_id}
                onChange={handleSelectChange}
                label="Giảng viên"
                disabled={loading}
              >
                {instructors.map((instructor) => (
                  <MenuItem key={instructor.id} value={instructor.id}>
                    {instructor.name} ({instructor.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Order Index */}
            <TextField
              name="order_index"
              label="Thứ tự bài học"
              type="number"
              value={formData.order_index}
              onChange={handleInputChange}
              fullWidth
              disabled={loading}
              inputProps={{ min: 1 }}
              helperText="Thứ tự hiển thị của bài học trong module"
            />

            {/* Content */}
            <TextField
              name="content"
              label="Nội dung bài học"
              value={formData.content}
              onChange={handleInputChange}
              fullWidth
              required
              multiline
              rows={6}
              disabled={loading}
              placeholder="Nhập nội dung chi tiết của bài học"
            />
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
            {loading ? 'Đang tạo...' : 'Tạo bài học'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateLessonForm;