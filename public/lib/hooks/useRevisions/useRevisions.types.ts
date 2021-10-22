import { LoadingState, Page } from '@redactie/utils';

import { RevisionsModel } from '../../store/revisions';

export type UseRevisions = () => [
	LoadingState,
	LoadingState,
	RevisionsModel[],
	RevisionsModel[],
	Page | null | undefined
];
