import type { INodeProperties } from 'n8n-workflow';
import { eventStreamOperations, eventStreamFields } from './eventStream';

export const resourceProperty: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    { name: 'Event Stream', value: 'eventStream', description: 'Stream DocuSign activity events' },
  ],
  default: 'eventStream',
};

export const allOperations: INodeProperties[] = [eventStreamOperations];
export const allFields: INodeProperties[] = [...eventStreamFields];
