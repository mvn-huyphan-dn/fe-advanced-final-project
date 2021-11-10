import dayjs from 'dayjs';

export const dateFormat = 'YYYY-MM-DD HH:mm';

export const dateShowFormat = 'YYYY-MM-DD 07:00';

export const defaultStartDate = dayjs().hour(7).minute(0).second(0).millisecond(0)

export const defaultEndDate = dayjs().add(1, 'day').hour(7).minute(0).second(0).millisecond(0)

export const birthFormat = 'YYYY-MM-DD'

// export const defaultRangeTime = [
//   dayjs().hour(7).minute(0).second(0).millisecond(0),
//   dayjs().add(1, 'day').hour(7).minute(0).second(0).millisecond(0)]

// export const rangeEndMonth = [
//   dayjs().hour(7).minute(0).second(0).millisecond(0),
//   dayjs().endOf('month').add(1, 'day').hour(7).minute(0).second(0).millisecond(0)]

// export const rangeEndWeek = [
//   dayjs().hour(7).minute(0).second(0).millisecond(0),
//   dayjs().endOf('week').add(1, 'day').hour(7).minute(0).second(0).millisecond(0)]
