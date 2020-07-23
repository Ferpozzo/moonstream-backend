import cors from 'cors';
import express from 'express'
import bodyParser from 'body-parser'
import { environment } from './common/environments';
import { router } from './routes/user'
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PATCH,DELETE,PUT,OPTION',
    optionsSuccessStatus: 200 
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('', router)
app.listen(environment.server.port, () => {
    console.log('Servidor rodando!')
})
