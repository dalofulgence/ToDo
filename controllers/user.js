const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const apiKey =
  'mZYO1jI6U3DNREKPYqxPFawLI95LpWfXXPFHYFyu1MZqX7MTXAP21D1Irb93zyiK';

const getAll = async (req, res, next) => {
    if (req.header('apiKey') === apiKey){
      const result = await mongodb.getDb().db().collection('ToDoApp').find();
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    }else {
      res.send('Invalid apiKey, please read the documentation.');
    }
  
};

const getSingle = async (req, res, next) => {
  if (req.header('apiKey') === apiKey){
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('ToDoApp')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
    if (!result){
      throw('No Result with this ID')
    }
  }else {
    res.send('Invalid apiKey, please read the documentation.');
  }
  
};

// Create Contact
const createUser = async (req, res) => {
  
  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    DOB: req.body.DOB,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    todo_id: req.body.todo_id,
    todo: req.body.todo,
    date: req.body.date,
  };
  const response = await mongodb.getDb().db().collection('ToDoApp').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

//Update User
const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  
  const user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    DOB: req.body.DOB,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    todo_id: req.body.todo_id,
    todo: req.body.todo,
    date: req.body.date,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('ToDoApp')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the User.');
  }
};

//delete Contact

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('ToDoApp').remove({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser
};