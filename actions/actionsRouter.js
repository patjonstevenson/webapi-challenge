const router = require("express").Router();

const actionsDb = require("../data/helpers/actionModel");
const projectsDb = require("../data/helpers/projectModel");

const validateId = require("../middleware/validateId-middleware")(actionsDb);
const validateProjectId = require("../middleware/validateProjectId-middleware")(projectsDb);

// Route Handlers
router.get("/", async (req, res) => {
    try {
        const actions = await actionsDb.get();
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error when getting the actions" });
    }
});

router.get("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const actions = await actionsDb.get(id);
        res.status(200).json(actions);
    } catch (error) {
        res.status(500).json({ message: `Internal server error getting the action with id ${id}` });
    }
});

router.post("/", validateProjectId, async (req, res) => {
    const action = req.body;
    try {
        const newAction = await actionsDb.insert(action);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: `Internal server error posting action ${action}` });
    }
});

router.put("/:id", validateId, validateProjectId, async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
        const newAction = await actionsDb.update(id, changes);
        res.status(201).json(newAction);
    } catch (error) {
        res.status(500).json({ message: `Internal server error when updating the action with id ${id}` });
    }
});

router.delete("/:id", validateId, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await actionsDb.remove(id);
        if (!deleted) res.status(500).json({ message: `Action with id ${id} could not be deleted` });
        res.status(200).json({ id });
    } catch (error) {
        res.status(500).json({ message: `Internal server error when deleting action with id ${id}` });
    }
});

module.exports = router;