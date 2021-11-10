import dayjs from "dayjs"

export function disabledStartDate(current) {
  return current > dayjs().hour(7).minute(0).second(0).millisecond(0)
}

export function disabledEndDate(current) {
  return current < dayjs().hour(7).minute(0).second(0).millisecond(0)
}

export function disabledWorkAge(current) {
  return current > dayjs().subtract(18, 'year')
}
