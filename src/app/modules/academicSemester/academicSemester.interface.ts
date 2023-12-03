export type TMonthType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall'
export type TAcademicSemesterCode = '01' | '02' | '03'

export type TAcademicSemesterNameCodeMap = {
  [key: string]: string
}

export type TacademicSemester = {
  name: TAcademicSemesterName
  code: TAcademicSemesterCode
  year: string
  startMonth: TMonthType
  endMonth: TMonthType
}
