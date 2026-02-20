import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Comments API', () => {
  describe('create', () => {
    it('should create a comment on an envelope', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'comments',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          commentText: 'Test comment',
          additionalOptions: {},
        },
        apiResponse: { comments: [{ commentId: '1', text: 'Test comment' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should create a comment with thread ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'comments',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          commentText: 'Reply',
          additionalOptions: { threadId: 'thread-1' },
        },
        apiResponse: { comments: [{ commentId: '2', text: 'Reply', threadId: 'thread-1' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject empty comment text', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'comments',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          commentText: '',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('required');
    });

    it('should reject invalid envelope ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'comments',
        operation: 'create',
        params: {
          envelopeId: 'invalid',
          commentText: 'Test',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });

  describe('getAll', () => {
    it('should get comments with limit', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'comments',
        operation: 'getAll',
        params: {
          envelopeId: VALID_UUID,
          returnAll: false,
          limit: 10,
        },
        apiResponse: { comments: [{ commentId: '1', text: 'Hello' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
