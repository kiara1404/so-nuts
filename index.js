import express from 'express';
import * as fs from 'fs';
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
app.get('/form_1', getData)
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard')
})
app.get('/training', (req, res) => {
    fs.readFile('public/json/addTraining.json', 'utf8', function (err, data) {
        if (err) throw err;
        let formData;
        if (data) {
            formData = JSON.parse(data)
            console.log(formData)
        }
        res.render('pages/training', { data: formData })
    });
});
app.get('/voeding', (req, res) => {
    res.render('pages/voeding')
});
app.get('/results', (req, res) => {
    res.render('pages/results')
});
app.get('/add_training', (req, res) => {
    res.render('pages/add_training')
});

// POST
app.post('/form_1', getData);
app.post('/dashboard', postAddTraining);
app.post('/results', (req, res) => {
    res.render('pages/results')
});
app.post('/training', postAddTraining)



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



function postAddTraining(req, res) {
    let stringData;
    const data = {
        "trainingType": req.body.trainingType,
        "nameTraining": req.body.nameTraining,
        "minTraining": req.body.minTraining
    }
    stringData = JSON.stringify(data);
    console.log(data);


    fs.appendFile('public/json/addTraining.json', stringData, (err, data) => {
        if (data) {
            stringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.render('pages/training')
}