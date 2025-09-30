import { apiClient, getUserIdForEndpoint, API } from './client.ts';

export const CoreAPI = {
  store: () => apiClient.get('/store'),
  missions: () => apiClient.get('/missions'),
  profileById: (uuid: string) => apiClient.get(`/profile/${uuid}`),
  createMission: (missionData: any) => apiClient.post('/missions', missionData),
  updateMission: (missionData: any) => apiClient.put('/missions', missionData),
  createStoreItem: (itemData: FormData) => 
    fetch(`${API}/store`, {
      method: 'POST',
      headers: { 'X-User-Id': getUserIdForEndpoint('/store') },
      body: itemData,
    }),
  updateStoreItem: (id: string, itemData: FormData) =>
    fetch(`${API}/store/${id}`, {
      method: 'PUT', 
      headers: { 'X-User-Id': getUserIdForEndpoint('/store') },
      body: itemData,
    }),
};