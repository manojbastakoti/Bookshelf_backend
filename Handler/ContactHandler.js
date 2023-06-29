const ContactModel = require("../Models/Contact");


const createContact = async (req, res) => {
    try {
      const newContact = await ContactModel.create(req.body);
      res.json(newContact);
    } catch (error) {
      console.log(error)
    }
  };
  const updateContact =async (req, res) => {
    const { id } = req.params;
    
    try {
      const updatedContact = await ContactModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedContact);
    } catch (error) {
        console.log(error)
    }
  };
  const deleteContact =async (req, res) => {
    const { id } = req.params;
   
    try {
      const deletedContact = await ContactModel.findByIdAndDelete(id);
      res.json(deletedContact);
    } catch (error) {
        console.log(error)
    }
  };
  const getContact = async (req, res) => {
    const { id } = req.params;
   
    try {
      const getaContact = await ContactModel.findById(id);
      res.json(getaContact);
    } catch (error) {
        console.log(error)
    }
  };
  const getallContact =async (req, res) => {
    try {
      const getallContact = await ContactModel.find();
      res.json(getallContact);
    } catch (error) {
        console.log(error)
    }
  };
  module.exports = {
    createContact,
    updateContact,
    deleteContact,
    getContact,
    getallContact,
  };