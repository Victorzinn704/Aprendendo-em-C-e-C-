#include "common.h"

#include <limits.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILA_CAPACIDADE 10
#define PILHA_CAPACIDADE 10
#define TAXA_KB_POR_SEGUNDO 100

typedef struct {
    int numero;
    int tamanho_kb;
    int tempo_ms;
} Pacote;

typedef struct {
    Pacote itens[FILA_CAPACIDADE];
    int inicio;
    int fim;
    int total;
} FilaPacotes;

typedef struct {
    Pacote itens[PILHA_CAPACIDADE];
    int topo;
} PilhaErros;

typedef struct PacoteAtivo {
    int id;
    char origem[32];
    char destino[32];
    char status[24];
    struct PacoteAtivo *proximo;
} PacoteAtivo;

static int calcular_tempo_ms(int tamanho_kb)
{
    long long tempo_ms;

    if (tamanho_kb <= 0) {
        return 0;
    }

    tempo_ms = ((long long)tamanho_kb * 1000LL) / TAXA_KB_POR_SEGUNDO;
    if (tempo_ms > INT_MAX) {
        return INT_MAX;
    }

    return (int)tempo_ms;
}

static void fila_iniciar(FilaPacotes *fila)
{
    fila->inicio = 0;
    fila->fim = 0;
    fila->total = 0;
}

static int fila_adicionar(FilaPacotes *fila, int numero, int tamanho_kb)
{
    Pacote *pacote;

    if (fila->total == FILA_CAPACIDADE || tamanho_kb <= 0) {
        return 0;
    }

    pacote = &fila->itens[fila->fim];
    pacote->numero = numero;
    pacote->tamanho_kb = tamanho_kb;
    pacote->tempo_ms = calcular_tempo_ms(tamanho_kb);
    fila->fim = (fila->fim + 1) % FILA_CAPACIDADE;
    fila->total++;

    return 1;
}

static int fila_transmitir(FilaPacotes *fila, Pacote *pacote)
{
    if (fila->total == 0) {
        return 0;
    }

    *pacote = fila->itens[fila->inicio];
    fila->inicio = (fila->inicio + 1) % FILA_CAPACIDADE;
    fila->total--;

    return 1;
}

static void fila_listar(const FilaPacotes *fila)
{
    int i;

    printf("Pacotes aguardando transmissao: %d\n", fila->total);
    for (i = 0; i < fila->total; i++) {
        const Pacote *pacote = &fila->itens[(fila->inicio + i) % FILA_CAPACIDADE];
        printf("  Pacote %d | %d KB | %d ms estimados\n",
            pacote->numero,
            pacote->tamanho_kb,
            pacote->tempo_ms);
    }
}

static void erros_iniciar(PilhaErros *pilha)
{
    pilha->topo = 0;
}

static int erros_registrar(PilhaErros *pilha, Pacote pacote)
{
    if (pilha->topo == PILHA_CAPACIDADE) {
        return 0;
    }

    pilha->itens[pilha->topo] = pacote;
    pilha->topo++;

    return 1;
}

static int erros_retransmitir(PilhaErros *pilha, Pacote *pacote)
{
    if (pilha->topo == 0) {
        return 0;
    }

    pilha->topo--;
    *pacote = pilha->itens[pilha->topo];

    return 1;
}

static void erros_listar(const PilhaErros *pilha)
{
    int i;

    printf("Pilha de erros: %d pacote(s)\n", pilha->topo);
    for (i = pilha->topo - 1; i >= 0; i--) {
        printf("  Pacote %d | %d KB\n", pilha->itens[i].numero, pilha->itens[i].tamanho_kb);
    }
}

static PacoteAtivo *ativo_criar(int id, const char *origem, const char *destino, const char *status)
{
    PacoteAtivo *novo = (PacoteAtivo *)malloc(sizeof(PacoteAtivo));

    if (novo == NULL) {
        return NULL;
    }

    novo->id = id;
    copy_text(novo->origem, sizeof(novo->origem), origem);
    copy_text(novo->destino, sizeof(novo->destino), destino);
    copy_text(novo->status, sizeof(novo->status), status);
    novo->proximo = NULL;

    return novo;
}

static int ativo_inserir(PacoteAtivo **lista, int id, const char *origem, const char *destino, const char *status)
{
    PacoteAtivo *novo = ativo_criar(id, origem, destino, status);

    if (novo == NULL) {
        return 0;
    }

    novo->proximo = *lista;
    *lista = novo;

    return 1;
}

static PacoteAtivo *ativo_buscar(PacoteAtivo *lista, int id)
{
    PacoteAtivo *atual = lista;

    while (atual != NULL) {
        if (atual->id == id) {
            return atual;
        }

        atual = atual->proximo;
    }

    return NULL;
}

static int ativo_remover(PacoteAtivo **lista, int id)
{
    PacoteAtivo *atual = *lista;
    PacoteAtivo *anterior = NULL;

    while (atual != NULL) {
        if (atual->id == id) {
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

static void ativo_listar(const PacoteAtivo *lista)
{
    const PacoteAtivo *atual = lista;

    while (atual != NULL) {
        printf("  ID %d | %s -> %s | %s\n",
            atual->id,
            atual->origem,
            atual->destino,
            atual->status);
        atual = atual->proximo;
    }
}

static void ativo_liberar(PacoteAtivo *lista)
{
    PacoteAtivo *atual = lista;

    while (atual != NULL) {
        PacoteAtivo *proximo = atual->proximo;
        free(atual);
        atual = proximo;
    }
}

static void carregar_pacotes_pdf(FilaPacotes *fila, PacoteAtivo **ativos)
{
    (void)fila_adicionar(fila, 1, 500);
    (void)fila_adicionar(fila, 2, 300);
    (void)fila_adicionar(fila, 3, 700);
    (void)fila_adicionar(fila, 4, 200);

    (void)ativo_inserir(ativos, 1, "PC-01", "Servidor", "em transito");
    (void)ativo_inserir(ativos, 2, "PC-02", "DNS", "em transito");
    (void)ativo_inserir(ativos, 3, "Notebook", "Roteador", "em transito");
    (void)ativo_inserir(ativos, 4, "PC-03", "Servidor", "em transito");
}

static void demo_cenario_pratico_pdf(void)
{
    FilaPacotes fila;
    PilhaErros pilha;
    PacoteAtivo *ativos = NULL;
    Pacote transmitido;
    PacoteAtivo *ativo;

    print_section("Exercicio 5 - cenario pratico integrado");
    fila_iniciar(&fila);
    erros_iniciar(&pilha);
    carregar_pacotes_pdf(&fila, &ativos);

    fila_listar(&fila);
    printf("Pacotes ativos:\n");
    ativo_listar(ativos);

    if (fila_transmitir(&fila, &transmitido)) {
        printf("Transmitido e entregue: pacote %d\n", transmitido.numero);
        ativo = ativo_buscar(ativos, transmitido.numero);
        if (ativo != NULL) {
            copy_text(ativo->status, sizeof(ativo->status), "entregue");
        }
        (void)ativo_remover(&ativos, transmitido.numero);
    }

    if (fila_transmitir(&fila, &transmitido)) {
        printf("Transmitido com erro: pacote %d\n", transmitido.numero);
        (void)erros_registrar(&pilha, transmitido);
    }

    fila_listar(&fila);
    erros_listar(&pilha);
    printf("Pacotes ativos apos transmissao:\n");
    ativo_listar(ativos);
    ativo_liberar(ativos);
}

static void demo_retransmissao_lifo(void)
{
    PilhaErros pilha;
    Pacote pacote2 = {2, 300, calcular_tempo_ms(300)};
    Pacote pacote4 = {4, 200, calcular_tempo_ms(200)};
    Pacote retransmitido;

    print_section("Exemplo de retransmissao LIFO");
    erros_iniciar(&pilha);
    (void)erros_registrar(&pilha, pacote2);
    (void)erros_registrar(&pilha, pacote4);
    erros_listar(&pilha);

    if (erros_retransmitir(&pilha, &retransmitido)) {
        printf("Primeiro retransmitido: pacote %d\n", retransmitido.numero);
    }

    erros_listar(&pilha);
}

static void demo_respostas(void)
{
    print_section("Respostas tecnicas");
    print_item("Fila", "o pacote 1 sai primeiro porque chegou primeiro.");
    print_item("Pilha", "o pacote 4 retransmite antes porque falhou por ultimo.");
    print_item("Lista", "guarda pacotes ainda observaveis no caminho da rede.");
    print_item("Tempo", "estimado com taxa didatica de 100 KB/s.");
}

int main(void)
{
    demo_cenario_pratico_pdf();
    demo_retransmissao_lifo();
    demo_respostas();

    return 0;
}
