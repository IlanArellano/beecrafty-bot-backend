require('dotenv').config();
import express from 'express';
import cors from 'cors';
import { LinkRouter, statusRouter, onlineRouter, testRouter } from './commands';
import { ENDPOINT, CONSOLE_COLORS } from './types';
import morgan from 'morgan';

const app = express();

app.set('port', process.env.PORT || 4000);

//MiddleWares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//Command Routes
app.use(ENDPOINT.link, LinkRouter);
app.use(ENDPOINT.status, statusRouter);
app.use(ENDPOINT.online, onlineRouter);
app.use(ENDPOINT.test, testRouter);



app.listen(app.get('port'), () => {
    console.log(CONSOLE_COLORS.FgGreen,`Server on port ${app.get('port')}`, CONSOLE_COLORS.FgWhite);
});