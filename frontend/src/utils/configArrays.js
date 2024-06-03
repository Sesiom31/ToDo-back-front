/* const categories = ["trabajo", "hoy", "importante", "completo"];
const tasks = [
  { task: "darle a Mayra", percategories: ["  importante", "    hoy", "  completo"] },
  { task: "darle a Lilian", percategories: [" Importante", "hoy     "] },
]; */

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

/* console.log(prepareCategories(categories, tasks)); */
