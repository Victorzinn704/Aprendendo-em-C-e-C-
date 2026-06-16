import type { Packet } from './network-types';

const transmissionRateKbPerSecond = 100;

export const pdfPackets: Packet[] = [
  { id: 1, sizeKb: 500, estimatedMs: estimateMs(500), origin: 'PC-01', destination: 'Servidor' },
  { id: 2, sizeKb: 300, estimatedMs: estimateMs(300), origin: 'PC-02', destination: 'DNS' },
  { id: 3, sizeKb: 700, estimatedMs: estimateMs(700), origin: 'Notebook', destination: 'Roteador' },
  { id: 4, sizeKb: 200, estimatedMs: estimateMs(200), origin: 'PC-03', destination: 'Servidor' },
];

function estimateMs(sizeKb: number): number {
  return Math.round((sizeKb * 1000) / transmissionRateKbPerSecond);
}
