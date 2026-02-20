import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Connect Configuration', () => {
  describe('create', () => {
    it('should create a Connect configuration', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'create',
        params: {
          name: 'My Webhook',
          urlToPublishTo: 'https://example.com/webhook',
          events: ['envelope-completed', 'recipient-completed'],
          additionalOptions: {},
        },
        apiResponse: { connectId: '1', name: 'My Webhook' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.connectId).toBe('1');
    });

    it('should reject invalid URL', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'create',
        params: {
          name: 'Bad Webhook',
          urlToPublishTo: 'http://localhost:3000/hack',
          events: ['envelope-completed'],
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid URL');
    });

    it('should reject SSRF attempt', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'create',
        params: {
          name: 'SSRF Webhook',
          urlToPublishTo: 'http://169.254.169.254/metadata',
          events: ['envelope-completed'],
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid URL');
    });
  });

  describe('get', () => {
    it('should get a Connect configuration', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'get',
        params: { connectId: '123' },
        apiResponse: { connectId: '123', name: 'Test Config' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.connectId).toBe('123');
    });
  });

  describe('getAll', () => {
    it('should get all configurations with limit', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'getAll',
        params: { returnAll: false, limit: 10 },
        apiResponse: { configurations: [{ connectId: '1' }, { connectId: '2' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update configuration name', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'update',
        params: {
          connectId: '123',
          updateFields: { name: 'Updated Webhook' },
        },
        apiResponse: { connectId: '123', name: 'Updated Webhook' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should throw when no update fields', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'update',
        params: { connectId: '123', updateFields: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('delete', () => {
    it('should delete a configuration', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'connectConfig',
        operation: 'delete',
        params: { connectId: '123' },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
