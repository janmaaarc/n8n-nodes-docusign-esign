import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Connect Event', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getFailures', () => {
    it('should get failed deliveries with limit', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'getFailures',
        params: { returnAll: false, limit: 10 },
        apiResponse: { failures: [{ failureId: 'f-1' }, { failureId: 'f-2' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });

    it('should handle empty failures', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'getFailures',
        params: { returnAll: false, limit: 10 },
        apiResponse: { failures: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(0);
    });
  });

  describe('getLogs', () => {
    it('should get delivery logs with filters', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'getLogs',
        params: {
          returnAll: false,
          limit: 20,
          filters: { fromDate: '2026-01-01', toDate: '2026-02-01' },
        },
        apiResponse: { logs: [{ logId: 'l-1' }, { logId: 'l-2' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });

    it('should handle empty logs', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'getLogs',
        params: { returnAll: false, limit: 10, filters: {} },
        apiResponse: { logs: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(0);
    });
  });

  describe('retry', () => {
    it('should retry a failed delivery', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'retry',
        params: { failureId: 'f-1' },
        apiResponse: { failureId: 'f-1', status: 'retrying' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty failure ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'retry',
        params: { failureId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'connectEvent',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
