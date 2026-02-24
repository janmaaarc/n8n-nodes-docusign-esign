import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Envelope Custom Field', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('create', () => {
    it('should create a custom field on an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          fieldName: 'OrderNumber',
          fieldValue: 'ORD-123',
          show: true,
          required: false,
        },
        apiResponse: { textCustomFields: [{ fieldId: '1', name: 'OrderNumber' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty field name', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'create',
        params: { envelopeId: VALID_UUID, fieldName: '', fieldValue: 'test' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject invalid envelope ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'create',
        params: { envelopeId: 'bad', fieldName: 'Test', fieldValue: 'val' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('get', () => {
    it('should get custom fields for an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'get',
        params: { envelopeId: VALID_UUID },
        apiResponse: { textCustomFields: [{ fieldId: '1', name: 'OrderNumber', value: 'ORD-123' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.textCustomFields).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          fieldId: '1',
          updateFields: { name: 'UpdatedName', value: 'NewVal' },
        },
        apiResponse: { textCustomFields: [{ fieldId: '1', name: 'UpdatedName' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete a custom field', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, fieldId: '1' },
        apiResponse: { textCustomFields: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty field ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, fieldId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeCustomField',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
