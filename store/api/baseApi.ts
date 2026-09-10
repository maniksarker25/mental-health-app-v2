import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { topics } from '@/data/topics';
import type { CreateSharePayload, CreateShareResponse, Topic } from '@/types';

const delay = <T>(value: T, ms = 600): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Topics', 'Share'],
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], void>({
      queryFn: async () => {
        try {
          const data = await delay(topics, 500);
          return { data };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Failed to fetch topics.',
            },
          };
        }
      },
      providesTags: ['Topics'],
    }),

    getTopicById: builder.query<Topic, string>({
      queryFn: async (id) => {
        try {
          await delay(null, 300);
          const topic = topics.find((item) => item.id === id);
          if (!topic) {
            return {
              error: {
                status: 404,
                data: 'This topic is no longer available.',
              },
            };
          }
          return { data: topic };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Failed to fetch topic details.',
            },
          };
        }
      },
      providesTags: (_result, _error, id) => [{ type: 'Topics', id }],
    }),

    createAnonymousShare: builder.mutation<CreateShareResponse, CreateSharePayload>({
      queryFn: async (payload) => {
        try {
          await delay(null, 1500);
          // Deterministic failure test hook
          if (payload.recipient.toLowerCase().includes('fail')) {
            return {
              error: {
                status: 500,
                data: 'We couldn’t send the resource right now. Please try again.',
              },
            };
          }
          const response: CreateShareResponse = {
            success: true,
            shareId: `share_${Math.random().toString(36).slice(2, 10)}`,
            status: 'SENT',
          };
          return { data: response };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Network error occurred while delivering resource.',
            },
          };
        }
      },
      invalidatesTags: ['Share'],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useGetTopicByIdQuery,
  useCreateAnonymousShareMutation,
} = baseApi;
