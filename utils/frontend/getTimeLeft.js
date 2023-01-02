export default (timeCreated, dayLast) => {
    let createdDate = new Date(timeCreated * 1000);
    const expiredDate = new Date(createdDate.setDate(createdDate.getDate() + dayLast));
    const now = new Date();
    let diff = (expiredDate.getTime() - now.getTime()) / 1000 / 60 / 60 / 24;
    return Math.abs(Math.round(diff));
};
