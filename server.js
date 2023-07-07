require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
const projectsRouter = require('./routes/project');
app.use('/projects', projectsRouter);
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
const passport = require('./passport');
app.use(passport.initialize());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
