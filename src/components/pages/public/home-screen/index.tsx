import React, { useEffect } from 'react';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Box, Button, Chip, Skeleton, Stack, ThemeProvider } from '@mui/material';

import { images } from 'src/assets';
import PublicScreenFooter from 'src/components/shared/common/public/footer';
import HomeScreenHeader from 'src/components/shared/common/public/header';
import { CustomSwiper, Text } from 'src/components/shared/ui';
import { responsiveTheme } from 'src/config/material-theme';
import { publicHeaderRoutes } from 'src/constants/public-header';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
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
  const { width } = useWindowDimensions();

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

  const customQuery = width > 768;
  const customIsDesktop = width > 1050;
  const coursesSlidesPerView = customIsDesktop ? 3 : customQuery ? 2 : 1;

  return (
    <ThemeProvider theme={responsiveTheme}>
      <HomeScreenHeader routes={publicHeaderRoutes} />
      <Box component="main" className={styles.main}>
        <Chip className={styles.chip} color="inscription" label="Inscripciones abiertas" />
        <Box component="section" className={styles.introContainer}>
          <Box className={styles.introTextContainer}>
            <Text variant="h1" color="primary" fontWeight="900" fontFamily="Raleway">
              Become a Software Professional
            </Text>
            <Box className={styles.descriptionContainer}>
              <Text variant="description">Despegá tu carrera IT con nosotros.</Text>
            </Box>
            <Button variant="contained" className={styles.seeMoreButton} href="#courses-section">
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
              className={`${styles.imageLine} ${styles.imageLineLeft}`}
              src={images.home03Line.imagePath}
              alt={images.home03Line.alt}
            />
            <Text
              className={styles.coursesText}
              variant="description"
              color="#5A5A5A"
              fontWeight="600"
            >
              Nuestros cursos
            </Text>
            <img
              className={`${styles.imageLine} ${styles.imageLineRight}`}
              src={images.home02Line.imagePath}
              alt={images.home02Line.alt}
            />
          </Box>
          {courses.length === 0 && !isLoading && (
            <Box className={styles.notCoursesWarning}>
              <WarningRoundedIcon color="primary" />
              <Text sx={{ marginLeft: '8px' }} variant="description" fontWeight="600">
                Actualmente no estamos dictando cursos, volvé a consultarnos más adelante.
              </Text>
            </Box>
          )}
          <Box className={styles.swiperContainer}>
            <CustomSwiper slidesPerView={coursesSlidesPerView} showButtonsNav={customQuery}>
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
    </ThemeProvider>
  );
};

export default HomeScreen;
