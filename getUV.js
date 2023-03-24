async function getJson(url, options) {
    const request = await fetch(url, options);
    const response = await request.json();
    return await response;
  }
  
  function getLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                return resolve(pos.coords);
            },
            (err) => {
                console.warn(`ERROR(${err.code}): ${err.message}`);
                return reject(err);
            }
        );
    });
  }

async function getUV() {
    const coords = await getLocation();
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", "openuv-3ibp806rlflj1qc9-io");
    myHeaders.append("Content-Type", "application/json");
  
    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    const request = getJson(`https://api.openuv.io/api/v1/uv?lat=${coords.latitude}&lng=${coords.longitude}&alt=100&dt=`, requestOptions)
    console.log(request);
}

  getUV();