window.LUA_NOVA = {
  site: {
    name: "Lua Nova",
    tagline: {
      pt: "Livros que iluminam novos caminhos",
      en: "Books that light new paths",
    },
    email: "contato@[a definir]",
    instagram: "https://instagram.com/[a-definir]",
    amazon: "https://www.amazon.com.br/s?k=Amanda+Reznor",
  },

  seals: [
    {
      id: "infantil",
      color: "#f0b429",
      name: { pt: "Infantil", en: "Children's" },
      blurb: {
        pt: "Histórias para descobrir o mundo com imaginação, humor e afeto.",
        en: "Stories that open the world with imagination, humor, and warmth.",
      },
    },
    {
      id: "interativo",
      color: "#5ec8e8",
      name: { pt: "Interativo", en: "Interactive" },
      blurb: {
        pt: "Livros-jogo, puzzles e narrativas em que o leitor também decide.",
        en: "Gamebooks, puzzles, and narratives where the reader also chooses.",
      },
    },
    {
      id: "litfan",
      color: "#b57bff",
      name: { pt: "LitFan", en: "SFF" },
      blurb: {
        pt: "Fantasia e ficção especulativa com ambição literária e mundos densos.",
        en: "Fantasy and speculative fiction with literary ambition and rich worlds.",
      },
    },
    {
      id: "romance",
      color: "#f07a9a",
      name: { pt: "Romance", en: "Literary Fiction" },
      blurb: {
        pt: "Prosa contemporânea e dramas humanos com voz autoral forte.",
        en: "Contemporary prose and human drama with a strong authorial voice.",
      },
    },
    {
      id: "tecnico",
      color: "#7ed957",
      name: { pt: "Técnico", en: "Nonfiction" },
      blurb: {
        pt: "Autoajuda, guias e não ficção prática com olhar inovador.",
        en: "Self-help, guides, and practical nonfiction with a fresh lens.",
      },
    },
    {
      id: "degustacoes",
      color: "#9aa3b2",
      name: { pt: "Degustações", en: "Samplers" },
      blurb: {
        pt: "Amostras, trechos e materiais para degustar antes do lançamento completo — com download gratuito quando disponível.",
        en: "Samples, excerpts, and tasting materials before the full release — with free download when available.",
      },
    },
  ],

  authors: {
    "amanda-reznor": {
      id: "amanda-reznor",
      name: "Amanda Reznor",
      fullName: 'Amanda "Reznor" Britto',
      photo: "assets/authors/amanda-reznor.png",
      photoCredit: {
        pt: "Fotografia: Sander Antonelli Jr.",
        en: "Photograph: Sander Antonelli Jr.",
      },
      links: {
        site: "https://www.amandareznor.com.br/",
        instagram: "https://www.instagram.com/AmandaReznor/",
        facebook: "https://www.facebook.com/AmandaReznor",
        youtube: "https://www.youtube.com/@AmandaReznor",
        linkedin: "https://www.linkedin.com/in/amandareznor/",
      },
      bio: {
        pt: 'Amanda "Reznor" Britto — professora e Mestra em Literatura — é a idealizadora da editora Lua Nova, responsável pela concepção do selo, pela seleção de catálogo e pelo desenvolvimento de projetos editoriais independentes. Com formação acadêmica sólida e atuação contínua na escrita e na mediação literária, ela conduz a casa com rigor crítico, visão estratégica e compromisso com a qualidade dos textos que publica.\n\nSob o nome Amanda Reznor, assina ficção especulativa, contos sombrios, obras infantis e narrativas experimentais. Autora de Noite à Deriva e de projetos em curso como Delenda & o Vale dos Segredos, Sleeping Dragon e A Morte da Estrela, articula literatura, formatos interativos e internacionalização — construindo um catálogo que privilegia propostas inovadoras, cuidado editorial e respeito ao leitor.',
      en: "Lua Nova Publishing - {year} - All rights reserved",
      },
    },
  },

  books: [
    {
      id: "noite-a-deriva",
      status: "published",
      seals: ["litfan"],
      year: 2017,
      cover: "assets/covers/noite-a-deriva.jpg",
      provisional: false,
      buyUrl: "https://www.amazon.com.br/s?k=Noite+%C3%A0+Deriva+Amanda+Reznor",
      buyUrlEn: null,
      interactUrl: null,
      siteUrl: null,
      social: { instagram: null, facebook: null, youtube: null },
      authorIds: ["amanda-reznor"],
      title: { pt: "Noite à Deriva", en: "Night Adrift" },
      subtitle: {
        pt: "Antologia de contos e poemas",
        en: "A collection of stories and poems",
      },
      synopsis: {
        pt: "Antologia com sete contos sombrios e seis poemas em que suspense e acontecimentos estranhos atravessam o Brasil e outras partes do mundo. De horror steampunk a narrativas queer, de lendas amazônicas a releituras históricas, Noite à Deriva convida o leitor a agarrar-se à cama e acender as luzes — a noite está prestes a derivar.",
        en: "A collection of seven dark short stories and six poems where suspense and strange events sweep through Brazil and beyond. From steampunk horror to queer narratives, Amazonian legends to historical reimaginings, Night Adrift invites the reader to hold on and turn on the lights — the night is about to drift.",
      },
      details: {
        pt: "Inclui A Lenda de Kauane, O Mal Invisível, A Dama dos Corvos, Tributo a El-Rei, O Inferno de Barba Negra, Revelações de Páscoa e O Último Pêssego do Fan-Tao.",
        en: "Includes The Legend of Kauane, The Invisible Evil, The Lady of Crows, Tribute to El-Rei, Blackbeard's Hell, Easter Revelations, and The Last Peach of Fan-Tao.",
      },
    },
    {
      id: "a-morte-da-estrela",
      status: "upcoming",
      seals: ["litfan", "romance"],
      year: null,
      cover: "assets/covers/placeholder-a-morte-da-estrela.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: { pt: "A Morte da Estrela", en: "The Death of the Star" },
      subtitle: {
        pt: "Romance em desenvolvimento",
        en: "Novel in progress",
      },
      synopsis: {
        pt: "Uma narrativa de memória, perda e brilho residual — quando uma estrela se apaga, o que resta no céu e em quem a observava? Projeto literário em andamento que cruza emoção íntima e imagem cósmica.",
        en: "A story of memory, loss, and afterglow — when a star dies, what remains in the sky and in those who watched it? A literary work in progress where intimate emotion meets cosmic imagery.",
      },
      details: {
        pt: "Em desenvolvimento editorial.",
        en: "In editorial development.",
      },
    },
    {
      id: "sleeping-dragon",
      status: "upcoming",
      seals: ["litfan"],
      year: null,
      cover: "assets/covers/placeholder-sleeping-dragon.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: { pt: "Sleeping Dragon", en: "Sleeping Dragon" },
      subtitle: {
        pt: "Fantasia de mundo denso",
        en: "A dense-world fantasy",
      },
      synopsis: {
        pt: "Um universo de fantasia construído com bíblia narrativa ampla, capítulos já em prosa e ambição de LitFan de alta qualidade. Dragões, poder e despertar — literal e simbólico — em escala épica.",
        en: "A fantasy universe built with a broad story bible, drafted chapters, and high-quality SFF ambition. Dragons, power, and awakening — literal and symbolic — on an epic scale.",
      },
      details: {
        pt: "Em desenvolvimento.",
        en: "In development.",
      },
    },
    {
      id: "vale-dos-segredos",
      status: "upcoming",
      seals: ["litfan"],
      year: null,
      cover: "assets/covers/placeholder-vale-dos-segredos.png",
      provisional: true,
      buyUrl: null,
      buyUrlEn: null,
      interactUrl: null,
      siteUrl: "https://valedossegredos.blogspot.com/",
      social: { instagram: null, facebook: null, youtube: null },
      authorIds: ["amanda-reznor"],
      title: {
        pt: "Delenda & o Vale dos Segredos",
        en: "Delenda & the Valley of Secrets",
      },
      subtitle: {
        pt: "Saga especulativa",
        en: "Speculative saga",
      },
      synopsis: {
        pt: "Universo narrativo de longa maturação, com ramificações como Maré Negra e O Despertar de Ouroboros. Segredos, ruínas e ciclos que se fecham — e se abrem de novo.",
        en: "A long-maturing narrative universe, with branches such as Black Tide and The Awakening of Ouroboros. Secrets, ruins, and cycles that close — and open again.",
      },
      details: {
        pt: "Em desenvolvimento.",
        en: "In development.",
      },
    },
    {
      id: "casa-do-kiddo",
      status: "upcoming",
      seals: ["infantil", "interativo"],
      year: null,
      cover: "assets/covers/placeholder-casa-do-kiddo.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: {
        pt: "Venha ver atrás da porta",
        en: "Come See Behind the Door",
      },
      subtitle: {
        pt: "A Casa do Kiddo",
        en: "Kiddo's House",
      },
      synopsis: {
        pt: "Projeto infantil interativo que convida crianças a explorar, resolver puzzles e descobrir o que há atrás de cada porta — literatura que brinca com o leitor.",
        en: "An interactive children's project that invites kids to explore, solve puzzles, and discover what lies behind each door — literature that plays with the reader.",
      },
      details: {
        pt: "Formato interativo / printables em desenvolvimento.",
        en: "Interactive / printable format in development.",
      },
    },
    {
      id: "jacare-guloso",
      status: "upcoming",
      seals: ["infantil"],
      year: null,
      cover: "assets/covers/placeholder-jacare-guloso.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: { pt: "O Jacaré Guloso", en: "The Greedy Alligator" },
      subtitle: {
        pt: "Conto ilustrado",
        en: "Illustrated story",
      },
      synopsis: {
        pt: "Uma história infantil com apetite, humor e cenários vividos — o jacaré guloso aprende (ou quase) que querer tudo de uma vez tem consequências deliciosamente cômicas.",
        en: "A children's tale of appetite, humor, and lively scenes — the greedy alligator learns (almost) that wanting everything at once has deliciously comic consequences.",
      },
      details: {
        pt: "Em produção de ilustrações e texto.",
        en: "Illustration and text in production.",
      },
    },
    {
      id: "mente-milionaria",
      status: "upcoming",
      seals: ["tecnico"],
      year: null,
      cover: "assets/covers/placeholder-mente-milionaria.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: {
        pt: "A Mente Milionária na Era das Criptos",
        en: "The Millionaire Mind in the Crypto Era",
      },
      subtitle: {
        pt: "Não ficção / autoajuda",
        en: "Nonfiction / self-help",
      },
      synopsis: {
        pt: "Um olhar contemporâneo sobre mentalidade, valor e oportunidades na era das criptomoedas — técnico o bastante para orientar, acessível o bastante para inspirar.",
        en: "A contemporary look at mindset, value, and opportunity in the crypto era — technical enough to guide, accessible enough to inspire.",
      },
      details: {
        pt: "Em desenvolvimento.",
        en: "In development.",
      },
    },
    {
      id: "crime-e-o-padre",
      status: "upcoming",
      seals: ["romance"],
      year: null,
      cover: "assets/covers/placeholder-crime-e-o-padre.png",
      provisional: true,
      authorIds: ["amanda-reznor"],
      title: { pt: "O Crime e o Padre", en: "The Crime and the Priest" },
      subtitle: {
        pt: "Conto / novela",
        en: "Short story / novella",
      },
      synopsis: {
        pt: "Um encontro tenso entre culpa, confissão e justiça — quando o crime bate à porta de quem deveria absolver, a linha entre pecado e redenção se esfumaça.",
        en: "A tense encounter between guilt, confession, and justice — when crime knocks on the door of the one who should absolve, the line between sin and redemption blurs.",
      },
      details: {
        pt: "Em desenvolvimento.",
        en: "In development.",
      },
    },
  ],

  about: {
    mission: {
      pt: "A Lua Nova é um selo editorial independente criado para publicar livros com propostas inovadoras: ficção especulativa de alta qualidade, narrativas interativas, obras infantis com inventividade, não ficção que converse com o agora e degustações para o leitor experimentar. Publicamos em português e olhamos para o mundo — internacionalização faz parte do horizonte.",
      en: "Lua Nova is an independent imprint created to publish books with innovative proposals: high-quality speculative fiction, interactive narratives, inventive children's works, nonfiction that speaks to the present, and samplers for readers to taste. We publish in Portuguese and look outward — internationalization is part of the horizon.",
    },
    vision: {
      pt: "Como a lua que muda de fase sem deixar de ser a mesma, o catálogo Lua Nova atravessa segmentos distintos — LitFan, infantil, interativo, romance, técnico e degustações — unidos pela mesma luz: ousadia formal, cuidado editorial e respeito ao leitor.",
      en: "Like the moon that changes phase without ceasing to be itself, the Lua Nova catalog crosses distinct segments — SFF, children's, interactive, literary fiction, nonfiction, and samplers — united by the same light: formal daring, editorial care, and respect for the reader.",
    },
    note: {
      pt: "Selo com CNPJ próprio, em fase de consolidação de catálogo e presença digital. Os textos desta página são protótipo editorial e serão refinados conforme cada lançamento.",
      en: "An imprint with its own CNPJ, consolidating catalog and digital presence. Texts on this page are an editorial prototype and will be refined with each release.",
    },
    eventsLead: {
      pt: "Lançamentos, lives, feiras e encontros com leitores. Em breve, a agenda da Lua Nova aparece aqui.",
      en: "Releases, lives, book fairs, and reader meetups. Soon, the Lua Nova calendar will appear here.",
    },
    eventsEmpty: {
      pt: "Nenhum evento agendado no momento.",
      en: "No events scheduled at the moment.",
    },
  },

  ui: {
    navHome: { pt: "Início", en: "Home" },
    navAbout: { pt: "Sobre", en: "About" },
    navCatalog: { pt: "Catálogo", en: "Catalog" },
    heroLead: {
      pt: "Selo editorial independente para livros que ousam novos formatos, mundos e leitores.",
      en: "An independent imprint for books that dare new forms, worlds, and readers.",
    },
    ctaCatalog: { pt: "Ver catálogo", en: "Browse catalog" },
    ctaAbout: { pt: "Conhecer o selo", en: "About the imprint" },
    sealsTitle: { pt: "Nossos selos", en: "Our lines" },
    sealsLead: {
      pt: "Seis linhas editoriais, uma mesma constelação. Cada capa carrega a cor do seu selo.",
      en: "Six editorial lines, one constellation. Each cover carries its line’s color.",
    },
    sealsHomeLead: {
      pt: "Escolha uma linha editorial para explorar o catálogo.",
      en: "Choose an editorial line to explore the catalog.",
    },
    catalogTitle: { pt: "Catálogo", en: "Catalog" },
    catalogLead: {
      pt: "Todos os títulos Lua Nova, organizados por selo — lançados primeiro, depois os que vêm a caminho.",
      en: "Every Lua Nova title, organized by line — published first, then those on the way.",
    },
    backToTop: { pt: "Voltar ao topo", en: "Back to top" },
    acquire: { pt: "Adquirir", en: "Buy" },
    interact: { pt: "Interagir", en: "Interact" },
    siteBtn: { pt: "SITE", en: "SITE" },
    socialInstagram: { pt: "Instagram", en: "Instagram" },
    socialFacebook: { pt: "Facebook", en: "Facebook" },
    socialYoutube: { pt: "YouTube", en: "YouTube" },
    socialLinkedin: { pt: "LinkedIn", en: "LinkedIn" },
    downloadSample: { pt: "Baixar degustação", en: "Download sample" },
    linkSoon: { pt: "Em breve", en: "Coming soon" },
    publishedTitle: { pt: "Livros lançados", en: "Published books" },
    publishedLead: {
      pt: "O que já saiu da órbita e chegou às suas mãos.",
      en: "What has already left orbit and reached your hands.",
    },
    upcomingTitle: { pt: "Próximos lançamentos", en: "Upcoming releases" },
    upcomingLead: {
      pt: "O que ainda brilha no horizonte editorial.",
      en: "What still glows on the editorial horizon.",
    },
    hoverHint: {
      pt: "Passe o mouse para pausar · clique para abrir",
      en: "Hover to pause · click to open",
    },
    emptySeal: {
      pt: "Ainda sem títulos neste selo.",
      en: "No titles in this line yet.",
    },
    subgroupPublished: { pt: "Lançados", en: "Published" },
    subgroupUpcoming: { pt: "Em andamento", en: "In progress" },
    authorLabel: { pt: "Autor(a)", en: "Author" },
    statusPublished: { pt: "Lançado", en: "Published" },
    statusUpcoming: { pt: "Em breve", en: "Coming soon" },
    yearLabel: { pt: "Ano", en: "Year" },
    sealsLabel: { pt: "Selo", en: "Line" },
    backHome: { pt: "← Voltar ao início", en: "← Back home" },
    aboutTitle: { pt: "Sobre a Lua Nova", en: "About Lua Nova" },
    missionTitle: { pt: "Missão", en: "Mission" },
    visionTitle: { pt: "Visão", en: "Vision" },
    contactTitle: { pt: "Contato", en: "Contact" },
    eventsTitle: { pt: "Próximos eventos", en: "Upcoming events" },
    booksByAuthor: { pt: "Obras no catálogo", en: "Works in the catalog" },
    footerRights: {
      pt: "Lua Nova Editora - {year} - Todos os direitos reservados",
      en: "Lua Nova Publishing - {year} - All rights reserved",
    },
    placeholderCover: { pt: "(capa provisória)", en: "(provisional cover)" },
    emailLabel: { pt: "E-mail", en: "Email" },
    socialLabel: { pt: "Redes", en: "Social" },
    shopLabel: { pt: "Loja", en: "Shop" },
  },
};
