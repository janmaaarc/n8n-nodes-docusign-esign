import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class DocuSignClickApi implements ICredentialType {
  name = 'docuSignClickApi';
  displayName = 'DocuSign Click API';
  documentationUrl = 'https://developers.docusign.com/docs/click-api/';
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
      displayName: 'Production Region',
      name: 'region',
      type: 'options',
      displayOptions: { show: { environment: ['production'] } },
      options: [
        { name: 'NA (na1)', value: 'na1' },
        { name: 'NA2 (na2)', value: 'na2' },
        { name: 'NA3 (na3)', value: 'na3' },
        { name: 'EU (eu)', value: 'eu' },
        { name: 'AU (au)', value: 'au' },
        { name: 'CA (ca)', value: 'ca' },
      ],
      default: 'na1',
      description: 'DocuSign data center region for your production account',
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
      default: 'click.manage click.send',
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
      baseURL: '={{$self.environment === "demo" ? "https://demo.docusign.net/clickapi/v1" : "https://" + ($self.region || "na1") + ".docusign.net/clickapi/v1"}}/accounts/{{$self.accountId}}',
      url: '/clickwraps',
      method: 'GET',
    },
  };
}
