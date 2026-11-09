/* O Arquivo de Shera — page language and the crossing-out ledger.
   Shares the language choice with the main Lua Nova site ("luanova-lang"). */
(function () {
  const STORAGE_KEY = "luanova-lang";

  const T = {
    skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
    navVolumes: { pt: "Volumes", en: "Volumes" },
    navWorld: { pt: "O mundo", en: "The world" },
    navForum: { pt: "Sala de Leitura", en: "Reading Room" },
    heroEyebrow: { pt: "Uma série de livros-jogos de Amanda Reznor", en: "A gamebook series by Amanda Reznor" },
    heroPre: { pt: "O Arquivo de", en: "The Archive of" },
    heroSub: { pt: "Quatro Noites e Um Segredo", en: "Four Nights and a Secret" },
    heroPromise: {
      pt: "Quatro noites para salvar uma rainha. Risque os nomes impossíveis, descubra mensagens nas listas e siga uma história que muda quando você volta ao começo.",
      en: "Four nights to save a queen. Cross out the impossible names, find the messages in the lists, and follow a story that changes when you return to the beginning.",
    },
    heroCoverAlt: {
      pt: "Capa de The Bronze Eye, volume 1 de O Arquivo de Shera",
      en: "Cover of The Bronze Eye, volume 1 of Shera's Archive",
    },
    ctaVolumes: { pt: "Conhecer os volumes", en: "See the volumes" },
    ctaForum: { pt: "Entrar na Sala de Leitura", en: "Enter the Reading Room" },
    premiseTitle: { pt: "A premissa", en: "The premise" },
    premise: {
      pt: "Dois anos depois de acordar de um coma, a rainha viúva Sherazade é obrigada pela corte a um segundo casamento de conveniência. Na noite da assinatura, ela é presa. O juiz que vai interrogá-la é o próprio noivo, o único Terceiro Leitor de Kerman, que acaba de ter a memória raspada e não sabe mais nada sobre ela.",
      en: "Two years after waking from a coma, the widowed queen Sherazade is pressed by the court into a second marriage of convenience. On the night of the signing, she is arrested. The judge who will question her is her own groom, Kerman's only Third Reader, whose memory has just been scraped clean of her.",
    },
    premiseQuote: {
      pt: "“As histórias nunca foram minhas. Esta noite, quem vai ler é você.”",
      en: "“The stories were never mine. Tonight, you are the one who reads.”",
    },
    kermanEyebrow: { pt: "O Arquivo de Kerman", en: "The Archive of Kerman" },
    kermanTitle: {
      pt: "Em Kerman, nada se destrói; apenas se corrige.",
      en: "In Kerman, nothing is destroyed; it is only corrected.",
    },
    kermanText1: {
      pt: "Escavado andar sobre andar no coração de um penhasco de sal, o Arquivo guarda todos os processos da cidade. O sal preserva o papel, e por isso a primeira lei proíbe o fogo lá dentro.",
      en: "Carved floor upon floor into the heart of a salt cliff, the Archive keeps every case the city has ever tried. Salt preserves paper, which is why the first law forbids fire inside.",
    },
    kermanText2: {
      pt: "Corrigir é riscar: um nome riscado continua legível, só deixa de valer. As crianças aprendem a ler duas vezes — primeiro o que está escrito, depois o que sobra quando se risca o que não pertence.",
      en: "To correct is to cross out: a struck name stays legible, it simply stops counting. Children learn to read twice — first what is written, then what remains once everything that does not belong is struck.",
    },
    ledgerHead: { pt: "Rol de testemunhas", en: "Roll of witnesses" },
    ledgerHint: {
      pt: "Toque num nome para riscá-lo. Ele continua legível — só deixa de valer.",
      en: "Tap a name to strike it. It stays legible — it simply stops counting.",
    },
    howEyebrow: { pt: "Como se lê", en: "How it reads" },
    howTitle: { pt: "Sem dados, sem fichas, sem recortes", en: "No dice, no tokens, no scissors" },
    how1Title: { pt: "Risque", en: "Strike" },
    how1Text: {
      pt: "Elimine os nomes impossíveis. O que sobra, lido na ordem, começa a falar.",
      en: "Eliminate the impossible names. What remains, read in order, starts to speak.",
    },
    how2Title: { pt: "Cruze", en: "Cross-check" },
    how2Text: {
      pt: "Compare depoimentos, listas e registros. A pista está no que não combina.",
      en: "Compare testimonies, lists, and records. The clue lies in what doesn't match.",
    },
    how3Title: { pt: "Pese", en: "Weigh" },
    how3Text: {
      pt: "A balança do Terceiro Leitor não mente. Cada caso resolvido salva um condenado.",
      en: "The Third Reader's scale does not lie. Every solved case saves a condemned soul.",
    },
    howNote: {
      pt: "O leitor casual resolve o caso de cada volume. O leitor atento ouve a mensagem escondida — e descobre que a história muda quando volta ao começo.",
      en: "The casual reader solves each volume's case. The attentive reader hears the hidden message — and finds the story changes on returning to the beginning.",
    },
    volEyebrow: { pt: "Cinco tomos · quatro casos e uma espiral", en: "Five tomes · four cases and a spiral" },
    volTitle: { pt: "Os volumes", en: "The volumes" },
    colBronze: { pt: "Bronze", en: "Bronze" },
    colRuby: { pt: "Rubi", en: "Ruby" },
    colSilver: { pt: "Prata", en: "Silver" },
    colJade: { pt: "Jade", en: "Jade" },
    colAmethyst: { pt: "Ametista", en: "Amethyst" },
    vol1: { pt: "O Olho de Bronze", en: "The Bronze Eye" },
    vol2: { pt: "O Banquete de Cinzas", en: "Banquet of Ashes" },
    vol3: { pt: "A Câmara dos Espelhos", en: "Chamber of Mirrors" },
    vol4: { pt: "O Jogo da Quimera", en: "Chimera Game" },
    vol5: { pt: "A Quinta Noite", en: "The Fifth Night" },
    volStatus: {
      pt: "Em produção. O volume 1 chega primeiro, em inglês, pela Amazon.",
      en: "In production. Volume 1 arrives first, in English, on Amazon.",
    },
    peopleEyebrow: { pt: "Na cela de isolamento", en: "In the isolation cell" },
    peopleTitle: { pt: "Uma prisioneira e o seu juiz", en: "A prisoner and her judge" },
    sheraText: {
      pt: "Rainha viúva, mãe de três filhos, cerca de trinta e cinco anos. Usa só metade do nome e nunca explica por quê: quem não é nomeado com exatidão não pode ser alcançado. Conta degraus quando tem medo. Recusa-se a contar histórias.",
      en: "A widowed queen, mother of three, about thirty-five. She uses only half her name and never explains why: whoever is not named exactly cannot be reached. She counts steps when she is afraid. She refuses to tell stories.",
    },
    tarikText: {
      pt: "O único Terceiro Leitor de Kerman: lê o que foi escrito para ser lido errado, e ninguém confere o que ele lê. Frio, exato, ritualístico. Afia três penas sempre na mesma ordem e nunca relê.",
      en: "Kerman's only Third Reader: he reads what was written to be misread, and no one checks what he reads. Cold, exact, ritualistic. He sharpens three quills in the same order every time and never rereads.",
    },
    platePrisonAlt: {
      pt: "Gravura: Shera atrás das grades de ferro, diante de Tarik",
      en: "Engraving: Shera behind iron bars, facing Tarik",
    },
    plateSignatureAlt: {
      pt: "Gravura: o contrato com a assinatura interrompida, no Arquivo de Kerman",
      en: "Engraving: the contract with the interrupted signature, in the Archive of Kerman",
    },
    plateSignatureCap: { pt: "A assinatura interrompida.", en: "The interrupted signature." },
    forumEyebrow: { pt: "Para leitores", en: "For readers" },
    forumTitle: { pt: "A Sala de Leitura", en: "The Reading Room" },
    forumLead: {
      pt: "Troque teorias, peça uma dica, discuta os casos. Cada volume tem a sua sala, para que ninguém leia a solução antes da hora.",
      en: "Trade theories, ask for a hint, discuss the cases. Each volume has its own room, so no one reads a solution too early.",
    },
    forumLoading: { pt: "Abrindo a Sala de Leitura…", en: "Opening the Reading Room…" },
    footNote: {
      pt: "O Arquivo de Shera © Amanda Reznor · Lua Nova Studio. Todos os direitos reservados.",
      en: "Shera's Archive © Amanda Reznor · Lua Nova Studio. All rights reserved.",
    },

    /* Forum */
    fSoon: {
      pt: "A Sala de Leitura abre em breve. Volte para conversar com outros leitores de Kerman.",
      en: "The Reading Room opens soon. Come back to talk with other readers of Kerman.",
    },
    fDemo: {
      pt: "Modo de demonstração: as mensagens ficam só neste navegador.",
      en: "Demo mode: messages stay in this browser only.",
    },
    fError: {
      pt: "Não foi possível abrir a Sala de Leitura agora. Tente de novo em instantes.",
      en: "The Reading Room could not be opened right now. Please try again shortly.",
    },
    roomGeneral: { pt: "Geral", en: "General" },
    roomNoteGeneral: {
      pt: "Sala sem spoilers: apresente-se, fale da série e do mundo de Kerman. Nada de soluções aqui.",
      en: "Spoiler-free room: introduce yourself, talk about the series and the world of Kerman. No solutions here.",
    },
    roomNoteVol: {
      pt: "Sala do volume {n}. Spoilers deste volume são permitidos, mas marque-os para quem ainda está lendo.",
      en: "Volume {n} room. Spoilers for this volume are allowed, but mark them for those still reading.",
    },
    fLangNote: {
      pt: "Você está na Sala de Leitura em português.",
      en: "You are in the English Reading Room.",
    },
    fLangSwitch: { pt: "Read in English", en: "Ler em português" },
    fTopics: { pt: "Tópicos", en: "Topics" },
    fNewTopic: { pt: "Novo tópico", en: "New topic" },
    fEmpty: { pt: "Nenhum tópico nesta sala ainda. Que tal abrir o primeiro?", en: "No topics in this room yet. Why not start the first?" },
    fReplies: { pt: "{n} respostas", en: "{n} replies" },
    fReply1: { pt: "1 resposta", en: "1 reply" },
    fBy: { pt: "por", en: "by" },
    fBack: { pt: "← Voltar aos tópicos", en: "← Back to topics" },
    fSpoiler: { pt: "Spoiler", en: "Spoiler" },
    fReveal: { pt: "Mostrar spoiler", en: "Show spoiler" },
    fTitle: { pt: "Título", en: "Title" },
    fMessage: { pt: "Mensagem", en: "Message" },
    fReplyLabel: { pt: "Sua resposta", en: "Your reply" },
    fMarkSpoiler: { pt: "Contém spoiler", en: "Contains spoilers" },
    fPublish: { pt: "Publicar", en: "Post" },
    fSendReply: { pt: "Responder", en: "Reply" },
    fCancel: { pt: "Cancelar", en: "Cancel" },
    fDelete: { pt: "Apagar", en: "Delete" },
    fConfirmDelete: { pt: "Apagar esta mensagem? Não dá para desfazer.", en: "Delete this message? This cannot be undone." },
    fTooShort: { pt: "Escreva um título e uma mensagem.", en: "Please write a title and a message." },
    fTooShortReply: { pt: "Escreva uma resposta.", en: "Please write a reply." },
    fSendFail: { pt: "Não foi possível publicar. Tente de novo.", en: "Could not post. Please try again." },
    fLoginToPost: {
      pt: "Entre para abrir tópicos e responder. Ler é livre para todos.",
      en: "Sign in to start topics and reply. Reading is open to everyone.",
    },
    fLoginGoogle: { pt: "Entrar com Google", en: "Sign in with Google" },
    fLoginEmail: { pt: "Receber link por e-mail", en: "Email me a sign-in link" },
    fEmailPlaceholder: { pt: "seu@email.com", en: "you@email.com" },
    fEmailSent: {
      pt: "Enviamos um link para {email}. Abra-o neste aparelho para entrar. Se não chegar em alguns minutos, confira a caixa de spam ou lixo eletrônico.",
      en: "We sent a link to {email}. Open it on this device to sign in. If it doesn't arrive within a few minutes, check your spam or junk folder.",
    },
    fEmailAsk: { pt: "Confirme o e-mail em que recebeu o link:", en: "Confirm the email that received the link:" },
    fEmailFail: { pt: "Não foi possível enviar o link. Confira o e-mail.", en: "Could not send the link. Please check the email." },
    fLoginFail: { pt: "Não foi possível entrar. Tente de novo.", en: "Could not sign in. Please try again." },
    fLogout: { pt: "Sair", en: "Sign out" },
    fNameAsk: { pt: "Como quer ser chamado na Sala de Leitura?", en: "What name should the Reading Room show?" },
    fDemoLogin: { pt: "Entrar (demonstração)", en: "Sign in (demo)" },
    fRules: {
      pt: "Seja gentil. Nada de soluções fora da sala do volume, e marque os spoilers. Mensagens que desrespeitem outras pessoas são apagadas. Ao entrar, guardamos só o nome e o e-mail da sua conta para identificar suas mensagens.",
      en: "Be kind. No solutions outside a volume's room, and mark spoilers. Messages that disrespect others are removed. When you sign in we keep only your account's name and email to identify your posts.",
    },
    fJustNow: { pt: "agora", en: "just now" },
  };

  function getLang() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pt" || stored === "en") return stored;
    return (navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en";
  }

  let lang = getLang();
  const listeners = [];

  function t(key, vars) {
    const entry = T[key];
    let s = entry ? entry[lang] || entry.pt : key;
    if (vars) Object.keys(vars).forEach((k) => (s = s.replace(`{${k}}`, vars[k])));
    return s;
  }

  function apply() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = lang === "pt" ? "O Arquivo de Shera · Lua Nova Studio" : "Shera's Archive · Lua Nova Studio";
    document.querySelectorAll("[data-t]").forEach((el) => {
      el.textContent = t(el.dataset.t);
    });
    document.querySelectorAll("[data-t-alt]").forEach((el) => {
      el.alt = t(el.dataset.tAlt);
    });
    document.querySelectorAll(".lang button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    listeners.forEach((fn) => fn(lang));
  }

  document.querySelectorAll(".lang button").forEach((b) => {
    b.addEventListener("click", () => {
      lang = b.dataset.lang;
      localStorage.setItem(STORAGE_KEY, lang);
      apply();
    });
  });

  // Ledger: strike a name (it stays legible).
  document.querySelectorAll(".ledger-list button").forEach((b) => {
    b.setAttribute("aria-pressed", "false");
    b.addEventListener("click", () => {
      b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
    });
  });

  window.SheraI18n = {
    t,
    get lang() {
      return lang;
    },
    onChange(fn) {
      listeners.push(fn);
    },
  };

  apply();
})();
