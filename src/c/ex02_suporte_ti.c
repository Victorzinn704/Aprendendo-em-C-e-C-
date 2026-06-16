#include "common.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILA_CAPACIDADE 8
#define PILHA_CAPACIDADE 8

typedef struct {
    int numero;
    char descricao[72];
} Chamado;

typedef struct {
    Chamado itens[FILA_CAPACIDADE];
    int inicio;
    int fim;
    int total;
} FilaChamados;

typedef struct {
    char acao[72];
} LogAcao;

typedef struct {
    LogAcao itens[PILHA_CAPACIDADE];
    int topo;
} PilhaLogs;

typedef struct Equipamento {
    char patrimonio[20];
    char tipo[32];
    char localizacao[32];
    struct Equipamento *proximo;
} Equipamento;

static void fila_iniciar(FilaChamados *fila)
{
    fila->inicio = 0;
    fila->fim = 0;
    fila->total = 0;
}

static int fila_abrir(FilaChamados *fila, int numero, const char *descricao)
{
    Chamado *chamado;

    if (fila->total == FILA_CAPACIDADE) {
        return 0;
    }

    chamado = &fila->itens[fila->fim];
    chamado->numero = numero;
    copy_text(chamado->descricao, sizeof(chamado->descricao), descricao);
    fila->fim = (fila->fim + 1) % FILA_CAPACIDADE;
    fila->total++;

    return 1;
}

static int fila_atender(FilaChamados *fila, Chamado *chamado)
{
    if (fila->total == 0) {
        return 0;
    }

    *chamado = fila->itens[fila->inicio];
    fila->inicio = (fila->inicio + 1) % FILA_CAPACIDADE;
    fila->total--;

    return 1;
}

static void fila_listar(const FilaChamados *fila)
{
    int i;

    printf("Chamados pendentes: %d\n", fila->total);
    for (i = 0; i < fila->total; i++) {
        const Chamado *chamado = &fila->itens[(fila->inicio + i) % FILA_CAPACIDADE];
        printf("  Ticket %d - %s\n", chamado->numero, chamado->descricao);
    }
}

static void logs_iniciar(PilhaLogs *pilha)
{
    pilha->topo = 0;
}

static int logs_registrar(PilhaLogs *pilha, const char *acao)
{
    if (pilha->topo == PILHA_CAPACIDADE) {
        return 0;
    }

    copy_text(pilha->itens[pilha->topo].acao, sizeof(pilha->itens[pilha->topo].acao), acao);
    pilha->topo++;

    return 1;
}

static int logs_desfazer(PilhaLogs *pilha, LogAcao *acao)
{
    if (pilha->topo == 0) {
        return 0;
    }

    pilha->topo--;
    *acao = pilha->itens[pilha->topo];

    return 1;
}

static void logs_listar(const PilhaLogs *pilha)
{
    int i;

    printf("Logs registrados: %d\n", pilha->topo);
    for (i = pilha->topo - 1; i >= 0; i--) {
        printf("  %s\n", pilha->itens[i].acao);
    }
}

static Equipamento *equipamento_criar(const char *patrimonio, const char *tipo, const char *localizacao)
{
    Equipamento *novo = (Equipamento *)malloc(sizeof(Equipamento));

    if (novo == NULL) {
        return NULL;
    }

    copy_text(novo->patrimonio, sizeof(novo->patrimonio), patrimonio);
    copy_text(novo->tipo, sizeof(novo->tipo), tipo);
    copy_text(novo->localizacao, sizeof(novo->localizacao), localizacao);
    novo->proximo = NULL;

    return novo;
}

static int equipamento_inserir(Equipamento **lista, const char *patrimonio, const char *tipo, const char *localizacao)
{
    Equipamento *novo = equipamento_criar(patrimonio, tipo, localizacao);

    if (novo == NULL) {
        return 0;
    }

    novo->proximo = *lista;
    *lista = novo;

    return 1;
}

static Equipamento *equipamento_buscar(Equipamento *lista, const char *patrimonio)
{
    Equipamento *atual = lista;

    while (atual != NULL) {
        if (strcmp(atual->patrimonio, patrimonio) == 0) {
            return atual;
        }

        atual = atual->proximo;
    }

    return NULL;
}

static int equipamento_remover(Equipamento **lista, const char *patrimonio)
{
    Equipamento *atual = *lista;
    Equipamento *anterior = NULL;

    while (atual != NULL) {
        if (strcmp(atual->patrimonio, patrimonio) == 0) {
            if (anterior == NULL) {
                *lista = atual->proximo;
            } else {
                anterior->proximo = atual->proximo;
            }

            free(atual);
            return 1;
        }

        anterior = atual;
        atual = atual->proximo;
    }

    return 0;
}

static void equipamento_listar(const Equipamento *lista)
{
    const Equipamento *atual = lista;

    while (atual != NULL) {
        printf("  %s | %s | %s\n", atual->patrimonio, atual->tipo, atual->localizacao);
        atual = atual->proximo;
    }
}

static void equipamento_liberar(Equipamento *lista)
{
    Equipamento *atual = lista;

    while (atual != NULL) {
        Equipamento *proximo = atual->proximo;
        free(atual);
        atual = proximo;
    }
}

static void demo_chamados(void)
{
    FilaChamados fila;
    Chamado chamado;

    print_section("Exercicio 2 - chamados em fila");
    fila_iniciar(&fila);

    (void)fila_abrir(&fila, 101, "Internet caiu");
    (void)fila_abrir(&fila, 102, "Impressora nao funciona");
    (void)fila_abrir(&fila, 103, "Computador nao liga");
    fila_listar(&fila);

    if (fila_atender(&fila, &chamado)) {
        printf("Chamado atendido: Ticket %d\n", chamado.numero);
    }

    fila_listar(&fila);
}

static void demo_logs(void)
{
    PilhaLogs pilha;
    LogAcao desfeita;

    print_section("Logs de manutencao com pilha");
    logs_iniciar(&pilha);

    (void)logs_registrar(&pilha, "reiniciou servidor");
    (void)logs_registrar(&pilha, "alterou IP");
    (void)logs_registrar(&pilha, "resetou switch");
    logs_listar(&pilha);

    if (logs_desfazer(&pilha, &desfeita)) {
        printf("Acao desfeita: %s\n", desfeita.acao);
    }

    logs_listar(&pilha);
}

static void demo_equipamentos(void)
{
    Equipamento *lista = NULL;
    Equipamento *encontrado;

    print_section("Inventario por lista encadeada");
    (void)equipamento_inserir(&lista, "PAT-001", "roteador", "sala tecnica");
    (void)equipamento_inserir(&lista, "PAT-002", "switch", "laboratorio");
    (void)equipamento_inserir(&lista, "PAT-003", "computador", "secretaria");
    equipamento_listar(lista);

    encontrado = equipamento_buscar(lista, "PAT-002");
    if (encontrado != NULL) {
        printf("Busca encontrou: %s em %s\n", encontrado->tipo, encontrado->localizacao);
    }

    if (equipamento_remover(&lista, "PAT-003")) {
        printf("Equipamento removido: PAT-003\n");
    }

    equipamento_listar(lista);
    equipamento_liberar(lista);
}

static void demo_respostas(void)
{
    print_section("Respostas tecnicas");
    print_item("Fila", "organiza chamados por chegada, reduzindo disputa de prioridade informal.");
    print_item("Pilha", "representa rollback da ultima acao tecnica aplicada.");
    print_item("Lista", "permite inventario dinamico sem tamanho fixo inicial.");
}

int main(void)
{
    demo_chamados();
    demo_logs();
    demo_equipamentos();
    demo_respostas();

    return 0;
}
