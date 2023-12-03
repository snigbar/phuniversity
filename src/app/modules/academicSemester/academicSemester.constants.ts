import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMap,
  TMonthType,
} from './academicSemester.interface'

export const Months: TMonthType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const AcademicSemesters: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const AcademicSemestersCodes: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterNameCodeMap: TAcademicSemesterNameCodeMap = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}
