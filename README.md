# PIXELHOUSE_TEST - README

## 🚀 Como executar o projeto

### 📋 Pré-requisitos
- Node.js v22.14.0
- npm 11.3.0

### ⚙️ Backend

```bash
cd backend
npm install
node --watch api.js
```

### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

### 📂 Estrutura do Projeto

```
PIXELHOUSE_TEST/
├── backend/             # Arquivos do backend
│   ├── node_modules/    # Dependências do backend
│   ├── api.js           # Arquivo principal da API
│   ├── package.json     # Configurações do projeto
│   └── ...              
├── frontend/            # Arquivos do frontend
│   ├── node_modules/    # Dependências do frontend
│   ├── src/             # Código fonte
│   ├── package.json     # Configurações do projeto
│   └── ...              
└── ...
```

### ℹ️ Observações

Execute ambos os servidores (backend e frontend) para ter todas funcionalidades
O backend utiliza o modo watch do Node.js para reinício automático
O frontend utiliza o servidor de desenvolvimento do Vite com HMR

### 🚀 Demonstração
![image](https://github.com/user-attachments/assets/78f77c7a-27bc-4383-a4df-ec453b00f0fe)
