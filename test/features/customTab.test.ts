import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Custom Tab', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a custom tab definition', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'create',
        params: {
          tabLabel: 'Company Name',
          type: 'text',
          additionalOptions: { font: 'arial', bold: true, required: true },
        },
        apiResponse: { customTabId: 'tab-1', tabLabel: 'Company Name' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.customTabId).toBe('tab-1');
    });

    it('should reject empty tab label', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'create',
        params: { tabLabel: '', type: 'text', additionalOptions: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get a custom tab by ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'get',
        params: { customTabId: 'tab-1' },
        apiResponse: { customTabId: 'tab-1', tabLabel: 'Company Name' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getAll', () => {
    it('should get custom tabs with limit', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'getAll',
        params: { returnAll: false, limit: 10 },
        apiResponse: { tabs: [{ customTabId: 'tab-1' }, { customTabId: 'tab-2' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a custom tab', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'update',
        params: {
          customTabId: 'tab-1',
          updateFields: { tabLabel: 'Updated Label', bold: true },
        },
        apiResponse: { customTabId: 'tab-1', tabLabel: 'Updated Label' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete a custom tab', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'delete',
        params: { customTabId: 'tab-1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty custom tab ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'delete',
        params: { customTabId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'customTab',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
