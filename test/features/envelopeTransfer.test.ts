import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_EMAIL, VALID_EMAIL_2 } from '../setup/constants';

describe('Envelope Transfer', () => {
  describe('getRules', () => {
    it('should get all transfer rules', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'getRules',
        apiResponse: { envelopeTransferRules: [{ envelopeTransferRuleId: '1' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('createRule', () => {
    it('should create a transfer rule', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'createRule',
        params: {
          fromUserEmail: VALID_EMAIL,
          toUserEmail: VALID_EMAIL_2,
          additionalOptions: {},
        },
        apiResponse: { envelopeTransferRules: [{ envelopeTransferRuleId: '1' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid from email', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'createRule',
        params: {
          fromUserEmail: 'invalid',
          toUserEmail: VALID_EMAIL_2,
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid email');
    });
  });

  describe('updateRule', () => {
    it('should update a transfer rule', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'updateRule',
        params: {
          transferRuleId: 'rule-1',
          updateFields: { enabled: false },
        },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should throw when no update fields', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'updateRule',
        params: { transferRuleId: 'rule-1', updateFields: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('deleteRule', () => {
    it('should delete a transfer rule', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'envelopeTransfer',
        operation: 'deleteRule',
        params: { transferRuleId: 'rule-1' },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
