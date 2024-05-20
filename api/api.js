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

// Endpoint de login - Apenas aceita requisições POST
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  let connection;

  try {
    connection = await connect();
    const result = await connection.execute(
      `SELECT ID_EMPRESA, NM_EMPRESA, TIPO_EMPRESA 
       FROM TB_EMPRESA 
       WHERE EMAIL = :email AND SENHA = :senha`,
      { email, senha }
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ message: 'Login bem-sucedido!', user });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar login' });
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

// Endpoint para finalizar o pagamento
app.post('/finalizarPagamento', async (req, res) => {
  const { idEmpresa, idPlano, nomeCartao, nrmCartao, dataValidade, cvv, total } = req.body;
  let connection;

  try {
    connection = await connect();
    const result = await connection.execute(
      `INSERT INTO TB_PAGAMENTO (ID_PAGAMENTO, ID_EMPRESA, ID_PLANO, NM_CARTAO, NRM_CARTAO, DATA_VALIDADE, CVV, TOTAL) 
       VALUES (SEQ_PAGAMENTO.NEXTVAL, :idEmpresa, :idPlano, :nomeCartao, :nrmCartao, TO_DATE(:dataValidade, 'YYYY-MM-DD'), :cvv, :total)`,
      { idEmpresa, idPlano, nomeCartao, nrmCartao, dataValidade, cvv, total },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Pagamento realizado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar pagamento' });
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
