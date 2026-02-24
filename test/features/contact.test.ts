import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_EMAIL } from '../setup/constants';

describe('Contact', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a contact', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'create',
        params: {
          email: VALID_EMAIL,
          name: 'John Doe',
          additionalOptions: { organization: 'Acme Inc', shared: false },
        },
        apiResponse: { contacts: [{ contactId: 'c-1', name: 'John Doe' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid email', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'create',
        params: { email: 'not-an-email', name: 'John', additionalOptions: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject empty name', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'create',
        params: { email: VALID_EMAIL, name: '', additionalOptions: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should get contacts with limit', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'getAll',
        params: { returnAll: false, limit: 10 },
        apiResponse: { contacts: [{ contactId: 'c-1' }, { contactId: 'c-2' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(2);
    });
  });

  describe('update', () => {
    it('should update a contact', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'update',
        params: {
          contactId: 'c-1',
          updateFields: { name: 'Jane Doe', email: VALID_EMAIL },
        },
        apiResponse: { contacts: [{ contactId: 'c-1', name: 'Jane Doe' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete a contact', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'delete',
        params: { contactId: 'c-1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty contact ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'delete',
        params: { contactId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'contact',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
