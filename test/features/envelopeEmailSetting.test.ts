import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('Envelope Email Setting', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('get', () => {
    it('should get email settings for an envelope', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'get',
        params: { envelopeId: VALID_UUID },
        apiResponse: { replyEmailAddressOverride: 'reply@example.com' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('should create email settings with reply address', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          replyEmailAddressOverride: 'reply@example.com',
          replyEmailNameOverride: 'Support Team',
          bccEmailAddresses: 'archive@example.com',
        },
        apiResponse: { replyEmailAddressOverride: 'reply@example.com' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });

    it('should reject invalid reply email', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          replyEmailAddressOverride: 'not-an-email',
          replyEmailNameOverride: '',
          bccEmailAddresses: '',
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should reject invalid BCC email', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'create',
        params: {
          envelopeId: VALID_UUID,
          replyEmailAddressOverride: '',
          replyEmailNameOverride: '',
          bccEmailAddresses: 'bad-email',
        },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update email settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'update',
        params: {
          envelopeId: VALID_UUID,
          replyEmailAddressOverride: 'new@example.com',
          replyEmailNameOverride: 'New Name',
          bccEmailAddresses: '',
        },
        apiResponse: { replyEmailAddressOverride: 'new@example.com' },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete email settings', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'delete',
        params: { envelopeId: VALID_UUID },
        apiResponse: {},
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });

  describe('unknown operation', () => {
    it('should throw for unknown operation', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'envelopeEmailSetting',
        operation: 'unknown',
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow('Unknown operation');
    });
  });
});
