import express from 'express';
import * as fs from 'fs';
import fetch from 'node-fetch'

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
    fs.readFile('public/json/addTraining.json', 'utf8', function (err, data) {
        if (err) throw err;
        let formData;
        if (data) {
            formData = JSON.parse(data)
            console.log(formData)

        }
        res.render('pages/dashboard', { data: formData })
    })
});

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



let auth;
function request(method = "GET", credentials) {
    return async function (url, body) {
        if (!auth && credentials) {
            auth = fetch('https://sonuts.chippr.dev/api/Token', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: 'participant@local' })

            }).then(res => res.json())
        }
        return fetch(url, {
            method,
            body,
            headers: { "Authorization": `${auth.tokenType} ${auth.accessToken}` }
        })

    }
}

const get = request("GET", { email: "participant@local" });
const post = request("POST", { email: "participant@local" });
const put = request("PUT", { email: "participant@local" });
const patch = request("PATCH", { email: "participant@local" });
const del = request("DELETE", { email: "participant@local" });

// Voorbeeld categorie ophalen
get("https://sonuts.chippr.dev/api/categories");

// Voorbeeld antwoord posten
post("https://sonuts.chippr.dev/api/questionnaireresponses", {
    "questionnaireId": "7b917bc1-26ed-4b20-a1d8-015460e1546b",
    "responses": [
        {
            "questionId": "127c16aa-83fe-43a3-9ff6-cf39359fc31d",
            "answer": "test :)"
        }
    ]
})




function postAddTraining(req, res) {
    let stringData;
    const data = {
        "trainingType": req.body.trainingType,
        "nameTraining": req.body.nameTraining,
        "minTraining": req.body.minTraining
    }
    stringData = JSON.stringify(data);
    console.log(data);


    fs.writeFile('public/json/addTraining.json', stringData, (err, data) => {
        if (data) {
            stringData = JSON.parse(data)
        }
        if (err) {
            console.log(err)
        }
    });
    res.render('pages/training')
}

