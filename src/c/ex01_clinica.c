#include "common.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FILA_CAPACIDADE 8
#define PILHA_CAPACIDADE 8

typedef struct {
    char nome[32];
    int idade;
} Paciente;

typedef struct {
    Paciente itens[FILA_CAPACIDADE];
    int inicio;
    int fim;
    int total;
} FilaRecepcao;

typedef struct {
    char nome[32];
    char especialidade[32];
} Atendimento;

typedef struct {
    Atendimento itens[PILHA_CAPACIDADE];
    int topo;
} PilhaHistorico;

typedef struct Cadastro {
    char nome[32];
    char cpf[16];
    char telefone[24];
    struct Cadastro *proximo;
} Cadastro;

static void fila_iniciar(FilaRecepcao *fila)
{
    fila->inicio = 0;
    fila->fim = 0;
    fila->total = 0;
}

static int fila_adicionar(FilaRecepcao *fila, const char *nome, int idade)
{
    Paciente *paciente;

    if (fila->total == FILA_CAPACIDADE) {
        return 0;
    }

    paciente = &fila->itens[fila->fim];
    copy_text(paciente->nome, sizeof(paciente->nome), nome);
    paciente->idade = idade;
    fila->fim = (fila->fim + 1) % FILA_CAPACIDADE;
    fila->total++;

    return 1;
}

static int fila_chamar(FilaRecepcao *fila, Paciente *paciente)
{
    if (fila->total == 0) {
        return 0;
    }

    *paciente = fila->itens[fila->inicio];
    fila->inicio = (fila->inicio + 1) % FILA_CAPACIDADE;
    fila->total--;

    return 1;
}

static void fila_listar(const FilaRecepcao *fila)
{
    int i;

    printf("Fila de espera: %d paciente(s)\n", fila->total);
    for (i = 0; i < fila->total; i++) {
        const Paciente *paciente = &fila->itens[(fila->inicio + i) % FILA_CAPACIDADE];
        printf("  %d. %s, %d anos\n", i + 1, paciente->nome, paciente->idade);
    }
}

static void historico_iniciar(PilhaHistorico *pilha)
{
    pilha->topo = 0;
}

static int historico_registrar(PilhaHistorico *pilha, const char *nome, const char *especialidade)
{
    Atendimento *atendimento;

    if (pilha->topo == PILHA_CAPACIDADE) {
        return 0;
    }

    atendimento = &pilha->itens[pilha->topo];
    copy_text(atendimento->nome, sizeof(atendimento->nome), nome);
    copy_text(atendimento->especialidade, sizeof(atendimento->especialidade), especialidade);
    pilha->topo++;

    return 1;
}

static int historico_desfazer(PilhaHistorico *pilha, Atendimento *atendimento)
{
    if (pilha->topo == 0) {
        return 0;
    }

    pilha->topo--;
    *atendimento = pilha->itens[pilha->topo];

    return 1;
}

static void historico_listar(const PilhaHistorico *pilha)
{
    int i;

    printf("Historico recente: %d registro(s)\n", pilha->topo);
    for (i = pilha->topo - 1; i >= 0; i--) {
        printf("  %s - %s\n", pilha->itens[i].nome, pilha->itens[i].especialidade);
    }
}

static Cadastro *cadastro_criar(const char *nome, const char *cpf, const char *telefone)
{
    Cadastro *novo = (Cadastro *)malloc(sizeof(Cadastro));

    if (novo == NULL) {
        return NULL;
    }

    copy_text(novo->nome, sizeof(novo->nome), nome);
    copy_text(novo->cpf, sizeof(novo->cpf), cpf);
    copy_text(novo->telefone, sizeof(novo->telefone), telefone);
    novo->proximo = NULL;

    return novo;
}

static int cadastro_inserir(Cadastro **lista, const char *nome, const char *cpf, const char *telefone)
{
    Cadastro *novo = cadastro_criar(nome, cpf, telefone);

    if (novo == NULL) {
        return 0;
    }

    novo->proximo = *lista;
    *lista = novo;

    return 1;
}

static Cadastro *cadastro_buscar(Cadastro *lista, const char *cpf)
{
    Cadastro *atual = lista;

    while (atual != NULL) {
        if (strcmp(atual->cpf, cpf) == 0) {
            return atual;
        }

        atual = atual->proximo;
    }

    return NULL;
}

static int cadastro_remover(Cadastro **lista, const char *cpf)
{
    Cadastro *atual = *lista;
    Cadastro *anterior = NULL;

    while (atual != NULL) {
        if (strcmp(atual->cpf, cpf) == 0) {
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

static void cadastro_listar(const Cadastro *lista)
{
    const Cadastro *atual = lista;

    while (atual != NULL) {
        printf("  %s | CPF %s | Tel. %s\n", atual->nome, atual->cpf, atual->telefone);
        atual = atual->proximo;
    }
}

static void cadastro_liberar(Cadastro *lista)
{
    Cadastro *atual = lista;

    while (atual != NULL) {
        Cadastro *proximo = atual->proximo;
        free(atual);
        atual = proximo;
    }
}

static void demo_recepcao(void)
{
    FilaRecepcao fila;
    Paciente chamado;

    print_section("Exercicio 1 - recepcao por fila");
    fila_iniciar(&fila);

    (void)fila_adicionar(&fila, "Joao", 25);
    (void)fila_adicionar(&fila, "Maria", 40);
    (void)fila_adicionar(&fila, "Carlos", 31);
    (void)fila_adicionar(&fila, "Ana", 28);
    fila_listar(&fila);

    if (fila_chamar(&fila, &chamado)) {
        printf("Chamado: %s\n", chamado.nome);
    }

    if (fila_chamar(&fila, &chamado)) {
        printf("Chamado: %s\n", chamado.nome);
    }

    fila_listar(&fila);
}

static void demo_historico(void)
{
    PilhaHistorico pilha;
    Atendimento removido;

    print_section("Historico com pilha");
    historico_iniciar(&pilha);

    (void)historico_registrar(&pilha, "Joao", "Cardiologia");
    (void)historico_registrar(&pilha, "Maria", "Ortopedia");
    (void)historico_registrar(&pilha, "Carlos", "Clinica geral");
    historico_listar(&pilha);

    if (historico_desfazer(&pilha, &removido)) {
        printf("Desfeito: %s - %s\n", removido.nome, removido.especialidade);
    }

    historico_listar(&pilha);
}

static void demo_cadastros(void)
{
    Cadastro *lista = NULL;
    Cadastro *encontrado;

    print_section("Cadastro dinamico com lista encadeada");
    (void)cadastro_inserir(&lista, "Joao", "111.111.111-11", "(11) 90000-0001");
    (void)cadastro_inserir(&lista, "Maria", "222.222.222-22", "(11) 90000-0002");
    (void)cadastro_inserir(&lista, "Carlos", "333.333.333-33", "(11) 90000-0003");
    cadastro_listar(lista);

    encontrado = cadastro_buscar(lista, "222.222.222-22");
    if (encontrado != NULL) {
        printf("Busca por CPF encontrou: %s\n", encontrado->nome);
    }

    if (cadastro_remover(&lista, "333.333.333-33")) {
        printf("Cadastro removido: Carlos\n");
    }

    cadastro_listar(lista);
    cadastro_liberar(lista);
}

static void demo_respostas(void)
{
    print_section("Respostas tecnicas");
    print_item("Fila", "mantem a ordem real de chegada na recepcao.");
    print_item("Pilha", "desfaz sempre o ultimo atendimento registrado.");
    print_item("Lista", "cresce e reduz sem precisar realocar um vetor inteiro.");
}

int main(void)
{
    demo_recepcao();
    demo_historico();
    demo_cadastros();
    demo_respostas();

    return 0;
}
