# Revisao Do Gerenciador De Tarefas

## Fonte Consultada

Repositorio local consultado durante o desenvolvimento: copia de trabalho privada do projeto de tarefas.

Repositorio publico: `https://github.com/Victorzinn704/Gerenciador-de-Tarefas-`

Aplicacao publicada: `https://victorzinn704.github.io/Gerenciador-de-Tarefas-/`

## Estrutura Encontrada

O gerenciador de tarefas usa uma separacao simples e rastreavel:

| Area | Arquivo | Papel |
| --- | --- | --- |
| Estado central | `src/hooks/useTaskManager.js` | Controla tarefas, historico, filtro, data, mes e tema. |
| Normalizacao | `src/utils/tarefaUtils.js` | Cria ids, formata datas, normaliza horarios e classifica periodos. |
| Filtros | `src/components/Filtros.jsx` | Aplica estados de visualizacao com botoes curtos e icones. |
| Historico | `src/components/HistoricoTarefas.jsx` | Registra criacao, edicao, conclusao, reabertura e remocao. |
| Resumo | `src/styles/components/Tarefa.styles.js` | Mostra progresso e contadores de total, ativas e concluidas. |
| Documentacao | `docs/REGRAS-DE-NEGOCIO.md` | Explica regra de periodo, historico e persistencia. |

## Padroes Reaproveitados Aqui

| Padrao Do Gerenciador | Uso No Network Packet Lab | Decisao |
| --- | --- | --- |
| Workbench com trilho lateral e area principal | Trilho esquerdo, palco da rede e inspetor direito | Mantido. Ajuda a separar entrada, simulacao e leitura tecnica. |
| Progresso com resumo numerico | `FlowSummary` em `web/src/components/FlowSummary.tsx` | Adotado. Resume total, fila, concluidos e falhas tratadas. |
| Historico de acoes | `TransmissionHistory` | Mantido. Cada etapa da rede fica registrada ate o fechamento. |
| Filtros curtos com estado ativo | `NetworkInspector` | Mantido. Busca e filtros reduzem ruido na leitura do fluxo. |
| Regra central fora da tela principal | `web/src/domain/network-demo.ts` e `network-transitions.ts` | Mantido. A tela nao concentra regra de negocio. |
| Tema claro/escuro | `ThemeToggle` e `web/src/domain/theme.ts` | Adotado. O tema fica no topo, persiste no navegador e tambem aceita URL direta para apresentacao. |

## Padroes Nao Copiados

| Padrao | Motivo |
| --- | --- |
| Calendario mensal | Pertence a agenda. Nao melhora a explicacao de fila, pilha, roteador, DNS e retransmissao. |
| Persistencia do estado da simulacao | A demo de rede deve reiniciar limpa para apresentacao. Persistir a etapa atual poderia confundir o avaliador. |
| `styled-components` | O projeto atual usa CSS modular por arquivo. Trocar a base aumentaria dependencia sem ganho direto. |

## Ajuste Feito

Foram criados o componente `FlowSummary` e o controle `ThemeToggle`, inspirados no painel de progresso e no alternador de tema do gerenciador de tarefas.

O `FlowSummary` mostra:

- total de pacotes do cenario;
- pacotes ainda na fila;
- pacotes concluidos, incluindo retransmissoes bem sucedidas;
- falhas tratadas, somando pilha atual e pacotes ja retransmitidos;
- progresso do ciclo.

O `ThemeToggle` segue a mesma regra de uso do projeto de tarefas: um botao direto no topo alterna entre claro e escuro, e o navegador guarda a escolha em `localStorage`. Para apresentacao e capturas, a URL tambem aceita `?theme=light` ou `?theme=dark`.

Esses blocos melhoram a leitura da apresentacao porque o publico ve, em poucos segundos, se o fluxo esta parado, em execucao ou fechado, e o apresentador consegue adaptar a tela ao projetor ou ao ambiente da sala.

## Regra De Uso Futuro

Quando outro componente do gerenciador for trazido para este repositorio, ele deve passar por tres perguntas:

1. A regra pertence ao dominio de redes?
2. O componente reduz a complexidade de leitura?
3. A implementacao cabe no padrao atual de TypeScript, CSS local e arquivos pequenos?

Se a resposta for negativa, o padrao fica apenas como referencia documentada.
