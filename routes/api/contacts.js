const express = require("express");
const router = express.Router();
const {
  validationAddContact,
  validationUpdateContact,
} = require("../../model/validation");
const contactOperations = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactOperations.listContacts();
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", validationAddContact, async (req, res, next) => {
  try {
    const newContact = await contactOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.updateContact(contactId, req.body);
    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
