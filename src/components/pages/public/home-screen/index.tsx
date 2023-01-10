import React, { useEffect } from 'react';
import { Box, Button, Chip, Skeleton, Stack } from '@mui/material';

import { images } from 'src/assets';
import PublicScreenFooter from 'src/components/pages/public/footer';
import HomeScreenHeader from 'src/components/pages/public/header';
import { CustomSwiper, Text } from 'src/components/shared/ui';
import { publicHeaderRoutes } from 'src/constants/public-header';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getPublicCourses } from 'src/redux/modules/public/thunks';

import CourseCard from './components/course-card';
import styles from './home.module.css';

const courseImages = [images.course01, images.course02, images.course03].map((image) => ({
  src: image.imagePath,
  alt: image.alt,
}));

const HomeScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { courses, isLoading } = useAppSelector((state) => state.public);

  useEffect(() => {
    if (!courses.length) {
      dispatch(getPublicCourses('?isActive=true'));
    }
  }, [courses, dispatch]);

  const getIndex = (index: number, divider: number): number => {
    if (index < divider) {
      return index;
    }
    return index - divider * Math.floor(index / divider);
  };

  const coursesSlidesPerView = 3;

  return (
    <>
      <HomeScreenHeader routes={publicHeaderRoutes} />
      <Box component="main" className={styles.main}>
        <Chip className={styles.chip} color="inscription" label="Inscripciones abiertas" />
        <Box component="section" className={styles.introContainer}>
          <Box className={styles.introTextContainer}>
            <Text variant="h1" fontSize="52px" color="primary" fontWeight="800">
              Become a
            </Text>
            <Text variant="h1" fontSize="52px" color="primary" fontWeight="800">
              Software Professional
            </Text>
            <Text sx={{ mt: 2, mb: 6 }} fontSize="24px" color="#555555" fontWeight="400">
              Despegá tu carrera IT con nosotros y participá por una pasantía en la empresa.
            </Text>
            <Button
              variant="contained"
              size="large"
              className={styles.seeMoreButton}
              href="#courses-section"
            >
              Quiero ver más
            </Button>
          </Box>
          <img
            src={images.home01Idea.imagePath}
            alt={images.home01Idea.alt}
            className={styles.image}
          />
        </Box>
        <Box component="section" id="courses-section">
          <Box className={styles.coursesTextContainer}>
            <img
              className={styles.imageLineLeft}
              src={images.home03Line.imagePath}
              alt={images.home03Line.alt}
            />
            <Text
              className={styles.coursesText}
              variant="h2"
              color="#5A5A5A"
              textAlign="center"
              fontWeight={600}
              fontSize="32px"
            >
              Nuestros cursos
            </Text>
            <img
              className={styles.imageLineRight}
              src={images.home02Line.imagePath}
              alt={images.home02Line.alt}
            />
          </Box>
          <Box className={styles.swiperContainer}>
            <CustomSwiper slidesPerView={coursesSlidesPerView}>
              {isLoading
                ? Array(coursesSlidesPerView)
                    .fill(1)
                    .map((_, index) => (
                      <Stack key={index} spacing={6} className={styles.skeletonContainer}>
                        <Skeleton variant="rounded" height={80} />
                        <Skeleton variant="rounded" height={548} />
                      </Stack>
                    ))
                : courses.map((course, index) => {
                    const imgIndex = getIndex(index, courseImages.length);
                    return (
                      <CourseCard
                        image={courseImages[imgIndex]}
                        key={course._id}
                        name={course.name}
                        startDate={course.startDate}
                        endDate={course.endDate}
                        courseId={course._id.toString()}
                      />
                    );
                  })}
            </CustomSwiper>
            <Box className={styles.background} />
          </Box>
        </Box>
      </Box>
      <PublicScreenFooter />
    </>
  );
};

export default HomeScreen;
