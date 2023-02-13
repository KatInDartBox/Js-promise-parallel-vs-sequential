/**
 *
 * @param {string} url mock url
 * @param {number} waitSec time in second
 *
 */
function fetchServer(url, waitSec, data) {
  // console.log(`fetching ${url} `);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, waitSec * 1000);
  });
}

const people = ["angela", "white"];
const animals = ["dog", "cat"];
const trending = ["putanina", "optimum pride"];

async function sequentialFetch() {
  const users = await fetchServer("/users", 2, people);
  const pets = await fetchServer("/pets", 5, animals);
  const memes = await fetchServer("/memes", 4, trending);

  return { users, pets, memes };
}

async function parallelFetch() {
  const [users, pets, memes] = await Promise.all([
    fetchServer("/users", 2, people),
    fetchServer("/pets", 5, animals),
    fetchServer("/memes", 4, trending),
  ]);

  return { users, pets, memes };
}

async function testSpeed(testFn, testName) {
  console.log("------------------");
  console.log(testName);

  const start = performance.now();
  const data = await testFn();
  const end = performance.now();

  const timeInSecond = Math.round(
    //
    (end - start) * 0.001
  );

  console.log(`time: ${timeInSecond} s`);
  console.log("data:", data);
  console.log("------------------");
}

// nodeJs can use top level await
// so we can just use await as bellow,

await testSpeed(
  sequentialFetch, //
  "testing sequence time"
);
await testSpeed(
  parallelFetch, //
  "testing parallel time"
);
