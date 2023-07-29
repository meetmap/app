import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";

export const getTimeDifference = (lastModifiedTime: string): string => {
    const lastModifiedDate = parseISO(lastModifiedTime);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastModifiedDate.getTime();

    if (timeDifference < 5 * 60 * 1000) {
        return 'Now';
    }

    let formattedDifference = formatDistance(lastModifiedDate, currentDate, { addSuffix: true, includeSeconds: false });

    if (formattedDifference.startsWith("about ")) {
        formattedDifference = formattedDifference.slice(6);
    }

    return formattedDifference;
}