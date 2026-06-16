# Guia De Testes

## Build C

Crie a pasta `build` antes do primeiro build:

```bash
mkdir build
```

Com GCC:

```bash
gcc -Wall -Wextra -Werror src/c/ex01_clinica.c -o build/ex01_clinica
gcc -Wall -Wextra -Werror src/c/ex02_suporte_ti.c -o build/ex02_suporte_ti
gcc -Wall -Wextra -Werror src/c/ex04_escalonamento.c -o build/ex04_escalonamento
gcc -Wall -Wextra -Werror src/c/ex05_rede_pacotes.c -o build/ex05_rede_pacotes
```

No Windows, com TinyCC:

```powershell
tcc -Wall src/c/ex01_clinica.c -o build\ex01_clinica.exe
tcc -Wall src/c/ex02_suporte_ti.c -o build\ex02_suporte_ti.exe
tcc -Wall src/c/ex04_escalonamento.c -o build\ex04_escalonamento.exe
tcc -Wall src/c/ex05_rede_pacotes.c -o build\ex05_rede_pacotes.exe
```

Esse modo manual e o mais indicado quando a maquina bloqueia scripts PowerShell.

## Build Por Script

```powershell
.\scripts\build-all.ps1
```

Com erro fatal em warnings:

```powershell
.\scripts\build-all.ps1 -WarningsAsErrors
```

O script encerra com erro se algum compilador retornar codigo diferente de zero.

## Rodar Demos Por Script

```powershell
.\scripts\run-demos.ps1 -OnlyC
```

As quatro demos C sao obrigatorias. Se algum executavel C estiver ausente ou retornar erro, o script falha.

## Validacao Esperada

| Programa | Deve demonstrar |
| --- | --- |
| `ex01_clinica` | Joao e Maria chamados primeiro; historico usa pilha; cadastro lista/busca/remove. |
| `ex02_suporte_ti` | Ticket 101 atendido primeiro; ultima acao desfeita; equipamento buscado e removido. |
| `ex04_escalonamento` | Antivirus prioridade 10 executa antes de navegador/editor. |
| `ex05_rede_pacotes` | Pacote 1 sai primeiro da fila; Pacote 4 sai primeiro da pilha no exemplo LIFO. |

## Build C++

Quando houver `g++`:

```bash
g++ -std=c++17 -Wall -Wextra -Werror src/cpp/network_topology_lab.cpp -o build/network_topology_lab
```

Na maquina usada para a primeira validacao, nao havia compilador C++ instalado no PATH. Por isso, a validacao local cobriu C e deixou C++ como trilha compilavel quando houver `g++`, `clang++` ou `cl`.
