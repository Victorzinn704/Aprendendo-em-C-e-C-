#include "common.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILA_CAPACIDADE 10
#define PILHA_CAPACIDADE 10

typedef struct {
    int pid;
    char nome[32];
    int prioridade;
} Processo;

typedef struct {
    Processo itens[FILA_CAPACIDADE];
    int total;
} FilaPrioridade;

typedef struct {
    int pid;
    char motivo[56];
} Encerramento;

typedef struct {
    Encerramento itens[PILHA_CAPACIDADE];
    int topo;
} PilhaEncerrados;

typedef struct ProcessoAtivo {
    int pid;
    char nome[32];
    char estado[24];
    struct ProcessoAtivo *proximo;
} ProcessoAtivo;

static void prioridade_iniciar(FilaPrioridade *fila)
{
    fila->total = 0;
}

static int prioridade_adicionar(FilaPrioridade *fila, int pid, const char *nome, int prioridade)
{
    Processo *processo;

    if (fila->total == FILA_CAPACIDADE) {
        return 0;
    }

    processo = &fila->itens[fila->total];
    processo->pid = pid;
    processo->prioridade = prioridade;
    copy_text(processo->nome, sizeof(processo->nome), nome);
    fila->total++;

    return 1;
}

static int prioridade_executar(FilaPrioridade *fila, Processo *processo)
{
    int indice_maior = 0;
    int i;

    if (fila->total == 0) {
        return 0;
    }

    for (i = 1; i < fila->total; i++) {
        if (fila->itens[i].prioridade > fila->itens[indice_maior].prioridade) {
            indice_maior = i;
        }
    }

    *processo = fila->itens[indice_maior];

    for (i = indice_maior; i < fila->total - 1; i++) {
        fila->itens[i] = fila->itens[i + 1];
    }

    fila->total--;

    return 1;
}

static void prioridade_listar(const FilaPrioridade *fila)
{
    int i;

    printf("Processos aguardando CPU: %d\n", fila->total);
    for (i = 0; i < fila->total; i++) {
        printf("  PID %d | %s | prioridade %d\n",
            fila->itens[i].pid,
            fila->itens[i].nome,
            fila->itens[i].prioridade);
    }
}

static void encerrados_iniciar(PilhaEncerrados *pilha)
{
    pilha->topo = 0;
}

static int encerrados_registrar(PilhaEncerrados *pilha, int pid, const char *motivo)
{
    Encerramento *item;

    if (pilha->topo == PILHA_CAPACIDADE) {
        return 0;
    }

    item = &pilha->itens[pilha->topo];
    item->pid = pid;
    copy_text(item->motivo, sizeof(item->motivo), motivo);
    pilha->topo++;

    return 1;
}

static void encerrados_listar(const PilhaEncerrados *pilha)
{
    int i;

    printf("Historico de encerramento: %d\n", pilha->topo);
    for (i = pilha->topo - 1; i >= 0; i--) {
        printf("  PID %d | %s\n", pilha->itens[i].pid, pilha->itens[i].motivo);
    }
}

static ProcessoAtivo *ativo_criar(int pid, const char *nome, const char *estado)
{
    ProcessoAtivo *novo = (ProcessoAtivo *)malloc(sizeof(ProcessoAtivo));

    if (novo == NULL) {
        return NULL;
    }

    novo->pid = pid;
    copy_text(novo->nome, sizeof(novo->nome), nome);
    copy_text(novo->estado, sizeof(novo->estado), estado);
    novo->proximo = NULL;

    return novo;
}

static int ativo_inserir(ProcessoAtivo **lista, int pid, const char *nome, const char *estado)
{
    ProcessoAtivo *novo = ativo_criar(pid, nome, estado);

    if (novo == NULL) {
        return 0;
    }

    novo->proximo = *lista;
    *lista = novo;

    return 1;
}

static ProcessoAtivo *ativo_buscar(ProcessoAtivo *lista, int pid)
{
    ProcessoAtivo *atual = lista;

    while (atual != NULL) {
        if (atual->pid == pid) {
            return atual;
        }

        atual = atual->proximo;
    }

    return NULL;
}

static int ativo_remover(ProcessoAtivo **lista, int pid)
{
    ProcessoAtivo *atual = *lista;
    ProcessoAtivo *anterior = NULL;

    while (atual != NULL) {
        if (atual->pid == pid) {
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

static void ativo_listar(const ProcessoAtivo *lista)
{
    const ProcessoAtivo *atual = lista;

    while (atual != NULL) {
        printf("  PID %d | %s | %s\n", atual->pid, atual->nome, atual->estado);
        atual = atual->proximo;
    }
}

static void ativo_liberar(ProcessoAtivo *lista)
{
    ProcessoAtivo *atual = lista;

    while (atual != NULL) {
        ProcessoAtivo *proximo = atual->proximo;
        free(atual);
        atual = proximo;
    }
}

static void demo_escalonamento(void)
{
    FilaPrioridade fila;
    Processo selecionado;

    print_section("Exercicio 4 - fila de prioridade da CPU");
    prioridade_iniciar(&fila);

    (void)prioridade_adicionar(&fila, 201, "antivirus", 10);
    (void)prioridade_adicionar(&fila, 202, "navegador", 3);
    (void)prioridade_adicionar(&fila, 203, "editor", 2);
    prioridade_listar(&fila);

    if (prioridade_executar(&fila, &selecionado)) {
        printf("Primeiro executado: PID %d | %s | prioridade %d\n",
            selecionado.pid,
            selecionado.nome,
            selecionado.prioridade);
    }

    prioridade_listar(&fila);
}

static void demo_processos_ativos(void)
{
    ProcessoAtivo *lista = NULL;
    ProcessoAtivo *processo;
    PilhaEncerrados encerrados;

    print_section("Processos ativos e encerrados");
    encerrados_iniciar(&encerrados);

    (void)ativo_inserir(&lista, 201, "antivirus", "executando");
    (void)ativo_inserir(&lista, 202, "navegador", "aguardando");
    (void)ativo_inserir(&lista, 203, "editor", "aguardando");
    ativo_listar(lista);

    processo = ativo_buscar(lista, 202);
    if (processo != NULL) {
        copy_text(processo->estado, sizeof(processo->estado), "pronto");
        printf("Estado atualizado: PID %d agora esta %s\n", processo->pid, processo->estado);
    }

    if (ativo_remover(&lista, 201)) {
        (void)encerrados_registrar(&encerrados, 201, "processo concluido");
        printf("PID 201 removido da lista ativa\n");
    }

    ativo_listar(lista);
    encerrados_listar(&encerrados);
    ativo_liberar(lista);
}

static void demo_respostas(void)
{
    print_section("Respostas tecnicas");
    print_item("CPU", "a fila organiza processos que aguardam execucao.");
    print_item("Prioridade", "antivirus executa antes por prioridade 10.");
    print_item("Lista ativa", "permite consultar, alterar e remover processos em execucao.");
}

int main(void)
{
    demo_escalonamento();
    demo_processos_ativos();
    demo_respostas();

    return 0;
}
