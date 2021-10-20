import { ContentSchema } from '@redactie/content-module';
import { LoadingState } from '@redactie/utils';

export type UseRevision = () => [LoadingState, LoadingState, ContentSchema | null];
