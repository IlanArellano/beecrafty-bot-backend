require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { registerRouter, statusRouter, onlineRouter } from './commands';
import { ENDPOINT } from './types';
import morgan from 'morgan';

const app = express();

app.set('port', process.env.PORT || 4000);

//MiddleWares
app.use(cors());
app.use(morgan('dev'));


//Command Routes
app.use(ENDPOINT.register, registerRouter);
app.use(ENDPOINT.status, statusRouter);
app.use(ENDPOINT.online, onlineRouter);



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});