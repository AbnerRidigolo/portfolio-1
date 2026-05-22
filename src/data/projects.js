/* Carteira de 35 projetos — fonte única para a página /projetos e o chatbot.
   slugs sem acento em category/sectors/difficulty; rótulos com acento nos mapas. */

export const CATEGORY_LABELS = {
  'ml':        'Machine Learning',
  'data-bi':   'Data & BI',
  'genai':     'Gen AI / LLM',
  'automacao': 'Automação',
  'eng-dados': 'Engenharia de Dados',
}

export const SECTOR_LABELS = {
  'comercial':  'Comercial',
  'marketing':  'Marketing',
  'financeiro': 'Financeiro',
  'fintech':    'Fintech',
  'startup':    'Startup',
  'varejo':     'Varejo',
}

export const DIFFICULTY_LABELS = {
  'facil':   'Fácil',
  'medio':   'Médio',
  'dificil': 'Difícil',
}

export const PROJECTS = [
  // MACHINE LEARNING (8)
  { title: 'Modelo de churn', tech: ['XGBoost', 'scikit-learn'], difficulty: 'medio', category: 'ml', sectors: ['varejo', 'comercial', 'startup'] },
  { title: 'Análise de sentimento de avaliações', tech: ['BERT', 'HuggingFace'], difficulty: 'medio', category: 'ml', sectors: ['varejo', 'marketing', 'comercial'] },
  { title: 'Detecção de fraude em transações', tech: ['Isolation Forest', 'Kafka'], difficulty: 'dificil', category: 'ml', sectors: ['fintech', 'financeiro'] },
  { title: 'Score de crédito alternativo', tech: ['LightGBM', 'Feature eng.'], difficulty: 'dificil', category: 'ml', sectors: ['fintech', 'financeiro'] },
  { title: 'Previsão de demanda para varejo', tech: ['Prophet', 'LightGBM'], difficulty: 'medio', category: 'ml', sectors: ['varejo', 'startup'] },
  { title: 'Recomendador de produtos', tech: ['Surprise', 'Pandas'], difficulty: 'medio', category: 'ml', sectors: ['varejo', 'comercial', 'startup'] },
  { title: 'Segmentação de clientes com clustering', tech: ['K-Means', 'UMAP'], difficulty: 'facil', category: 'ml', sectors: ['marketing', 'comercial', 'varejo'] },
  { title: 'Modelo de propensão a compra', tech: ['XGBoost', 'CRM data'], difficulty: 'medio', category: 'ml', sectors: ['comercial', 'marketing', 'fintech'] },

  // DATA & BI (6)
  { title: 'Dashboard executivo Power BI/Looker', tech: ['SQL', 'ETL'], difficulty: 'facil', category: 'data-bi', sectors: ['financeiro', 'comercial', 'varejo'] },
  { title: 'Modelo financeiro analítico (DRE + fluxo de caixa)', tech: ['dbt', 'Power BI'], difficulty: 'medio', category: 'data-bi', sectors: ['financeiro', 'startup', 'fintech'] },
  { title: 'Análise de funil de vendas', tech: ['SQL', 'Metabase', 'CRM'], difficulty: 'facil', category: 'data-bi', sectors: ['comercial', 'startup', 'marketing'] },
  { title: 'Auditoria e qualidade de dados', tech: ['Pandas', 'SQL'], difficulty: 'facil', category: 'data-bi', sectors: ['financeiro', 'varejo', 'fintech'] },
  { title: 'Analytics de campanha de marketing', tech: ['GA4', 'Looker Studio'], difficulty: 'medio', category: 'data-bi', sectors: ['marketing', 'varejo', 'startup'] },
  { title: 'Dashboard de risco financeiro', tech: ['Python', 'SQL', 'Power BI'], difficulty: 'medio', category: 'data-bi', sectors: ['fintech', 'financeiro'] },

  // GEN AI / LLM (7)
  { title: 'Chatbot de atendimento com RAG', tech: ['LangChain', 'OpenAI', 'Pinecone'], difficulty: 'medio', category: 'genai', sectors: ['comercial', 'varejo', 'fintech', 'startup'] },
  { title: 'Resumidor de contratos e documentos', tech: ['GPT-4', 'PDF parse'], difficulty: 'facil', category: 'genai', sectors: ['financeiro', 'fintech', 'comercial'] },
  { title: 'Gerador de conteúdo com voz de marca', tech: ['OpenAI API', 'Prompt eng.'], difficulty: 'facil', category: 'genai', sectors: ['marketing', 'startup', 'varejo'] },
  { title: 'Extração de dados de NFs e e-mails', tech: ['GPT-4', 'Regex'], difficulty: 'medio', category: 'genai', sectors: ['financeiro', 'varejo', 'fintech'] },
  { title: 'Copilot comercial para vendedores', tech: ['OpenAI', 'CRM API'], difficulty: 'medio', category: 'genai', sectors: ['comercial', 'startup'] },
  { title: 'Agente de pesquisa e relatório autônomo', tech: ['LangChain', 'Tavily'], difficulty: 'dificil', category: 'genai', sectors: ['marketing', 'financeiro', 'startup'] },
  { title: 'Análise automática de campanhas com LLM', tech: ['OpenAI', 'GA4 API'], difficulty: 'medio', category: 'genai', sectors: ['marketing', 'startup'] },

  // AUTOMAÇÃO (6)
  { title: 'Automação de relatórios periódicos', tech: ['Python', 'Pandas', 'SMTP'], difficulty: 'facil', category: 'automacao', sectors: ['financeiro', 'comercial', 'varejo'] },
  { title: 'Scraping + qualificação de leads com IA', tech: ['Playwright', 'OpenAI'], difficulty: 'medio', category: 'automacao', sectors: ['comercial', 'marketing', 'startup'] },
  { title: 'Classificador de tickets de suporte', tech: ['Python', 'Zapier'], difficulty: 'facil', category: 'automacao', sectors: ['varejo', 'startup', 'comercial'] },
  { title: 'Conciliação financeira automática', tech: ['Pandas', 'OpenAI'], difficulty: 'medio', category: 'automacao', sectors: ['financeiro', 'fintech', 'varejo'] },
  { title: 'Monitor de menções e sentimento', tech: ['APIs sociais', 'LLM'], difficulty: 'medio', category: 'automacao', sectors: ['marketing', 'varejo', 'startup'] },
  { title: 'Agente de preenchimento de CRM', tech: ['n8n', 'OpenAI'], difficulty: 'medio', category: 'automacao', sectors: ['comercial', 'startup'] },

  // ENGENHARIA DE DADOS (8)
  { title: 'Pipeline de ingestão ELT', tech: ['Airflow', 'Python', 'dbt'], difficulty: 'medio', category: 'eng-dados', sectors: ['startup', 'fintech', 'varejo'] },
  { title: 'Modelagem de dados com dbt (bronze/silver/gold)', tech: ['BigQuery', 'Snowflake'], difficulty: 'medio', category: 'eng-dados', sectors: ['startup', 'financeiro', 'fintech'] },
  { title: 'Data lakehouse para PMEs', tech: ['S3', 'Delta Lake', 'Spark'], difficulty: 'dificil', category: 'eng-dados', sectors: ['startup', 'varejo', 'fintech'] },
  { title: 'Pipeline de dados em tempo real', tech: ['Kafka', 'Flink'], difficulty: 'dificil', category: 'eng-dados', sectors: ['fintech', 'varejo', 'startup'] },
  { title: 'Integração CRM + ERP + BI', tech: ['REST APIs', 'dbt'], difficulty: 'medio', category: 'eng-dados', sectors: ['comercial', 'financeiro', 'varejo'] },
  { title: 'Observabilidade e qualidade de dados', tech: ['Great Expectations', 'Monte Carlo'], difficulty: 'medio', category: 'eng-dados', sectors: ['fintech', 'startup', 'financeiro'] },
  { title: 'Migração para cloud data warehouse', tech: ['BigQuery', 'dbt'], difficulty: 'dificil', category: 'eng-dados', sectors: ['financeiro', 'varejo', 'startup'] },
  { title: 'API de dados para produto (REST/GraphQL)', tech: ['FastAPI', 'Python'], difficulty: 'medio', category: 'eng-dados', sectors: ['startup', 'fintech', 'comercial'] },
]

PROJECTS.forEach((p, i) => { p.n = String(i + 1).padStart(2, '0') })

export const CATEGORY_FILTERS = [
  { slug: 'all', label: 'Todos' },
  { slug: 'ml', label: 'Machine Learning' },
  { slug: 'data-bi', label: 'Data & BI' },
  { slug: 'genai', label: 'Gen AI / LLM' },
  { slug: 'automacao', label: 'Automação' },
  { slug: 'eng-dados', label: 'Engenharia de Dados' },
]

export const SECTOR_FILTERS = [
  { slug: 'all', label: 'Todos' },
  { slug: 'comercial', label: 'Comercial' },
  { slug: 'marketing', label: 'Marketing' },
  { slug: 'financeiro', label: 'Financeiro' },
  { slug: 'fintech', label: 'Fintech' },
  { slug: 'startup', label: 'Startup' },
  { slug: 'varejo', label: 'Varejo' },
]
