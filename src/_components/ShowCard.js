import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function ShowCard(props) {
    const classes = useStyles();

    const { data, defaultPosterUrl } = props

    console.log('data', data)
    return (
        <Card className={classes.root} className="bms_shows__card">
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={data?.movie?.posterUrl || defaultPosterUrl}
                    title={`poster-${data?.movie?.title || 'movie'}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className="bms_shows__card_title">
                        <span>{data?.movie?.title || 'Título'}</span>
                        <span>{data?.movie?.format || 'Formato'}</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {data?.movie?.description || 'Sin sinopsis'}
                    </Typography>
                    <Typography variant="caption">
                        <span>{data?.city || 'Ciudad'}</span>
                        <span>{data?.startTime || 'Inicia'}</span>
                        <span>{data?.price || 'Precio'}</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">Reservar</Button>
            </CardActions>
        </Card>
    );
}
