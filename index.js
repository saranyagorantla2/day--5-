const DataService = (function() {
    async function fetchData(url) {
    try {
    const response = await fetch(url);
    if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}`); // More specific error message
    }
    return await response.json();
    } catch (error) {
    console.error(error);
    throw error;
    }
    }
    return {
    fetchPosts: async () => await
    fetchData('https://jsonplaceholder.typicode.com/posts'),
    fetchTodos: async () => await
    fetchData('https://jsonplaceholder.typicode.com/todos'),
    };
    })();
    const UI = (function() {
    function displayPosts(posts) {
    
    const postsElement = document.getElementById('posts');
    postsElement.innerHTML = ''; // Clear previous content
    posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.innerHTML = `
    <b>Title:</b><p class="lead">${post.title}</p>
    <b>Body:</b><p class="lead">${post.body}</p>
    <hr>
    `;
    postsElement.appendChild(postDiv);
    });
    }
    function displayTodos(todos) {
    const todosElement = document.getElementById('todos');
    todosElement.innerHTML = ''; // Clear previous content
    todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.innerHTML = `
    <b>Title:</b><p class="lead">${todo.title}</p>
    <b>Completed:</b><p class="lead">${todo.completed}</p>
    <hr>
    `;
    todosElement.appendChild(todoDiv);
    });
    }
    return {
    displayPosts,
    displayTodos,
    };
    })();
    // Event listener setup
    const button1 = document.getElementById('button1');
    button1.addEventListener('click', async () => {
    try {
    const posts = await DataService.fetchPosts();
    UI.displayPosts(posts);
    } catch (error) {
    console.error(error);
    
    // Handle errors (e.g., display an error message to the user)
    }
    });
    const button2 = document.getElementById('button2');
    button2.addEventListener('click', async () => {
    try {
    const todos = await DataService.fetchTodos();
    UI.displayTodos(todos);
    } catch (error) {
    console.error(error);
    // Handle errors
    }
    });