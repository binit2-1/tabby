import express from 'express'
import { saveSnippets, getSnippetBundle } from '../controllers/snippetController'

const router: express.Router = express.Router();

router.post('/save', saveSnippets)

router.get('/bundle/:id', getSnippetBundle)


export default router;