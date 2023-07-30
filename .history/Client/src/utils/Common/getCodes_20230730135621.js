export const getCodePrice = (total) => {
    return total.map((item) => ({
        ...item,
    }));
};
