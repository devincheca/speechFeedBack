exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: {
      stuff: 'hello',
    },
    /*
    JSON.stringify({
      stuff: "Hello, World",
    }),
    */
  };
};
