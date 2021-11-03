import { ContentSchema } from '@redactie/content-module';
import { LoadingState } from '@redactie/utils';

export type UseRevision = (
	revisionId?: string | null
) => [LoadingState, LoadingState, ContentSchema | undefined, any];
