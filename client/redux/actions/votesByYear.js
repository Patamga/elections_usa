function dataVotesByYears(data) {
  return data.reduce((acc, rec) => {
    const { year } = rec.properties
    if (typeof acc[year] !== 'undefined') {
      acc[year] = [...acc[year], rec]
      return acc
    }
    acc[year] = [rec]
    return acc
  }, {})
}

export default dataVotesByYears
