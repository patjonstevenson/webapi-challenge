const router = require("express").Router();

const projectsDb = require("../data/helpers/projectModel");

// Route Handlers
router.get("/", async (req, res) => {
    try {
        const projects = await projectsDb.get();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when getting the projects" });
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await projectsDb.get(id);
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Internal server error getting the project", id });
    }
});

router.post("/", async (req, res) => {
    const project = req.body;
    try {
        const newProject = await projectsDb.insert(project);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Internal server error posting project", project });
    }
});

router.put("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const newProject = await projectsDb.update(id, changes);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when updating the project", id });
    }
});

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await projectsDb.remove(id);
        if (!deleted) res.status(500).json({ message: "Project could not be deleted", id });
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: `Internal server error when deleting action with id ${id}` });
    }
});

// Custom Middleware
async function validateId(req, res, next) {
    const { id } = req.params;
    try {
        const actions = await projectsDb.get(id);
        if (!actions) res.status(404).json({ message: "Resource with given id is not available", id });
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error when validating Id" });
    }
}

module.exports = router;