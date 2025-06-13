import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  School as SchoolIcon,
  MenuBook as BookIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import CreateLessonForm from '../components/admin/CreateLessonForm';
import CreateCourseForm from '../components/admin/CreateCourseForm';
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
    totalStudents: 0
  });
  const [lessonFormOpen, setLessonFormOpen] = useState(false);
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [resourceFormOpen, setResourceFormOpen] = useState(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load courses
      const coursesData = await courseService.getAllCourses();
      setCourses(coursesData);
      
      // Load recent lessons
      const lessonsData = await lessonService.getRecentLessons();
      setRecentLessons(lessonsData);
      
      // Calculate stats
      setStats({
        totalCourses: coursesData.length,
        totalLessons: lessonsData.length,
        totalStudents: 0 // This would come from a separate API
      });
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      setError('Không thể tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLessonCreated = () => {
    setLessonFormOpen(false);
    loadDashboardData();
  };

  const handleCourseCreated = (course: Course) => {
    setCourseFormOpen(false);
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bảng điều khiển Admin
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Chào mừng, {user?.fullName}!
      </Typography>

      <Box sx={{ mt: 4 }}>
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng số khóa học
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalCourses}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <BookIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng số bài học
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalLessons}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      Tổng số học viên
                    </Typography>
                    <Typography variant="h4">
                      {stats.totalStudents}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCourseFormOpen(true)}
          >
            Tạo khóa học mới
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setLessonFormOpen(true)}
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

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs">
            <Tab label="Khóa học" {...a11yProps(0)} />
            <Tab label="Bài học gần đây" {...a11yProps(1)} />
            <Tab label="Thống kê" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Courses Tab */}
        <TabPanel value={tabValue} index={0}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Mã khóa học</TableCell>
                  <TableCell>Giảng viên</TableCell>
                  <TableCell>Số module</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.courseCode}</TableCell>
                    <TableCell>{course.instructor.fullName}</TableCell>
                    <TableCell>{course.modules.length}</TableCell>
                    <TableCell>
                      {new Date(course.createdAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Recent Lessons Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Giảng viên</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentLessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell>{lesson.instructor_id}</TableCell>
                    <TableCell>
                      {new Date(lesson.created_at).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAddResource(lesson.id)}
                      >
                        Thêm tài nguyên
                      </Button>
                      <IconButton size="small" color="primary">
                        <ViewIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Stats Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Thống kê tổng quan
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tổng số khóa học: {stats.totalCourses}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tổng số bài học: {stats.totalLessons}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tổng số học viên: {stats.totalStudents}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>

      {/* Create Course Modal */}
      <CreateCourseForm
        open={courseFormOpen}
        onClose={() => setCourseFormOpen(false)}
        onCourseCreated={handleCourseCreated}
      />

      {/* Create Lesson Modal */}
      <CreateLessonForm
        open={lessonFormOpen}
        onClose={() => setLessonFormOpen(false)}
        onLessonCreated={handleLessonCreated}
      />

      {/* Resource Form Modal */}
      <ResourceForm
        open={resourceFormOpen}
        onClose={() => {
          setResourceFormOpen(false);
          setSelectedLessonId(null);
        }}
        onResourceCreated={handleResourceCreated}
        lessonId={selectedLessonId}
      />
    </Container>
  );
};

export default AdminDashboard;