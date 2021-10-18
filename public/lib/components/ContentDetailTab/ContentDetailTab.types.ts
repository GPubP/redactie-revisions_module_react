export interface RevisionTableRow {
	id: string;
	date: string;
	lastEditor: string;
	workflowState: string;
	checked: boolean;
	toggled: boolean;
	parentIndex?: number;
	children?: RevisionTableRow[];
	onRenderRevisions?: (rows: RevisionTableRow[], rowData: RevisionTableRow) => void;
}

export interface RevisionForm {
	rows: RevisionTableRow[];
	selectedRows: string[];
}
