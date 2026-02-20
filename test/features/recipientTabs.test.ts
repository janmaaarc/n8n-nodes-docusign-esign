import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Recipient Tabs', () => {
  describe('get', () => {
    it('should get tabs for a recipient', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'recipientTabs',
        operation: 'get',
        params: {
          envelopeId: VALID_UUID,
          recipientId: '1',
        },
        apiResponse: { signHereTabs: [{ tabId: '1' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.signHereTabs).toBeDefined();
    });

    it('should reject invalid envelope ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'recipientTabs',
        operation: 'get',
        params: {
          envelopeId: 'invalid',
          recipientId: '1',
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });

  describe('update', () => {
    it('should update text tabs for a recipient', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'recipientTabs',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          recipientId: '1',
          tabs: {
            textTabs: { tab: [{ tabLabel: 'name', value: 'John' }] },
          },
        },
        apiResponse: { textTabs: [{ tabLabel: 'name', value: 'John' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should update checkbox tabs', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'recipientTabs',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          recipientId: '1',
          tabs: {
            checkboxTabs: { tab: [{ tabLabel: 'agree', selected: true }] },
          },
        },
        apiResponse: { checkboxTabs: [{ tabLabel: 'agree', selected: 'true' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('error handling', () => {
    it('should handle continueOnFail', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'recipientTabs',
        operation: 'get',
        params: { envelopeId: 'invalid', recipientId: '1' },
        shouldFail: true,
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0][0].json.error).toBeDefined();
    });
  });
});
