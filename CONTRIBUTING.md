# Como Contribuir

Este repositorio e uma trilha publica de estudo aplicado em C, C++, redes, estruturas de dados e demo web. Mudancas devem manter os exemplos pequenos, executaveis e didaticos.

## Fluxo recomendado

1. Abra PR com escopo pequeno.
2. Explique qual exercicio, conceito ou demo foi alterado.
3. Rode os checks aplicaveis antes de pedir revisao.

## Checks locais

Compile os exemplos nativos alterados:

```bash
gcc -Wall -Wextra -Werror src/c/ex01_clinica.c -o build/ex01_clinica
g++ -std=c++17 -Wall -Wextra -Werror src/cpp/network_topology_lab.cpp -o build/network_topology_lab
```

Para a demo web:

```bash
cd web
npm ci
npm run build
```

## Regras

- nao versionar binarios de build;
- manter entradas e screenshots sem dados reais;
- atualizar README/docs quando mudar comando, fluxo ou evidencia visual.

## Fluxo Git e revisão

Siga também o [fluxo de issues, branches, commits e pull requests](CONTRIBUTING-GIT.md).
