# Auditoria Visual Do Fluxo Ex05 - 2026-06-16

## Problema Observado

Durante a execucao automatica da Questao 5, a etapa de erro/retransmissao apresentava quebra visual:

- o no `Erro` ficava cortado na parte inferior do palco;
- o token do pacote ficava desalinhado em relacao a rota;
- a fila diminuia de altura a cada transmissao e empurrava os paineis laterais.

O fluxo logico estava correto, mas a apresentacao ficava instavel.

## Causa

| Causa | Impacto |
| --- | --- |
| Coordenadas da topologia misturavam pixels fixos e porcentagem | O pacote nao seguia exatamente a mesma linha dos equipamentos. |
| `topology-map` herdava altura ampla demais do palco | Os nos desciam e o `Erro` podia sair do primeiro viewport. |
| Lista da fila nao tinha altura estavel | O trilho esquerdo mudava de tamanho durante a simulacao. |

## Correcao Aplicada

| Arquivo | Ajuste |
| --- | --- |
| `web/src/styles/topology.css` | Topologia passou a usar posicoes percentuais e altura com `clamp`. |
| `web/src/styles/shell.css` | Linha do palco foi reduzida para caber melhor no viewport. |
| `web/src/styles/panels.css` | Fila recebeu altura minima estavel. |
| `web/src/components/PacketQueue.tsx` | Painel recebeu classe propria para controle da fila. |
| `web/src/styles/responsive.css` | Mobile manteve altura explicita para o mapa. |

## Validacao Visual

Foram capturados os seguintes estados:

| Estado | Resultado |
| --- | --- |
| Inicio | Todos os nos aparecem no palco. |
| Falha do pacote 4 | No `Erro` fica visivel e o token `P4` chega ao destino visual. |
| Retransmissao | Token segue a rota sem sair do mapa. |
| Fechamento | Ciclo para em 100% com `Rodar novamente`. |

## Validacao Tecnica

```powershell
cd web
npm run build
```

Resultado: build aprovado.

## Conclusao

A simulacao da Questao 5 deixou de depender de scroll para explicar a rota de erro. O palco agora mantem a topologia inteira visivel durante o processo automatico.
