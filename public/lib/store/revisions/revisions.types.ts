import { SearchParams } from '@redactie/utils';

export interface RevisionsSearchParams extends SearchParams {
	state?: string;
	sinceLastPublished?: boolean;
	includeIntermediateStatuses?: boolean;
}
