import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID, VALID_EMAIL } from '../setup/constants';

describe('Account User', () => {
  describe('create', () => {
    it('should create a new user', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'create',
        params: {
          email: VALID_EMAIL,
          userName: 'Test User',
          additionalOptions: {},
        },
        apiResponse: { newUsers: [{ userId: VALID_UUID, email: VALID_EMAIL, userName: 'Test User' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.email).toBe(VALID_EMAIL);
    });

    it('should create user with additional options', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'create',
        params: {
          email: VALID_EMAIL,
          userName: 'Test User',
          additionalOptions: { company: 'Acme', jobTitle: 'Dev' },
        },
        apiResponse: { newUsers: [{ userId: VALID_UUID, email: VALID_EMAIL }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid email', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'create',
        params: { email: 'invalid', userName: 'Test', additionalOptions: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid email');
    });
  });

  describe('get', () => {
    it('should get a user by ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'get',
        params: { userId: VALID_UUID },
        apiResponse: { userId: VALID_UUID, email: VALID_EMAIL },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.userId).toBe(VALID_UUID);
    });
  });

  describe('getAll', () => {
    it('should get users with limit', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'getAll',
        params: { returnAll: false, limit: 10, filters: {} },
        apiResponse: { users: [{ userId: VALID_UUID }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should apply status filter', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'getAll',
        params: { returnAll: false, limit: 10, filters: { status: 'Active' } },
        apiResponse: { users: [{ userId: VALID_UUID, userStatus: 'Active' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update user email', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'update',
        params: {
          userId: VALID_UUID,
          updateFields: { email: 'new@example.com' },
        },
        apiResponse: { userId: VALID_UUID, email: 'new@example.com' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should throw when no update fields', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'update',
        params: { userId: VALID_UUID, updateFields: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'accountUser',
        operation: 'delete',
        params: { userId: VALID_UUID },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
