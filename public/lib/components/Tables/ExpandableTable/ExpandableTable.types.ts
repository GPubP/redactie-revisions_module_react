import { TableColumn } from '@redactie/utils';
import { FormikValues } from 'formik';

export interface ExpandableTableProps<I, T> {
	initialValues: I;
	columns: (
		initialValues: I,
		setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
		onRenderChildren: (rowData: T) => void
	) => TableColumn<T>[];
	onChange: (values: FormikValues) => void;
}

export interface ExpandableTableRow {
	id: string;
	toggled: boolean;
	children?: ExpandableTableRow[];
	onRenderChildren?: (rowData: ExpandableTableRow) => void;
}

export interface ExpandableTableInitialValues<T> {
	rows: T[];
	// Allow custom props, fe. selectedRows
	[key: string]: any;
}
