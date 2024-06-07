export const prepareCategories = (categories, tasks) => {
  const finish = categories.map((categ) => {
    let count = 0;
    tasks.forEach((t) => {
      t.belongsCategories.forEach((c) => {
        if (c.toLowerCase().trim() === categ.toLowerCase().trim()) {
          count++;
        }
      });
    });
    return { name: categ, count };
  });

  return finish;
};
