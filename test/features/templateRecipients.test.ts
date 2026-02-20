import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID, VALID_EMAIL } from '../setup/constants';

describe('Template Recipients', () => {
  describe('create', () => {
    it('should add a recipient to a template', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'create',
        params: {
          templateId: VALID_UUID,
          roleName: 'Signer',
          recipientType: 'signer',
          additionalOptions: { email: VALID_EMAIL, name: 'John Doe' },
        },
        apiResponse: { signers: [{ recipientId: '1', roleName: 'Signer' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should add a CC recipient', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'create',
        params: {
          templateId: VALID_UUID,
          roleName: 'CC Person',
          recipientType: 'cc',
          additionalOptions: {},
        },
        apiResponse: { carbonCopies: [{ recipientId: '1', roleName: 'CC Person' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid template ID', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'create',
        params: {
          templateId: 'invalid',
          roleName: 'Signer',
          recipientType: 'signer',
          additionalOptions: {},
        },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('valid UUID');
    });
  });

  describe('getAll', () => {
    it('should get all recipients for a template', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'getAll',
        params: { templateId: VALID_UUID },
        apiResponse: { signers: [{ recipientId: '1' }], carbonCopies: [] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('update', () => {
    it('should update recipient email', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'update',
        params: {
          templateId: VALID_UUID,
          recipientId: '1',
          updateFields: { email: 'new@example.com' },
        },
        apiResponse: { signers: [{ recipientId: '1', email: 'new@example.com' }] },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should throw when no update fields', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'update',
        params: { templateId: VALID_UUID, recipientId: '1', updateFields: {} },
      });

      await expect(node.execute.call(ctx as never)).rejects.toThrow('At least one update field');
    });
  });

  describe('delete', () => {
    it('should delete a template recipient', async () => {
      const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
      const node = new DocuSign();

      const ctx = createMockExecuteContext({
        resource: 'templateRecipients',
        operation: 'delete',
        params: { templateId: VALID_UUID, recipientId: '1' },
        apiResponse: { success: true },
      });

      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
