export default function (dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toDateString().slice(4, 10);
  const hours = padZero(dateTime.getHours());
  const minutes = padZero(dateTime.getMinutes());
  return `${date}, ${hours}:${minutes}`;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
