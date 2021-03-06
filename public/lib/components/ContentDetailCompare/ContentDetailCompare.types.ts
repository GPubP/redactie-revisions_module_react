export interface RevisionTableRow {
	id: string;
	date: string;
	lastEditor: string;
	workflowState: string;
	checked: boolean;
	toggled: boolean;
	lastPublished?: boolean;
	lastArchived?: boolean;
	classList?: string[];
	parentIndex?: number;
	children?: RevisionTableRow[];
	onRenderRevisions?: (rows: RevisionTableRow[], rowData: RevisionTableRow) => void;
}

export interface RevisionForm {
	rows: RevisionTableRow[];
	selectedRows: string[];
	detailId: string;
}

export enum RestoreModalContext {
	'NORMAL' = 'NORMAL',
	'LINKED' = 'LINKED',
}

export const ContentStateMapping: Record<string, string> = {
	NEW: 'Nieuw',
	DRAFT: 'Werkversie',
	PENDING_REVIEW: 'Klaar voor nakijken',
	PENDING_PUBLISH: 'Klaar voor publicatie',
	PUBLISHED: 'Gepubliceerd',
	UNPUBLISHED: 'Gearchiveerd',
};
