import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class DocuSignWebFormsApi implements ICredentialType {
  name = 'docuSignWebFormsApi';
  displayName = 'DocuSign Web Forms API';
  documentationUrl = 'https://developers.docusign.com/docs/web-forms-api/';
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
      default: 'signature webforms_read webforms_instance_read webforms_instance_write',
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
      baseURL: '={{$self.environment === "demo" ? "https://apps-d.docusign.com/api/webforms/v1.1" : "https://apps.docusign.com/api/webforms/v1.1"}}/accounts/{{$self.accountId}}',
      url: '/forms',
      method: 'GET',
    },
  };
}
