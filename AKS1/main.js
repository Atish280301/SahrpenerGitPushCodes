//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
//search.jwt.io website
// GET REQUEST
function getTodos() {
  console.log('GET Request');
  // axios({
  //   method: "get",
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  // .then(response => showOutput(response))
  // .catch(error => console.log(error));
axios
.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5000})
.then(response => showOutput(response))
.catch(error => console.log(error));
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{title: 'new TODO AKS', completed: false})
  .then(response => showOutput(response))
  .catch(error => console.log(error));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios
  // .put('https://jsonplaceholder.typicode.com/todos/1',{title: 'updated AKS', completed: true})
  .patch('https://jsonplaceholder.typicode.com/todos/1',{title: 'updated AKS', completed: true})
  .then(response => showOutput(response))
  .catch(error => console.log(error));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios
  .delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => showOutput(response))
  .catch(error => console.log(error));
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch(error => console.log(error));
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
  const config ={
    headers:{
      'Content-Type': 'application/json',
      'Authorization': 'sometoken'
    }
  }
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{title: 'new TODO AKS', completed: false}, config)
  .then(response => showOutput(response))
  .catch(error => console.log(error));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: "Hello World Atish"
    },
    transformResponse: axios.default.transformResponse.concat(data =>{
      data.title = data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(response => showOutput(response))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todoss', {
    // validateStatus: function(status){
    //   return status < 500; //REJECT ONLY IF STATUS IS GREATER OR EQUAL TO 500
    // }
  })
  .then(response => showOutput(response))
  .catch(error => {
    if(error.response){
      //server responded with a status other than 200 range
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);

      if(error.response.status === 404){
        alert('error: page not found');
      }
    }else if(error.request){
      //the request was made but no response
      console.log(error.request);
    }else{
      console.log(error.message);
    }
  });
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
  const source = axios.CancelToken.source();
  axios
  .get('https://jsonplaceholder.typicode.com/todoss', {
    cancelToken: source.token
  })
  .then(response => showOutput(response))
  .catch(thrown => {
    if(axios.isCancel(thrown)){
      console.log('Request Canceled', thrown.message);
    }
  });
  if(true){
    source.cancel('Request Canceled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config =>{
  console.log(`${config.method.toUpperCase()} request sent to  ${config.url} at ${new Date().getTime()}`);
  return config
}), error => {
  return Promise.reject(error);
}
// AXIOS INSTANCES
const axiosInstances = axios.create({
  //OTHER CUSTOM SETTINGS 
  baseURL: 'https://jsonplaceholder.typicode.com'
});
// axiosInstances.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
