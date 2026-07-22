const CONFIG = {
  appName: 'Tá Feito',
  version: '2.0.0',
  baseUrl: 'https://ta-feito-doc.vercel.app',
  apiUrl: '/api',
  models: {
    cv: [
      { id: 'executivo', name: 'Executivo', desc: 'Para quem quer transmitir liderança', color: '#1a3a5c' },
      { id: 'classico', name: 'Clássico Premium', desc: 'Elegante e atemporal', color: '#c9a84c' },
      { id: 'moderno', name: 'Moderno', desc: 'Clean e contemporâneo', color: '#0ea5e9' },
      { id: 'criativo', name: 'Criativo', desc: 'Para mentes inovadoras', color: '#8b5cf6' },
      { id: 'minimalista', name: 'Minimalista', desc: 'Menos é mais', color: '#374151' },
      { id: 'academico', name: 'Académico', desc: 'Para investigadores e docentes', color: '#065f46' },
      { id: 'corporativo', name: 'Corporativo', desc: 'Banca, seguros, auditoria', color: '#1e3a5f' },
      { id: 'jovem-talento', name: 'Jovem Talento', desc: 'Para quem está a começar', color: '#0891b2' },
      { id: 'internacional', name: 'Internacional', desc: 'Padrão global de recrutamento', color: '#4f46e5' },
      { id: 'elegante', name: 'Elegante', desc: 'Suave e sofisticado', color: '#be185d' }
    ],
    docTypes: [
      { id: 'declaracao-residencia', name: 'Declaração de Residência' },
      { id: 'declaracao-trabalho', name: 'Declaração de Trabalho' },
      { id: 'carta-apresentacao', name: 'Carta de Apresentação' },
      { id: 'carta-recomendacao', name: 'Carta de Recomendação' },
      { id: 'contrato-servicos', name: 'Contrato de Prestação de Serviços' },
      { id: 'requerimento', name: 'Requerimento' }
    ],
    prices: {
      cv: 1000,
      documento: 750,
      mensal: 500
    },
    steps: {
      cv: [
        { id: 'nome', question: 'Qual é o teu nome completo?', placeholder: 'Ex: Adelino Graça', field: 'nome', type: 'text' },
        { id: 'profissao', question: 'Qual é a tua profissão ou área de formação?', placeholder: 'Ex: Engenheiro Informático', field: 'profissao', type: 'text' },
        { id: 'email', question: 'Qual é o teu e-mail?', placeholder: 'Ex: adelino@gmail.com', field: 'email', type: 'email' },
        { id: 'telefone', question: 'Qual é o teu telefone?', placeholder: 'Ex: 923 456 789', field: 'telefone', type: 'tel' },
        { id: 'morada', question: 'Onde vives? (cidade/província)', placeholder: 'Ex: Luanda', field: 'morada', type: 'text', optional: true },
        { id: 'linkedin', question: 'Tens LinkedIn? (opcional)', placeholder: 'Ex: linkedin.com/in/adelino', field: 'linkedin', type: 'text', optional: true },
        { id: 'foto', question: 'Queres adicionar uma foto profissional?', field: 'foto', type: 'photo', optional: true },
        { id: 'resumo', question: 'Fala um pouco sobre ti — quem és e o que procuras?', placeholder: 'Ex: Profissional com 5 anos de experiência...', field: 'resumo', type: 'textarea', help: true },
        { id: 'experiencia', question: 'Onde trabalhaste (ou trabalhas)?', placeholder: 'Ex: Empresa Angola, Lda', field: 'experiencia_empresa', type: 'text' },
        { id: 'experiencia_cargo', question: 'Que cargo tinhas?', placeholder: 'Ex: Analista de Sistemas', field: 'experiencia_cargo', type: 'text' },
        { id: 'experiencia_desc', question: 'O que fazias no dia-a-dia?', placeholder: 'Ex: Desenvolvia soluções web...', field: 'experiencia_desc', type: 'textarea', help: true },
        { id: 'formacao', question: 'Qual é a tua formação académica?', placeholder: 'Ex: Licenciatura em Engenharia Informática', field: 'formacao', type: 'text' },
        { id: 'instituicao', question: 'Onde estudaste?', placeholder: 'Ex: Universidade Agostinho Neto', field: 'instituicao', type: 'text' },
        { id: 'competencias', question: 'Quais são as tuas principais competências?', placeholder: 'Ex: Gestão de equipas, Python, Excel avançado', field: 'competencias', type: 'text', help: true },
        { id: 'idiomas', question: 'Que idiomas falas?', placeholder: 'Ex: Português (nativo), Inglês (avançado)', field: 'idiomas', type: 'text', optional: true }
      ]
    }
  };
