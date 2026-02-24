import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Permission Profile', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a permission profile', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'create',
        params: {
          permissionProfileName: 'Basic Sender',
          settings: { canSendEnvelope: true, canManageTemplates: false },
        },
        apiResponse: { permissionProfileId: 'pp-1', permissionProfileName: 'Basic Sender' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.permissionProfileId).toBe('pp-1');
    });

    it('should reject empty profile name', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'create',
        params: { permissionProfileName: '', settings: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get a permission profile', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'get',
        params: { permissionProfileId: 'pp-1' },
        apiResponse: { permissionProfileId: 'pp-1', permissionProfileName: 'Basic Sender' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('getAll', () => {
    it('should get permission profiles with limit', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'getAll',
        params: { returnAll: false, limit: 10 },
        apiResponse: {
          permissionProfiles: [
            { permissionProfileId: 'pp-1' },
            { permissionProfileId: 'pp-2' },
          ],
        },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a permission profile', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'update',
        params: {
          permissionProfileId: 'pp-1',
          updateFields: { permissionProfileName: 'Updated', canSendEnvelope: true },
        },
        apiResponse: { permissionProfileId: 'pp-1', permissionProfileName: 'Updated' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty profile ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'update',
        params: { permissionProfileId: '', updateFields: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete a permission profile', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'delete',
        params: { permissionProfileId: 'pp-1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'permissionProfile',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
