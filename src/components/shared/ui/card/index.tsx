import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';

import Text from '../text';
import styles from './card.module.css';

export default function CardInfo({ ...props }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <section>
      <Card className={styles.container}>
        <Box className={styles.backgroundColorCard}>
          <Text variant="h1" className={styles.titleCard}>
            New Course Name
          </Text>
        </Box>
        <CardContent>
          <Button variant="outlined" color="secondary" className={styles.button}>
            Ver Curso
          </Button>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </section>
  );
}
