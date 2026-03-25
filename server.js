const express = require("express");
const { criarBanco } = require("./database");

const app = express();
app.use(express.json())



app.get("/", (req,res) => {
    res.send(`
        <body>
            <h1> ZelaCidade </h1>
            <h2> Gestão de Problema Urbanos </h2>
            <p> Endpoint que leva ais incidentes cadastrados: /incidentes </p>
        </body>

    `)
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor Rodando na porta http://127.0.0.1:3000")
});


app.get("/incidentes", async (req,res) => {
    const db = await criarBanco()
    const listaIncidentes = await db.all(`SELECT * FROM incidentes`)
    res.json(listaIncidentes)
});

app.get("/incidentes/:id", async (req,res) => {
    const {id} = req.params
    const db = await criarBanco()
    const incidenteEspecificao = await db.all(`SELECT *FROM incidentes WHERE id = ?`, [id])

    res.json(incidenteEspecificao)
});

app.post("/incidentes", async (req,res) => {
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, data_registro, hora_registro} = req.body //Desistruturação de dados
    const db = await criarBanco()
    await db.run(`
        INSERT INTO incidentes(
        tipo_problema, 
        localizacao, 
        descricao, 
        prioridade, 
        nome_solicitante, 
        data_registro, 
        hora_registro) VALUES (?, ?, ?, ?, ?, ?, ?)`, 

        [
            tipo_problema, 
            localizacao, 
            descricao, 
            prioridade, 
            nome_solicitante, 
            data_registro, 
            hora_registro
        ] 
        
    )

    res.send(`Incidente de prioridade ${prioridade} Registrado com sucesso`) 
        
});


app.put("/incidentes/:id", async (req,res) => {
    const {id} = req.params
    const {tipo_problema, localizacao, descricao, prioridade, nome_solicitante, status_resolucao} = req.body
    const db = await criarBanco()
    await db.run(`
        UPDATE incidentes
        SET tipo_problema = ?, localizacao = ?, descricao = ?, prioridade = ?, nome_solicitante = ?, status_resolucao = ?
        WHERE id = ?`, 
        [
            
            tipo_problema, 
            localizacao, 
            descricao, 
            prioridade, 
            nome_solicitante, 
            status_resolucao,
            id 
        ]
        //ó Id sempre tem que ficar no filnal do array 
    )

    res.send(`Incidente atualizado ${id}`)
})

app.delete("/incidentes/:id", async (req,res) => {
    const {id} = req.params
    const db = await criarBanco();

    await db.run(`
        DELETE FROM incidentes 
        WHERE id = ?`, [id]
    )

    res.send(`Incidente ${id} deletado`)


})