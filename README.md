# FIAP Farms Web

## 📄 Descrição

O **FIAP Farms Web** é uma aplicação web de gerenciamento agrícola desenvolvida com **React** e **Vite**, que integra diversos recursos modernos para facilitar o controle e monitoramento de atividades rurais através de uma interface web intuitiva e responsiva.

O projeto oferece funcionalidades completas para:

- **Dashboard interativo** com gráficos e métricas da produção;
- **Gestão de produtos** com categorização e controle de estoque;
- **Acompanhamento de produções** com status e cronogramas;
- **Controle de vendas** e análise de receitas;
- **Gerenciamento de metas** e objetivos de produção;
- **Sistema de alertas e notificações** filtradas por usuário;
- **Gestão de clientes** e relacionamentos comerciais;
- **Controle de movimentação de estoque** (entrada/saída);
- **Navegação intuitiva** via React Router;
- **Formulários otimizados** com React Hook Form e Zod;
- **Autenticação e armazenamento** com Firebase (Auth, Firestore e Storage);
- **Interface moderna e responsiva** utilizando shadcn/ui com TailwindCSS;

---

## ✨ Principais Destaques Técnicos

- Estrutura baseada na **Clean Architecture** (`Domain`, `Data`, `Infra`, `Presentation`, `Main`);
- Utilização de **TDD (Test-Driven Development)** e abordagem **AAA (Arrange, Act, Assert)**;
- Aplicação dos princípios **SOLID**;
- **Dependency Injection (DI)** para controle de dependências;
- **Gráficos interativos** com Recharts;
- **Controle de imagens** com upload para Firebase Storage;
- **Sistema de sidebar** com navegação por módulos;
- **Sistema de notificações** em tempo real com toast;
- **Filtros e tabelas** interativas com TanStack Table;
- Padrões utilizados:
  - **Repository Pattern**
  - **Factory Pattern**
  - **Observer Pattern** para real-time updates
  - **System Under Test (SUT)** nos testes
- **Small Commits** com Git, promovendo histórico limpo e revisões eficientes;
- Interface moderna e altamente responsiva, com foco na **usabilidade do usuário**;
- **Gráficos e visualizações** para análise de dados de produção;
- **Performance otimizada** com componentes React otimizados;
- **Tipagem completa** com TypeScript para maior segurança;

---

## ⚙️ Estrutura do Projeto

<pre>
<code class="language-text">├── domain # Entidades, casos de uso e contratos (interfaces)</code>
<code class="language-text">├── data # Implementações dos repositórios</code>
<code class="language-text">├── infra # Integrações externas (ex: Firebase)</code>
<code class="language-text">├── presentation # Componentes, páginas, hooks e UI</code>
<code class="language-text">├── main # Inicialização da aplicação, rotas e providers</code>
</pre>

## ☕ Tecnologias Utilizadas

- **React** com **Vite**
- **React Router** para navegação
- **React Hook Form** + **Zod** para formulários e validação
- **Firebase** (Auth, Firestore e Storage)
- **shadcn/ui** + **TailwindCSS** para componentes e estilização
- **Recharts** para gráficos e visualizações
- **TanStack Table** para tabelas interativas
- **Lucide React** para ícones
- **Sonner** para notificações toast
- **TypeScript** para tipagem estática
- **Jest** + **Testing Library** para testes
- **ESLint** + **Prettier** para code quality
- **Husky** + **Lint-Staged** para hooks de commit

---

## � Funcionalidades Principais

### Dashboard

- **Gráficos interativos** de produção e vendas
- **Métricas em tempo real** de estoque e receitas
- **Visão geral** das atividades da fazenda

### Gestão de Produtos

- **Cadastro e edição** de produtos agrícolas
- **Categorização** por tipo de produto
- **Controle de estoque** com alertas de níveis mínimos e máximos
- **Upload de imagens** dos produtos

### Controle de Produção

- **Acompanhamento do ciclo produtivo** (plantio → produção → colheita)
- **Status de produção** em tempo real
- **Cronograma de atividades** com datas de início e fim
- **Quantidades produzidas** vs planejadas

### Vendas e Receitas

- **Registro de vendas** com detalhamento
- **Análise de receitas** e lucros
- **Histórico de transações**

### Metas e Objetivos

- **Definição de metas** de produção/vendas
- **Acompanhamento de objetivos** mensais/anuais
- **Relatórios de performance**

### Sistema de Alertas

- **Notificações personalizadas** filtradas por usuário
- **Alertas de estoque baixo** e níveis críticos
- **Lembretes de atividades** agrícolas importantes
- **Notificações em tempo real** via Firebase
- **Interface de gerenciamento** de alertas lidos/não lidos

### Gestão de Clientes

- **Cadastro completo** de clientes e fornecedores
- **Histórico de relacionamento** comercial
- **Dados de contato** e endereçamento
- **Integração** com vendas e transações

### Controle de Estoque

- **Movimentações detalhadas** de entrada e saída
- **Relatórios de estoque** em tempo real
- **Alertas automáticos** para níveis mínimos/máximos
- **Histórico completo** de movimentações

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você precisa instalar a versão mais recente do **Node.js** (versão 18 ou superior).
- Ter uma conta no **Firebase** com projeto configurado.
- **Git** instalado para controle de versão.

## 🚀 Instalação e Execução

### 1. Clone o repositório:

```sh
  git clone https://github.com/lucas-ssv/fiap-farms-web.git
  cd fiap-farms-web
```

### 2. Instale as dependências:

```sh
  npm install
  # ou
  yarn install
```

### 3. Configure as variáveis de ambiente do Firebase:

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
VITE_APP_ID="SUA_APP_ID"
VITE_PROJECT_ID="SEU_PROJECT_ID"
VITE_API_KEY="SUA_API_KEY"
VITE_BUCKET_URL="SEU_BUCKET_URL"
```

### 4. Execute o projeto:

Para rodar a aplicação, utilize um dos seguintes comandos:

```sh
  npm run dev     # Inicia o servidor de desenvolvimento
  npm run build   # Gera build de produção
  npm run preview # Visualiza o build de produção
```

### 5. Teste o projeto:

Para testar a aplicação, utilize os seguintes comandos:

```sh
  npm test           # Executa todos os testes
  npm run test:watch # Executa os testes em modo watch
```

---

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build otimizado para produção
- `npm run preview` - Visualiza o build de produção
- `npm test` - Executa todos os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run lint` - Executa verificação de código com ESLint
- `npm run lint-staged` - Executa lint nos arquivos staged

---

## 🏗️ Estrutura de Pastas

```
src/
├── data/               # Camada de dados (contratos e implementações)
│   ├── contracts/      # Interfaces dos repositórios
│   └── usecases/       # Implementações dos casos de uso
├── domain/             # Camada de domínio (entidades e regras de negócio)
│   ├── models/         # Modelos de dados
│   └── usecases/       # Interfaces dos casos de uso
├── infra/              # Camada de infraestrutura
│   ├── repositories/   # Implementações dos repositórios
│   └── services/       # Serviços externos (Firebase, etc.)
├── main/               # Camada principal (configuração e inicialização)
│   ├── config/         # Configurações (Firebase, env, etc.)
│   ├── factories/      # Factories para dependency injection
│   └── routes/         # Configuração de rotas
└── presentation/       # Camada de apresentação (UI)
    ├── components/     # Componentes reutilizáveis
    ├── contexts/       # Contextos React
    ├── hooks/          # Hooks customizados
    ├── pages/          # Páginas da aplicação
    └── styles/         # Estilos globais
```

---

## 🧪 Testes

O projeto utiliza **Jest** e **Testing Library** para testes unitários e de integração, seguindo as práticas de **TDD** e o padrão **AAA** (Arrange, Act, Assert).

Para executar os testes:

```sh
npm test              # Executa todos os testes
npm run test:watch    # Modo watch para desenvolvimento
```

---

## 📱 Funcionalidades da Interface

### Dashboard

- Gráficos interativos de vendas e produção
- Cards com métricas principais
- Visão geral do status da fazenda

### Sidebar de Navegação

- Navegação organizada por módulos
- Ícones intuitivos para cada seção
- Responsiva para diferentes tamanhos de tela

### Formulários Inteligentes

- Validação em tempo real com Zod
- Máscaras automáticas para inputs específicos
- Feedback visual de erros e sucessos

### Tabelas Interativas

- Ordenação e filtros avançados
- Paginação otimizada
- Ações em linha para cada registro

---

## 🔧 Configuração do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Crie um novo projeto ou selecione um existente
3. Ative os seguintes serviços:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**
4. Copie as configurações do projeto para o arquivo `.env`

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **Lucas Silva** - [GitHub](https://github.com/lucas-ssv)
