import { Button } from '@acpaas-ui/react-components';
import { ActionBar, ActionBarContentSection } from '@acpaas-ui/react-editorial-components';
import { ExternalTabProps } from '@redactie/content-module';
import React, { FC, useEffect, useState } from 'react';

import { ExpandableTable } from '../../components';

import { REVISION_COLUMNS } from './ContentDetailTab.const';
import { RevisionForm, RevisionTableRow } from './ContentDetailTab.types';

const ContentDetailTab: FC<ExternalTabProps> = () => {
	const [selectedRevisions, setSelectedRevisions] = useState<string[]>([]);
	const [formInitialValue, setFormInitialValue] = useState<RevisionForm>({
		rows: [],
		selectedRows: [],
	});

	useEffect(() => {
		setFormInitialValue({
			rows: [
				{
					id: '3794ef2a-a1ce-4245-aa26-647944f0dfd7',
					workflowState: 'gepubliceerd',
					lastEditor: 'Jo',
					date: '12/06/12 - 12u30',
					checked: false,
					toggled: false,
					children: [
						{
							id: '3794ef2a-a1ce-4245-aa26-647944f0dfd9',
							workflowState: 'nieuw',
							lastEditor: 'Jeroen',
							date: '12/06/12 - 12u30',
							checked: false,
							toggled: false,
							parentIndex: 0,
						},
						{
							id: '3794ef2a-a1ce-4245-aa26-647944f0dfd3',
							workflowState: 'werkversie',
							lastEditor: 'Bart',
							date: '12/06/12 - 12u30',
							checked: false,
							toggled: false,
							parentIndex: 0,
						},
					],
				},
				{
					id: '3794ef2a-a1ce-4245-aa26-647944f0dfd8',
					workflowState: 'gepubliceerd',
					lastEditor: 'Jo',
					date: '12/06/12 - 12u30',
					checked: false,
					toggled: false,
					children: [
						{
							id: '3794ef2a-a1ce-4245-aa26-647944f0dfd1',
							workflowState: 'klaar-voor-nakijken',
							lastEditor: 'Thomas',
							date: '12/06/12 - 12u30',
							checked: false,
							toggled: false,
							parentIndex: 1,
						},
					],
				},
			],
			selectedRows: [],
		});
	}, []);

	return (
		<div className="u-margin-top">
			<p>
				Selecteer één revisie om ze te bekijken of terug te zetten. Selecteer twee revisies
				om ze met elkaar te vergelijken.
			</p>
			<ExpandableTable<RevisionTableRow, RevisionForm>
				initialValues={formInitialValue}
				onChange={({ selectedRows }) => setSelectedRevisions(selectedRows)}
				columns={REVISION_COLUMNS}
			></ExpandableTable>
			<ActionBar className="o-action-bar--fixed" isOpen>
				<ActionBarContentSection>
					<div className="u-wrapper row end-xs">
						<Button
							disabled={!selectedRevisions.length}
							onClick={console.log}
							type="primary"
							htmlType="submit"
						>
							{selectedRevisions.length >= 2 ? 'Vergelijken' : 'Herstellen'}
						</Button>
					</div>
				</ActionBarContentSection>
			</ActionBar>
		</div>
	);
};

export default ContentDetailTab;
