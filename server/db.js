const sql = require('mssql/msnodesqlv8')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const { v4: uuid } = require('uuid')
const methodOverride = require('method-override')

//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    next()
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(bodyparser.json())

const dbconfig = {
    server: "localhost",
    driver: "msnodesqlv8",
    user: "serban",
    password: "test1",
    database: "Proiect",
    port: 1433,
    options: {
        encrypt: false
    }
}

function getList() {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const req = new sql.Request(conn)
        req.query("select * from Persoane", function (err, recordset) {
            if (err) 
                return console.log(err)
            else
                return console.log(recordset)
            conn.close()
        })
    })
}

//getList()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})


//GET TOATE PERSOANELE
app.get('/persoane', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query("select * from Persoane", async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const persoana = await recordset['recordset']
                res.render('persoana/persoane', {persoana})
            }
            conn.close()
        })
    })
})

app.post('/persoane', (req, res) => {
    console.log(req.body)
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`insert into Persoane (Nume, Prenume, Oras, Strada, Numar, CNP, Telefon, Sex)
                       values ('${req.body.nume}', '${req.body.prenume}', '${req.body.oras}', '${req.body.strada}', '${req.body.numar}', '${req.body.cnp}', '${req.body.telefon}', '${req.body.sex}' )`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                
                res.redirect('/persoane')
            }
            conn.close()
        })
    })
})

app.get('/persoane/new', (req, res) => {
    res.render('persoana/persoana_noua')
})



//GET O PERSAONA DUPA ID
app.get('/persoane/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select * from Persoane where PersoanaID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const persoana = await recordset['recordset'][0]
                res.render('persoana/persoana', {persoana})
            }
            conn.close()
        })
    })
})

app.get('/persoane/:id/edit', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select * from Persoane where PersoanaID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const persoana = await recordset['recordset'][0]
                console.log(persoana)
                res.render('persoana/persoana_edit', {persoana})
            }
            conn.close()
        })
    })
})


app.patch('/persoane/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`update Persoane set Nume='${req.body.nume}', Prenume='${req.body.prenume}', Oras='${req.body.oras}', Strada='${req.body.strada}', Numar='${req.body.numar}',
                        CNP='${req.body.cnp}', Telefon='${req.body.telefon}', Sex='${req.body.sex}'
                        where PersoanaID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                res.redirect(`/persoane/${req.params.id}`)
            }
            conn.close()
        })
    })
})

app.delete('/persoane/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`delete from Persoane where PersoanaID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                res.redirect(`/persoane`)
            }
            conn.close()
        })
    })
})




app.get('/operatori', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select * from Operatori`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                console.log(recordset['recordset'])
                const operator = await recordset['recordset']
                res.render('persoana/operatori', {operator})
            }   
            conn.close()
        })
    })
})


app.post('/operatori', (req, res) => {
    console.log(req.body)
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`insert into Operatori (Nume, Prenume, DataAngajare, UID)
                       values ('${req.body.nume}', '${req.body.prenume}', '${req.body.dataAngajare}', '${req.body.uid}')`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                
                res.redirect('/operatori')
            }
            conn.close()
        })
    })
})

app.get('/operatori/new', (req, res) => {
    res.render('persoana/operator_nou')
})



app.get('/operatori/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select * from Operatori where OperatorID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const operator = await recordset['recordset'][0]
                res.render('persoana/operator', {operator})
            }
            conn.close()
        })
    })
})

app.get('/operatori/:id/edit', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select * from Operatori where OperatorID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const operator = await recordset['recordset'][0]
                console.log(operator)
                res.render('persoana/operator_edit', {operator})
            }
            conn.close()
        })
    })
})


app.patch('/operatori/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`update Operatori set Nume='${req.body.nume}', Prenume='${req.body.prenume}', DataAngajare='${req.body.dataAngajare}', UID='${req.body.uid}'
                       where OperatorID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                res.redirect(`/operatori/${req.params.id}`)
            }
            conn.close()
        })
    })
})

app.delete('/operatori/:id', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`delete from Operatori where OperatorID=${req.params.id}`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                res.redirect(`/operatori`)
            }
            conn.close()
        })
    })
})

// QUERY 1
app.get('/apeluri/:nume/:prenume', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    const nm = req.params.nume
    const p = req.params.prenume
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select a.Nume, a.Prenume, b.Durata, b.Data, b.Descriere
                        from Persoane a
                        join Apeluri b on a.PersoanaID=b.PersoanaID
                        where a.Nume='${req.params.nume}' and a.Prenume='${req.params.prenume}'`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/apeluri', {rezultat, nm, p})
            }
            conn.close()
        })
    })
})


// QUERY 2
app.get('/apelurio/:nume/:prenume', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    const nm = req.params.nume
    const p = req.params.prenume
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select a.Nume, a.Prenume, b.Durata, b.Data, b.Descriere
                        from Operatori a
                        join Apeluri b on a.OperatorID=b.OperatorID
                        where a.Nume='${req.params.nume}' and a.Prenume='${req.params.prenume}'`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/apelurio', {rezultat, nm, p})
            }
            conn.close()
        })
    })
})


// QUERY 3
app.get('/urgente', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select a.Denumire, a.Urgenta, a.Victime, a.PagubeMateriale, b.Durata, b.Data, b.Descriere
                        from Cauze a
                        join Apeluri b on a.CauzaID=b.CauzaID
                        where a.Urgenta='A'`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/urgente', {rezultat})
            }
            conn.close()
        })
    })
})


// QUERY 4
app.get('/servicii/:cauza', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    const cauza = req.params.cauza
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select c.Denumire, s.NumeServiciu from Cauze c
                        join ServiciiCauze sc on c.CauzaID=sc.CauzaID
                        join servicii s on s.ServiciuID=sc.ServiciuID
                        where c.Denumire='${req.params.cauza}'`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/servicii', {rezultat, cauza})
            }
            conn.close()
        })
    })
})


// QUERY 5
app.get('/top', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select distinct s.NumeServiciu, count(sc.CauzaID) from Servicii s
                        join ServiciiCauze sc on s.ServiciuID=sc.ServiciuID
                        join Cauze c on sc.CauzaID=c.CauzaID
                        group by s.NumeServiciu
                        order by count(sc.CauzaID) desc`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/top', {rezultat})
            }
            conn.close()
        })
    })
})

// QUERY 6
app.get('/cauze/:nume/:prenume', (req, res) => {
    const conn = new sql.ConnectionPool(dbconfig)
    const nume = req.params.nume
    const prenume = req.params.prenume
    conn.connect(function (err) {
        if (err) 
            return console.log(err)
        const request = new sql.Request(conn)
        request.query(`select distinct c.Denumire from Cauze c
        join Apeluri a on c.CauzaID=a.CauzaID
        join Persoane p on a.PersoanaID=p.PersoanaID
        where p.Nume='${req.params.nume}' and p.Prenume='${req.params.prenume}'`, async function (err, recordset) {
            if (err) 
                return console.log(err)
            else {
                const rezultat = await recordset['recordset']
                console.log(rezultat)
                res.render('persoana/cauze', {rezultat, nume, prenume})
            }
            conn.close()
        })
    })
})




// app.get('/test', (req, res) => {
//     const conn = new sql.ConnectionPool(dbconfig)
//     const nume = req.params.nume
//     const prenume = req.params.prenume
//     conn.connect(function (err) {
//         if (err) 
//             return console.log(err)
//         const request = new sql.Request(conn)
//         request.query(`select * from Persoane`, async function (err, recordset) {
//             if (err) 
//                 return console.log(err)
//             else {
//                 const rezultat = await recordset['recordset']
//                 console.log(rezultat)
//                 res.send(recordset['recordset'])
//             }
//             conn.close()
//         })
//     })
// })



