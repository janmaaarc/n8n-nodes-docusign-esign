import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class DocuSignMonitorApi implements ICredentialType {
  name = 'docuSignMonitorApi';
  displayName = 'DocuSign Monitor API';
  documentationUrl = 'https://developers.docusign.com/docs/monitor-api/';
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
      default: 'impersonation',
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
      baseURL: '={{$self.environment === "demo" ? "https://lens-d.docusign.net" : "https://lens.docusign.net"}}',
      url: '/api/v2.0/datasets',
      method: 'GET',
    },
  };
}
