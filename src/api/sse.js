import { apiKeys } from '../constants/apiKeys';
import serverInfo from '../constants/serverInfo';

function sse() {
  const { PROTOCOL, IP, PORT } = serverInfo;
  const serverUrl = `${PROTOCOL}://${IP}:${PORT}`;
  return new EventSource(serverUrl + apiKeys.sscConnect + Math.random());
}
export default sse;