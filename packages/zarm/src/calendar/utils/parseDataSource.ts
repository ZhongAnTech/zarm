function parseDataSource(months, locale) {
  const dataSource = {};
  for (let i = 0; i < months.length; i++) {
    const year = months[i].getFullYear();
    const month = months[i].getMonth();
    if (!dataSource[year]) {
      dataSource[year] = {
        value: year,
        label: year,
        children: [
          {
            value: month,
            label: locale?.months[month],
          },
        ],
      };
    } else {
      dataSource[year].children.push({
        value: month,
        label: locale?.months[month],
      });
    }
  }
  return dataSource;
}

export default parseDataSource;
