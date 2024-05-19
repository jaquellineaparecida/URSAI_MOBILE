const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
const port = 3030;

app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());

// Conectando com o banco de dados oracle
async function connect() {
  return await oracledb.getConnection({
    user: 'rm99553',
    password: '020904',
    connectString: 'oracle.fiap.com.br/orcl'
  });
}

// Criando o endpoint para cadastrar uma empresa
app.post('/cadastroUsuario', async (req, res) => {
  const { nomeEmpresa, tipoEmpresa, cnpj, email, telefone, senha } = req.body;
  let connection;

  try {
    connection = await connect();
    const result = await connection.execute(
      `INSERT INTO TB_EMPRESA (ID_EMPRESA, NM_EMPRESA, TIPO_EMPRESA, CNPJ, EMAIL, TELEFONE, SENHA) VALUES (SEQ_EMPRESA.NEXTVAL, :nomeEmpresa, :tipoEmpresa, :cnpj, :email, :telefone, :senha)`,
      { nomeEmpresa, tipoEmpresa, cnpj, email, telefone, senha },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar empresa' });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
