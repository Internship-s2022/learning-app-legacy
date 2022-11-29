import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { Text } from 'src/components/shared/ui';
import { useAppSelector } from 'src/redux';
import { RootReducer } from 'src/redux/modules/types';

const LandingAdmin = (): JSX.Element => {
  const courses = useAppSelector((state: RootReducer) => state.auth?.userInfo?.courses);
  const navigate = useNavigate();
  return (
    <section>
      <h2>Admin Landing screen.</h2>
      {courses ? (
        courses.map((course, index) => (
          <Button key={index} onClick={() => navigate(`/admin/course/${course.course._id}`)}>
            {course.course.name}
          </Button>
        ))
      ) : (
        <Text>No tiene asignado ningún rol en ningún curso.</Text>
      )}
    </section>
  );
};

export default LandingAdmin;
