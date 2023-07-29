import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";

export const getTimeDifference = (lastModifiedTime: string): string => {
    const lastModifiedDate = parseISO(lastModifiedTime);

    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - lastModifiedDate.getTime();

    if (timeDifference < 5 * 60 * 1000) {
        return 'Now';
    }

    const formattedDifference = formatDistance(lastModifiedDate, currentDate, { addSuffix: true });

    return formattedDifference;
}