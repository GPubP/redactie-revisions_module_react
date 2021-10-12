import ContentDetailTab from './lib/components/ContentDetailTab/ContentDetailTab';
import { registerContentDetailTab } from './lib/connectors/content';
import { CONFIG } from './lib/revisions.const';

registerContentDetailTab(CONFIG.name, {
	label: 'Revisies',
	module: CONFIG.module,
	component: ContentDetailTab,
	containerId: 'revisions' as any,
});

console.log('check');
