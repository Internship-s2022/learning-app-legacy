import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Chip, Skeleton, Stack } from '@mui/material';

import { images } from 'src/assets';
import { CustomSwiper, Text } from 'src/components/shared/ui';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getPublicCourses } from 'src/redux/modules/public/thunks';

import CourseCard from './components/course-card';
import HomeScreenFooter from './components/footer';
import HomeScreenHeader from './components/header';
import styles from './home.module.css';

const headerRoutes = [
  <a key="courses" href="#courses-section">
    <Text>Cursos</Text>
  </a>,
  <a
    key="contact"
    href={`mailto:${process.env.REACT_APP_CONTACT_MAIL}`}
    target="_blank"
    rel="noreferrer"
  >
    <Text>Contáctanos</Text>
  </a>,
  <a key="aboutUs" href="https://radiumrocket.com/" target="_blank" rel="noreferrer">
    <Text>Sobre nosotros</Text>
  </a>,
  <Link key="login" to="login">
    <Button variant="contained" color="secondary">
      Log in
    </Button>
  </Link>,
];

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
  }, [courses]);

  const getIndex = (index: number, divider: number): number => {
    if (index < divider) {
      return index;
    }
    return index - divider * Math.floor(index / divider);
  };

  return (
    <>
      <HomeScreenHeader routes={headerRoutes} />
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
            <Text className={styles.subtitle} fontSize="24px" color="#555555" fontWeight="400">
              Despegá tu carrera IT con nosotros y participá por una pasantía en la empresa.
            </Text>
            <Button variant="contained" size="large" className={styles.seeMoreButton}>
              <a href="#courses-section">
                <Text>Quiero ver más</Text>
              </a>
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
            <CustomSwiper slidesPerView={3}>
              {isLoading
                ? [
                    <Stack key="skeleton" spacing={4} className={styles.skeletonContainer}>
                      <Skeleton variant="rectangular" width={390} height={80} />
                      <Skeleton variant="rounded" width={390} height={600} />
                    </Stack>,
                    <Stack key="skeleton" spacing={4} className={styles.skeletonContainer}>
                      <Skeleton variant="rectangular" width={390} height={80} />
                      <Skeleton variant="rounded" width={390} height={600} />
                    </Stack>,
                    <Stack key="skeleton" spacing={4} className={styles.skeletonContainer}>
                      <Skeleton variant="rectangular" width={390} height={80} />
                      <Skeleton variant="rounded" width={390} height={600} />
                    </Stack>,
                  ]
                : courses.map((course, index) => {
                    const imgIndex = getIndex(index, courseImages.length);
                    return (
                      <CourseCard
                        image={courseImages[imgIndex]}
                        key={course._id}
                        name={course.name}
                        startDate={course.startDate}
                        endDate={course.endDate}
                      />
                    );
                  })}
            </CustomSwiper>
            <Box className={styles.background} />
          </Box>
        </Box>
      </Box>
      <HomeScreenFooter />
    </>
  );
};

export default HomeScreen;
