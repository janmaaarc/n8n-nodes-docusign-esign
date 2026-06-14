import type { INodeProperties } from 'n8n-workflow';
import { webFormOperations, webFormFields } from './webForm';
import { webFormInstanceOperations, webFormInstanceFields } from './webFormInstance';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Web Form', value: 'webForm', description: 'Manage web forms' },
    { name: 'Web Form Instance', value: 'webFormInstance', description: 'Create and get web form signing instances' },
  ],
  default: 'webForm',
};

export const allOperations: INodeProperties[] = [webFormOperations, webFormInstanceOperations];

export const allFields: INodeProperties[] = [...webFormFields, ...webFormInstanceFields];
