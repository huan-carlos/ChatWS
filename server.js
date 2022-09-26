const express = require("express")
const app = express()
app.use(express.static("public"))
const http = require("http").Server(app)
const PORT = process.env.PORT || 8000

const serverSocket = require("socket.io")(http)

http.listen(PORT, () => {
    console.log(`Servisor iniciado na porta ${PORT}`)
})

app.get("/", (__, res) => res.sendFile(`${__dirname}/index.html`))

serverSocket.on("connect", socket => {
    console.log(`Cliente conectado ${socket.id} conectou!`)

    socket.on("chat msg", msg => {
        serverSocket.emit("chat msg", `Msg recebida de ${socket.username}: ${msg}`)
    })

    socket.on("login", username => {
        socket.username = username
        serverSocket.emit("chat msg", `Usuário ${socket.username} entrou`)
    })
})