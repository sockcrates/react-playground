const server = 'https://api.test.test/v1';

function getApiUrl(statics: Array<string>, ...dynamics: Array<string>): string {
  const finalUrlFragments = [server];

  statics.forEach((piece, i) => {
    finalUrlFragments.push(piece, dynamics[i]);
  });

  return finalUrlFragments.join('');
}

export default getApiUrl;
