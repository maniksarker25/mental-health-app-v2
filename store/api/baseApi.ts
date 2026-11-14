import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { topics as topicTemplates } from '@/data/topics';
import type {
  Article,
  CreateSharePayload,
  CreateShareResponse,
  Topic,
  TopicTone,
} from '@/types';
import { backendRequest, BackendApiError } from '@/utils/backendApi';

interface ApiTopic {
  _id: string;
  slug: string;
  name: string;
  shortDescription: string;
  tone?: string;
  icon?: string;
}

interface ApiResource {
  _id: string;
  slug?: string;
  title: string;
  shortDescription?: string;
  readingTime?: number;
}

function mapTopic(item: ApiTopic): Topic {
  const template = topicTemplates.find(
    (topic) =>
      topic.id === item.slug ||
      topic.name.trim().toLowerCase() === item.name.trim().toLowerCase()
  );
  if (template) {
    return { ...template, apiId: item._id, slug: item.slug, name: item.name };
  }

  const tones: TopicTone[] = ['mist', 'lavender', 'sky', 'sand', 'blush'];
  return {
    id: item.slug,
    apiId: item._id,
    slug: item.slug,
    name: item.name,
    shortDescription: item.shortDescription || item.name,
    intro: item.shortDescription || item.name,
    packetTitle: item.name,
    packetItems: [item.shortDescription || item.name],
    tone: tones.includes(item.tone as TopicTone) ? (item.tone as TopicTone) : 'mist',
    icon: item.icon || 'heart',
  };
}

function mapResource(item: ApiResource, topicId: string): Article {
  const websiteUrl =
    process.env.EXPO_PUBLIC_WEBSITE_URL?.trim().replace(/\/+$/, '') ||
    'https://mentalhealthanonymous.org';
  return {
    id: item._id,
    topicId,
    slug: item.slug,
    title: item.title,
    excerpt: item.shortDescription || '',
    readTime: `${item.readingTime || 5} min read`,
    category: 'Mental health resource',
    url: `${websiteUrl}/resources/${encodeURIComponent(item.slug || item._id)}`,
  };
}

function errorResult(error: unknown) {
  return {
    error: {
      status: error instanceof BackendApiError ? error.status : 500,
      data:
        error instanceof Error
          ? error.message
          : 'The request could not be completed.',
    },
  };
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Topics', 'Resources', 'Share'],
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], void>({
      queryFn: async () => {
        try {
          const result = await backendRequest<ApiTopic[]>(
            'topic?page=1&limit=100&sortBy=name&sortOrder=asc'
          );
          return { data: result.map(mapTopic) };
        } catch (error) {
          return errorResult(error);
        }
      },
      providesTags: ['Topics'],
    }),

    getTopicById: builder.query<Topic, string>({
      queryFn: async (id) => {
        try {
          const result = await backendRequest<ApiTopic>(
            `topic/${encodeURIComponent(id)}`
          );
          return { data: mapTopic(result) };
        } catch (error) {
          return errorResult(error);
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Topics', id }],
    }),

    getResourcesByTopicId: builder.query<Article[], { apiId: string; topicId: string }>({
      queryFn: async ({ apiId, topicId }) => {
        try {
          const result = await backendRequest<ApiResource[]>(
            `resource?status=published&page=1&limit=100&topic=${encodeURIComponent(apiId)}`
          );
          return { data: result.map((resource) => mapResource(resource, topicId)) };
        } catch (error) {
          return errorResult(error);
        }
      },
      providesTags: (_result, _error, { apiId }) => [{ type: 'Resources', id: apiId }],
    }),

    createAnonymousShare: builder.mutation<CreateShareResponse, CreateSharePayload>({
      queryFn: async ({ idempotencyKey, ...payload }) => {
        try {
          const result = await backendRequest<{
            messageId: string;
            status: 'queued' | 'delivered';
          }>(
            'message',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Idempotency-Key': idempotencyKey,
              },
              body: JSON.stringify(payload),
            },
            true
          );
          return {
            data: {
              success: true,
              messageId: result.messageId,
              status: result.status === 'delivered' ? 'SENT' : 'QUEUED',
            },
          };
        } catch (error) {
          return errorResult(error);
        }
      },
      invalidatesTags: ['Share'],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useGetResourcesByTopicIdQuery,
  useCreateAnonymousShareMutation,
} = baseApi;
