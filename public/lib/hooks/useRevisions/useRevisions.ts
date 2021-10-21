import { LoadingState, useObservable } from '@redactie/utils';

import { revisionsFacade } from '../../store/revisions';

import { UseRevisions } from './useRevisions.types';

const useRevisions: UseRevisions = () => {
	const loading = useObservable(revisionsFacade.isFetching$, LoadingState.Loading);
	const loadingLastPublished = useObservable(
		revisionsFacade.isFetchingLastPublished$,
		LoadingState.Loading
	);
	const revisions = useObservable(revisionsFacade.revisions$, []);
	const sinceLastPublished = useObservable(revisionsFacade.sinceLastPublished$, null);
	const meta = useObservable(revisionsFacade.meta$, null);
	const error = useObservable(revisionsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;
	const loadingLastPublishedState = error ? LoadingState.Error : loadingLastPublished;

	return [loadingState, loadingLastPublishedState, revisions, sinceLastPublished, meta];
};

export default useRevisions;
