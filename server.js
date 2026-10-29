import express from "express"
const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("Hello World!")
})

function criarMensagem(id, usuario, texto){
    return { id, usuario: usuario.trim(), texto: texto.trim() }
};

const mensagens = [
    criarMensagem(1, 'Ana', 'Olá, turma!'),
    criarMensagem(2, 'Pedro', 'Servidor funciona TOP!'),
    criarMensagem(3, 'João', 'Vamos conversar com o mensageiro local!'),
];

function listarMensagens(){
    return mensagens;
};

function quantidadeMensagens(){
    return mensagens.length;
};

function buscarMensagem(id){
    return mensagens.find(mensagens => mensagens.id === id);
};

app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));
app.get("/mensagens", (req, res) => res.json({ status: 'online', sprint: 2, total: quantidadeMensagens()}));
app.get('/sobre', (req, res) => res.send('Meu primeiro servidor Node.js com Express e ES Modules.'));

// [SPRINT 02 - NOVO] 6. Consulta, total e busca por ID; erro HTTP 404
app.get('/mensagens', (req, res) =>  res.json(listarMensagens()));
app.get('/total-mensagens', (req, res) =>  res.json({ total: quantidadeMensagens() }));
app.get('/mensagens/:id', (req, res) =>  {
    const mensagem = buscarMensagem(Number(req.params.id));
    if (!mensagem) 
        return res.status(404).json({ error: 'Mensagem não encontrada'});
    res.json(mensagem);
});

app.listen(PORT, () => console.log(`Servidor em: http://localhost:${PORT}`));