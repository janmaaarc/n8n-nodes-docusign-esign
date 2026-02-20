import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Supplemental Document', () => {
  describe('addToEnvelope', () => {
    it('should add a supplemental document to an envelope', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'supplementalDoc',
        operation: 'addToEnvelope',
        params: {
          envelopeId: VALID_UUID,
          document: 'SGVsbG8gV29ybGQ=',
          documentName: 'terms.pdf',
          display: 'modal',
          additionalOptions: {},
        },
        apiResponse: { documentId: '999', name: 'terms.pdf' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should set display mode to inline', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'supplementalDoc',
        operation: 'addToEnvelope',
        params: {
          envelopeId: VALID_UUID,
          document: 'SGVsbG8gV29ybGQ=',
          documentName: 'disclosure.pdf',
          display: 'inline',
          additionalOptions: { signerMustAcknowledge: 'accept' },
        },
        apiResponse: { documentId: '999', name: 'disclosure.pdf' },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid envelope ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'supplementalDoc',
        operation: 'addToEnvelope',
        params: {
          envelopeId: 'invalid',
          document: 'SGVsbG8=',
          documentName: 'terms.pdf',
          display: 'modal',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });
});
