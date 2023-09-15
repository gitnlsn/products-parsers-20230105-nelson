export class NodeApiStatus {
  prismaConnectionStatus: 'ok' | 'error';
  productsLastAutoUpdate: Date;
  nodeUptime: number;
  nodeMemoryUsage: ReturnType<typeof process.memoryUsage>;
}
