import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Envelope Attachment', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getAll', () => {
    it('should get all attachments on an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'getAll',
        params: { envelopeId: VALID_UUID },
        apiResponse: { attachments: [{ attachmentId: '1', name: 'file.pdf' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('should add an attachment to an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          name: 'reference.pdf',
          data: 'SGVsbG8gV29ybGQ=',
          accessControl: 'sender',
        },
        apiResponse: { attachments: [{ attachmentId: '1' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid base64 data', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          name: 'file.pdf',
          data: 'not-valid-base64!!!',
          accessControl: 'sender',
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    it('should delete an attachment', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, attachmentId: 'att-1' },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty attachment ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'delete',
        params: { envelopeId: VALID_UUID, attachmentId: '' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeAttachment',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
