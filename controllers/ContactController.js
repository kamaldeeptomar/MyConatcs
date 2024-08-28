const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id : req.user.id});
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({message: "all are mandotory"});
    // throw new Error("All field are mandatory");
  }
  const contact = await Contact.create({name, email, phone, user_id : req.user.id})
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id)
    if (!contact){
        res.status(404).json({message : "not found"})
    }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id)
    if (!contact){
        res.status(404).json({message : "not found"})
    }
    if (contact.user_id.toString() !== req.user.id){
      res.status(403).json({message: "Not Authorized"})
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body)
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id)
    if (!contact){
        res.status(404).json({message : "not found"})
    }
    if (contact.user_id.toString() !== req.user.id){
      res.status(403).json({message: "Not Authorized"})
    }
    const deleted = await Contact.findByIdAndDelete(id)
  res.status(200).json(deleted);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

