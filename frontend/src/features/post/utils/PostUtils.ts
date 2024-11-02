export const convertPostDateToString = (postDate:Date): string => {
    const postDateString = `${postDate}`;
    let d = new Date(postDateString);

    const now = new Date();
    const timeDiff = now.getTime() - d.getTime();

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0 || months >= 1) {
        // Format the date as "MMM d, yyyy" for older dates
        return d.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    } else if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
};
