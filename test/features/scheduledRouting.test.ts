import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Scheduled Routing', () => {
  describe('get', () => {
    it('should get workflow for an envelope', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'scheduledRouting',
        operation: 'get',
        params: { envelopeId: VALID_UUID },
        apiResponse: { workflowStatus: 'paused', scheduledSending: {} },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.workflowStatus).toBe('paused');
    });

    it('should reject invalid envelope ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'scheduledRouting',
        operation: 'get',
        params: { envelopeId: 'invalid' },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });

  describe('update', () => {
    it('should set scheduled send date', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'scheduledRouting',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          scheduledSendDate: '2026-03-01T10:00:00Z',
          additionalOptions: {},
        },
        apiResponse: { workflowStatus: 'paused' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid date format', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'scheduledRouting',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          scheduledSendDate: 'not-a-date',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid ISO 8601');
    });
  });

  describe('delete', () => {
    it('should delete scheduled routing', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'scheduledRouting',
        operation: 'delete',
        params: { envelopeId: VALID_UUID },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
