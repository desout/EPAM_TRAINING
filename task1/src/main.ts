import * as express from "express";
import * as bodyParser from "body-parser";
import * as helper from "./helper";

const app = express();
const port = 8000;
const users = require("../src/users.json");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(port, () => {
    console.log(`Server was started on ${port} port`);
});
app.get("/users", function (req, res) {
    res.send(users)
});
app.get("/users/:id", function (req, res) {
    if (users[req.params.id]) {
        res.send(users[req.params.id]);
    } else {
        res.sendStatus(400);
    }
});
app.post("/users/add", function (req, res) {
    let user = req.body;
    user["id"] = users.length;
    if (helper.validateData(user, users[0])) {
        users.push(user);
        res.send(user);
    } else {
        res.sendStatus(400);
    }

});
app.put("/users/:id", function (req, res) {
    let user = req.body;
    user["id"] = req.params.id;
    if (helper.validateData(user, users[0])) {
        users[req.params.id] = user;
        res.send(user);
    } else {
        res.sendStatus(400);
    }
});
app.delete("/users/:id", function (req, res) {
    if (users[req.params.id] && users.length > 1 ) {
        let resUser = users.splice(req.params.id, 1);
        res.send(resUser[0]);
    } else {
        res.sendStatus(400);
    }
});