import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class DocuSignMaestroApi implements ICredentialType {
  name = 'docuSignMaestroApi';
  displayName = 'DocuSign Maestro API';
  documentationUrl = 'https://developers.docusign.com/docs/maestro-api/';
  extends = ['oAuth2Api'];

  properties: INodeProperties[] = [
    {
      displayName: 'Environment',
      name: 'environment',
      type: 'options',
      options: [
        { name: 'Demo', value: 'demo' },
        { name: 'Production', value: 'production' },
      ],
      default: 'demo',
    },
    {
      displayName: 'Account ID',
      name: 'accountId',
      type: 'string',
      default: '',
      required: true,
    },
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: '={{$self.environment === "demo" ? "https://account-d.docusign.com/oauth/auth" : "https://account.docusign.com/oauth/auth"}}',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: '={{$self.environment === "demo" ? "https://account-d.docusign.com/oauth/token" : "https://account.docusign.com/oauth/token"}}',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'signature aow_manage',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header',
    },
    {
      displayName: 'Webhook Secret',
      name: 'webhookSecret',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      description: 'HMAC secret key for webhook signature verification',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$self.environment === "demo" ? "https://api-d.docusign.com/v1" : "https://api.docusign.com/v1"}}/accounts/{{$self.accountId}}',
      url: '/workflows',
      method: 'GET',
    },
  };
}
