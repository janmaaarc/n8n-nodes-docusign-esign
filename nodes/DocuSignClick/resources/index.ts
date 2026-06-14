import type { INodeProperties } from 'n8n-workflow';
import { clickwrapOperations, clickwrapFields } from './clickwrap';
import { agreementOperations, agreementFields } from './agreement';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Clickwrap', value: 'clickwrap', description: 'Manage clickwrap agreements' },
    { name: 'Agreement', value: 'clickAgreement', description: 'List clickwrap user agreements' },
  ],
  default: 'clickwrap',
};

export const allOperations: INodeProperties[] = [clickwrapOperations, agreementOperations];
export const allFields: INodeProperties[] = [...clickwrapFields, ...agreementFields];
