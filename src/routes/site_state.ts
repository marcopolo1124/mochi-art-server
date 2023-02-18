import db from '../db'
import express from 'express'

const site_state = express.Router()

site_state.get('/', db.getState)

site_state.put('/commission', db.toggleCommissionState)
site_state.put('/art-trade', db.toggleArtTradeState)

export default site_state