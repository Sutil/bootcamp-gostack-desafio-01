const express = require('express');

const server = express();

server.use(express.json());


const projects = [
    {
        id: "1",
        title: "Projeto Rocketseat",
        tasks: ['Concluir o desafio 1.']
    },
    {
        id: "2",
        title: "Projeto Néos Tecnologia",
        tasks: ['Ministrar curso de React Native.']
    }
];

let requestCount = 0;

/** Middlewares */

server.use((req, res, next) => {
    requestCount++;
    console.log(`Number of requests: ${requestCount}`);
    return next();
})

function checkProjectExist(req, res, next) {
    const { id } = req.params;

    const project = projects.find(project => id === project.id);

    if(!project) {
        return res.status(400).json({ error: 'Project not found'});
    }

    return next();
}

/** Routes */
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.json(project);
});

server.get('/projects', (req, res) => {

    return res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(project => id === project.id);

    project.title = title;

    return res.json(project);
});

server.delete('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;

    const index = projects.findIndex(project => id === project.id);

    projects.splice(index, 1);

    return res.send();
});


/** Tasks */
server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(project => id === project.id);

    project.tasks.push(title);

    return res.json(project);
});


server.listen(3000);