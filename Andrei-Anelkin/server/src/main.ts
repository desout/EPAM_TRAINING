import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as userModule from './userModule';

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.listen(port, () => {
    console.log(`Server was started on ${port} port`);
});
app.get('/users', function (req, res) {
  const users = userModule.getUsers();
  res.send(users);
});
app.get('/users/:id', function (req, res) {
    const user = userModule.getUser(req.params.id);
    if (user != null) {
      res.send(user);
    } else {
        res.sendStatus(400);
    }
});
app.post('/users/add', function (req, res) {
  const user = req.body;
  user['id'] = req.params.id;
  const retUser = userModule.addUser(user);
  if (retUser != null) {
    res.send(retUser);
  } else {
    res.sendStatus(400);
  }
});
app.put('/users/:id', function (req, res) {
  const user = req.body;
  user['id'] = req.params.id;
  const retUser = userModule.updateUser(user, req.params.id);
  if (retUser != null) {
    res.send(retUser);
  } else {
    res.sendStatus(400);
  }
});
app.delete('/users/:id', function (req, res) {
  const user = userModule.deleteUser(req.params.id);
  if (user != null) {
    res.send(user);
  } else {
    res.sendStatus(400);
  }
});
