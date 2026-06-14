import type { INodeProperties } from 'n8n-workflow';
import { agreementOperations, agreementFields } from './agreement';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Agreement', value: 'navigatorAgreement', description: 'Access AI-analyzed agreement data' },
  ],
  default: 'navigatorAgreement',
};

export const allOperations: INodeProperties[] = [agreementOperations];
export const allFields: INodeProperties[] = [...agreementFields];
