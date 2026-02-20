import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID, VALID_EMAIL } from '../setup/constants';

describe('Payment Tab', () => {
  describe('createEnvelope', () => {
    it('should create envelope with payment tab', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'paymentTab',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Payment Invoice',
          templateId: VALID_UUID,
          signerEmail: VALID_EMAIL,
          signerName: 'John Doe',
          paymentAmount: '100.00',
          currencyCode: 'USD',
          gatewayAccountId: 'gateway-123',
          itemName: 'Service Fee',
        },
        apiResponse: { envelopeId: VALID_UUID, status: 'sent' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.envelopeId).toBe(VALID_UUID);
    });

    it('should reject non-positive payment amount', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'paymentTab',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Bad Payment',
          templateId: VALID_UUID,
          signerEmail: VALID_EMAIL,
          signerName: 'John Doe',
          paymentAmount: '-50',
          currencyCode: 'USD',
          gatewayAccountId: 'gateway-123',
          itemName: 'Service Fee',
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('positive number');
    });

    it('should reject non-numeric payment amount', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'paymentTab',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Bad Payment',
          templateId: VALID_UUID,
          signerEmail: VALID_EMAIL,
          signerName: 'John Doe',
          paymentAmount: 'not-a-number',
          currencyCode: 'USD',
          gatewayAccountId: 'gateway-123',
          itemName: 'Service Fee',
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('positive number');
    });

    it('should reject invalid template ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'paymentTab',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Bad Template',
          templateId: 'invalid',
          signerEmail: VALID_EMAIL,
          signerName: 'John',
          paymentAmount: '100',
          currencyCode: 'USD',
          gatewayAccountId: 'gw',
          itemName: 'Fee',
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });
});
