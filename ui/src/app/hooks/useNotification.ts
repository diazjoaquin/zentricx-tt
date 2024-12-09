import React from 'react';
import { NotificationContext } from '../context/notification.context';


export const useNotification = () => {
	const context = React.useContext(NotificationContext);

	if (!context) throw new Error('There is no notification context');

	return context;
};