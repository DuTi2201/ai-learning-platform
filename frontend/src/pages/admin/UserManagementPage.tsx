import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Pagination,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profilePictureUrl?: string;
  createdAt: string;
  _count: {
    enrollments: number;
    lessonProgress: number;
  };
}

interface Course {
  id: string;
  title: string;
  courseCode: string;
  description?: string;
}

interface Enrollment {
  id: string;
  enrollmentType: string;
  enrollmentDate: string;
  course: Course;
  user: User;
}

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
      id={`user-management-tabpanel-${index}`}
      aria-labelledby={`user-management-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `user-management-tab-${index}`,
    'aria-controls': `user-management-tabpanel-${index}`,
  };
}

const UserManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [instructors, setInstructors] = useState<User[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(1);
    setSearchTerm('');
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/admin/list', {
        params: {
          page,
          limit: 10,
          search: searchTerm,
          role: roleFilter,
        },
      });
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
      setAlert({ type: 'error', message: 'Lỗi khi tải danh sách người dùng' });
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/instructors/list', {
        params: {
          page,
          limit: 10,
          search: searchTerm,
        },
      });
      setInstructors(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching instructors:', error);
      setAlert({ type: 'error', message: 'Lỗi khi tải danh sách giảng viên' });
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      // This would need a new API endpoint to get all enrollments
      // For now, we'll use a placeholder
      setEnrollments([]);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      setAlert({ type: 'error', message: 'Lỗi khi tải danh sách gán khóa học' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabValue === 0) {
      fetchUsers();
    } else if (tabValue === 1) {
      fetchInstructors();
    } else if (tabValue === 2) {
      fetchEnrollments();
    }
  }, [tabValue, page, searchTerm, roleFilter]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      await api.patch(`/users/${selectedUser.id}/role`, { role: selectedRole });
      setAlert({ type: 'success', message: 'Cập nhật quyền thành công' });
      setOpenRoleDialog(false);
      fetchUsers();
      if (selectedRole === 'INSTRUCTOR') {
        fetchInstructors();
      }
    } catch (error) {
      console.error('Error updating role:', error);
      setAlert({ type: 'error', message: 'Lỗi khi cập nhật quyền' });
    }
  };

  const handleAssignCourse = async () => {
    if (!selectedUser || !selectedCourse) return;

    try {
      await api.post('/users/assign-course', {
        userId: selectedUser.id,
        courseId: selectedCourse,
      });
      setAlert({ type: 'success', message: 'Gán khóa học thành công' });
      setOpenAssignDialog(false);
      fetchEnrollments();
    } catch (error) {
      console.error('Error assigning course:', error);
      setAlert({ type: 'error', message: 'Lỗi khi gán khóa học' });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'error';
      case 'INSTRUCTOR':
        return 'warning';
      case 'STUDENT':
        return 'info';
      default:
        return 'default';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Quản trị viên';
      case 'INSTRUCTOR':
        return 'Giảng viên';
      case 'STUDENT':
        return 'Học viên';
      default:
        return 'Người dùng';
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" color="error">
          Truy cập bị từ chối
        </Typography>
        <Typography variant="body1">
          Bạn không có quyền truy cập vào trang quản lý người dùng.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        p: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        color: 'white',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            mr: 2, 
            width: 56, 
            height: 56 
          }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
              Quản lý Người dùng
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Quản lý người dùng, giảng viên và gán khóa học
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                </InputAdornment>
              ),
              sx: {
                bgcolor: 'rgba(255,255,255,0.15)',
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)'
                },
                '& input::placeholder': {
                  color: 'rgba(255,255,255,0.7)'
                }
              }
            }}
            sx={{ minWidth: 250 }}
          />
          
          <Tooltip title="Làm mới dữ liệu">
            <IconButton 
              onClick={() => {
                if (tabValue === 0) fetchUsers();
                else if (tabValue === 1) fetchInstructors();
                else fetchEnrollments();
              }}
              sx={{ 
                color: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Alert */}
      {alert && (
        <Alert 
          severity={alert.type} 
          onClose={() => setAlert(null)}
          sx={{ mb: 2 }}
        >
          {alert.message}
        </Alert>
      )}

      {/* Tabs */}
      <Card sx={{ mb: 4 }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '12px 12px 0 0'
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                minHeight: 64,
                '&.Mui-selected': {
                  color: 'white'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'white',
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              icon={<PersonIcon />} 
              iconPosition="start" 
              label="Danh sách Users" 
              {...a11yProps(0)}
            />
            <Tab 
              icon={<SchoolIcon />} 
              iconPosition="start" 
              label="Quản lý Instructors" 
              {...a11yProps(1)}
            />
            <Tab 
              icon={<AssignmentIcon />} 
              iconPosition="start" 
              label="Gán Khóa học" 
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        {/* Tab Panel 0: Users List */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Danh sách người dùng</Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Lọc theo quyền</InputLabel>
              <Select
                value={roleFilter}
                label="Lọc theo quyền"
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <MenuItem value="ALL">Tất cả</MenuItem>
                <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                <MenuItem value="INSTRUCTOR">Giảng viên</MenuItem>
                <MenuItem value="STUDENT">Học viên</MenuItem>
                <MenuItem value="USER">Người dùng</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Người dùng</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Quyền</TableCell>
                      <TableCell>Khóa học</TableCell>
                      <TableCell>Tiến độ</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={user.profilePictureUrl} 
                              sx={{ mr: 2, width: 40, height: 40 }}
                            >
                              {user.fullName.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>
                              {user.fullName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={getRoleLabel(user.role)} 
                            color={getRoleColor(user.role) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{user._count.enrollments}</TableCell>
                        <TableCell>{user._count.lessonProgress}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Cập nhật quyền">
                            <IconButton 
                              size="small"
                              onClick={() => {
                                setSelectedUser(user);
                                setSelectedRole(user.role);
                                setOpenRoleDialog(true);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Gán khóa học">
                            <IconButton 
                              size="small"
                              onClick={() => {
                                setSelectedUser(user);
                                setOpenAssignDialog(true);
                              }}
                            >
                              <AssignmentIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </TabPanel>

        {/* Tab Panel 1: Instructors */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Quản lý giảng viên</Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Giảng viên</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Khóa học</TableCell>
                      <TableCell>Bài học</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {instructors.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={instructor.profilePictureUrl} 
                              sx={{ mr: 2, width: 40, height: 40 }}
                            >
                              {instructor.fullName.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>
                              {instructor.fullName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{instructor.email}</TableCell>
                        <TableCell>{instructor._count.enrollments}</TableCell>
                        <TableCell>{instructor._count.lessonProgress}</TableCell>
                        <TableCell>
                          {new Date(instructor.createdAt).toLocaleDateString('vi-VN')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            </>
          )}
        </TabPanel>

        {/* Tab Panel 2: Course Assignment */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">Quản lý gán khóa học</Typography>
            <Typography variant="body2" color="text.secondary">
              Danh sách các khóa học được gán bởi admin
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Alert severity="info">
              Chức năng này đang được phát triển. Vui lòng sử dụng tab "Danh sách Users" để gán khóa học.
            </Alert>
          )}
        </TabPanel>
      </Card>

      {/* Role Update Dialog */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)}>
        <DialogTitle>Cập nhật quyền người dùng</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Người dùng: <strong>{selectedUser?.fullName}</strong>
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Quyền</InputLabel>
              <Select
                value={selectedRole}
                label="Quyền"
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="USER">Người dùng</MenuItem>
                <MenuItem value="STUDENT">Học viên</MenuItem>
                <MenuItem value="INSTRUCTOR">Giảng viên</MenuItem>
                <MenuItem value="ADMIN">Quản trị viên</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)}>Hủy</Button>
          <Button onClick={handleUpdateRole} variant="contained">
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Course Assignment Dialog */}
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)}>
        <DialogTitle>Gán khóa học</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Người dùng: <strong>{selectedUser?.fullName}</strong>
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Khóa học</InputLabel>
              <Select
                value={selectedCourse}
                label="Khóa học"
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title} ({course.courseCode})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Hủy</Button>
          <Button onClick={handleAssignCourse} variant="contained">
            Gán khóa học
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagementPage;