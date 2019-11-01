/**
 * empty text in component
 */
export default {
  props: {
    noOptionsText: { type: String, default: 'No options available.' }, //options is empty
    noResultsText: { type: String, default: 'No results found...' }, //text displayed when there are no matching search results.
    noChildrenText: { type: String, default: 'No child nodes' }, //no children node in father node
  },
};
