import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('Chunked Upload', () => {
  describe('initiate', () => {
    it('should initiate a chunked upload session', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'initiate',
        params: {
          contentType: 'application/pdf',
          totalSize: 50000000,
        },
        apiResponse: { chunkedUploadId: 'session-123', chunkedUploadUri: '/chunked_uploads/session-123' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.chunkedUploadId).toBe('session-123');
    });

    it('should reject zero size', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'initiate',
        params: {
          contentType: 'application/pdf',
          totalSize: 0,
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('positive number');
    });

    it('should reject negative size', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'initiate',
        params: {
          contentType: 'application/pdf',
          totalSize: -100,
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('positive number');
    });
  });

  describe('uploadChunk', () => {
    it('should upload a chunk', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'uploadChunk',
        params: {
          chunkedUploadId: 'session-123',
          chunkPart: 0,
          chunkData: 'SGVsbG8gV29ybGQ=',
        },
        apiResponse: { chunkedUploadId: 'session-123', chunkedUploadPartId: '0' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid base64 chunk data', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'uploadChunk',
        params: {
          chunkedUploadId: 'session-123',
          chunkPart: 0,
          chunkData: 'not valid base64!!!',
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('base64');
    });
  });

  describe('commit', () => {
    it('should commit a chunked upload', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'chunkedUpload',
        operation: 'commit',
        params: {
          chunkedUploadId: 'session-123',
          action: 'commit',
        },
        apiResponse: { chunkedUploadId: 'session-123', committed: 'true' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.committed).toBe('true');
    });
  });
});
