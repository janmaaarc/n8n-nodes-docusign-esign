import { describe, it, expect } from 'vitest';
import { createMockExecuteContext } from '../setup/mockContext';
import { VALID_UUID } from '../setup/constants';

describe('PowerForm Data', () => {
  const getNode = async () => {
    const { DocuSign } = await import('../../nodes/DocuSign/DocuSign.node');
    return new DocuSign();
  };

  describe('getFormData', () => {
    it('should get form data from PowerForm submissions', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'powerForm',
        operation: 'getFormData',
        params: { powerFormId: VALID_UUID },
        apiResponse: { envelopes: [{ envelopeId: VALID_UUID }] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
      expect(result[0][0].json.envelopes).toBeDefined();
    });

    it('should reject invalid PowerForm ID', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'powerForm',
        operation: 'getFormData',
        params: { powerFormId: 'not-a-uuid' },
      });
      await expect(node.execute.call(ctx as never)).rejects.toThrow();
    });

    it('should handle empty form data', async () => {
      const node = await getNode();
      const ctx = createMockExecuteContext({
        resource: 'powerForm',
        operation: 'getFormData',
        params: { powerFormId: VALID_UUID },
        apiResponse: { envelopes: [] },
      });
      const result = await node.execute.call(ctx as never);
      expect(result[0]).toHaveLength(1);
    });
  });
});
