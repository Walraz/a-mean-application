import express    from 'express';
import bodyParser from 'body-parser';
import morgan     from 'morgan';

const app = express();
const PORT = 1337;

app.set('views', __dirname + '/../public');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/../public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, ()=>{
  console.log(`Listen on port ${PORT}!`)
});

app.get('/', (req, res)=>{
  res.render('index', {
    title: 'Home',
    styles: 'css/styles.css'
  });
});

app.get('/add/:y/:x', (req, res)=>{
  const x = req.params.x * 1;
  const y = req.params.y * 1;
  res.send({sum: x + y});
});
