import { apiClient } from './client.ts';
import { PersonDTO, ArtifactDTO, BranchDTO, ContentDTO, LeaderDTO } from './types.ts';

export const EduAPI = {
  profile: () => apiClient.get<PersonDTO>('/edu/profile'),
  updateProfile: (p: PersonDTO) => apiClient.put<PersonDTO>('/edu/profile', p),
  leaderboard: (limit?: number, offset?: number) => {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    const query = params.toString();
    return apiClient.get<LeaderDTO[]>(`/edu/leaderboard${query ? `?${query}` : ''}`);
  },
  artifacts: () => apiClient.get<ArtifactDTO[]>('/edu/artifacts'),
  branches: () => apiClient.get<BranchDTO[]>('/edu/branches'),
  branch: (id: number) => apiClient.get<BranchDTO>(`/edu/branches/${id}`),
  branchMissions: (id: number) => apiClient.get<ContentDTO[]>(`/edu/branches/${id}/missionsList`),
  mission: (id: number) => apiClient.get<ContentDTO>(`/edu/mission/${id}`),
  updateProgress: (contentId: number, status: number, progress?: number) =>
    apiClient.post('/edu/progress', { contentId, status, progress }),
  completeMission: (contentId: number) =>
    apiClient.post('/edu/complete', { contentId }),
};

