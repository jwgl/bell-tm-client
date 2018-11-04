import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

declare module 'dayjs' {
    interface Dayjs {
        fromNow();
    }
}

export function fromNowLabel(date: string) {
    const _date = dayjs(date);
    if (dayjs().diff(_date, 'day') > 25) {
        return _date.format('YYYY-MM-DD HH:mm');
    } else {
        return _date.fromNow();
    }
}

export function fromNowTitle(date: string) {
    const _date = dayjs(date);
    if (dayjs().diff(_date, 'day') > 25) {
        return '';
    } else {
        return _date.format('YYYY-MM-DD HH:mm');
    }
}
