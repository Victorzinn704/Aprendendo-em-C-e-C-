# Interface Web Para GitHub Pages

## Objetivo

A pasta `web/` contem uma interface interativa para GitHub Pages. Ela roda 100% no navegador com React e TypeScript para apresentar as questoes do PDF e aprofundar a simulacao de pacotes.

Ela nao executa o backend C/C++ no GitHub Pages.

## Limites Da Publicacao

| Camada | Onde roda | Papel |
| --- | --- | --- |
| Interface web | GitHub Pages / navegador | Mostrar as questoes do PDF e a simulacao visual de pacotes. |
| Bancada das questoes | `web/src/domain/labs` | Mostrar dados e estruturas das questoes 1, 2, 3, 4 e C++. |
| Estado visual de rede | `web/src/domain/network-demo.ts` | Espelhar o comportamento do Exercicio 5 em TypeScript. |
| Codigo principal | `src/c` e `src/cpp` | Manter a implementacao nativa C/C++ versionada. |
| Execucao real C | Maquina local | Compilar e rodar com GCC, Clang ou TinyCC. |

## Stack

- Vite
- React
- TypeScript
- CSS proprio com tokens de interface tecnica
- `lucide-react` para icones
- tema claro/escuro persistido no navegador

## Por Que Nao Rodar O C/C++ No Pages Agora

GitHub Pages entrega arquivos estaticos. Ele nao inicia processo nativo, nao compila C e nao executa binario no servidor.

Neste momento, a decisao tecnica e:

- mostrar a experiencia de uso no navegador;
- manter o C/C++ como fonte principal da regra nativa;
- mostrar todas as questoes do PDF na mesma interface;
- documentar como compilar localmente;
- deixar a evolucao para WebAssembly como fase futura, se fizer sentido.

## Comandos Locais

```powershell
cd web
npm install
npm run dev
npm run build
```

## Deploy

O workflow `.github/workflows/pages.yml` compila `web/` e publica `web/dist` no GitHub Pages.

No GitHub, configure:

1. `Settings`.
2. `Pages`.
3. `Build and deployment`.
4. `Source: GitHub Actions`.

## Direcao Visual

A interface segue uma direcao de laboratorio tecnico:

- paineis densos e rastreaveis;
- navegacao por questao com rotas diretas `#ex01`, `#ex02`, `#ex03`, `#ex04`, `#ex05` e `#cpp`;
- bancadas de fila, pilha, lista, prioridade e grafo com dados dos arquivos C/C++;
- fluxo visual de rede;
- rotas SVG com tracos animados para pacote, DNS, servidor e pilha de erro;
- status de fila, pilha e lista;
- busca por pacote, rota, falha ou evento;
- filtros por todos, pacotes, falhas e historico;
- historico de transmissao na lateral direita, seguindo o padrao de registro usado no gerenciador de tarefas;
- tema claro/escuro no topo, inspirado no gerenciador de tarefas e adaptado aos tokens deste projeto;
- trecho tecnico relacionado ao codigo C;
- separacao clara entre interface de apresentacao e implementacao nativa;
- simulacao automatica com descricao do evento dentro do palco de interacao;
- encerramento em 100%, sem reiniciar em loop.

Para capturas ou apresentacao em sala, a interface aceita tema direto na URL:

```text
http://127.0.0.1:5173/?theme=light#ex05
http://127.0.0.1:5173/?theme=dark#ex05
```

As metricas de UI/UX e responsividade estao em `docs/frontend/ui-quality-metrics.md`.

## Fontes De Componentes E Criterio

Foram usados principios de bibliotecas modernas como shadcn/ui, Magic UI, 21st.dev, React Bits e Uiverse, mas a implementacao mantem componentes locais para reduzir dependencia, controlar licenca e adaptar o visual ao dominio de redes.

Quando um bloco externo for copiado no futuro, ele deve entrar com:

- origem documentada;
- licenca verificada;
- adaptacao aos tokens do projeto;
- remocao de estilos genericos que nao representem o dominio.

## Organizacao Do Frontend

| Area | Arquivos |
| --- | --- |
| Indice das questoes | `web/src/domain/exercise-labs.ts` |
| Dados das bancadas | `web/src/domain/labs/*` |
| Estado visual | `web/src/domain/network-demo.ts` |
| Tipos e fixtures | `web/src/domain/network-types.ts`, `web/src/domain/network-fixtures.ts` |
| Referencias de codigo | `web/src/domain/code-references.ts` |
| Topologia | `web/src/components/TopologyPanel.tsx`, `web/src/styles/topology.css` |
| Rota e historico | `web/src/components/RouteStrip.tsx`, `web/src/components/TransmissionHistory.tsx` |
| Questoes | `web/src/components/LabNavigator.tsx`, `web/src/components/ExerciseWorkspace.tsx` |
| Inspecao | `web/src/components/NetworkInspector.tsx` |
| Shell e paineis | `web/src/App.tsx`, `web/src/components/*`, `web/src/styles/*` |

## Validacao Local

Comandos usados para validar a interface:

```powershell
cd web
npm run build
npm audit --audit-level=high
```

## Evidencias Visuais

As capturas abaixo foram geradas localmente com Chrome headless, usando o servidor Vite em `http://127.0.0.1:5173/`.

| Captura | Arquivo | Resolucao |
| --- | --- | --- |
| Questoes | `docs/frontend/screenshots/pages-demo-questions.png` | 1440 x 900 |
| Desktop | `docs/frontend/screenshots/pages-demo-desktop.png` | 1440 x 900 |
| Desktop escuro | `docs/frontend/screenshots/pages-demo-dark.png` | 1440 x 900 |
| Mobile | `docs/frontend/screenshots/pages-demo-mobile.png` | 390 x 844 |
| Fechamento | `docs/frontend/screenshots/pages-demo-final.png` | 1440 x 900 |
