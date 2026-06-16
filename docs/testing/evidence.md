# Evidencias De Teste

## Objetivo

Registrar quais evidencias comprovam que o projeto foi compilado, executado e apresentado localmente.

Este documento complementa `docs/testing/validation-report.md`.

## Evidencias De Terminal

| Evidencia | Arquivo | Como gerar |
| --- | --- | --- |
| Build C com TinyCC | `docs/testing/evidence/build-c-output.txt` | `scripts/build-all.ps1 -CCompiler ... -WarningsAsErrors` |
| Execucao das demos C | `docs/testing/evidence/run-c-demos-output.txt` | `scripts/run-demos.ps1 -OnlyC` |
| Resumo das demos C | `docs/testing/evidence/run-c-demos-summary.txt` | Resumo manual a partir do log completo. |
| Screenshot do build | `docs/testing/evidence/build-c-output.png` | Gerado a partir do texto do terminal. |
| Screenshot das demos | `docs/testing/evidence/run-c-demos-output.png` | Gerado a partir do resumo das demos para leitura em apresentacao. |

## Evidencias Web

| Evidencia | Arquivo |
| --- | --- |
| Questoes do PDF na interface | `docs/frontend/screenshots/pages-demo-questions.png` |
| Desktop tema claro | `docs/frontend/screenshots/pages-demo-desktop.png` |
| Desktop tema escuro | `docs/frontend/screenshots/pages-demo-dark.png` |
| Mobile | `docs/frontend/screenshots/pages-demo-mobile.png` |
| Simulacao finalizada | `docs/frontend/screenshots/pages-demo-final.png` |

## Criterio De Aceite

Um teste so conta como evidencia quando:

- o comando executado esta registrado;
- o resultado esperado esta descrito;
- a data e o ambiente aparecem no relatorio;
- o screenshot nao contem segredo, token, IP privado ou dado real sensivel;
- o limite da validacao esta declarado.

## Limite

As evidencias comprovam compilacao, execucao local e demonstracao visual.

Elas nao comprovam:

- sockets reais;
- DNS real;
- roteamento real;
- desempenho de rede real;
- execucao de C/C++ dentro do GitHub Pages.
