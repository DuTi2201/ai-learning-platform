import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Rating,
  InputAdornment,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Search,
  AccessTime,
  Person,
  Star,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { courseService } from '../services/courseService';
import { Course } from '../types';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Button } from '../components/common/Button';

const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const CourseImage = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

const CourseStats = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: '0.875rem',
}));

export const Courses: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const limit = 12;

  const {
    data: coursesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses', page, search, sortBy, sortOrder],
    queryFn: () => courseService.getAllCourses({
      page,
      limit,
      search: search || undefined,
      sortBy,
      sortOrder,
    }),
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  if (isLoading) {
    return <LoadingSpinner size="large" message="Đang tải khóa học..." />;
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography variant="h6" color="error" gutterBottom>
          Có lỗi xảy ra khi tải khóa học
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vui lòng thử lại sau
        </Typography>
      </Box>
    );
  }

  const courses = coursesData?.data || [];
  const totalPages = coursesData?.pagination?.totalPages || 1;

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
        Khóa học AI
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Khám phá các khóa học AI chất lượng cao được thiết kế bởi các chuyên gia hàng đầu
      </Typography>

      <SearchContainer>
        <TextField
          placeholder="Tìm kiếm khóa học..."
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300, flex: 1 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sắp xếp theo</InputLabel>
          <Select
            value={sortBy}
            label="Sắp xếp theo"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <MenuItem value="createdAt">Ngày tạo</MenuItem>
            <MenuItem value="title">Tên khóa học</MenuItem>
            <MenuItem value="level">Độ khó</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Thứ tự</InputLabel>
          <Select
            value={sortOrder}
            label="Thứ tự"
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          >
            <MenuItem value="desc">Giảm dần</MenuItem>
            <MenuItem value="asc">Tăng dần</MenuItem>
          </Select>
        </FormControl>
      </SearchContainer>

      {courses.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" gutterBottom>
            Không tìm thấy khóa học nào
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {courses.map((course: Course) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
                <Card hover sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CourseImage>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      {course.title.substring(0, 2).toUpperCase()}
                    </Typography>
                  </CourseImage>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
                        {course.title}
                      </Typography>
                      <Chip
                        label={course.level}
                        size="small"
                        color={course.level === 'BEGINNER' ? 'success' : course.level === 'INTERMEDIATE' ? 'warning' : 'error'}
                        sx={{ ml: 1 }}
                      />
                    </Box>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </Typography>
                    
                    <CourseStats>
                      <StatItem>
                        <AccessTime fontSize="small" />
                        <span>{course.duration || 'N/A'}</span>
                      </StatItem>
                      <StatItem>
                        <Person fontSize="small" />
                        <span>{course.instructor?.fullName || 'TBA'}</span>
                      </StatItem>
                      <StatItem>
                        <Star fontSize="small" />
                        <span>4.8</span>
                      </StatItem>
                    </CourseStats>
                  </Box>
                  
                  <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                    <Button variant="primary" fullWidth>
                      Xem chi tiết
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};