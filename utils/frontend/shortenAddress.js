export default (address) => {
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
};
