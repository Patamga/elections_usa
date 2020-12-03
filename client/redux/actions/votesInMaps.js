const makeStateRecord = (src) => {
  const { id, party, state, state_po, candidatevotes, totalvotes, year } = src
  const count = {}
  count[party] = candidatevotes
  count.total = totalvotes
  return { id, state, state_po, year, count }
}

const votesInMaps = (data) => {
return data
  .reduce((acc, rec) => {
    const accumulator = acc.find(
      (item) =>
        item.state_po === rec.state_po && item.year === rec.year && item.party === rec.party
    )
    if (accumulator) {
      accumulator.candidatevotes = +rec.candidatevotes + accumulator.candidatevotes
      accumulator.totalvotes = +rec.totalvotes + accumulator.totalvotes
      return acc
    }
    const { FIPS, party, state, state_po, candidatevotes, totalvotes, year } = rec
    const newRec = {
      id: FIPS.padStart(5, '0').substring(0, 2),
      party,
      state,
      state_po,
      candidatevotes: +candidatevotes,
      totalvotes: +totalvotes,
      year
    }
    return [...acc, newRec]
  }, [])
  .reduce((acc, rec) => {
    const state = acc.find((item) => item.id === rec.id && item.year === rec.year)
    if (state) {
      state.count[rec.party] = rec.candidatevotes
      return acc
    }
    return [...acc, makeStateRecord(rec)]
  }, [])
}

export default votesInMaps