const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

const ThoughtControll = {
    //Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thought = await Thought.find({});
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought
    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: "Thought not found" });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.statsu(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Updated thoughts by Id
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findIdAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //  Add reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findByOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: "Not found" });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    // Remove reaction
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: "Not found" });
        } catch (e) {
            res.status(500).json(e);
        }
    },
};

module.exports = ThoughtControll;
