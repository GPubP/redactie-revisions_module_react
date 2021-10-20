import { LoadingState, useObservable } from '@redactie/utils';

import { revisionsFacade } from '../../store/revisions';

import { UseRevision } from './useRevision.types';

const useRevision: UseRevision = () => {
	const loading = useObservable(revisionsFacade.isFetchingPreview$, LoadingState.Loading);
	const updating = useObservable(revisionsFacade.isRestoringRevision$, LoadingState.Updating);
	const preview = useObservable(revisionsFacade.preview$, null);
	const error = useObservable(revisionsFacade.error$, null);

	const loadingState = error ? LoadingState.Error : loading;
	const updatingState = error ? LoadingState.Error : updating;

	return [loadingState, updatingState, preview];
};

export default useRevision;
