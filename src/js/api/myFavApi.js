import { headers, parseJSON, hosturl } from './utils';
import { buildQuery } from 'grommet/utils/Rest';
//GET /api/v1/apistore/findMyFavorites/{email}
export function findMyFavorites(email, params) {
  const options = {
    headers: headers(),
    method: 'GET'
  };

  let path = 'findMyFavorites/' + encodeURIComponent(email);
  let query = buildQuery(params);
  let url = `${hosturl}/${path}${query}`;
  return fetch(url, options)
    .then(parseJSON);
}



