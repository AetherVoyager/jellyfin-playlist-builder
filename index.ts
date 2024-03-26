import 'dotenv/config';
import { Jellyfin } from '@jellyfin/sdk';
import { getLibraryApi } from '@jellyfin/sdk/lib/utils/api';
import { getAppConfig } from './utils';

(async () => {
  const appConfig = getAppConfig();
  const { appName, appVersion, deviceId, serverUrl, apiKey } = appConfig;

  const jellyfin = new Jellyfin({
    clientInfo: {
      name: appName,
      version: appVersion,
    },
    deviceInfo: {
      name: appName,
      id: deviceId,
    },
  });

  const servers = await jellyfin.discovery.getRecommendedServerCandidates(serverUrl);
  const best = jellyfin.discovery.findBestServer(servers);

  if (!best) {
    throw new Error('No servers found');
  }

  const api = jellyfin.createApi(best.address);
  api.configuration.apiKey = apiKey;

  const libraries = getLibraryApi(api);
  console.log('Libraries', libraries);
})();
