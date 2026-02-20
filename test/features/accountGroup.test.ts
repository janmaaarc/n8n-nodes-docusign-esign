import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Account Group', () => {
  describe('create', () => {
    it('should create a permission group', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'create',
        params: { groupName: 'Test Group', additionalOptions: {} },
        apiResponse: { groups: [{ groupId: '1', groupName: 'Test Group' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.groupName).toBe('Test Group');
    });

    it('should reject empty group name', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'create',
        params: { groupName: '', additionalOptions: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('required');
    });
  });

  describe('getAll', () => {
    it('should get groups with limit', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'getAll',
        params: { returnAll: false, limit: 10 },
        apiResponse: { groups: [{ groupId: '1' }, { groupId: '2' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update group name', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'update',
        params: {
          groupId: '123',
          updateFields: { groupName: 'New Name' },
        },
        apiResponse: { groups: [{ groupId: '123', groupName: 'New Name' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should throw when no update fields', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'update',
        params: { groupId: '123', updateFields: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('delete', () => {
    it('should delete a group', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountGroup',
        operation: 'delete',
        params: { groupId: '123' },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
