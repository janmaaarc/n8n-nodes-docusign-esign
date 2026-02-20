import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID, VALID_UUID_2, VALID_EMAIL } from '../setup/constants';

describe('Composite Template', () => {
  describe('createEnvelope', () => {
    it('should create envelope from composite templates', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'compositeTemplate',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Composite Test',
          serverTemplateIds: VALID_UUID,
          signerEmail: VALID_EMAIL,
          signerName: 'John Doe',
          roleName: 'Signer',
          additionalOptions: {},
        },
        apiResponse: { envelopeId: VALID_UUID, status: 'sent' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.envelopeId).toBe(VALID_UUID);
    });

    it('should handle multiple template IDs', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'compositeTemplate',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Multi Template',
          serverTemplateIds: `${VALID_UUID}, ${VALID_UUID_2}`,
          signerEmail: VALID_EMAIL,
          signerName: 'Jane Doe',
          roleName: 'Signer',
          additionalOptions: {},
        },
        apiResponse: { envelopeId: VALID_UUID, status: 'sent' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid template ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'compositeTemplate',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Bad Template',
          serverTemplateIds: 'invalid-id',
          signerEmail: VALID_EMAIL,
          signerName: 'John',
          roleName: 'Signer',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });

    it('should reject invalid signer email', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'compositeTemplate',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Bad Email',
          serverTemplateIds: VALID_UUID,
          signerEmail: 'invalid',
          signerName: 'John',
          roleName: 'Signer',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid email');
    });

    it('should save as draft when sendImmediately is false', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'compositeTemplate',
        operation: 'createEnvelope',
        params: {
          emailSubject: 'Draft Composite',
          serverTemplateIds: VALID_UUID,
          signerEmail: VALID_EMAIL,
          signerName: 'John',
          roleName: 'Signer',
          additionalOptions: { sendImmediately: false },
        },
        apiResponse: { envelopeId: VALID_UUID, status: 'created' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
