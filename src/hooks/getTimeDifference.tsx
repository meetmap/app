import { formatDistance, formatDistanceStrict, formatDistanceToNow, parseISO } from "date-fns";
import i18n from "../../i18n.config";
import { ru, enUS } from 'date-fns/locale'
import { t } from "i18next";

export const getTimeDifference = (lastModifiedTime: string): string | null => {
    const lastModifiedDate = parseISO(lastModifiedTime);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - lastModifiedDate.getTime();

    const locales = {
        en: enUS,
        ru
    }
    if (timeDifference < 5 * 60 * 1000) {
        return null
    }

    return formatDistanceStrict(lastModifiedDate, currentDate, { addSuffix: true, locale: locales[i18n.language as keyof typeof locales]});
}