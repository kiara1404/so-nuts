import express from 'express';

const app = express();
const port = process.env.PORT || 2000

// set templating engine
app.set('view engine', 'ejs');

//where the templates are stored
app.set('views', 'views');
app.use(express.json());
// public folder location
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () =>
    console.log(`Server is running!`),
);
