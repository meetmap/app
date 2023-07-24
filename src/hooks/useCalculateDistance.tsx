export const useCalculateDistance = (lat1?: number, lon1?: number, lat2?: number, lon2?: number): string | undefined => {
    if(!lat1 || !lon1 || !lat2 || !lon2) return
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    let formattedDistance = "";
    if (distance < 1) {
        formattedDistance = `${Math.round(distance * 1000)} meters`;
    } else if (distance < 10) {
        formattedDistance = `${distance.toFixed(1)} kilometers`;
    } else {
        formattedDistance = `${Math.round(distance)} kilometers`;
    }

    return formattedDistance;
}