const makeYearRecord = (data) => {
  const { party, candidatevotes, totalvotes, year } = data
  const count = {}
  count[party] = candidatevotes
  count.total = totalvotes
  return { year, count }
}

function votesPerYear(votes) {
  return votes
    .reduce((acc, rec) => {
      const accumulator = acc.find((item) => item.year === rec.year && item.party === rec.party)
      if (accumulator) {
        accumulator.candidatevotes = +rec.candidatevotes + accumulator.candidatevotes
        accumulator.totalvotes = +rec.totalvotes + accumulator.totalvotes
        return acc
      }
      const { party, candidatevotes, totalvotes, year } = rec
      const newRec = {
        party,
        candidatevotes: +candidatevotes,
        totalvotes: +totalvotes,
        year
      }
      return [...acc, newRec]
    }, [])
    .reduce((acc, rec) => {
      const partyAndYear = acc.find((item) => item.year === rec.year)
      if (partyAndYear) {
        partyAndYear.count[rec.party] = rec.candidatevotes
        return acc
      }
      return [...acc, makeYearRecord(rec)]
    }, [])
    .map((it) => {
      const res = {
        dem: +((it.count.democrat * 100) / it.count.total).toFixed(2),
        repub: +((it.count.republican * 100) / it.count.total).toFixed(2),
        green: +((it.count.green * 100) / it.count.total).toFixed(2),
        NA: +((it.count.NA * 100) / it.count.total).toFixed(2)
      }
      // it.percent = res
      return { ...it, percent: res }
    })
    .reduce((acc, rec) => {
      const { year } = rec
      if (typeof acc[year] !== 'undefined') {
        acc[year] = { ...acc[year], ...rec.percent }
        return acc
      }
      acc[year] = rec.percent
      return acc
    }, {})
}

export default votesPerYear
