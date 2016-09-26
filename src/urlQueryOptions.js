function createUrlQueryOptions() {
  // default options
  return {
    // add in `props.params` from react-router to the url object
    addRouterParams: true,

    // use this history if no history is specified
    history: undefined,
  };
}

export default createUrlQueryOptions();
