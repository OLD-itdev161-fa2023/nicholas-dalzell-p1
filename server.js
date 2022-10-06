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
app.use(cors({ origin: 'http://localhost:3000' }));

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
app.post('/api/add-player',
    [
        check('playerName', 'Please enter Players name')
            .not()
            .isEmpty(),
        check('playerPosition', 'Please enter the position')
            .not()
            .isEmpty(),
        check('playerNumber', 'Please enter a number between 0 and 99')
            .not()
            .isEmpty()
    ],
    (req, res) => {
        const errors = validationResult(req);
        //return error if inputs are empty. else create new player with 
        //entered data
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        } else {
            var playerData = new Player({
                name: req.body.playerName,
                position: req.body.playerPosition,
                number: req.body.playerNumber
            })
            //save new player data
            playerData.save((error, item) => {
                if(!error){
                    console.log(`Player added: ${item.name}`);
                    res.send(`Player added: ${item.name}`);
                }
                else
                    console.error(error.message);
            })
        }
    }
);

/**
 * @route GET api/player-list
 * @desc return all players
 */
//displays all entered players
app.get('/api/player-list',
(req, res) => 
    Player.find((error, items) => {
    if (!error)
        res.send(items);
        else
        console.error(error.message);
    }
)
); 

//connection listener
const port = 5000;
app.listen(port, () => console.log(`express server running on port ${port}`));