import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Account Custom Field', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create an account custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'create',
        params: {
          fieldName: 'Department',
          fieldType: 'text',
          additionalOptions: { required: true, show: true },
        },
        apiResponse: { textCustomFields: [{ fieldId: '1', name: 'Department' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should create a list-type custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'create',
        params: {
          fieldName: 'Region',
          fieldType: 'list',
          additionalOptions: { listItems: 'US,EU,APAC', required: false },
        },
        apiResponse: { listCustomFields: [{ fieldId: '2', name: 'Region' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty field name', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'create',
        params: { fieldName: '', fieldType: 'text', additionalOptions: {} },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('getAll', () => {
    it('should get all account custom fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'getAll',
        apiResponse: {
          textCustomFields: [{ fieldId: '1', name: 'Department' }],
          listCustomFields: [{ fieldId: '2', name: 'Region' }],
        },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update an account custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'update',
        params: {
          fieldId: '1',
          updateFields: { name: 'Updated Dept', required: true },
        },
        apiResponse: { textCustomFields: [{ fieldId: '1', name: 'Updated Dept' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete an account custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'delete',
        params: { fieldId: '1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty field ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'delete',
        params: { fieldId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'accountCustomField',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
