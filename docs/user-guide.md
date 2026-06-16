# Guia Basico Para Rodar O Projeto

Este guia e para uma pessoa que recebeu a pasta do projeto e quer executar os exemplos sem conhecer C em profundidade.

## 1. O Que Voce Precisa

- Um computador com Windows, Linux ou macOS.
- Um terminal: PowerShell, Prompt de Comando, Terminal do Linux ou Terminal do macOS.
- Um compilador C: GCC, Clang ou TinyCC.

O projeto nao precisa de internet, banco de dados, login, permissao de administrador ou rede real.

## 2. Entrar Na Pasta Do Projeto

No Windows, abra o terminal na pasta onde o projeto foi extraido. Um exemplo:

```powershell
cd Aprendendo-em-C-e-C-
```

O comando `cd` significa "change directory". Ele muda o terminal para a pasta do projeto.

## 3. Criar A Pasta De Saida

```powershell
mkdir build
```

O comando `mkdir` cria uma pasta. Aqui, a pasta `build` vai receber os arquivos executaveis gerados pelo compilador.

## 4. Compilar Um Exercicio

Com TinyCC:

```powershell
tcc -Wall src/c/ex05_rede_pacotes.c -o build\ex05_rede_pacotes.exe
```

Com GCC:

```powershell
gcc -Wall -Wextra -Werror src/c/ex05_rede_pacotes.c -o build\ex05_rede_pacotes.exe
```

O que cada parte significa:

| Parte | Significado |
| --- | --- |
| `tcc` ou `gcc` | Programa que transforma C em executavel. |
| `-Wall` | Pede avisos importantes do compilador. |
| `-Wextra` | Pede avisos extras, quando o compilador suporta. |
| `-Werror` | Trata avisos como erro, usado em validacao mais rigorosa. |
| `src/c/ex05_rede_pacotes.c` | Arquivo de codigo que sera compilado. |
| `-o build\ex05_rede_pacotes.exe` | Nome e local do executavel gerado. |

## 5. Rodar O Exercicio

```powershell
.\build\ex05_rede_pacotes.exe
```

O `.\` indica que o programa esta dentro da pasta atual. O resultado aparece no proprio terminal.

## 6. Ordem Recomendada Para Apresentacao

1. Rodar `ex01_clinica.exe` para mostrar fila, pilha e lista em um dominio simples.
2. Rodar `ex02_suporte_ti.exe` para conectar as mesmas estruturas com suporte tecnico.
3. Rodar `ex04_escalonamento.exe` para mostrar prioridade de CPU.
4. Rodar `ex05_rede_pacotes.exe` para mostrar a parte de redes do PDF.
5. Explicar que `network_topology_lab.cpp` e uma expansao em C++ para grafos e rotas.

## 7. Se Script For Bloqueado

Nao use `scripts/build-all.ps1`. Compile com os comandos manuais deste guia.

Bloqueio de script nao impede o projeto, porque os programas principais sao arquivos C simples.
