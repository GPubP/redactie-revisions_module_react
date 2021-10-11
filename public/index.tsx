import React from 'react';
import Core from "@redactie/redactie-core";

Core.routes.register({
	path: '/demo',
	component: () => <>Hello world</>,
	navigation: {
		label: 'Demo'
	}
});
