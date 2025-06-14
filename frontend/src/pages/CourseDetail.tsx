import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card as MuiCard,
  CardContent,
  IconButton,
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
  Close as CloseIcon,
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
  const { courseId } = useParams<{ courseId: string }>();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);

  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => courseService.getCourseById(courseId!),
    enabled: !!courseId,
  });

  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson);
    setLessonDialogOpen(true);
  };

  const handleCloseLessonDialog = () => {
    setLessonDialogOpen(false);
    setSelectedLesson(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !course) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error">
          Không thể tải thông tin khóa học
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
                          <ListItem 
                            key={lesson.id} 
                            sx={{ 
                              pl: 0, 
                              cursor: 'pointer',
                              borderRadius: 1,
                              '&:hover': {
                                backgroundColor: 'action.hover'
                              }
                            }}
                            onClick={() => handleLessonClick(lesson)}
                          >
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
              <Typography variant="body1">
                {course.duration || 'Chưa xác định'}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Cấp độ
              </Typography>
              <Chip
                label={course.level}
                size="small"
                color={course.level === 'BEGINNER' ? 'success' : course.level === 'INTERMEDIATE' ? 'warning' : 'error'}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="primary" fullWidth>
                Đăng ký khóa học
              </Button>
              <Button variant="outline" fullWidth>
                Thêm vào danh sách yêu thích
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* LessonDetailDialog */}
      <Dialog
        open={lessonDialogOpen}
        onClose={handleCloseLessonDialog}
        maxWidth="lg"
        fullWidth
        aria-labelledby="lesson-dialog-title"
      >
        <DialogTitle id="lesson-dialog-title">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {selectedLesson?.title}
            </Typography>
            <IconButton onClick={handleCloseLessonDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedLesson && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Lesson Information */}
              <MuiCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thông tin bài học
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Loại bài học:
                      </Typography>
                      <Chip 
                        label={selectedLesson.lessonType || 'TEXT'} 
                        size="small" 
                        color={selectedLesson.lessonType === 'VIDEO' ? 'primary' : 'secondary'}
                      />
                    </Grid>
                    <Grid size={{xs: 12, md: 6}}>
                      <Typography variant="body2" color="text.secondary">
                        Thứ tự:
                      </Typography>
                      <Typography variant="body1">
                        {selectedLesson.order_index}
                      </Typography>
                    </Grid>
                    <Grid size={{xs: 12}}>
                      <Typography variant="body2" color="text.secondary">
                        Nội dung:
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                        {selectedLesson.content}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </MuiCard>

              {/* Resources Section */}
              <MuiCard>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Tài nguyên đính kèm ({selectedLesson.resources?.length || 0})
                  </Typography>
                  
                  {!selectedLesson.resources || selectedLesson.resources.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                      Chưa có tài nguyên nào được thêm vào bài học này.
                    </Typography>
                  ) : (
                    <Grid container spacing={2}>
                      {selectedLesson.resources.map((resource: any) => (
                        <Grid size={{xs: 12, md: 6}} key={resource.id}>
                          <MuiCard variant="outlined">
                            <CardContent>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" gutterBottom>
                                    {resource.title}
                                  </Typography>
                                  <Chip 
                                    label={resource.resourceType} 
                                    size="small" 
                                    color="primary" 
                                    sx={{ mb: 1 }}
                                  />
                                  <Typography 
                                    variant="body2" 
                                    color="primary" 
                                    sx={{ 
                                      cursor: 'pointer',
                                      textDecoration: 'underline',
                                      '&:hover': {
                                        textDecoration: 'none'
                                      }
                                    }}
                                    onClick={() => window.open(resource.url, '_blank')}
                                  >
                                    Mở tài liệu
                                  </Typography>
                                </Box>
                                <IconButton 
                                  size="small"
                                  onClick={() => window.open(resource.url, '_blank')}
                                >
                                  <LinkIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            </CardContent>
                          </MuiCard>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </CardContent>
              </MuiCard>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLessonDialog}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseDetail;