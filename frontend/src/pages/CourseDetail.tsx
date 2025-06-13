import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  ExpandMore,
  PlayCircleOutline,
  Description,
  Link as LinkIcon,
  AccessTime,
  Person,
  Star,
  School,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';
import { ResourceType } from '../types';

const CourseHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
  borderRadius: '24px',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  border: `1px solid ${theme.palette.divider}`,
}));

const CourseImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 300,
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${theme.palette.divider}`,
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
  marginTop: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));



export const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return <LoadingSpinner size="large" message="Đang tải thông tin khóa học..." />;
  }

  if (error || !course) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error" gutterBottom>
          Không thể tải thông tin khóa học
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Khóa học không tồn tại hoặc đã bị xóa
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <CourseHeader>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 700, flex: 1 }}>
                {course.title}
              </Typography>
              <Chip
                label={course.level}
                size="medium"
                color={course.level === 'BEGINNER' ? 'success' : course.level === 'INTERMEDIATE' ? 'warning' : 'error'}
              />
            </Box>
            
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
              {course.description}
            </Typography>
            
            <StatsContainer>
              <StatItem>
                <AccessTime />
                <Typography variant="body2">
                  {course.duration || 'Chưa xác định'}
                </Typography>
              </StatItem>
              <StatItem>
                <Person />
                <Typography variant="body2">
                  {course.instructor?.fullName || 'Đang cập nhật'}
                </Typography>
              </StatItem>
              <StatItem>
                <Star />
                <Typography variant="body2">
                  4.8 (128 đánh giá)
                </Typography>
              </StatItem>
              <StatItem>
                <School />
                <Typography variant="body2">
                  {course.modules?.length || 0} modules
                </Typography>
              </StatItem>
            </StatsContainer>
          </Grid>
          
          <Grid size={{ xs: 12, md: 4 }}>
            <CourseImage>
              <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>
                {course.title.substring(0, 2).toUpperCase()}
              </Typography>
            </CourseImage>
          </Grid>
        </Grid>
      </CourseHeader>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Nội dung khóa học
            </Typography>
            
            {course.modules && course.modules.length > 0 ? (
              course.modules.map((module, moduleIndex) => (
                <Accordion key={module.id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Module {moduleIndex + 1}: {module.title}
                      </Typography>
                      <Chip
                        label={`${module.lessons?.length || 0} bài học`}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {module.description}
                    </Typography>
                    
                    {module.lessons && module.lessons.length > 0 && (
                      <List dense>
                        {module.lessons.map((lesson, lessonIndex) => (
                          <ListItem key={lesson.id} sx={{ pl: 0 }}>
                            <ListItemIcon>
                              <PlayCircleOutline color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={`${lessonIndex + 1}. ${lesson.title}`}
                              secondary={lesson.content ? lesson.content.substring(0, 100) + '...' : 'Không có nội dung'}
                            />
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Nội dung khóa học đang được cập nhật...
              </Typography>
            )}
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Thông tin khóa học
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Giảng viên
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {course.instructor?.fullName || 'Đang cập nhật'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Thời lượng
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {course.duration || 'Chưa xác định'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Độ khó
              </Typography>
              <Chip
                label={course.level}
                size="small"
                color={course.level === 'BEGINNER' ? 'success' : course.level === 'INTERMEDIATE' ? 'warning' : 'error'}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Button variant="primary" fullWidth size="large">
              Đăng ký khóa học
            </Button>
            
            <Button variant="outline" fullWidth size="large" sx={{ mt: 2 }}>
              Thêm vào danh sách yêu thích
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};