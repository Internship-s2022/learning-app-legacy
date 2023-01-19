import { format, formatDistanceStrict, parseISO } from 'date-fns';
import { es } from 'date-fns/esm/locale';
import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, ThemeProvider } from '@mui/material';

import { images } from 'src/assets';
import PublicScreenFooter from 'src/components/shared/common/public/footer';
import HomeScreenHeader from 'src/components/shared/common/public/header';
import { Text } from 'src/components/shared/ui';
import { responsiveTheme } from 'src/config/material-theme';
import { publicHeaderRoutes } from 'src/constants/public-header';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getPublicCourses } from 'src/redux/modules/public/thunks';

import styles from './course-info.module.css';

const checkboxesText = [
  'No requiere conocimiento previo',
  'Metodología real de trabajo',
  'Sin costo',
  'Dictado por profesionales',
];

const CourseInfoScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { courses } = useAppSelector((state) => state.public);

  useEffect(() => {
    if (!courses.length) {
      dispatch(getPublicCourses('?isActive=true'));
    }
  }, [courses, dispatch]);

  const course = useMemo(
    () => courses.find((course) => course._id === courseId),
    [courseId, courses],
  );

  const ImageText = ({ children }: { children: string }) => (
    <Text color="white" fontSize="18px" fontWeight={600}>
      {children}
    </Text>
  );

  window.scrollTo(0, 0);

  return (
    <ThemeProvider theme={responsiveTheme}>
      <HomeScreenHeader routes={publicHeaderRoutes} />
      <Box component="main" className={styles.main}>
        <Box component="section" className={styles.introContainer}>
          <Box className={styles.introTextContainer}>
            <Text variant="h1" fontSize="52px" color="primary" fontWeight="800">
              {course?.name}
            </Text>
            <Text
              sx={{ mt: 2, mb: 6 }}
              fontSize="24px"
              color="#555555"
              fontWeight="400"
              className={styles.description}
            >
              {course?.description}
            </Text>
          </Box>
          <img
            src={images.course08Main.imagePath}
            alt={images.course08Main.alt}
            className={styles.image}
          />
        </Box>
        <Box component="section" className={styles.requirements}>
          <Text color="white" variant="h2" fontSize="32px" textAlign="center">
            Requisitos
          </Text>
          <Box className={styles.requirementsContainer}>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img src={images.course04Guy.imagePath} alt={images.course04Guy.alt} />
              </Box>
              <ImageText>Ser mayor de 21 años</ImageText>
            </Box>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img src={images.course05ArgFlag.imagePath} alt={images.course05ArgFlag.alt} />
                <img src={images.course06UyFlag.imagePath} alt={images.course06UyFlag.alt} />
              </Box>
              <ImageText>Vivir en Argentina o Uruguay</ImageText>
            </Box>
            <Box className={styles.reqContainer}>
              <Box className={styles.imagesContainer}>
                <img src={images.course07EngFlag.imagePath} alt={images.course07EngFlag.alt} />
              </Box>
              <ImageText>Inglés fluido (no excluyente)</ImageText>
            </Box>
          </Box>
        </Box>
        <Box component="section" className={styles.checkboxesContainer}>
          {checkboxesText.map((text) => (
            <Box key={text} className={styles.checkContainer}>
              <CheckCircleIcon color="secondary" sx={{ mr: 1 }} />
              <Text fontSize="18px" fontWeight={500}>
                {text}
              </Text>
            </Box>
          ))}
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
                {format(parseISO(course?.inscriptionStartDate), 'dd/LL')}
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
