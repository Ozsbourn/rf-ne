import express from 'express'
import { headerTypes, headerValues } from './configs/corsConfigs';

import plantumlDecoder from 'plantuml-encoder';
import { parsePuml }   from './controllers/parsePuml';



const app = express();
const port = 5000;

app.use(express.json())                         // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(function(_req, res, next) {
  res.header(headerTypes.acaOrigin,      headerValues.acaOrigin); 
  res.header(headerTypes.acaHeaders,     headerValues.acaHeaders); 
  res.header(headerTypes.acaMethods,     headerValues.acaMethods); 
  res.header(headerTypes.acaCredentials, headerValues.acaCredentials); 
  
  next();
});


app.post('/', async (req, res) => {  
  const pumlCode = plantumlDecoder.decode(req.body.pumlEncoded);

  res.send(parsePuml(pumlCode));
});


app.listen(port, () => console.log(`Running on port ${port}`));
