import mongoose from 'mongoose'
import { environment } from '../common/environments'

mongoose.connect(environment.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.Promise = global.Promise;

export = mongoose;