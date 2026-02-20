import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';

describe('ID Verification', () => {
  describe('getWorkflows', () => {
    it('should get available IDV workflows', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'idVerification',
        operation: 'getWorkflows',
        apiResponse: {
          identityVerification: [
            { workflowId: 'wf-1', workflowLabel: 'Phone Auth' },
            { workflowId: 'wf-2', workflowLabel: 'ID Check' },
          ],
        },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.identityVerification).toBeDefined();
    });

    it('should handle empty workflow list', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'idVerification',
        operation: 'getWorkflows',
        apiResponse: { identityVerification: [] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should handle unknown operation', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'idVerification',
        operation: 'unknown',
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
