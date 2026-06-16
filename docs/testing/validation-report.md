# Relatorio De Validacao Local

Data: 2026-06-15.

## Ambiente

| Item | Valor |
| --- | --- |
| Sistema | Windows |
| Shell | PowerShell |
| Compilador C usado | TinyCC 0.9.27 local |
| Flags | `-Wall -Werror` |
| Dependencias externas | Nenhuma para os programas C |

## Comando Usado

```powershell
.\scripts\build-all.ps1 -CCompiler "<caminho-do-tcc>\tcc.exe" -WarningsAsErrors
.\scripts\run-demos.ps1 -OnlyC
```

Depois da auditoria, o script de build passou a falhar explicitamente quando o compilador retorna erro, e o runner passou a exigir todos os executaveis C.

## Resultado Do Build

| Programa | Resultado |
| --- | --- |
| `ex01_clinica.exe` | Compilou sem erro. |
| `ex02_suporte_ti.exe` | Compilou sem erro. |
| `ex04_escalonamento.exe` | Compilou sem erro. |
| `ex05_rede_pacotes.exe` | Compilou sem erro. |
| `network_topology_lab.exe` | Nao validado nesta maquina; compilador C++ nao estava no PATH. |

## Resultado Das Demos

| Programa | Evidencia observada |
| --- | --- |
| `ex01_clinica.exe` | Joao e Maria foram chamados antes de Carlos e Ana. O historico desfez Carlos. O cadastro encontrou Maria e removeu Carlos. |
| `ex02_suporte_ti.exe` | Ticket 101 foi atendido primeiro. A ultima acao desfeita foi `resetou switch`. O equipamento PAT-002 foi encontrado. |
| `ex04_escalonamento.exe` | Antivirus, prioridade 10, executou antes de navegador e editor. PID 201 foi removido dos ativos e registrado no historico. |
| `ex05_rede_pacotes.exe` | Pacote 1 transmitiu primeiro. Pacote 4 foi o primeiro retransmitido na pilha de erros. Pacote 1 foi marcado como entregue e removido da lista ativa. |

## Limite Da Validacao

A validacao confirma os requisitos academicos em C e a reproducibilidade das demos. Ela nao valida sockets reais, DNS real, roteamento real ou desempenho de rede, porque esses pontos estao fora do escopo do PDF.

## Revalidacao Web E C - 2026-06-16

Comandos executados:

```powershell
cd web
npm run build
npm audit --audit-level=high
cd ..
.\scripts\build-all.ps1 -CCompiler "<caminho-do-tcc>\tcc.exe" -WarningsAsErrors
.\scripts\run-demos.ps1 -OnlyC
```

Resultado:

| Area | Resultado |
| --- | --- |
| Web build | Passou. |
| Auditoria de dependencias web | 0 vulnerabilidades altas. |
| Exercicios C | Compilaram com TinyCC e `-Werror`. |
| Demos C | Executaram sem erro. |
| C++ | Nao recompilado nesta revalidacao; nao havia compilador C++ no PATH. |

Evidencia visual adicionada:

- `docs/frontend/screenshots/pages-demo-questions.png`
- `docs/frontend/screenshots/pages-demo-desktop.png`
- `docs/frontend/screenshots/pages-demo-dark.png`
- `docs/frontend/screenshots/pages-demo-mobile.png`
- `docs/frontend/screenshots/pages-demo-final.png`

Tema web revalidado:

- `?theme=light#ex05` abre a simulacao no tema claro.
- `?theme=dark#ex05` abre a simulacao no tema escuro.
- O botao do topo alterna o tema e grava a preferencia visual no navegador.

## Revalidacao Para Publicacao No GitHub - 2026-06-16

Comandos executados na copia limpa do repositorio:

```powershell
.\scripts\build-all.ps1 -CCompiler "<tcc.exe>" -WarningsAsErrors
.\scripts\run-demos.ps1 -OnlyC
cd web
npm ci
npm run build
npm audit --audit-level=high
```

Resultado:

| Area | Resultado |
| --- | --- |
| Build C | Passou com TinyCC 0.9.27 local e `-Werror`. |
| Demos C | `ex01`, `ex02`, `ex04` e `ex05` executaram sem erro. |
| Web build | Passou com Vite e TypeScript. |
| Auditoria web | `npm audit --audit-level=high` retornou 0 vulnerabilidades. |
| C++ local | Nao recompilado nesta maquina porque nao havia compilador C++ no PATH. |

Evidencias novas:

- `docs/testing/evidence/build-c-output.txt`
- `docs/testing/evidence/build-c-output.png`
- `docs/testing/evidence/run-c-demos-output.txt`
- `docs/testing/evidence/run-c-demos-summary.txt`
- `docs/testing/evidence/run-c-demos-output.png`

Limite:

- A validacao comprova build C, execucao das demos C e build web.
- A validacao C++ fica coberta pelo workflow `Quality` em ambiente Ubuntu com `g++`.
