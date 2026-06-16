# Matriz De Casos De Uso, Testes E Evidencias

Data da revisao: 2026-06-16.

## Objetivo

Este documento liga a fonte do requisito ao codigo, ao teste e a evidencia. A leitura correta e:

```text
requisito do PDF -> caso de uso -> arquivo implementado -> validacao -> evidencia -> limite conhecido
```

Se uma entrega importante nao aparece nesta matriz, ela ainda depende de memoria informal e deve ser documentada antes de apresentacao, PR ou publicacao.

## 1. Mapa De Rastreabilidade

| ID | Fonte | Caso de uso | Implementacao | Validacao | Evidencia | Limite declarado |
| --- | --- | --- | --- | --- | --- | --- |
| UC-01 | Exercicio 1 do PDF | Explicar atendimento por ordem de chegada, historico e cadastro dinamico | `src/c/ex01_clinica.c` | Build C + demo `ex01_clinica` | `docs/testing/evidence/run-c-demos-summary.txt` | Dados sinteticos; nao e sistema real de clinica |
| UC-02 | Exercicio 2 do PDF | Mostrar chamados, logs e inventario de suporte de TI | `src/c/ex02_suporte_ti.c` | Build C + demo `ex02_suporte_ti` | `docs/testing/evidence/run-c-demos-summary.txt` | Nao integra com ferramenta real de service desk |
| UC-03 | Ausencia no PDF | Provar controle de escopo sem inventar requisito | `docs/pdf-scope.md` e rota `#ex03` | Revisao documental + build web | `docs/frontend/screenshots/pages-demo-questions.png` | Nao ha codigo C porque a questao nao existe na fonte |
| UC-04 | Exercicio 4 do PDF | Demonstrar escalonamento por prioridade, ativos e encerrados | `src/c/ex04_escalonamento.c` | Build C + demo `ex04_escalonamento` | `docs/testing/evidence/run-c-demos-summary.txt` | Simula decisao de CPU; nao e scheduler real |
| UC-05 | Exercicio 5 do PDF | Demonstrar fila de pacotes, pilha de erros e lista ativa | `src/c/ex05_rede_pacotes.c` | Build C + demo `ex05_rede_pacotes` | `docs/testing/evidence/run-c-demos-output.txt` e `pages-demo-final.png` | Nao abre socket, DNS ou roteamento TCP/IP real |
| UC-06 | Expansao de portfolio | Modelar rede como grafo e calcular menor caminho | `src/cpp/network_topology_lab.cpp` | Workflow `Quality` com `g++` | Check de CI no GitHub | A maquina local pode nao ter compilador C++ |
| UC-07 | Apresentacao no GitHub Pages | Mostrar todas as questoes no navegador com tema claro/escuro | `web/src/domain/*` e `web/src/components/*` | `npm run build` e workflow Pages | `docs/frontend/screenshots/*.png` | Pages executa TypeScript, nao binario C/C++ |

## 2. Regras Que Nao Podem Quebrar

| ID | Regra | Onde aparece | Como testar | Falha inaceitavel |
| --- | --- | --- | --- | --- |
| REG-01 | Cada exercicio C deve compilar isoladamente | `src/c/ex*.c` | `scripts/build-all.ps1` ou comandos manuais do README | Um exercicio depender de menu global ou arquivo nao documentado |
| REG-02 | Demos precisam ser automaticas | `main` de cada exercicio | `scripts/run-demos.ps1 -OnlyC` | Exigir digitacao manual para provar requisito do PDF |
| REG-03 | Lista encadeada deve liberar memoria alocada | funcoes `*_liberar` em `src/c` | build com warnings como erro + revisao de codigo | Remover item sem `free` ou perder ponteiro da lista |
| REG-04 | Exercicio 3 nao pode ser inventado | `docs/pdf-scope.md`, `web/src/domain/labs/foundation-labs.ts` | revisao documental + rota `#ex03` | Criar entrega falsa sem base no PDF |
| REG-05 | A camada web nao pode prometer runtime C/C++ online | README e `docs/frontend/github-pages-demo.md` | revisao documental + build Pages | Dizer que GitHub Pages executa backend nativo |
| REG-06 | Evidencia publica deve usar dado sintetico | `docs/testing/evidence.md` | revisao antes de commit | Publicar token, host privado, caminho pessoal ou dado real |
| REG-07 | C++ fica como expansao separada | `src/cpp/network_topology_lab.cpp` | workflow `Quality` | Misturar requisitos do PDF com regra C++ sem declarar limite |

## 3. Matriz De Testes

| Camada | Comando | O que comprova | Evidencia esperada |
| --- | --- | --- | --- |
| Build C local | `scripts/build-all.ps1 -WarningsAsErrors` | Os quatro exercicios C compilam | `docs/testing/evidence/build-c-output.txt` |
| Demo C local | `scripts/run-demos.ps1 -OnlyC` | Os fluxos do PDF rodam sem interacao | `docs/testing/evidence/run-c-demos-output.txt` |
| Build C manual | comandos GCC/TinyCC do README | Projeto roda em maquina com script bloqueado | terminal local da apresentacao |
| C++ CI | workflow `Quality` | `network_topology_lab.cpp` compila e executa com `g++` | check verde do GitHub |
| Web local | `cd web && npm run build` | TypeScript e Vite geram bundle estatico | saida do build |
| Auditoria web | `cd web && npm audit --audit-level=high` | Dependencias nao tem vulnerabilidade alta conhecida | saida do npm audit |
| Pages | workflow `Deploy GitHub Pages` | `web/dist` e publicado no GitHub Pages | check verde do GitHub |
| Evidencia visual | screenshots em `docs/frontend/screenshots` | Layout, tema, mobile e final da simulacao | arquivos PNG versionados |

## 4. Explicacao Para Publico Nao Tecnico

| Caso | O que a pessoa ve | O que o codigo faz por tras | Como saber que deu certo |
| --- | --- | --- | --- |
| Clinica | Pacientes entram e saem da recepcao | Fila chama quem chegou primeiro; pilha desfaz ultimo registro; lista guarda cadastro | Joao e Maria saem antes dos demais |
| Suporte de TI | Tickets e equipamentos aparecem no terminal | Fila organiza chamados; pilha desfaz acao recente; lista busca patrimonio | Ticket 101 e atendido primeiro e PAT-002 e encontrado |
| CPU | Processos aparecem com prioridade | A fila escolhe o maior valor de prioridade | Antivirus executa antes de navegador e editor |
| Rede | Pacotes trafegam, falham e sao retransmitidos | Fila transmite, pilha reprocessa erro e lista acompanha ativos | Pacote 1 sai primeiro e pacote 4 retransmite primeiro no exemplo LIFO |
| C++ | Topologia mostra caminho ate servidor | Grafo calcula menor caminho por custo acumulado | Rota passa por Switch-Lab e Roteador com 9 ms |
| Web | A mesma historia aparece no navegador | TypeScript espelha os dados para apresentacao no Pages | Simulacao para em 100% e permite rodar novamente |

## 5. Lacunas E Proximas Acoes

| Lacuna | Impacto | Estado atual | Acao recomendada |
| --- | --- | --- | --- |
| Compilador C/C++ pode faltar em maquina da universidade | Aluno pode nao conseguir validar nativo por script | README tem comandos manuais e CI valida no Ubuntu | Levar binario compilado apenas quando permitido pela regra da disciplina |
| C++ pode nao compilar localmente no Windows sem toolchain | A expansao fica dependente de CI ou outra maquina | Workflow `Quality` cobre `g++` | Documentar instalacao de `g++`, `clang++` ou MSVC se virar requisito |
| Nao ha teste visual automatizado por Playwright | Screenshots dependem de geracao manual | Evidencias PNG ja existem | Criar teste visual leve se a interface crescer |
| GitHub Pages nao executa C/C++ | Visitante ve uma demonstracao web, nao o binario nativo | README e docs declaram o limite | Avaliar WebAssembly em fase futura, sem prometer agora |

## 6. Checklist De Publicacao

- [x] Casos de uso P0 aparecem em `docs/use-cases.md`.
- [x] Requisitos do PDF aparecem em `docs/pdf-scope.md`.
- [x] Cada exercicio implementado aponta para arquivo C/C++ real.
- [x] Cada camada tem comando de validacao documentado.
- [x] Evidencias de terminal e web estao mapeadas.
- [x] Limites conhecidos estao declarados sem maquiar o projeto.
- [x] A interface web declara que e demonstrativa no Pages.
