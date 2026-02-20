import type { INodeProperties } from 'n8n-workflow';

/**
 * ID Verification operations — manage identity verification workflows
 */
export const idVerificationOperations: INodeProperties = {
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ['idVerification'],
    },
  },
  options: [
    {
      name: 'Get Workflows',
      value: 'getWorkflows',
      action: 'Get IDV workflows',
      description: 'Get available identity verification workflows for the account',
    },
  ],
  default: 'getWorkflows',
};

/**
 * ID Verification fields
 */
export const idVerificationFields: INodeProperties[] = [
  // No additional fields needed for getWorkflows — it uses the account context
  {
    displayName: 'Info',
    name: 'idvInfo',
    type: 'notice',
    displayOptions: {
      show: {
        resource: ['idVerification'],
        operation: ['getWorkflows'],
      },
    },
    default: '',
    description:
      'Returns all available IDV workflows for your account. Use the workflow ID when configuring identity verification on envelope recipients.',
  },
];
