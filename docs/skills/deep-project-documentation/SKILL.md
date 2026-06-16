---
name: deep-project-documentation
description: Documentar projetos de C/C++ com profundidade tecnica e evidencia. Use quando for criar ou revisar README, guias, PRD, auditorias, screenshots, testes, casos de uso, explicacao de funcionamento, ambiente local e relatorios de validacao deste repositorio.
---

# Deep Project Documentation

Use esta skill para documentar o projeto `Aprendendo em C e C++` sem texto generico e sem esconder limites.

## Regra central

Explicar o que existe, como roda, o que foi testado, onde esta o codigo e qual decisao tecnica sustenta cada parte.

Se a frase nao aponta para codigo, comando, teste, screenshot, requisito ou limite conhecido, reescrever ou remover.

## Fontes obrigatorias

Antes de escrever, ler somente o que for necessario para a tarefa:

- `README.md` para a visao publica.
- `docs/INDEX.md` para o mapa documental.
- `docs/prd.md` para escopo e aceite.
- `docs/pdf-scope.md` para fidelidade ao PDF.
- `docs/architecture/overview.md` para arquitetura.
- `docs/decisions.md` para escolhas tecnicas.
- `docs/glossary.md` para termos.
- `docs/testing/testing-guide.md` para comandos de validacao.
- `docs/testing/validation-report.md` para evidencias ja registradas.
- `src/c/*` e `src/cpp/*` para confirmar comportamento real.
- `web/src/domain/*` e `web/src/components/*` quando a documentacao envolver GitHub Pages.

## Checklist de documentacao

Todo documento novo ou revisado deve responder:

1. Qual problema ou requisito esta sendo tratado?
2. Qual arquivo implementa a regra?
3. Como preparar o ambiente?
4. Como executar?
5. Como testar?
6. Qual evidencia visual ou textual comprova?
7. Qual caso de uso do dia a dia ajuda a explicar?
8. Qual limite ainda existe?
9. Qual proximo passo faz sentido?

## Padrao de README

Manter o README como entrada publica:

- nome correto: `Aprendendo em C e C++`;
- objetivo do projeto;
- escopo do PDF;
- funcionalidades por exercicio;
- interface web e limites do GitHub Pages;
- preparo do ambiente;
- comandos manuais para maquina com restricao de script;
- build por script para maquina liberada;
- testes;
- screenshots;
- arquitetura;
- documentos principais;
- limites conhecidos.

## Evidencia visual

Print so entra se ajudar a comprovar algo:

- terminal com build;
- terminal com execucao das demos;
- web em tema claro;
- web em tema escuro;
- web mobile;
- fechamento do fluxo de pacotes.

Nao usar screenshot com segredo, caminho privado sensivel, token, IP privado ou conta real.

## Linguagem

- Usar PT-BR direto.
- Preferir frase concreta a adjetivo.
- Explicar termo tecnico quando o publico pode nao conhecer.
- Declarar demo, simulacao e limitacao com clareza.
- Nao prometer socket real, DNS real, roteamento real ou backend C/C++ rodando no Pages.

## Validacao antes de publicar

Rodar quando aplicavel:

```powershell
.\scripts\build-all.ps1 -CCompiler "<caminho-do-tcc>\tcc.exe" -WarningsAsErrors
.\scripts\run-demos.ps1 -OnlyC
cd web
npm ci
npm run build
npm audit --audit-level=high
```

Registrar no relatorio:

- data;
- sistema;
- compilador;
- comandos;
- resultado;
- prints;
- limite da validacao.
