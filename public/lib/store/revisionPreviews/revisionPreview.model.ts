import { ContentSchema } from '@redactie/content-module';
import { BaseEntityState } from '@redactie/utils';

export type RevisionPreviewModel = ContentSchema;

export type RevisionPreviewsState = BaseEntityState<RevisionPreviewModel, string>;
