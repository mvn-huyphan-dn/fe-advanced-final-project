import dayjs from 'dayjs';

export const dateFormat = 'YYYY-MM-DD HH:mm';

export const dateShowFormat = 'YYYY-MM-DD 07:00';

export const defaultStartDate = dayjs().hour(7).minute(0).second(0).millisecond(0)

export const defaultEndDate = dayjs().add(1, 'day').hour(7).minute(0).second(0).millisecond(0)

export const birthFormat = 'YYYY-MM-DD'
