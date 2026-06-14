import type { INodeProperties } from 'n8n-workflow';
import { workflowOperations, workflowFields } from './workflow';
import { workflowInstanceOperations, workflowInstanceFields } from './workflowInstance';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Workflow', value: 'maestroWorkflow', description: 'Manage Maestro workflows' },
    { name: 'Workflow Instance', value: 'maestroInstance', description: 'Manage workflow instances' },
  ],
  default: 'maestroWorkflow',
};

export const allOperations: INodeProperties[] = [workflowOperations, workflowInstanceOperations];
export const allFields: INodeProperties[] = [...workflowFields, ...workflowInstanceFields];
