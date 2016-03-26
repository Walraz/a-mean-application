import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';

const app = express();
const PORT = 1337;

app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, ()=>{
  console.log('Listen on port 3000!')
});

app.get('/hello', (req, res)=>{
  res.send('world');
});

app.get('/add/:y/:x', (req, res)=>{
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  res.send({sum: x + y});
});
