import express from 'express';
import { readFile } from 'fs/promises';
import fetch from 'node-fetch'
// const questionnaire = JSON.parse(
//     await readFile(
//         new URL('./public/questionnaire.json', import.meta.url)
//     )
// );
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

// routing
app.get('/', (req, res) => {
    res.render('pages/index')
})
app.get('/aanmelden', (req, res) => {
    res.render('pages/aanmelden')
})
app.get('/form_1', getData)
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard')
})
app.get('/training', (req, res) => {
    res.render('pages/training')
})
app.get('/voeding', (req, res) => {
    res.render('pages/voeding')
})
app.get('/results', (req, res) => {
    res.render('pages/results')
})

// post
// app.post('/form_1', (req, res) => {
//     res.render('pages/form_1', { questions: questionnaire.questions })
// });

app.post('/form_1', getData)
app.post('/dashboard', (req, res) => {
    res.render('pages/dashboard')
});
app.post('/results', (req, res) => {
    res.render('pages/results')
});



// server
app.listen(port, () =>
    console.log(`Server is running succesfully👋!`),
);

async function getData(req, res) {
    try {

        const data = await fetch('https://fhir.mibplatform.nl/api/questionnaires/2')
        const response = await data.json()
        console.log(response.questions)
        res.render('pages/form_1', { questions: response.questions })
    }
    catch (err) {
        console.log(err)

    }
}