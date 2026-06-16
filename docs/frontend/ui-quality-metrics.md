# Metricas De UI/UX E Responsividade

Data: 2026-06-16.

Escopo: interface `web/` do Network Packet Lab.

## Objetivo Da Revisao

Substituir a primeira versao da interface por uma superficie de trabalho com hierarquia real de produto e uso integral da tela:

- topo operacional;
- faixa de comando compacta;
- palco central de simulacao ocupando a maior area;
- laterais de estado como superficies irmas do palco;
- secao tecnica rastreavel;
- navegacao por questao do PDF;
- rodape arquitetural.

## Principios Aplicados

| Area | Regra aplicada |
| --- | --- |
| Hierarquia | O evento atual fica no topo do palco, nao escondido em log lateral. |
| Enquadramento | A topologia fica no centro e usa a largura total disponivel, sem container maximo artificial. |
| Blocos | Paineis laterais sao irmaos do palco, nao cards aninhados. |
| Acao | A simulacao roda automaticamente, para ao concluir e permite rodar novamente. |
| Rastreabilidade | Cada evento aponta para operacao C/C++ relacionada. |
| Honestidade | A UI informa que GitHub Pages roda TypeScript, nao backend nativo. |
| Movimento | Rotas ativas usam tracos animados no SVG para explicar o caminho do pacote. |
| Historico | O fluxo tem registro lateral inspirado no gerenciador de tarefas React. |
| Inspecao | Busca e filtros reduzem a lista por pacote, falha ou evento. |
| Cobertura | A interface expoe as questoes 1, 2, lacuna 3, 4, 5 e trilha C++. |
| Estabilidade | A fila e a topologia mantem dimensoes estaveis durante o ciclo automatico. |
| Tema | Claro e escuro ficam em tokens compartilhados, com alternancia persistida no navegador. |

## Metricas De UI/UX

| Metrica | Alvo | Implementacao |
| --- | --- | --- |
| Area de toque | Minimo 44px | `product-topbar`, metricas e botoes usam altura minima de 44px. |
| Bordas | Maximo 8px | Paineis, botoes e superficie principal usam `border-radius: 8px`. |
| Densidade | Alta, mas escaneavel | Tabelas e listas usam linhas compactas com separacao por borda. |
| Movimento | Reduzivel | `prefers-reduced-motion` reduz transicoes e animacoes. |
| Hierarquia visual | 3 niveis | Topo, stage central e rodape tecnico. |
| Contraste | Texto principal escuro em fundo claro | Tokens `--ink`, `--paper` e `--line` mantem leitura. |
| Simulacao | Automatica | Intervalo de 4200 ms avanca o ciclo, para em 100% e mostra `Rodar novamente`. |
| Busca | Campo unico | Consulta pacote, rota, status e evento no painel lateral. |
| Filtros | 4 modos | Todos, pacotes, falhas e historico. |
| Navegacao | 6 entradas | `#ex01`, `#ex02`, `#ex03`, `#ex04`, `#ex05` e `#cpp`. |
| Tema | 2 modos | `?theme=light`, `?theme=dark` ou botao no topo. |
| Tipografia | Sem escala por viewport | Tamanhos mudam apenas nos breakpoints. |
| Arquivos | Limite operacional | Componentes e dominio ficam abaixo de 200 linhas; CSS modular fica abaixo de 260 linhas por arquivo. |

## Breakpoints

| Breakpoint | Comportamento |
| --- | --- |
| `> 1280px` | Layout completo em 3 colunas: estado, palco, estado. |
| `<= 1280px` | Duas colunas; estado secundario desce sem esconder dados. |
| `<= 980px` | Topo, comando, stage e paineis ficam em coluna unica. |
| `<= 720px` | Controles, rails e rodape reduzem para coluna unica. |
| `<= 520px` | Controles e metricas viram coluna simples; palco preserva altura minima. |

## Componentes E Referencias

- shadcn/ui serviu como referencia de shell lateral e composicao de aplicacao.
- Magic UI serviu como referencia para o conceito de beam animado em rotas.
- 21st.dev foi usado como referencia visual para dashboards densos.
- Uiverse foi verificado como fonte de componentes livres, mas nenhum bloco foi copiado nesta etapa.

## Estrutura Do CSS

| Arquivo | Papel |
| --- | --- |
| `web/src/styles/tokens.css` | Tokens de cor, sombra e familia tipografica. |
| `web/src/styles/base.css` | Reset, acessibilidade e tipografia base. |
| `web/src/styles/shell.css` | Topo, comando, grid principal e rodape. |
| `web/src/styles/panels.css` | Rails, listas, tabela e status. |
| `web/src/styles/labs.css` | Navegacao e bancada das questoes. |
| `web/src/styles/lab-responsive.css` | Breakpoints da bancada das questoes. |
| `web/src/styles/history.css` | Rota ativa e historico de transmissao. |
| `web/src/styles/footer.css` | Rodape arquitetural. |
| `web/src/styles/topology.css` | Topologia, rotas, beam e pacote animado. |
| `web/src/styles/trace.css` | Codigo relacionado e historico de eventos. |
| `web/src/styles/responsive.css` | Breakpoints e ajustes de largura. |

## Riscos Restantes

- Ainda nao ha teste visual automatizado por screenshot; a validacao atual cobre build, auditoria de dependencias e inspecao local.
- A interface TypeScript espelha a regra do Exercicio 5 para apresentacao; a execucao nativa continua sendo validada pelos binarios C/C++.
- O tema visual fica em `localStorage`, mas o estado da simulacao nao fica persistido para preservar uma apresentacao previsivel.
