import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const dateFromNow = (date: Date) => {
	return dayjs(date).fromNow();
};
