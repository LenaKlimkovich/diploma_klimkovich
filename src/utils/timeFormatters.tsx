interface DateTimeContainer {
  datetime: number;
}

interface TrainTimeInfo {
  from: DateTimeContainer;
  to: DateTimeContainer;
  duration: number;
}

export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const trainTime = (
  destination: 'from' | 'to', // Убран знак ?, аргумент теперь строго обязателен
  type: 'departure' | 'arrival',
  route: Record<string, any> | null | undefined
): string => {
  if (!route) return '';

  const currentRoute = route[type];
  if (!currentRoute) return '';

  const currentPoint = currentRoute[destination];
  if (!currentPoint?.datetime) return '';

  return new Date(currentPoint.datetime * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formattedTime = (
  destination: 'from' | 'to',
  trainInfo: TrainTimeInfo
): string => {
  if (!trainInfo[destination].datetime) return '';
  return new Date(trainInfo[destination].datetime * 1000).toLocaleTimeString(
    'ru-RU',
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  );
};

export const formattedDuration = (trainInfo: TrainTimeInfo) => {
  const duration = trainInfo.duration;

  const days = Math.floor(duration / 86400);
  const hours = Math.floor((duration % 86400) / 3600);
  const minutes = Math.floor((duration % 3600) / 60);

  const formattedHours = String(hours).padStart(2, '0');
  let formattedMinutes = String(minutes).padStart(2, '0');

  if (days > 0) {
    return `${days}д. ${formattedHours}ч. ${formattedMinutes}м.`;
  }
  if (minutes === 0) {
    return `${formattedHours}ч.`;
  }
  return `${formattedHours}ч. ${formattedMinutes}м.`;
};
