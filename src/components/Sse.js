const Sse = () => {
  const eventSource = new EventSource("http://localhost:8080/saveData/connect/id="+Math.random());
  eventSource.addEventListener("sse", function (event) {
    console.log("percent :",JSON.parse(event.data));

    const data = JSON.parse(event.data);
  })
}