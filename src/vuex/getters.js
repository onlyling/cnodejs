export const getTopic = (state, id) => {
  console.log(id)
  console.log(state.topics)
  return state.topics.data[id]
}
