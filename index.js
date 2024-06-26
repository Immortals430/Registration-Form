import 'dotenv/config';
import express from 'express';
import connectDb from './config/mongoose.js';
import expressEjsLayouts from 'express-ejs-layouts';
const app = express();
const PORT = process.env.PORT || 8000;

import { registerPage, loginPage, signup, signin, error, success } from './controller/user_controller.js';

app.set('view engine', 'ejs');
app.set('views');
app.use(expressEjsLayouts)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));


// routes
app.get('/',  (req, res) => res.redirect('/register'))
app.get('/register', registerPage);
app.get('/login', loginPage)
app.post('/signup', signup);
app.post('/signin', signin)
app.get('/success', success)
app.get('/error', error)


app.listen(PORT, () => {
    connectDb();
    console.log(`Connected to server at port: ${PORT}`);
})