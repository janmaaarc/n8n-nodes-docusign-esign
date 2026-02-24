import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Envelope Document Field', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('get', () => {
    it('should get document fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'get',
        params: { envelopeId: VALID_UUID, documentId: '1' },
        apiResponse: { documentFields: [{ name: 'DocType', value: 'Contract' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.documentFields).toBeDefined();
    });

    it('should reject invalid envelope ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'get',
        params: { envelopeId: 'bad', documentId: '1' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create document fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          documentId: '1',
          documentFields: { field: [{ name: 'DocType', value: 'NDA' }] },
        },
        apiResponse: { documentFields: [{ name: 'DocType', value: 'NDA' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update document fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          documentId: '1',
          documentFields: { field: [{ name: 'DocType', value: 'Updated' }] },
        },
        apiResponse: { documentFields: [{ name: 'DocType', value: 'Updated' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete document fields', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, documentId: '1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty document ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, documentId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeDocumentField',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
