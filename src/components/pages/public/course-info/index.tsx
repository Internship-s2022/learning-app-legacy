import { format, formatDistanceStrict, parseISO } from 'date-fns';
import { es } from 'date-fns/esm/locale';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, ThemeProvider } from '@mui/material';

import { images } from 'src/assets';
import PublicScreenFooter from 'src/components/shared/common/public/footer';
import HomeScreenHeader from 'src/components/shared/common/public/header';
import { Preloader, Text } from 'src/components/shared/ui';
import { responsiveTheme } from 'src/config/material-theme';
import { publicHeaderRoutes } from 'src/constants/public-header';
import useWindowDimensions from 'src/hooks/useWindowDimensions';
import { Course } from 'src/interfaces/entities/course';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getPublicCourses } from 'src/redux/modules/public/thunks';
import { openModal } from 'src/redux/modules/ui/actions';

import styles from './course-info.module.css';

const checkboxesText = [
  'No requiere conocimiento previo',
  'Metodología real de trabajo',
  'Sin costo',
  'Dictado por profesionales',
];

const ImageText = ({ children, isTablet }: { children: string; isTablet: boolean }) => {
  const fontSize = isTablet ? '12px' : '18px';

  return (
    <Text color="white" fontSize={fontSize} fontWeight="600">
      {children}
    </Text>
  );
};

const CourseInfoScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { width, isPhone } = useWindowDimensions();
  const { courseId } = useParams();
  const { courses } = useAppSelector((state) => state.public);
  const [course, setCourse] = useState<Course>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const customQuery = width < 768;

  const handleQuery = useCallback(async () => {
    await dispatch(getPublicCourses('?isActive=true'));
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    handleQuery();
  }, [dispatch, handleQuery]);

  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId, courses]);

  useEffect(() => {
    const foundCourse = courses.find((course) => course._id === courseId);
    if (!isLoading && (!courses.length || !foundCourse)) {
      dispatch(
        openModal({
          title: 'Curso no disponible',
          description: <Text>El curso ya no se encuentra disponible.</Text>,
          type: 'alert',
          handleOnClose: () => {
            navigate('/', { replace: true });
          },
          confirmButton: 'Cerrar',
        }),
      );
    }
  }, [courseId, courses, courses.length, dispatch, isLoading, navigate]);

  window.scrollTo(0, 0);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <ThemeProvider theme={responsiveTheme}>
      <HomeScreenHeader routes={publicHeaderRoutes} />
      <Box component="main" className={styles.main}>
        <Box component="section" className={styles.introContainer}>
          <Box className={styles.introTextContainer}>
            <Text variant="h1" color="primary" fontWeight="900" fontFamily="Raleway">
              {course?.name}
            </Text>
            <Box className={styles.descriptionContainer}>
              <Text variant="description">{course?.description}</Text>
            </Box>
          </Box>
          <img
            src={images.course08Main.imagePath}
            alt={images.course08Main.alt}
            className={styles.image}
          />
        </Box>
        <Box component="section" className={styles.requirements}>
          <Text color="white" variant="h2" textAlign="center">
            Requisitos
          </Text>
          <Box className={styles.requirementsContainer}>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img
                  className={styles.imageGuy}
                  src={images.course04Guy.imagePath}
                  alt={images.course04Guy.alt}
                />
              </Box>
              <ImageText isTablet={customQuery}>Ser mayor de 21 años.</ImageText>
            </Box>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img
                  className={styles.imageFlag}
                  src={images.course05ArgFlag.imagePath}
                  alt={images.course05ArgFlag.alt}
                />
                <img
                  className={styles.imageFlag}
                  src={images.course06UyFlag.imagePath}
                  alt={images.course06UyFlag.alt}
                />
              </Box>
              <ImageText isTablet={customQuery}>
                Vivir en Rosario (Argentina) o Montevideo (Uruguay).
              </ImageText>
            </Box>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img
                  className={styles.imageFlag}
                  src={images.course07EngFlag.imagePath}
                  alt={images.course07EngFlag.alt}
                />
              </Box>
              <ImageText isTablet={customQuery}>Hablar inglés fluído.</ImageText>
            </Box>
          </Box>
        </Box>
        <Box className={styles.centerContainer}>
          <Box component="section" className={styles.checkboxesContainer}>
            {checkboxesText.map((text) => (
              <Box key={text} className={styles.checkContainer}>
                <CheckCircleIcon color="secondary" sx={{ mr: 1 }} />
                <Text fontSize={isPhone ? '16px' : '18px'} fontWeight="600">
                  {text}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        {course && (
          <Box className={styles.datesContainer} sx={{ mt: 14, mb: 10 }}>
            <Box className={styles.dateAndTextContainer}>
              <Text fontSize="14px">Duración:</Text>
              <Text fontSize="20px">{`${Math.floor(
                parseInt(
                  formatDistanceStrict(parseISO(course?.endDate), parseISO(course?.startDate), {
                    unit: 'day',
                    locale: es,
                  }),
                ) / 7,
              )} semanas`}</Text>
            </Box>
            <Box
              className={`${styles.dateAndTextContainer} ${styles.dateBg}`}
              sx={{ backgroundColor: 'secondary.main' }}
            >
              <Text color="white" fontSize="14px">
                Inscripciones hasta:
              </Text>
              <Text color="white" fontSize="20px">
                {format(parseISO(course?.inscriptionEndDate), 'dd/LL')}
              </Text>
            </Box>
          </Box>
        )}
        <Box className={styles.btnContainer}>
          <Button
            variant="contained"
            size="large"
            color="inscription"
            className={styles.seeMoreButton}
            onClick={() => {
              navigate('inscription/main');
            }}
          >
            Inscribirse ahora
          </Button>
        </Box>
      </Box>
      <PublicScreenFooter />
    </ThemeProvider>
  );
};

export default CourseInfoScreen;
