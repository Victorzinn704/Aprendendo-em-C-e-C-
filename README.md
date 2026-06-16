# Aprendendo em C e C++

Projeto de portfolio e estudo em C/C++ com foco em estruturas de dados, redes, simulacao local, documentacao tecnica e apresentacao pelo GitHub Pages.

O ponto de partida foi um PDF de revisao da disciplina. A partir dele, o repositorio foi organizado como um projeto completo: codigo nativo em C/C++, guias de ambiente, validacao, screenshots, PRD, auditoria tecnica e uma interface web demonstrativa.

## O que este projeto demonstra

| Area | Como aparece no repositorio |
| --- | --- |
| C | Exercicios independentes com fila, pilha, lista encadeada, ponteiros, `malloc` e `free`. |
| C++ | Expansao com grafo de rede e menor caminho em `src/cpp/network_topology_lab.cpp`. |
| Redes | Simulacao de pacotes, origem, destino, DNS, roteador, servidor, erro e retransmissao. |
| Documentacao | PRD, arquitetura, decisoes, guia de uso, glossario, auditorias e relatorio de validacao. |
| GitHub Pages | Interface React/TypeScript para apresentar as questoes e o fluxo visual de pacotes. |

## Escopo do PDF

| Exercicio | Tema | Codigo |
| --- | --- | --- |
| 1 | Clinica: fila, pilha e lista encadeada | `src/c/ex01_clinica.c` |
| 2 | Suporte de TI: chamados, logs e equipamentos | `src/c/ex02_suporte_ti.c` |
| 3 | Ausente no PDF enviado | `docs/pdf-scope.md` |
| 4 | Escalonamento de processos com prioridade | `src/c/ex04_escalonamento.c` |
| 5 | Simulacao de redes com pacotes | `src/c/ex05_rede_pacotes.c` |
| Extra | Topologia de rede em C++ | `src/cpp/network_topology_lab.cpp` |

## Casos de uso

| Publico | Uso esperado |
| --- | --- |
| Professor | Ver a implementacao das questoes, as respostas teoricas e a validacao local. |
| Aluno apresentando | Rodar as demos no terminal e usar a interface web para explicar o fluxo de rede. |
| Recrutador tecnico | Avaliar C, organizacao, documentacao, testes e capacidade de explicar decisoes. |
| Pessoa nao tecnica | Seguir o guia basico e entender o que cada comando faz. |

## Como preparar o ambiente

O projeto nativo nao precisa de banco de dados, login, permissao de administrador, internet ou rede real. Para rodar os programas C, basta um compilador.

Opcoes de compilador:

- GCC;
- Clang;
- TinyCC;
- MSVC, para C++ no Windows.

Crie a pasta de saida:

```powershell
mkdir build
```

## Como compilar manualmente

Este modo e o mais indicado quando a maquina bloqueia scripts.

Com TinyCC no Windows:

```powershell
tcc -Wall src/c/ex01_clinica.c -o build\ex01_clinica.exe
tcc -Wall src/c/ex02_suporte_ti.c -o build\ex02_suporte_ti.exe
tcc -Wall src/c/ex04_escalonamento.c -o build\ex04_escalonamento.exe
tcc -Wall src/c/ex05_rede_pacotes.c -o build\ex05_rede_pacotes.exe
```

Com GCC:

```bash
gcc -Wall -Wextra -Werror src/c/ex01_clinica.c -o build/ex01_clinica
gcc -Wall -Wextra -Werror src/c/ex02_suporte_ti.c -o build/ex02_suporte_ti
gcc -Wall -Wextra -Werror src/c/ex04_escalonamento.c -o build/ex04_escalonamento
gcc -Wall -Wextra -Werror src/c/ex05_rede_pacotes.c -o build/ex05_rede_pacotes
```

## Como rodar

No Windows:

```powershell
.\build\ex01_clinica.exe
.\build\ex02_suporte_ti.exe
.\build\ex04_escalonamento.exe
.\build\ex05_rede_pacotes.exe
```

Cada programa executa uma demonstracao automatica. Isso foi uma decisao de projeto para reduzir erro de digitacao em apresentacao e manter o resultado reproduzivel.

## Build por script

Quando scripts PowerShell estiverem liberados:

```powershell
.\scripts\build-all.ps1
.\scripts\run-demos.ps1 -OnlyC
```

Para validacao mais rigorosa com TinyCC:

```powershell
.\scripts\build-all.ps1 -CCompiler "<caminho-do-tcc>\tcc.exe" -WarningsAsErrors
.\scripts\run-demos.ps1 -OnlyC
```

## Interface web

A pasta `web/` contem uma interface React/TypeScript para demonstrar as questoes no navegador e publicar no GitHub Pages.

```powershell
cd web
npm install
npm run dev
npm run build
```

A interface web nao executa C/C++ no GitHub Pages. Ela reproduz visualmente o comportamento para apresentacao. O codigo nativo continua em `src/c` e `src/cpp`.

Rotas principais:

| Rota | Conteudo |
| --- | --- |
| `#ex01` | Clinica: fila, pilha e lista encadeada. |
| `#ex02` | Suporte de TI: chamados, logs e inventario. |
| `#ex03` | Lacuna documentada do PDF. |
| `#ex04` | Escalonamento de processos. |
| `#ex05` | Simulacao visual de pacotes. |
| `#cpp` | Grafo e menor caminho em C++. |

Rotas de tema para apresentacao:

```text
http://127.0.0.1:5173/?theme=light#ex05
http://127.0.0.1:5173/?theme=dark#ex05
```

## Evidencias visuais

As imagens ficam em `docs/frontend/screenshots/`.

| Evidencia | Arquivo |
| --- | --- |
| Questoes no Pages | `docs/frontend/screenshots/pages-demo-questions.png` |
| Desktop claro | `docs/frontend/screenshots/pages-demo-desktop.png` |
| Desktop escuro | `docs/frontend/screenshots/pages-demo-dark.png` |
| Mobile | `docs/frontend/screenshots/pages-demo-mobile.png` |
| Fechamento da simulacao | `docs/frontend/screenshots/pages-demo-final.png` |

As evidencias de terminal ficam em `docs/testing/evidence/` quando os testes locais sao executados.

## Estrutura

```text
src/
  c/
    common.h
    ex01_clinica.c
    ex02_suporte_ti.c
    ex04_escalonamento.c
    ex05_rede_pacotes.c
  cpp/
    network_topology_lab.cpp
docs/
  architecture/
  audit/
  frontend/
  skills/
  testing/
scripts/
web/
```

## Documentacao principal

| Documento | Papel |
| --- | --- |
| `docs/INDEX.md` | Indice completo da documentacao. |
| `docs/user-guide.md` | Guia basico para pessoa nao tecnica rodar o projeto. |
| `docs/prd.md` | Produto, usuarios, requisitos e aceite. |
| `docs/pdf-scope.md` | Mapeamento fiel do PDF. |
| `docs/architecture/overview.md` | Arquitetura e padrao de codigo. |
| `docs/decisions.md` | Decisoes tecnicas e alternativas rejeitadas. |
| `docs/glossary.md` | Glossario de C, redes e estruturas. |
| `docs/testing/testing-guide.md` | Como compilar, rodar e validar. |
| `docs/testing/validation-report.md` | Relatorio de validacao local. |
| `docs/skills/deep-project-documentation/SKILL.md` | Skill documental usada para manter a documentacao profunda e verificavel. |

## Limites conhecidos

- O Exercicio 3 nao existe no PDF enviado.
- O Exercicio 5 simula rede, mas nao abre sockets reais.
- O GitHub Pages roda TypeScript, nao binario C/C++.
- A validacao C++ depende de `g++`, `clang++` ou `cl` instalado.
- Os dados de demonstracao sao sinteticos e voltados a estudo.

## Status

Repositorio publicado como portfolio de fundamentos em C/C++, estruturas de dados, redes e documentacao tecnica.

## Licenca

Este repositorio usa a licenca MIT. Consulte `LICENSE`.
