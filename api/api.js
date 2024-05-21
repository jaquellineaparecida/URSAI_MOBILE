const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const oracledb = require('oracledb');
const axios = require('axios');


const app = express();
const port = 3030;

app.use(cors({
  origin: '*'
}));
app.use(express.json());

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

app.put('/pagamento', async (req, res) => {
  console.log("Recebida uma solicitação POST na rota /pagamento");
  console.log("Dados recebidos:", req.body);
  const { email, idPlano, nomeCartao, nrmCartao, dataValidade, cvv, total } = req.body;
  let connection;

  try {
    console.log("Tentando conectar ao banco de dados...");
    connection = await connect();
    console.log("Conectado ao banco de dados.");

    // Buscar ID da empresa baseado no email
    const userResult = await connection.execute(
      `SELECT ID_EMPRESA FROM TB_EMPRESA WHERE EMAIL = :email`,
      { email }
    );

    console.log("Resultado da busca pelo ID da empresa:", userResult.rows);

    if (userResult.rows.length === 0) {
      res.status(404).json({ message: 'Empresa não encontrada' });
      return;
    }

    const idEmpresa = userResult.rows[0][0];

    // Inserir o pagamento
    console.log("Dados para inserção:", { idEmpresa, idPlano, nomeCartao, nrmCartao, dataValidade, cvv, total });

    await connection.execute(
      `INSERT INTO TB_PAGAMENTO (ID_PAGAMENTO, ID_EMPRESA, ID_PLANO, NM_CARTAO, NRM_CARTAO, DATA_VALIDADE, CVV, TOTAL) 
       VALUES (SEQ_PAGAMENTO.NEXTVAL, :idEmpresa, :idPlano, :nomeCartao, :nrmCartao, :dataValidade, :cvv, :total)`,
      { idEmpresa, idPlano, nomeCartao, nrmCartao, dataValidade, cvv, total },
      { autoCommit: true }
    );

    res.status(201).json({ message: 'Pagamento realizado com sucesso!' });
  } catch (err) {
    console.error("Erro durante a operação:", err.message, err.stack);
    res.status(500).json({ message: 'Erro ao realizar pagamento', error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log("Conexão com o banco de dados fechada.");
      } catch (err) {
        console.error("Erro ao fechar a conexão:", err);
      }
    }
  }
});

// Endpoint para redefinir senha
app.update('/resetPassword', async (req, res) => {
  const { email, newPassword } = req.body;
  let connection;

  try {
    connection = await connect();

    // Verificar se o e-mail existe no banco de dados
    const userResult = await connection.execute(
      `SELECT ID_EMPRESA FROM TB_EMPRESA WHERE EMAIL = :email`,
      { email }
    );

    if (userResult.rows.length === 0) {
      res.status(404).json({ message: 'E-mail não encontrado' });
      return;
    }

    // Atualizar a senha no banco de dados
    await connection.execute(
      `UPDATE TB_EMPRESA SET SENHA = :newPassword WHERE EMAIL = :email`,
      { email, newPassword },
      { autoCommit: true }
    );

    res.status(200).json({ message: 'Senha redefinida com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao redefinir senha' });
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
