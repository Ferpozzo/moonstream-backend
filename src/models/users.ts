import { environment } from './../common/environments';
import mongoose, { Schema } from '../database/database';
import bcrypt from 'bcrypt';
const ChannelBanneds = new mongoose.Schema({
    nick: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['Banned', 'Forgiven'],
        default: 'Banned'
    },
    times: {
        type: Number,
        default: 1
    }
},
    { timestamps: true })
const ChannelMods = new mongoose.Schema({
    nick: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true })
const ChannelFollowers = new mongoose.Schema({
    nick: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true })
const ChannelSubscribers = new mongoose.Schema({
    nick: {
        type: String,
        required: true,
        unique: true
    }
},
    { timestamps: true })
const ChannelUser = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['User','Filiate','Partner'],
        default: 'User'
    },
    mods: [ChannelMods],
    followers: [ChannelFollowers],
    subscribers: [ChannelSubscribers],
    banneds: [ChannelBanneds]
},
    { timestamps: true })
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    nick: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false,
        enum: ['M', 'F', 'O']
    },
    profileImage: {
        type: String,
        required: false
    },
    bannerImage: {
        type: String,
        required: false
    },
    biography: {
        type: String,
        required: false,
        maxlength: 350,
        select: false
    },
    emailConfirmed: {
        type: Boolean,
        default: false,
        select: false
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Banned', 'Forgiven'],
        default: 'Active'
    },
    channel: ChannelUser
},
    { timestamps: true })
UserSchema.pre('save', async function (next) {
    const user: any = this
    if (!user.isModified('password')) {
        next()
    } else {
        try {
            const hash = await bcrypt.hash(user.password, environment.security.saltRounds)
            user.password = hash
            next()
        } catch (err) {
            next(err)
        }
    }
});
/* UserSchema.pre('findOneAndUpdate', async function (next) {
    const user: any = this
    try {
        console.log(this)
        const hash = await bcrypt.hash(user.password, environment.security.saltRounds)
        user.password = hash
        next()
    } catch (err) {
        next(err)
    }
}) */
/* ARRUMAR AQUI PRA SOMAR A QUANTIDADE DE BANS SEMPRE Q FOR BANIDO NOVAMENTE APENAS

e salvar as mensagens dos usuários
ChannelBanneds.pre('update', async function (next) {
    try {
        const user: any = this
        const hash = await bcrypt.hash(user.password, environment.security.saltRounds)
        user.password = hash
        next()
    } catch (err) {
        next(err)
    }
}) */

export const User = mongoose.model('User', UserSchema);

