import express from 'express';
import connectDatabase from './config/db';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import Player from './models/Players'

//initialize express application
const app = express();

//connect database
connectDatabase();

//configure middleware
app.use(express.json({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

//API endpoints
/**
 * @route GET /
 * @desc test endpoint
 */
app.get('/', (req, res) =>
    res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/player-add
 * @desc add player entry
 */
app.post(
    '/api/player-add',
    [
        check('playerName', 'Please enter your name')
            .not()
            .isEmpty(),
        check('playerPosition', 'Please enter your email')
            .not()
            .isEmpty(),
        check('playerNumber', 'Please enter a number between 0 and 99')
            .not()
            .isEmpty()
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            //return res.send(req.body);
            var playerData = new Player({
                name: req.body.playerType,
                position: req.body.playerPosition,
                number: req.body.playerNumber
            })

            playerData.save((error, item) => {
                if(!error){
                    console.log(`Player Data added: ${item.name}`);
                    res.send(`Player added: ${item.name}`);
                }
                else
                    console.error(error.message);
            })
        }
    }
);

//connection listener
const port = 5000;
app.listen(port, () => console.log(`express server running on port ${port}`));