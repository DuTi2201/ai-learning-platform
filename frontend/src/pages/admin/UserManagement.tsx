import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
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
  Skeleton,
  Alert,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Tab,
  Tabs
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  AdminPanelSettings as AdminIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  SupervisorAccount as TeacherIcon,
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { courseService } from '../../services/courseService';
import { User, Course } from '../../types';

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
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
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

interface UserFormData {
  email: string;
  name: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  phone?: string;
  enrolledCourses: string[];
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [assignCoursesModalOpen, setAssignCoursesModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    name: '',
    role: 'STUDENT',
    phone: '',
    enrolledCourses: []
  });

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handleCreateUser = async () => {
    try {
      await userService.createUser(formData);
      setCreateModalOpen(false);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('Không thể tạo người dùng mới');
      console.error('Error creating user:', err);
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    
    try {
      await userService.updateUser(selectedUser.id, formData);
      setEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('Không thể cập nhật người dùng');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    
    try {
      await userService.deleteUser(userId);
      fetchUsers();
    } catch (err) {
      setError('Không thể xóa người dùng');
      console.error('Error deleting user:', err);
    }
  };

  const handleAssignCourses = async () => {
    if (!selectedUser) return;
    
    try {
      await userService.assignCourses(selectedUser.id, formData.enrolledCourses);
      setAssignCoursesModalOpen(false);
      setSelectedUser(null);
      resetForm();
      fetchUsers();
    } catch (err) {
      setError('Không thể gán khóa học');
      console.error('Error assigning courses:', err);
    }
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.fullName,
      role: user.role,
      phone: user.phone || '',
      enrolledCourses: user.enrolledCourses?.map(ec => ec.courseId) || []
    });
    setEditModalOpen(true);
  };

  const openAssignCoursesModal = (user: User) => {
    setSelectedUser(user);
    setFormData({
      ...formData,
      enrolledCourses: user.enrolledCourses?.map(ec => ec.courseId) || []
    });
    setAssignCoursesModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      role: 'STUDENT',
      phone: '',
      enrolledCourses: []
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'error';
      case 'INSTRUCTOR': return 'warning';
      case 'STUDENT': return 'primary';
      default: return 'default';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Quản trị viên';
      case 'INSTRUCTOR': return 'Giáo viên';
      case 'STUDENT': return 'Học viên';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'ADMIN': return <AdminIcon />;
      case 'INSTRUCTOR': return <TeacherIcon />;
      case 'STUDENT': return <PersonIcon />;
      default: return <PersonIcon />;
    }
  };

  const filteredUsers = users.filter(user => {
    if (tabValue === 0) return true; // Tất cả
    if (tabValue === 1) return user.role === 'STUDENT'; // Học viên
    if (tabValue === 2) return user.role === 'INSTRUCTOR'; // Giáo viên
    if (tabValue === 3) return user.role === 'ADMIN'; // Quản trị viên
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </Link>
        <Link
          color="inherit"
          href="#"
          onClick={() => navigate('/admin')}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <AdminIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Admin Dashboard
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <PeopleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Quản lý người dùng
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Quản lý người dùng
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateModalOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
            boxShadow: '0 3px 5px 2px rgba(76, 175, 80, .3)'
          }}
        >
          Thêm người dùng
        </Button>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Tất cả" icon={<PeopleIcon />} />
          <Tab label="Học viên" icon={<PersonIcon />} />
          <Tab label="Giáo viên" icon={<TeacherIcon />} />
          <Tab label="Quản trị viên" icon={<AdminIcon />} />
        </Tabs>
      </Paper>

      {/* User Table */}
      <Paper>
        <TabPanel value={tabValue} index={tabValue}>
          {loading ? (
            <Box sx={{ p: 3 }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} variant="rectangular" height={60} sx={{ mb: 1 }} />
              ))}
            </Box>
          ) : filteredUsers.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <PeopleIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Không có người dùng nào
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Hãy thêm người dùng đầu tiên
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setCreateModalOpen(true)}
              >
                Thêm người dùng
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Người dùng</TableCell>
                    <TableCell>Vai trò</TableCell>
                    <TableCell>Liên hệ</TableCell>
                    <TableCell>Khóa học</TableCell>
                    <TableCell align="right">Thao tác</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: getRoleColor(user.role) + '.main' }}>
                            {getRoleIcon(user.role)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {user.fullName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {user.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getRoleText(user.role)}
                          color={getRoleColor(user.role) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <EmailIcon fontSize="small" color="action" />
                            <Typography variant="caption">{user.email}</Typography>
                          </Box>

                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          0 khóa học
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => openAssignCoursesModal(user)}
                          sx={{ color: 'primary.main' }}
                        >
                          <AssignmentIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => openEditModal(user)}
                          sx={{ color: 'warning.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteUser(user.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Paper>

      {/* Create User Modal */}
      <Dialog open={createModalOpen} onClose={() => setCreateModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Thêm người dùng mới</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Vai trò</InputLabel>
                  <Select
                    value={formData.role}
                    label="Vai trò"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  >
                    <MenuItem value="STUDENT">Học viên</MenuItem>
                    <MenuItem value="INSTRUCTOR">Giáo viên</MenuItem>
                    <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Autocomplete
                  multiple
                  options={courses}
                  getOptionLabel={(option) => option.title}
                  value={courses.filter(course => formData.enrolledCourses.includes(course.id))}
                  onChange={(event, newValue) => {
                    setFormData({ ...formData, enrolledCourses: newValue.map(course => course.id) });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Khóa học"
                      placeholder="Chọn khóa học"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)}>Hủy</Button>
          <Button onClick={handleCreateUser} variant="contained">Thêm người dùng</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Vai trò</InputLabel>
                  <Select
                    value={formData.role}
                    label="Vai trò"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  >
                    <MenuItem value="STUDENT">Học viên</MenuItem>
                    <MenuItem value="INSTRUCTOR">Giáo viên</MenuItem>
                    <MenuItem value="ADMIN">Quản trị viên</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Hủy</Button>
          <Button onClick={handleEditUser} variant="contained">Cập nhật</Button>
        </DialogActions>
      </Dialog>

      {/* Assign Courses Modal */}
      <Dialog open={assignCoursesModalOpen} onClose={() => setAssignCoursesModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Gán khóa học cho {selectedUser?.fullName}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Autocomplete
              multiple
              options={courses}
              getOptionLabel={(option) => option.title}
              value={courses.filter(course => formData.enrolledCourses.includes(course.id))}
              onChange={(event, newValue) => {
                setFormData({ ...formData, enrolledCourses: newValue.map(course => course.id) });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Khóa học"
                  placeholder="Chọn khóa học"
                  helperText="Chọn các khóa học mà người dùng có thể truy cập"
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignCoursesModalOpen(false)}>Hủy</Button>
          <Button onClick={handleAssignCourses} variant="contained">Gán khóa học</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;