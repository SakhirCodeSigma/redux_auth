import express, { Request, Response } from 'express';
const app = express();
const port = 3004;

import bodyParser from 'body-parser';
import mysql, { PoolOptions } from 'mysql2';
import cors from 'cors'

app.use(bodyParser.urlencoded({ extended: true }));

const access: PoolOptions = {
    host: "localhost",
    user: "root",
    password: "",
    database: `typescript_database`
};

const conn = mysql.createPool(access);

app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);
app.get('/', (req: Request, res: Response) => {

    res.send('Hello, TypeScript Express!');
});

app.post('/login', async (req,res) => {
    const {  email, password } = req.body;
    console.log("email is", email);
    let sql: string = `SELECT * FROM users WHERE email = '${email}'`;
    conn.query(sql, (error, rows: string[]) => {
        if (error) {
            console.log(error);
            return res.status(500);
        }
        console.log('ROWS:', rows.length);
        if(rows.length<=0){
           return  res.send({ status:400, msg:'not a user'});
        }else{
            return res.send({ status:200, msg: "Successfully logged in"});
        }
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});