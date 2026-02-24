import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Envelope Form Data & Views', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getFormData', () => {
    it('should get form data for an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'getFormData',
        params: { envelopeId: VALID_UUID },
        apiResponse: { formData: [{ name: 'FirstName', value: 'John' }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.formData).toBeDefined();
    });

    it('should reject invalid envelope ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'getFormData',
        params: { envelopeId: 'not-a-uuid' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('createSenderView', () => {
    it('should create a sender view URL', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'createSenderView',
        params: { envelopeId: VALID_UUID, returnUrl: 'https://example.com/done' },
        apiResponse: { url: 'https://docusign.com/sender-view-url' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.url).toBeDefined();
    });

    it('should reject invalid return URL', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'createSenderView',
        params: { envelopeId: VALID_UUID, returnUrl: 'not-a-url' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject invalid envelope ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'createSenderView',
        params: { envelopeId: 'bad', returnUrl: 'https://example.com/done' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('createEditView', () => {
    it('should create an edit view URL', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'createEditView',
        params: { envelopeId: VALID_UUID, returnUrl: 'https://example.com/done' },
        apiResponse: { url: 'https://docusign.com/edit-view-url' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.url).toBeDefined();
    });

    it('should reject invalid return URL', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelope',
        operation: 'createEditView',
        params: { envelopeId: VALID_UUID, returnUrl: 'http://localhost:3000' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });
});
