import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class DocuSignAdminApi implements ICredentialType {
  name = 'docuSignAdminApi';
  displayName = 'DocuSign Admin API';
  documentationUrl = 'https://developers.docusign.com/docs/admin-api/';
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
      displayName: 'Organization ID',
      name: 'organizationId',
      type: 'string',
      default: '',
      required: true,
      description: 'Your DocuSign organization ID (find in Admin > Organizations)',
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
      default: 'openid user_read user_write organization_read account_read',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header',
    },
  ];

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$self.environment === "demo" ? "https://api-d.docusign.net/Management/v2" : "https://api.docusign.net/Management/v2"}}',
      url: '/organizations',
      method: 'GET',
    },
  };
}
