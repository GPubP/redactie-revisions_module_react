import Core from '@redactie/redactie-core';
import { WorkflowsModuleAPI } from '@redactie/workflows-module';

class WorkflowsConnector {
	public static apiName = 'workflows-module';
	public api: WorkflowsModuleAPI;

	public get workflowsFacade(): WorkflowsModuleAPI['store']['workflows']['facade'] {
		return this.api.store.workflows.facade;
	}

	public get hooks(): WorkflowsModuleAPI['hooks'] {
		return this.api.hooks;
	}

	constructor(api?: WorkflowsModuleAPI) {
		if (!api) {
			throw new Error(
				`Content Module:
				Dependencies not found: ${WorkflowsConnector.apiName}`
			);
		}
		this.api = api;
	}
}

const workflowsConnector = new WorkflowsConnector(
	Core.modules.getModuleAPI<WorkflowsModuleAPI>(WorkflowsConnector.apiName)
);

export default workflowsConnector;
