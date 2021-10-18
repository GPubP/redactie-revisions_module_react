import { ExternalTabProps } from '@redactie/content-module';
import React, { FC } from 'react';

// TODO: replace any with ExternalTabProps
const ContentDetailTab: FC<ExternalTabProps> = ({
	value = {} as Record<string, any>,
	isLoading,
	onSubmit,
	onCancel,
}) => {
	return <>Test</>;
};

export default ContentDetailTab;
