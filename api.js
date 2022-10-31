const api_url = 'http://localhost:3000/';

//get
const getData = async () => {
    try {
        const response = await fetch(api_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};
getData();

// post 
const postData = async (addToDo) => {
    const data = {
        description: addToDo,
        done: false,
    };
    try {
        const response = await fetch(api_url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.log('error');
    }
};

//delete 
const deleteData = async (id) => {
    const response = await fetch(api_url + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log('todo from ' + id + ' is deleted');
};

//change  
const changeData = async (changeToDo, id) => {
    const data = {
        description: changeToDo,
    };

    try {
        const response = await fetch(api_url + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(data);

        return await response.json();
    } catch (error) {
        console.log('error');
    }
};

const completeData = async (done, id) => {
    const data = {
        done: true,
    };

    try {
        const response = await fetch(api_url + id, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(data);

        return await response.json();
    } catch (error) {
        console.log('error');
    }
};