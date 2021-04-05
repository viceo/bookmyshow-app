import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { bms_getShowById } from '../_http_apis/bookmyshowapi'

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: '60vw',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

export default function ShoppingModal(props) {
    const classes = useStyles();
    const modalStyle = getModalStyle();
    const { open, setMostrarModal, listaReservaciones } = props

    // Reservaciones
    const [reservaciones, setReservaciones] = useState([])

    useEffect(() => {
        const fetchReservaciones = async () => {
            try {
                const response = await Promise.all(listaReservaciones.map(x => bms_getShowById(x)))
                setReservaciones(response.map(x => x.show))
            }
            catch (e) {
                console.log('fetchReservaciones | error', e)
            }
        }
        fetchReservaciones()
    }, [listaReservaciones])

    const handleClose = () => {

    };

    const getTotal = () => reservaciones.map(x => x.price).reduce((sum, val) => sum += Number(val), 0).toFixed(2)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Reservaciones</h2>
                    <section style={{ display: 'flex', flexDirection: 'column' }}>
                        {reservaciones.map((x, indx) => (
                            <div key={indx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>{x?.movie?.title || 'Title'} ({x?.movie?.format || 'Formato'})</span>
                                <span>${x?.price}</span>
                            </div>
                        ))}
                    </section>
                    <span
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >Total: ${getTotal()}</span>
                    <section style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}>
                        <button onClick={() => setMostrarModal(false)}>Cerrar</button>
                        <button
                            style={{ marginLeft: 10 }}
                            onClick={() => setMostrarModal(false)}>Reservar</button>
                    </section>
                </div>
            </Modal>
        </div>
    );
}
