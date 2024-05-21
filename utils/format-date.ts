// 'use client'
// import dayjs from 'dayjs';

export function formatDate(
  date?: Date,
  format: string = 'DD MMM, YYYY'
): string {
  console.log('date', date);
  if (!date) return '';
  return new Date(date).toLocaleDateString("fr-FR");
}



// // getHours
// export function getHours(
//   date?: Date
// ): string {
//   if (!date) return '';
//   return dayjs(date).format('HH:mm');
// }
