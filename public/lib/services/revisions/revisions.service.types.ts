import { EmbeddedResponse } from '@redactie/utils';

export interface RevisionUser {
	address: string;
	domain: string;
	email: string;
	externalMutableReference: string;
	firstname: string;
	id: string;
	lastname: string;
	nickname: string;
	owner: boolean;
	type: string;
	username: string;
}

export interface RevisionMeta {
	created: string;
	data: {
		state: string;
		workflowStateName: string;
	};
	ref: string;
	type: string;
	user: RevisionUser;
	sinceLastPublished?: boolean;
}

export interface RevisionPatch {
	op: string;
	path: string;
	value: string;
	_id: string;
}

export interface RevisionReverse {
	op: string;
	path: string;
	_id: string;
}

export interface Revision {
	uuid: string;
	_id: string;
	patches: RevisionPatch[];
	reverse: RevisionReverse[];
	children: Revision[];
	meta: RevisionMeta;
}

export type RevisionsResponse = EmbeddedResponse<Revision>;
