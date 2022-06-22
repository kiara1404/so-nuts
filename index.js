import express from 'express';
import * as fs from 'fs';
import fetch from 'node-fetch'
import async from 'async'

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

//questionnaire
app.get('/form_1', getData)

//dashboard
app.get('/dashboard', (req, res) => {
    const files = ['public/json/cardio.json', 'public/json/kracht.json', 'public/json/kcal.json', 'public/json/eiwitten.json', 'public/json/groente.json'];
   // got this function from stackOverflow: https://stackoverflow.com/questions/58424336/reading-multiple-files-asynchronously-in-node-js
    async.map(files, fs.readFile, function (err, data) {
        let stringDataCardio = JSON.parse(data[0])
        let stringDataKracht = JSON.parse(data[1])
        let stringDataKcal = JSON.parse(data[2]);
        let stringDataEiwitten = JSON.parse(data[3]);
        let stringDataGroente = JSON.parse(data[4]);

        let kcalData = parseInt(stringDataKcal.kcal);
        let eiwitData = parseInt(stringDataEiwitten.eiwitten);
        let groenteData = parseInt(stringDataGroente.groente);
        let krachtData = parseInt(stringDataKracht.minTraining)
        let cardioData = parseInt(stringDataCardio.minTraining)
        console.log(cardioData)
        console.log(krachtData)

        res.render('pages/dashboard', {
            cardioData: cardioData,
            krachtData: krachtData,
            cardioType: stringDataCardio,
            kcalData: kcalData,
            eiwitData: eiwitData,
            groenteData: groenteData
        });
    })
});


// training page
app.get('/training', (req, res) => {
    const files = ['public/json/cardio.json', 'public/json/kracht.json'];
    async.map(files, fs.readFile, function (err, data) {
        let stringDataCardio = JSON.parse(data[0])
        let stringDataKracht = JSON.parse(data[1])
        let krachtData = parseInt(stringDataKracht.minTraining)
        let cardioData = parseInt(stringDataCardio.minTraining)
        console.log(cardioData)
        console.log(krachtData)

        res.render('pages/training', {
            cardioData: cardioData,
            krachtData: krachtData,
            cardioType: stringDataCardio.trainingType
        })
    })

})

// voeding page
app.get('/voeding', (req, res) => {
    const files = ['public/json/kcal.json', 'public/json/eiwitten.json', 'public/json/groente.json'];
    async.map(files, fs.readFile, function (err, data) {
        let stringDataKcal = JSON.parse(data[0]);
        let stringDataEiwitten = JSON.parse(data[1]);
        let stringDataGroente = JSON.parse(data[2]);

        let kcalData = parseInt(stringDataKcal.kcal);
        let eiwitData = parseInt(stringDataEiwitten.eiwitten);
        let groenteData = parseInt(stringDataGroente.groente);

        console.log(kcalData)
        //  console.log(krachtData)

        res.render('pages/voeding', {
            kcalData: kcalData,
            eiwitData: eiwitData,
            groenteData: groenteData
        });
    });
});
app.post('/results', (req, res) => {
    fs.readFile('public/json/recommendations.json', 'utf8', function (err, data) {
        if (err) throw err;
        let formData;
        if (data) {
            formData = JSON.parse(data)
            console.log(formData)
        }
        res.render('pages/results', {
            voeding: formData.recommendations.voeding,
            beweging: formData.recommendations.beweging
        })
    });
});


app.get('/form_cardio', (req, res) => {
    res.render('pages/form_cardio')
});
app.get('/form_kracht', (req, res) => {
    res.render('pages/form_kracht')
});
app.get('/form_kcal', (req, res) => {
    res.render('pages/form_kcal')
});
app.get('/form_eiwitten', (req, res) => {
    res.render('pages/form_eiwitten')
});
app.get('/form_groente', (req, res) => {
    res.render('pages/form_groente')
});


// POST
app.post('/form_1', getData);
app.post('/added_cardio', (req, res) => {
    let cardioStringData;
    const cardioData = {
        "trainingType": req.body.cardio_type,
        "minTraining": req.body.cardio_duration
    }
    cardioStringData = JSON.stringify(cardioData);


    fs.writeFile('public/json/cardio.json', cardioStringData, (err, data) => {
        if (data) {
            cardioStringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });

    res.redirect('training')

})

app.post('/results', (req, res) => {
    res.render('pages/results')
});
app.post('/added_kracht', (req, res) => {
    let krachtStringData;
    const krachtData = {
        "minTraining": req.body.kracht_duration
    }
    krachtStringData = JSON.stringify(krachtData);
    console.log(krachtData);


    fs.writeFile('public/json/kracht.json', krachtStringData, (err, data) => {
        if (data) {
            krachtStringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.redirect('training')
})

app.post('/added_groente', (req, res) => {
    let stringData;
    const data = {
        "groente": req.body.groente
    }
    stringData = JSON.stringify(data);
    console.log(stringData);


    fs.writeFile('public/json/groente.json', stringData, (err, data) => {
        if (data) {
            stringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.redirect('voeding')
})

app.post('/added_eiwitten', (req, res) => {
    let stringData;
    const data = {
        "eiwitten": req.body.eiwitten
    }
    stringData = JSON.stringify(data);
    console.log(stringData);


    fs.writeFile('public/json/eiwitten.json', stringData, (err, data) => {
        if (data) {
            stringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.redirect('voeding')
})

app.post('/added_kcal', (req, res) => {
    let stringData;
    const data = {
        "kcal": req.body.kcal
    }
    stringData = JSON.stringify(data);
    console.log(stringData);


    fs.writeFile('public/json/kcal.json', stringData, (err, data) => {
        if (data) {
            stringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.redirect('voeding')
})




// server
app.listen(port, () =>
    console.log(`Server is running succesfully👋!`),
);


// get questions from API
async function getData(req, res) {
    try {

        const intakeData = await fetch('https://sonuts.chippr.dev/api/questionnaires?categoryId=efc0026f-7799-4f77-9bb4-3bb0bf0c2c5a')
        const intakeDataResponse = await intakeData.json()
        const bewegingData = await fetch('https://sonuts.chippr.dev/api/questionnaires?categoryId=ef2cac2a-5081-4c73-b5ed-36914fd464fa')
        const bewegingDataResponse = await bewegingData.json()
        const voedingData = await fetch('https://sonuts.chippr.dev/api/questionnaires?categoryId=7f276f90-80e7-472e-a7e6-9ccbd37cd5b7')
        const voedingDataResponse = await voedingData.json()

        console.log(voedingDataResponse.questions[0])
        // console.log(data)
        res.render('pages/form_1', {
            personal: intakeDataResponse,
            beweging: bewegingDataResponse,
            voeding: voedingDataResponse
        })
    }
    catch (err) {
        console.log(err)

    }
}

