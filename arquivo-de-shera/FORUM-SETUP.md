# Sala de Leitura — como ligar o fórum

O fórum da página de *O Arquivo de Shera* usa o **Firebase** (Google) para o login e para guardar as mensagens. Enquanto
o `firebase-config.js` estiver vazio, a página no ar mostra "A Sala de Leitura abre em breve". No computador
(`localhost`), ou com `?demo` no endereço, o fórum roda em **modo de demonstração**, guardando tudo só no navegador.

## 1. Criar o projeto

1. Entre em <https://console.firebase.google.com> com a conta Google da editora.
2. **Adicionar projeto** → nome, por exemplo, `lua-nova-sala-de-leitura`. O Google Analytics pode ficar desligado.

## 2. Registrar o site

1. Na página do projeto, clique no ícone **Web** (`</>`) e dê um apelido, por exemplo, `luanovastudio.com`. Não é preciso
   ativar o Hosting.
2. O Firebase mostra um bloco `firebaseConfig`. Copie os quatro valores para `firebase-config.js`:
   `apiKey`, `authDomain`, `projectId` e `appId`. Essas chaves são públicas por natureza: quem protege os dados são as regras
   do passo 4.

## 3. Ativar o login

1. **Authentication** → **Começar** → **Método de login**.
2. Ative **Google** e escolha o e-mail de suporte.
3. Ative **E-mail/senha** e, dentro dele, **Link do e-mail (login sem senha)**.
4. **Authentication** → **Configurações** → **Domínios autorizados** → adicione `luanovastudio.com` e
   `www.luanovastudio.com`.

## 4. Criar o banco e as regras

1. **Firestore Database** → **Criar banco de dados** → modo de **produção** → região `southamerica-east1` (São Paulo).
2. Aba **Regras** → apague o conteúdo, cole o arquivo `firestore.rules` desta pasta e clique em **Publicar**.

O que as regras garantem:

- qualquer pessoa lê; só quem entrou publica;
- cada mensagem leva o nome e a identificação de quem escreveu, sem possibilidade de falsificar;
- títulos de até 120 caracteres e mensagens de até 4.000;
- cada pessoa apaga as próprias mensagens; um tópico só pode ser apagado pelo autor enquanto não tiver respostas;
- administradores apagam qualquer coisa.

## 5. Tornar-se administradora

1. Entre uma vez no fórum, já no ar.
2. **Authentication** → **Usuários** → copie o **UID** da sua conta.
3. **Firestore Database** → **Iniciar coleção** → ID `admins` → ID do documento: cole o UID → adicione um campo qualquer
   (por exemplo, `nome` = `Amanda`) → Salvar.
4. Recarregue o fórum: o botão **Apagar** aparece em todas as mensagens.

## Custos e limites

O plano gratuito (Spark) cobre com folga um fórum de leitores: dezenas de milhares de leituras e gravações por dia. O
envio de links de login por e-mail tem um limite diário mais baixo no plano gratuito. Se o fórum crescer, há duas saídas:
ativar o plano Blaze (pago por uso, com custo baixo nesse porte) ou deixar só o login com Google.

## Moderação

Não há filtro automático de palavrões nem botão de denúncia. A moderação é feita apagando mensagens, pelo próprio fórum
(como administradora) ou pelo console do Firestore. Se o volume crescer, dá para acrescentar denúncia e limite de
mensagens por pessoa.
