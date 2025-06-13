import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import CreateLessonForm from '../components/admin/CreateLessonForm';
import ResourceForm from '../components/admin/ResourceForm';
import { courseService } from '../services/courseService';
import { lessonService } from '../services/lessonService';
import { Course, Lesson } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentLessons, setRecentLessons] = useState<Lesson[]>([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLessons: 0,
    totalStudents: 0,
    totalResources: 0
  });
  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [resourceFormOpen, setResourceFormOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load courses
      const coursesResponse = await courseService.getAllCourses();
      setCourses(coursesResponse.data);
      
      // Load recent lessons (mock for now)
      // const lessonsResponse = await lessonService.getRecentLessons();
      // setRecentLessons(lessonsResponse.data);
      
      // Update stats
      setStats({
        totalCourses: coursesResponse.data.length,
        totalLessons: 0, // Will be updated when lesson API is available
        totalStudents: 0, // Will be updated when user stats API is available
        totalResources: 0 // Will be updated when resource stats API is available
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLessonCreated = () => {
    setLessonFormOpen(false);
    loadDashboardData();
  };

  const handleResourceCreated = () => {
    setResourceFormOpen(false);
    setSelectedLessonId(null);
  };

  const handleAddResource = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setResourceFormOpen(true);
  };

  if (user?.role !== 'ADMIN') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" color="error">
          Truy cập bị từ chối
        </Typography>
        <Typography variant="body1">
          Bạn không có quyền truy cập vào trang quản trị.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bảng điều khiển quản trị
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs">
          <Tab label="Tổng quan" {...a11yProps(0)} />
          <Tab label="Quản lý nội dung" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* Overview Tab */}
        <Grid container spacing={3}>
          {/* Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng khóa học
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalCourses}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MenuBookIcon color="secondary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng bài học
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalLessons}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon color="success" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng học viên
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalStudents}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AssignmentIcon color="warning" sx={{ mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng tài nguyên
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalResources}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Khóa học gần đây
              </Typography>
              <List>
                {courses.slice(0, 5).map((course) => (
                  <React.Fragment key={course.id}>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={course.title}
                        secondary={course.description}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bài học gần đây
              </Typography>
              <List>
                {recentLessons.slice(0, 5).map((lesson) => (
                  <React.Fragment key={lesson.id}>
                    <ListItem>
                      <ListItemIcon>
                        <MenuBookIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={`Thứ tự: ${lesson.order_index}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Content Management Tab */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setLessonFormOpen(true)}
                sx={{ mr: 2 }}
              >
                Tạo bài học mới
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setResourceFormOpen(true)}
              >
                Thêm tài nguyên
              </Button>
            </Box>
          </Grid>

          {/* Course Management */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quản lý khóa học
              </Typography>
              <Grid container spacing={2}>
                {courses.map((course) => (
                  <Grid item xs={12} md={6} lg={4} key={course.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          {course.description}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined">
                            Chỉnh sửa
                          </Button>
                          <Button 
                            size="small" 
                            variant="text"
                            onClick={() => handleAddResource(course.id)}
                          >
                            Thêm tài nguyên
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Lessons Management */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Bài học gần đây
              </Typography>
              <List>
                {recentLessons.map((lesson) => (
                  <React.Fragment key={lesson.id}>
                    <ListItem
                      secondaryAction={
                        <Box>
                          <Button size="small" sx={{ mr: 1 }}>
                            Chỉnh sửa
                          </Button>
                          <Button 
                            size="small" 
                            onClick={() => handleAddResource(lesson.id)}
                          >
                            Thêm tài nguyên
                          </Button>
                        </Box>
                      }
                    >
                      <ListItemIcon>
                        <MenuBookIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={lesson.title}
                        secondary={`Thứ tự: ${lesson.order_index}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Forms */}
      {lessonFormOpen && (
        <CreateLessonForm
          open={lessonFormOpen}
          onClose={() => setLessonFormOpen(false)}
          onLessonCreated={handleLessonCreated}
        />
      )}
      {resourceFormOpen && (
        <ResourceForm
          open={resourceFormOpen}
          onClose={() => setResourceFormOpen(false)}
          onResourceCreated={handleResourceCreated}
          lessonId={selectedLessonId}
        />
      )}
      {/* Create Lesson Form */}
      <CreateLessonForm
        open={lessonFormOpen}
        onClose={() => setLessonFormOpen(false)}
        onLessonCreated={handleLessonCreated}
      />

      {/* Resource Form */}
      <ResourceForm
        open={resourceFormOpen}
        onClose={() => setResourceFormOpen(false)}
        onResourceCreated={handleResourceCreated}
      />
    </Container>
  );
};

export default AdminDashboard;