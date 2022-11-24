import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

const Course = (): JSX.Element => {
  const { courseId } = useParams();
  return (
    <Box>
      <div>course with id: {courseId}</div>
    </Box>
  );
};

export default Course;
