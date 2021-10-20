import { ContentSchema } from '@redactie/content-module';
import { FormSchema } from '@redactie/form-renderer-module';
import { LoadingState } from '@redactie/utils';
import { FormikValues } from 'formik';

export interface RevisionModalProps {
	contentItem: ContentSchema | null;
	View: React.FC<any> | undefined;
	viewProps: { schema: FormSchema; values: FormikValues } | undefined;
	show: boolean;
	loading: LoadingState;
	restoring: LoadingState;
	onClose: () => void;
	onRestore: () => void;
}
